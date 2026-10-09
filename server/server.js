// MediExplain AI Backend Server
// Express server providing AI Analysis, OCR Parsing, and Secure Auth endpoints

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, '../dist')));

// Helper function to hash password securely with salt
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

function verifyPassword(password, storedHash, salt) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === storedHash;
}

// In-Memory Persistent Database for Registered Users
// Pre-seeded with a demo patient account
const defaultSalt = '8a72b9c3e1f4d567';
const defaultPassHash = crypto.pbkdf2Sync('Password123!', defaultSalt, 1000, 64, 'sha512').toString('hex');

const usersDatabase = [
  {
    id: 'usr_demo_1',
    name: 'Priya Sharma',
    email: 'patient@mediexplain.org',
    passwordHash: defaultPassHash,
    salt: defaultSalt,
    provider: 'email',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    createdAt: new Date().toISOString(),
  },
];

// Active user sessions (tokens)
const activeSessions = new Map();

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MediExplain AI Engine',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    usersRegistered: usersDatabase.length,
  });
});

// Mock OCR & AI report analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { fileName, documentText, imageBase64, sampleId } = req.body;

    // Simulate AI parsing delay
    await new Promise(r => setTimeout(r, 1000));

    // Return structured analysis
    res.json({
      success: true,
      message: 'Report successfully processed and analyzed.',
      analyzedAt: new Date().toISOString(),
      reportMeta: {
        fileName: fileName || 'Uploaded_Medical_Report.pdf',
        sizeBytes: 1024 * 350,
        ocrConfidence: 0.96,
      },
    });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ success: false, error: 'Internal server error analyzing report.' });
  }
});

// User Registration Endpoint (Signup)
app.post('/api/auth/signup', (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Full name is required (at least 2 characters).' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const existingUser = usersDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Securely hash password
    const { hash, salt } = hashPassword(password);
    const formattedName = name.trim();

    const newUser = {
      id: 'usr_' + Date.now(),
      name: formattedName,
      email: email.toLowerCase().trim(),
      passwordHash: hash,
      salt: salt,
      provider: 'email',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}`,
      createdAt: new Date().toISOString(),
    };

    usersDatabase.push(newUser);

    // Create session token
    const token = 'token_' + crypto.randomBytes(24).toString('hex');
    activeSessions.set(token, newUser);

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      provider: newUser.provider,
      avatar: newUser.avatar,
    };

    res.status(201).json({
      success: true,
      message: 'Account successfully registered.',
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Error processing registration.' });
  }
});

// User Login Endpoint
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = usersDatabase.find(u => u.email === normalizedEmail);

    if (!user) {
      // If user doesn't exist yet, auto-provision for smooth testing if password length >= 6
      if (password.length >= 6) {
        const { hash, salt } = hashPassword(password);
        const namePart = normalizedEmail.split('@')[0].replace(/[._]/g, ' ');
        const autoName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        const newUser = {
          id: 'usr_' + Date.now(),
          name: autoName,
          email: normalizedEmail,
          passwordHash: hash,
          salt: salt,
          provider: 'email',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(autoName)}`,
          createdAt: new Date().toISOString(),
        };
        usersDatabase.push(newUser);

        const token = 'token_' + crypto.randomBytes(24).toString('hex');
        activeSessions.set(token, newUser);

        return res.json({
          success: true,
          message: 'Login successful.',
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            provider: newUser.provider,
            avatar: newUser.avatar,
          },
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Verify hashed password
    const isMatch = verifyPassword(password, user.passwordHash, user.salt);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = 'token_' + crypto.randomBytes(24).toString('hex');
    activeSessions.set(token, user);

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
});

// Google OAuth Simulation Endpoint
app.post('/api/auth/google', (req, res) => {
  const googleUser = {
    id: 'usr_goog_' + Date.now(),
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    provider: 'google',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
  };

  const token = 'token_goog_' + crypto.randomBytes(24).toString('hex');
  activeSessions.set(token, googleUser);

  res.json({
    success: true,
    message: 'Google authentication successful.',
    token,
    user: googleUser,
  });
});

// Current User Verification Endpoint
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No authorization header provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  const user = activeSessions.get(token);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid.' });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      avatar: user.avatar,
    },
  });
});

app.listen(PORT, () => {
  console.log(`MediExplain AI Backend running on http://localhost:${PORT}`);
});

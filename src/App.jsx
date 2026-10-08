import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { authService } from './services/authService';

// Pages
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Scan from './pages/Scan';
import Result from './pages/Result';
import FamilyMode from './pages/FamilyMode';
import DoctorQuestions from './pages/DoctorQuestions';
import History from './pages/History';
import Privacy from './pages/Privacy';
import Login from './pages/Login';

// Protected Route Component
function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to /login preserving the requested path in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Root Route Decider: redirects to /home if logged in, otherwise shows Login page
function RootIndexRoute() {
  const isAuthenticated = authService.isAuthenticated();
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <Login />;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    const unsub = authService.subscribe((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  return (
    <Router>
      <div className="app-root-layout">
        <Navbar />
        <main className="app-main-content">
          <Routes>
            {/* Root Route: Shows Login by default for new visitors, /home for logged-in users */}
            <Route path="/" element={<RootIndexRoute />} />

            {/* Login & Registration Route */}
            <Route 
              path="/login" 
              element={currentUser ? <Navigate to="/home" replace /> : <Login />} 
            />

            {/* Protected Application Routes */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analyze" 
              element={
                <ProtectedRoute>
                  <Analyze />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/scan" 
              element={
                <ProtectedRoute>
                  <Scan />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/result" 
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/family-mode" 
              element={
                <ProtectedRoute>
                  <FamilyMode />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-questions" 
              element={
                <ProtectedRoute>
                  <DoctorQuestions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } 
            />

            {/* Public/Informational Route */}
            <Route path="/privacy" element={<Privacy />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

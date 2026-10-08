// Exhaustive Anatomical Regions Registry for MediExplain AI
// Handles front, back, and side views with precise coordinates
// Note: In FRONT view, Patient RIGHT = Viewer LEFT (x < 50%), Patient LEFT = Viewer RIGHT (x > 50%)

export const anatomicalRegions = {
  // --- Head & Neck ---
  brain: {
    id: 'brain',
    label: 'Brain',
    category: 'Head & Neuro',
    side: 'center',
    defaultView: 'front',
    coordinates: {
      front: { x: 50, y: 7.5, width: 14, height: 9 },
      back: { x: 50, y: 7.5, width: 14, height: 9 },
      side: { x: 49, y: 8, width: 16, height: 10 },
    },
    roleDescription: 'The central command center of your nervous system that controls thought, movement, and vital body functions.',
  },
  head: {
    id: 'head',
    label: 'Head & Cranium',
    category: 'Head & Neuro',
    side: 'center',
    defaultView: 'front',
    coordinates: {
      front: { x: 50, y: 9, width: 16, height: 12 },
      back: { x: 50, y: 9, width: 16, height: 12 },
      side: { x: 48, y: 9, width: 18, height: 12 },
    },
    roleDescription: 'Protects the brain, sensory organs (eyes, ears), and facial nerve pathways.',
  },
  neck: {
    id: 'neck',
    label: 'Neck & Cervical Area',
    category: 'Spine & Musculoskeletal',
    side: 'center',
    defaultView: 'front',
    coordinates: {
      front: { x: 50, y: 17, width: 8, height: 6 },
      back: { x: 50, y: 17, width: 8, height: 6 },
      side: { x: 50, y: 17, width: 8, height: 6 },
    },
    roleDescription: 'Houses the cervical spinal cord, esophagus, trachea, and major blood vessels supplying the brain.',
  },
  cervical_spine: {
    id: 'cervical_spine',
    label: 'Cervical Spine (Neck)',
    category: 'Spine',
    side: 'center',
    defaultView: 'back',
    coordinates: {
      front: { x: 50, y: 18, width: 7, height: 6 },
      back: { x: 50, y: 16, width: 7, height: 7 },
      side: { x: 52, y: 17, width: 7, height: 7 },
    },
    roleDescription: 'The upper 7 vertebrae (C1–C7) supporting head movement and protecting upper spinal nerve roots.',
  },
  thoracic_spine: {
    id: 'thoracic_spine',
    label: 'Thoracic Spine (Mid-Back)',
    category: 'Spine',
    side: 'center',
    defaultView: 'back',
    coordinates: {
      front: { x: 50, y: 28, width: 7, height: 12 },
      back: { x: 50, y: 28, width: 7, height: 13 },
      side: { x: 54, y: 29, width: 7, height: 13 },
    },
    roleDescription: 'The 12 mid-back vertebrae connected to your rib cage that stabilize the upper torso.',
  },
  lumbar_spine: {
    id: 'lumbar_spine',
    label: 'Lumbar Spine (Lower Back)',
    category: 'Spine',
    side: 'center',
    defaultView: 'back',
    coordinates: {
      front: { x: 50, y: 44, width: 8, height: 8 },
      back: { x: 50, y: 42, width: 8, height: 9 },
      side: { x: 51, y: 42, width: 8, height: 9 },
    },
    roleDescription: 'The 5 sturdy lower back vertebrae (L1–L5) bearing body weight and supporting bending and lifting.',
  },
  spine: {
    id: 'spine',
    label: 'Spinal Column',
    category: 'Spine',
    side: 'center',
    defaultView: 'back',
    coordinates: {
      front: { x: 50, y: 32, width: 7, height: 20 },
      back: { x: 50, y: 30, width: 8, height: 22 },
      side: { x: 53, y: 30, width: 8, height: 22 },
    },
    roleDescription: 'The central skeletal pillar protecting the spinal cord and transmitting nerve signals throughout the body.',
  },

  // --- Chest & Cardiovascular / Respiratory ---
  right_lung: {
    id: 'right_lung',
    label: 'Right Lung (Viewer Left)',
    category: 'Chest & Respiratory',
    side: 'right', // Patient right = viewer left
    defaultView: 'front',
    coordinates: {
      front: { x: 42, y: 27, width: 12, height: 11 },
      back: { x: 58, y: 27, width: 12, height: 11 },
      side: { x: 48, y: 27, width: 14, height: 12 },
    },
    roleDescription: 'The 3-lobed right lung responsible for bringing vital oxygen into the blood and removing carbon dioxide.',
  },
  left_lung: {
    id: 'left_lung',
    label: 'Left Lung (Viewer Right)',
    category: 'Chest & Respiratory',
    side: 'left', // Patient left = viewer right
    defaultView: 'front',
    coordinates: {
      front: { x: 58, y: 27, width: 11, height: 11 },
      back: { x: 42, y: 27, width: 11, height: 11 },
      side: { x: 48, y: 27, width: 13, height: 12 },
    },
    roleDescription: 'The 2-lobed left lung neighboring the heart that facilitates respiration and oxygen transfer.',
  },
  heart: {
    id: 'heart',
    label: 'Heart',
    category: 'Cardiovascular',
    side: 'center',
    defaultView: 'front',
    coordinates: {
      front: { x: 51, y: 27, width: 10, height: 9 },
      back: { x: 49, y: 27, width: 9, height: 8 },
      side: { x: 44, y: 28, width: 10, height: 9 },
    },
    roleDescription: 'The muscular organ pumping oxygen-rich blood through your circulatory system to all organs and tissues.',
  },

  // --- Abdomen & Digestive ---
  liver: {
    id: 'liver',
    label: 'Liver',
    category: 'Abdomen & Digestive',
    side: 'right', // Patient right = viewer left
    defaultView: 'front',
    coordinates: {
      front: { x: 43, y: 35.5, width: 13, height: 8 },
      back: { x: 57, y: 35.5, width: 12, height: 8 },
      side: { x: 43, y: 36, width: 12, height: 8 },
    },
    roleDescription: 'The largest internal organ, filtering toxins from blood, producing bile for digestion, and storing energy.',
  },
  gallbladder: {
    id: 'gallbladder',
    label: 'Gallbladder',
    category: 'Abdomen & Digestive',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 44, y: 37, width: 6, height: 4 },
      back: { x: 56, y: 37, width: 6, height: 4 },
      side: { x: 44, y: 37, width: 6, height: 4 },
    },
    roleDescription: 'A small pear-shaped organ beneath the liver storing bile that aids in fat digestion.',
  },
  stomach: {
    id: 'stomach',
    label: 'Stomach',
    category: 'Abdomen & Digestive',
    side: 'left', // Patient left = viewer right
    defaultView: 'front',
    coordinates: {
      front: { x: 54, y: 36, width: 11, height: 7 },
      back: { x: 46, y: 36, width: 10, height: 7 },
      side: { x: 48, y: 36.5, width: 11, height: 7 },
    },
    roleDescription: 'Muscular sac that breaks down swallowed food using gastric acid and digestive enzymes.',
  },
  pancreas: {
    id: 'pancreas',
    label: 'Pancreas',
    category: 'Abdomen & Endocrine',
    side: 'center',
    defaultView: 'front',
    coordinates: {
      front: { x: 50, y: 37.5, width: 10, height: 4 },
      back: { x: 50, y: 37.5, width: 10, height: 4 },
      side: { x: 49, y: 38, width: 9, height: 4 },
    },
    roleDescription: 'Produces essential insulin to regulate blood sugar, as well as powerful enzymes for nutrient digestion.',
  },
  right_kidney: {
    id: 'right_kidney',
    label: 'Right Kidney',
    category: 'Renal / Urinary',
    side: 'right', // Patient right = viewer left
    defaultView: 'back',
    coordinates: {
      front: { x: 44, y: 40, width: 7, height: 6 },
      back: { x: 56, y: 40, width: 8, height: 7 },
      side: { x: 51, y: 40, width: 7, height: 6 },
    },
    roleDescription: 'Filters waste and excess fluid from blood to produce urine, maintaining body fluid balance.',
  },
  left_kidney: {
    id: 'left_kidney',
    label: 'Left Kidney',
    category: 'Renal / Urinary',
    side: 'left', // Patient left = viewer right
    defaultView: 'back',
    coordinates: {
      front: { x: 56, y: 39, width: 7, height: 6 },
      back: { x: 44, y: 39, width: 8, height: 7 },
      side: { x: 51, y: 39, width: 7, height: 6 },
    },
    roleDescription: 'Pairs with the right kidney in filtering metabolic waste and regulating blood pressure.',
  },
  small_intestine: {
    id: 'small_intestine',
    label: 'Small Intestine',
    category: 'Abdomen & Digestive',
    side: 'center',
    defaultView: 'front',
    coordinates: {
      front: { x: 50, y: 44, width: 14, height: 9 },
      back: { x: 50, y: 44, width: 12, height: 8 },
      side: { x: 46, y: 44, width: 12, height: 9 },
    },
    roleDescription: 'Where the vast majority of chemical digestion and nutrient absorption into the bloodstream occurs.',
  },
  large_intestine: {
    id: 'large_intestine',
    label: 'Large Intestine (Colon)',
    category: 'Abdomen & Digestive',
    side: 'center',
    defaultView: 'front',
    coordinates: {
      front: { x: 50, y: 43, width: 17, height: 11 },
      back: { x: 50, y: 43, width: 16, height: 10 },
      side: { x: 46, y: 43, width: 15, height: 11 },
    },
    roleDescription: 'Absorbs water and electrolytes from indigestible food matter and helps process bodily waste.',
  },
  pelvis: {
    id: 'pelvis',
    label: 'Pelvis & Sacrum',
    category: 'Pelvic & Skeletal',
    side: 'center',
    defaultView: 'front',
    coordinates: {
      front: { x: 50, y: 52, width: 19, height: 9 },
      back: { x: 50, y: 52, width: 19, height: 9 },
      side: { x: 50, y: 52, width: 16, height: 9 },
    },
    roleDescription: 'The basin-shaped ring of bones connecting the spinal column to the legs and shielding pelvic organs.',
  },

  // --- Upper Extremities (Shoulders, Arms, Hands) ---
  right_shoulder: {
    id: 'right_shoulder',
    label: 'Right Shoulder (Viewer Left)',
    category: 'Upper Extremities',
    side: 'right', // Patient right = viewer left
    defaultView: 'front',
    coordinates: {
      front: { x: 34, y: 22, width: 10, height: 8 },
      back: { x: 66, y: 22, width: 10, height: 8 },
      side: { x: 47, y: 22, width: 11, height: 8 },
    },
    roleDescription: 'Ball-and-socket joint (rotator cuff & humerus) giving your right arm extensive 360-degree mobility.',
  },
  left_shoulder: {
    id: 'left_shoulder',
    label: 'Left Shoulder (Viewer Right)',
    category: 'Upper Extremities',
    side: 'left', // Patient left = viewer right
    defaultView: 'front',
    coordinates: {
      front: { x: 66, y: 22, width: 10, height: 8 },
      back: { x: 34, y: 22, width: 10, height: 8 },
      side: { x: 47, y: 22, width: 11, height: 8 },
    },
    roleDescription: 'Ball-and-socket joint of the left shoulder with muscles, tendons, and cartilage enabling arm elevation.',
  },
  right_arm: {
    id: 'right_arm',
    label: 'Right Arm (Upper Arm)',
    category: 'Upper Extremities',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 30, y: 28, width: 8, height: 12 },
      back: { x: 70, y: 28, width: 8, height: 12 },
      side: { x: 46, y: 29, width: 8, height: 12 },
    },
    roleDescription: 'The upper right arm containing the humerus bone, bicep, and tricep muscles for pushing and pulling.',
  },
  left_arm: {
    id: 'left_arm',
    label: 'Left Arm (Upper Arm)',
    category: 'Upper Extremities',
    side: 'left',
    defaultView: 'front',
    coordinates: {
      front: { x: 70, y: 28, width: 8, height: 12 },
      back: { x: 30, y: 28, width: 8, height: 12 },
      side: { x: 46, y: 29, width: 8, height: 12 },
    },
    roleDescription: 'The upper left arm with humeral bone structures and major neuromuscular pathways.',
  },
  right_elbow: {
    id: 'right_elbow',
    label: 'Right Elbow Joint',
    category: 'Upper Extremities',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 27, y: 37, width: 8, height: 6 },
      back: { x: 73, y: 37, width: 8, height: 6 },
      side: { x: 50, y: 38, width: 8, height: 6 },
    },
    roleDescription: 'Hinge joint connecting the upper arm bone to the forearm bones (radius and ulna).',
  },
  left_elbow: {
    id: 'left_elbow',
    label: 'Left Elbow Joint',
    category: 'Upper Extremities',
    side: 'left',
    defaultView: 'front',
    coordinates: {
      front: { x: 73, y: 37, width: 8, height: 6 },
      back: { x: 27, y: 37, width: 8, height: 6 },
      side: { x: 50, y: 38, width: 8, height: 6 },
    },
    roleDescription: 'Left elbow joint supporting flexion, extension, and forearm rotation.',
  },
  right_wrist: {
    id: 'right_wrist',
    label: 'Right Wrist',
    category: 'Upper Extremities',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 23, y: 49, width: 7, height: 5 },
      back: { x: 77, y: 49, width: 7, height: 5 },
      side: { x: 49, y: 50, width: 7, height: 5 },
    },
    roleDescription: 'Complex carpal bone cluster enabling fine hand articulation and finger tendon gliding.',
  },
  left_wrist: {
    id: 'left_wrist',
    label: 'Left Wrist',
    category: 'Upper Extremities',
    side: 'left',
    defaultView: 'front',
    coordinates: {
      front: { x: 77, y: 49, width: 7, height: 5 },
      back: { x: 23, y: 49, width: 7, height: 5 },
      side: { x: 49, y: 50, width: 7, height: 5 },
    },
    roleDescription: 'Left carpal joint supporting delicate gripping, rotation, and hand stability.',
  },
  right_hand: {
    id: 'right_hand',
    label: 'Right Hand & Fingers',
    category: 'Upper Extremities',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 20, y: 53.5, width: 8, height: 8 },
      back: { x: 80, y: 53.5, width: 8, height: 8 },
      side: { x: 48, y: 54, width: 8, height: 8 },
    },
    roleDescription: 'Right metacarpals and phalanges enabling dexterity, grasp, and tactile sensation.',
  },
  left_hand: {
    id: 'left_hand',
    label: 'Left Hand & Fingers',
    category: 'Upper Extremities',
    side: 'left',
    defaultView: 'front',
    coordinates: {
      front: { x: 80, y: 53.5, width: 8, height: 8 },
      back: { x: 20, y: 53.5, width: 8, height: 8 },
      side: { x: 48, y: 54, width: 8, height: 8 },
    },
    roleDescription: 'Left hand bones and joints providing essential grasping and sensory input.',
  },

  // --- Lower Extremities (Hips, Legs, Knees, Feet) ---
  right_hip: {
    id: 'right_hip',
    label: 'Right Hip Joint',
    category: 'Lower Extremities',
    side: 'right', // Patient right = viewer left
    defaultView: 'front',
    coordinates: {
      front: { x: 42, y: 53, width: 9, height: 8 },
      back: { x: 58, y: 53, width: 9, height: 8 },
      side: { x: 51, y: 53, width: 10, height: 8 },
    },
    roleDescription: 'Primary weight-bearing ball-and-socket joint anchoring the right thigh bone into the pelvis.',
  },
  left_hip: {
    id: 'left_hip',
    label: 'Left Hip Joint',
    category: 'Lower Extremities',
    side: 'left', // Patient left = viewer right
    defaultView: 'front',
    coordinates: {
      front: { x: 58, y: 53, width: 9, height: 8 },
      back: { x: 42, y: 53, width: 9, height: 8 },
      side: { x: 51, y: 53, width: 10, height: 8 },
    },
    roleDescription: 'Left hip socket providing foundational support for upright posture, walking, and running.',
  },
  right_thigh: {
    id: 'right_thigh',
    label: 'Right Thigh (Femur)',
    category: 'Lower Extremities',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 43, y: 62, width: 9, height: 12 },
      back: { x: 57, y: 62, width: 9, height: 12 },
      side: { x: 50, y: 62, width: 10, height: 12 },
    },
    roleDescription: 'The strongest bone in the body surrounded by quadriceps and hamstring muscle groups.',
  },
  left_thigh: {
    id: 'left_thigh',
    label: 'Left Thigh (Femur)',
    category: 'Lower Extremities',
    side: 'left',
    defaultView: 'front',
    coordinates: {
      front: { x: 57, y: 62, width: 9, height: 12 },
      back: { x: 43, y: 62, width: 9, height: 12 },
      side: { x: 50, y: 62, width: 10, height: 12 },
    },
    roleDescription: 'Left thigh bone and surrounding muscular network powering leg extension and stability.',
  },
  right_knee: {
    id: 'right_knee',
    label: 'Right Knee Joint (Viewer Left)',
    category: 'Lower Extremities',
    side: 'right', // Patient right = viewer left
    defaultView: 'front',
    coordinates: {
      front: { x: 42.5, y: 70.5, width: 9, height: 7 },
      back: { x: 57.5, y: 70.5, width: 9, height: 7 },
      side: { x: 50, y: 71, width: 9, height: 7 },
    },
    roleDescription: 'Crucial weight-bearing hinge joint containing the patella, meniscus, ACL, and collateral ligaments.',
  },
  left_knee: {
    id: 'left_knee',
    label: 'Left Knee Joint (Viewer Right)',
    category: 'Lower Extremities',
    side: 'left', // Patient left = viewer right
    defaultView: 'front',
    coordinates: {
      front: { x: 57.5, y: 70.5, width: 9, height: 7 },
      back: { x: 42.5, y: 70.5, width: 9, height: 7 },
      side: { x: 50, y: 71, width: 9, height: 7 },
    },
    roleDescription: 'The left knee joint with meniscal shock absorbers, ligaments, and cartilage enabling leg flexion.',
  },
  right_calf: {
    id: 'right_calf',
    label: 'Right Calf & Shin (Tibia/Fibula)',
    category: 'Lower Extremities',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 42, y: 80, width: 8, height: 11 },
      back: { x: 58, y: 80, width: 8, height: 11 },
      side: { x: 50, y: 80, width: 9, height: 11 },
    },
    roleDescription: 'Lower right leg bones supporting weight and transmitting energy through the Achilles tendon.',
  },
  left_calf: {
    id: 'left_calf',
    label: 'Left Calf & Shin (Tibia/Fibula)',
    category: 'Lower Extremities',
    side: 'left',
    defaultView: 'front',
    coordinates: {
      front: { x: 58, y: 80, width: 8, height: 11 },
      back: { x: 42, y: 80, width: 8, height: 11 },
      side: { x: 50, y: 80, width: 9, height: 11 },
    },
    roleDescription: 'Lower left leg muscles and bones essential for propulsion and balance while standing.',
  },
  right_ankle: {
    id: 'right_ankle',
    label: 'Right Ankle',
    category: 'Lower Extremities',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 42, y: 91, width: 7, height: 5 },
      back: { x: 58, y: 91, width: 7, height: 5 },
      side: { x: 49, y: 91, width: 8, height: 5 },
    },
    roleDescription: 'Articulated joint connecting shin bones to the foot, stabilizing step landing and takeoff.',
  },
  left_ankle: {
    id: 'left_ankle',
    label: 'Left Ankle',
    category: 'Lower Extremities',
    side: 'left',
    defaultView: 'front',
    coordinates: {
      front: { x: 58, y: 91, width: 7, height: 5 },
      back: { x: 42, y: 91, width: 7, height: 5 },
      side: { x: 49, y: 91, width: 8, height: 5 },
    },
    roleDescription: 'Left ankle ligaments and talus bone enabling upward and downward foot motion.',
  },
  right_foot: {
    id: 'right_foot',
    label: 'Right Foot & Toes',
    category: 'Lower Extremities',
    side: 'right',
    defaultView: 'front',
    coordinates: {
      front: { x: 41.5, y: 95.5, width: 9, height: 5 },
      back: { x: 58.5, y: 95.5, width: 9, height: 5 },
      side: { x: 46, y: 96, width: 12, height: 4 },
    },
    roleDescription: 'Shock-absorbing arches and tarsal bones providing stability and balance across various terrains.',
  },
  left_foot: {
    id: 'left_foot',
    label: 'Left Foot & Toes',
    category: 'Lower Extremities',
    side: 'left',
    defaultView: 'front',
    coordinates: {
      front: { x: 58.5, y: 95.5, width: 9, height: 5 },
      back: { x: 41.5, y: 95.5, width: 9, height: 5 },
      side: { x: 46, y: 96, width: 12, height: 4 },
    },
    roleDescription: 'Left foot arch and metatarsals supporting body weight distribution and push-off stride.',
  },
};

// Helper function to resolve anatomical region by key or fuzzy text
export function findAnatomicalRegion(keyOrText) {
  if (!keyOrText) return null;
  const normalized = keyOrText.toString().toLowerCase().replace(/[^a-z0-9]/g, '_');
  
  if (anatomicalRegions[normalized]) {
    return anatomicalRegions[normalized];
  }

  // Keyword-based matching
  const text = keyOrText.toString().toLowerCase();
  if (text.includes('right') && text.includes('lung')) return anatomicalRegions.right_lung;
  if (text.includes('left') && text.includes('lung')) return anatomicalRegions.left_lung;
  if (text.includes('lung') || text.includes('pulmonary') || text.includes('respiratory')) return anatomicalRegions.right_lung;
  if (text.includes('cervical') || (text.includes('neck') && text.includes('spine'))) return anatomicalRegions.cervical_spine;
  if (text.includes('lumbar') || text.includes('l4') || text.includes('l5') || text.includes('lower back')) return anatomicalRegions.lumbar_spine;
  if (text.includes('thoracic')) return anatomicalRegions.thoracic_spine;
  if (text.includes('spine') || text.includes('vertebra')) return anatomicalRegions.spine;
  if (text.includes('left') && (text.includes('knee') || text.includes('meniscus') || text.includes('acl'))) return anatomicalRegions.left_knee;
  if (text.includes('right') && (text.includes('knee') || text.includes('meniscus') || text.includes('acl'))) return anatomicalRegions.right_knee;
  if (text.includes('knee')) return anatomicalRegions.left_knee;
  if (text.includes('brain') || text.includes('cerebral') || text.includes('cranial') || text.includes('head')) return anatomicalRegions.brain;
  if (text.includes('liver') || text.includes('hepatic')) return anatomicalRegions.liver;
  if (text.includes('gallbladder')) return anatomicalRegions.gallbladder;
  if (text.includes('stomach') || text.includes('gastric')) return anatomicalRegions.stomach;
  if (text.includes('pancreas') || text.includes('pancreatic')) return anatomicalRegions.pancreas;
  if (text.includes('right') && text.includes('kidney')) return anatomicalRegions.right_kidney;
  if (text.includes('left') && text.includes('kidney')) return anatomicalRegions.left_kidney;
  if (text.includes('kidney') || text.includes('renal')) return anatomicalRegions.right_kidney;
  if (text.includes('heart') || text.includes('cardiac')) return anatomicalRegions.heart;
  if (text.includes('pelvis') || text.includes('pelvic')) return anatomicalRegions.pelvis;
  if (text.includes('right') && text.includes('shoulder')) return anatomicalRegions.right_shoulder;
  if (text.includes('left') && text.includes('shoulder')) return anatomicalRegions.left_shoulder;
  if (text.includes('shoulder') || text.includes('rotator')) return anatomicalRegions.right_shoulder;
  if (text.includes('hip')) return text.includes('left') ? anatomicalRegions.left_hip : anatomicalRegions.right_hip;
  if (text.includes('ankle')) return text.includes('left') ? anatomicalRegions.left_ankle : anatomicalRegions.right_ankle;
  if (text.includes('elbow')) return text.includes('left') ? anatomicalRegions.left_elbow : anatomicalRegions.right_elbow;
  if (text.includes('wrist')) return text.includes('left') ? anatomicalRegions.left_wrist : anatomicalRegions.right_wrist;

  return null;
}

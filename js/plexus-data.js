/**
 * Brachial Plexus Electrodiagnostic & Clinical Anatomy Database
 * References:
 * 1. Preston & Shapiro: Electromyography and Neuromuscular Disorders (4th Ed. 2020)
 * 2. Perotto: Anatomical Guide for the Electromyographer (5th Ed. 2011)
 * 3. Donald A. Neumann: Kinesiology of the Musculoskeletal System - Appendix II Part B
 * 4. McLean EMG Guide (2019) & Easy EMG (Weiss, 2022)
 */

const PLEXUS_DATA = {
  "segments": {
    "roots": [
      {
        "id": "root-c5",
        "name": "C5 Root",
        "level": "Root",
        "roots": [
          "C5"
        ],
        "desc": "Exits above C5 vertebra through interscalene triangle. Primary contributor to Upper Trunk.",
        "branches": [
          "dorsal-scapular",
          "long-thoracic-c5",
          "phrenic-c5"
        ]
      },
      {
        "id": "root-c6",
        "name": "C6 Root",
        "level": "Root",
        "roots": [
          "C6"
        ],
        "desc": "Exits above C6 vertebra through interscalene triangle. Joins C5 to form Upper Trunk.",
        "branches": [
          "long-thoracic-c6"
        ]
      },
      {
        "id": "root-c7",
        "name": "C7 Root",
        "level": "Root",
        "roots": [
          "C7"
        ],
        "desc": "Exits above C7 vertebra through interscalene triangle. Directly continues as Middle Trunk.",
        "branches": [
          "long-thoracic-c7"
        ]
      },
      {
        "id": "root-c8",
        "name": "C8 Root",
        "level": "Root",
        "roots": [
          "C8"
        ],
        "desc": "Exits above T1 vertebra through interscalene triangle. Joins T1 to form Lower Trunk.",
        "branches": []
      },
      {
        "id": "root-t1",
        "name": "T1 Root",
        "level": "Root",
        "roots": [
          "T1"
        ],
        "desc": "Exits below T1 vertebra. Joins C8 to form Lower Trunk. Closely related to sympathetic chain (stellate ganglion).",
        "branches": [
          "intercostal-t1"
        ]
      }
    ],
    "trunks": [
      {
        "id": "trunk-upper",
        "name": "Superior (Upper) Trunk",
        "level": "Trunk",
        "roots": [
          "C5",
          "C6"
        ],
        "desc": "Formed by union of C5 & C6 roots. Crosses posterior triangle of neck over 1st rib. Site of Erb's point.",
        "branches": [
          "suprascapular",
          "subclavius"
        ],
        "muscles": [
          "Supraspinatus",
          "Infraspinatus",
          "Subclavius",
          "Biceps Brachii",
          "Brachialis",
          "Deltoid",
          "Teres Minor",
          "Brachioradialis",
          "ECRL/ECRB",
          "Supinator"
        ]
      },
      {
        "id": "trunk-middle",
        "name": "Middle Trunk",
        "level": "Trunk",
        "roots": [
          "C7"
        ],
        "desc": "Direct continuation of C7 root. Crosses posterior triangle of neck over 1st rib. Gives off NO collateral branches.",
        "branches": [],
        "muscles": [
          "Triceps Brachii",
          "Extensor Digitorum Communis",
          "Extensor Indicis Proprius",
          "Extensor Carpi Ulnaris",
          "Pronator Teres",
          "Flexor Carpi Radialis",
          "Latissimus Dorsi"
        ]
      },
      {
        "id": "trunk-lower",
        "name": "Inferior (Lower) Trunk",
        "level": "Trunk",
        "roots": [
          "C8",
          "T1"
        ],
        "desc": "Formed by union of C8 & T1 roots. Lies on 1st rib directly behind subclavian artery. Vulnerable in Neurogenic TOS and Pancoast tumor. No collateral branches.",
        "branches": [],
        "muscles": [
          "Abductor Pollicis Brevis",
          "Flexor Pollicis Longus",
          "FDP I-IV",
          "Flexor Carpi Ulnaris",
          "Abductor Digiti Minimi",
          "First Dorsal Interosseous (FDI)",
          "All Interossei",
          "Extensor Indicis (Radial C8 fibers)"
        ]
      }
    ],
    "divisions": [
      {
        "id": "div-upper-ant",
        "name": "Upper Anterior Division",
        "level": "Division",
        "type": "Anterior",
        "roots": [
          "C5",
          "C6"
        ],
        "desc": "Directs flexor fibers from Upper Trunk into Lateral Cord.",
        "branches": []
      },
      {
        "id": "div-upper-post",
        "name": "Upper Posterior Division",
        "level": "Division",
        "type": "Posterior",
        "roots": [
          "C5",
          "C6"
        ],
        "desc": "Directs extensor fibers from Upper Trunk into Posterior Cord.",
        "branches": []
      },
      {
        "id": "div-mid-ant",
        "name": "Middle Anterior Division",
        "level": "Division",
        "type": "Anterior",
        "roots": [
          "C7"
        ],
        "desc": "Directs flexor fibers from Middle Trunk into Lateral Cord.",
        "branches": []
      },
      {
        "id": "div-mid-post",
        "name": "Middle Posterior Division",
        "level": "Division",
        "type": "Posterior",
        "roots": [
          "C7"
        ],
        "desc": "Directs extensor fibers from Middle Trunk into Posterior Cord.",
        "branches": []
      },
      {
        "id": "div-lower-ant",
        "name": "Lower Anterior Division",
        "level": "Division",
        "type": "Anterior",
        "roots": [
          "C8",
          "T1"
        ],
        "desc": "Directs flexor fibers from Lower Trunk into Medial Cord.",
        "branches": []
      },
      {
        "id": "div-lower-post",
        "name": "Lower Posterior Division",
        "level": "Division",
        "type": "Posterior",
        "roots": [
          "C8",
          "T1"
        ],
        "desc": "Directs extensor fibers from Lower Trunk into Posterior Cord.",
        "branches": []
      }
    ],
    "cords": [
      {
        "id": "cord-lateral",
        "name": "Lateral Cord",
        "level": "Cord",
        "roots": [
          "C5",
          "C6",
          "C7"
        ],
        "desc": "Formed by anterior divisions of Upper and Middle trunks. Located lateral to 2nd part of axillary artery under pectoralis minor.",
        "branches": [
          "lateral-pectoral"
        ],
        "muscles": [
          "Pectoralis Major (Clavicular Head)",
          "Coracobrachialis",
          "Biceps Brachii",
          "Brachialis",
          "Pronator Teres (via Lateral root of Median)",
          "Flexor Carpi Radialis (via Lateral root)"
        ]
      },
      {
        "id": "cord-posterior",
        "name": "Posterior Cord",
        "level": "Cord",
        "roots": [
          "C5",
          "C6",
          "C7",
          "C8",
          "T1"
        ],
        "desc": "Formed by posterior divisions of ALL three trunks. Located posterior to 2nd part of axillary artery.",
        "branches": [
          "upper-subscapular",
          "thoracodorsal",
          "lower-subscapular"
        ],
        "muscles": [
          "Subscapularis (Upper & Lower)",
          "Latissimus Dorsi",
          "Teres Major",
          "Deltoid",
          "Teres Minor",
          "Triceps Brachii",
          "Brachioradialis",
          "All Radial Extensors (EDC, EIP, ECU, EPL, etc.)"
        ]
      },
      {
        "id": "cord-medial",
        "name": "Medial Cord",
        "level": "Cord",
        "roots": [
          "C8",
          "T1"
        ],
        "desc": "Continuation of anterior division of Lower Trunk. Located medial to 2nd part of axillary artery.",
        "branches": [
          "medial-pectoral",
          "med-cut-arm",
          "med-cut-forearm"
        ],
        "muscles": [
          "Pectoralis Minor",
          "Pectoralis Major (Sternocostal Head)",
          "Flexor Carpi Ulnaris",
          "FDP III & IV",
          "All Hypothenars (ADM, ODM, FDM)",
          "All Interossei & Lumbricals 3-4",
          "Thenar Muscles (via Medial root of Median: APB, OP, FPB, AIN)"
        ]
      }
    ],
    "terminals": [
      {
        "id": "term-musculocutaneous",
        "name": "Musculocutaneous Nerve",
        "level": "Terminal Branch",
        "roots": [
          "C5",
          "C6",
          "C7"
        ],
        "cord": "Lateral Cord",
        "desc": "Terminal branch of Lateral Cord. Pierces coracobrachialis. Innervates anterior arm flexors and terminates as LAC sensory nerve.",
        "muscles": [
          "Coracobrachialis",
          "Biceps Brachii",
          "Brachialis"
        ]
      },
      {
        "id": "term-axillary",
        "name": "Axillary Nerve",
        "level": "Terminal Branch",
        "roots": [
          "C5",
          "C6"
        ],
        "cord": "Posterior Cord",
        "desc": "Passes through quadrangular space with posterior circumflex humeral artery. Innervates deltoid & teres minor.",
        "muscles": [
          "Deltoid (Anterior, Middle, Posterior)",
          "Teres Minor"
        ]
      },
      {
        "id": "term-radial",
        "name": "Radial Nerve",
        "level": "Terminal Branch",
        "roots": [
          "C5",
          "C6",
          "C7",
          "C8",
          "T1"
        ],
        "cord": "Posterior Cord",
        "desc": "Largest terminal branch of posterior cord. Traverses triangular interval and spirals around humerus in radial groove.",
        "muscles": [
          "Triceps Brachii",
          "Anconeus",
          "Brachioradialis",
          "Extensor Carpi Radialis Longus & Brevis",
          "Supinator",
          "Extensor Digitorum Communis",
          "Extensor Digiti Minimi",
          "Extensor Carpi Ulnaris",
          "Abductor Pollicis Longus",
          "Extensor Pollicis Brevis",
          "Extensor Pollicis Longus",
          "Extensor Indicis (Proprius)"
        ]
      },
      {
        "id": "term-median",
        "name": "Median Nerve",
        "level": "Terminal Branch",
        "roots": [
          "C5",
          "C6",
          "C7",
          "C8",
          "T1"
        ],
        "cord": "Lateral & Medial Cords",
        "desc": "Formed by union of Lateral Root (C5-C7) and Medial Root (C8-T1) anterior to 3rd part of axillary artery ('M' shape).",
        "muscles": [
          "Pronator Teres",
          "Flexor Carpi Radialis",
          "Palmaris Longus",
          "Flexor Digitorum Superficialis",
          "Flexor Digitorum Profundus I & II (AIN)",
          "Flexor Pollicis Longus (AIN)",
          "Pronator Quadratus (AIN)",
          "Abductor Pollicis Brevis",
          "Opponens Pollicis",
          "Flexor Pollicis Brevis",
          "Lumbricals I & II"
        ]
      },
      {
        "id": "term-ulnar",
        "name": "Ulnar Nerve",
        "level": "Terminal Branch",
        "roots": [
          "C8",
          "T1"
        ],
        "cord": "Medial Cord",
        "desc": "Direct terminal branch of Medial Cord. Descends medial arm, passes retroepicondylar groove into cubital tunnel.",
        "muscles": [
          "Flexor Carpi Ulnaris",
          "Flexor Digitorum Profundus III & IV",
          "Palmaris Brevis",
          "Abductor Digiti Minimi",
          "Opponens Digiti Minimi",
          "Flexor Digiti Minimi Brevis",
          "Palmar Interossei (PAD)",
          "Dorsal Interossei (FDI, DAB)",
          "Lumbricals III & IV",
          "Adductor Pollicis"
        ]
      }
    ]
  },
  "collateralBranches": [
    {
      "id": "dorsal-scapular",
      "name": "Dorsal Scapular Nerve",
      "origin": "C5 Root",
      "roots": [
        "C5"
      ],
      "muscles": [
        "Rhomboid Major",
        "Rhomboid Minor",
        "Levator Scapulae"
      ],
      "clinical": "Spared in Upper Trunk plexopathy; denervated in C5 pre-ganglionic root avulsion. Vital PM&R needle EMG landmark.",
      "landmark": "Pierces scalenus medius muscle, descends deep to levator scapulae along vertebral border of scapula."
    },
    {
      "id": "long-thoracic",
      "name": "Long Thoracic Nerve (Nerve of Bell)",
      "origin": "C5, C6, C7 Roots",
      "roots": [
        "C5",
        "C6",
        "C7"
      ],
      "muscles": [
        "Serratus Anterior"
      ],
      "clinical": "Injury leads to classic medial scapular winging (scapula flips medially upon pushing against a wall). Normal in postganglionic plexopathy.",
      "landmark": "Formed by rootlets from C5, C6, C7 on anterior surface of scalenus medius, descends along mid-axillary line on ribs."
    },
    {
      "id": "suprascapular",
      "name": "Suprascapular Nerve",
      "origin": "Superior (Upper) Trunk",
      "roots": [
        "C5",
        "C6"
      ],
      "muscles": [
        "Supraspinatus",
        "Infraspinatus"
      ],
      "clinical": "Involved in Upper Trunk plexopathy, Parsonage-Turner syndrome, and entrapment at suprascapular or spinoglenoid notch.",
      "landmark": "Passes through scapular notch beneath superior transverse scapular ligament ('Navy goes under bridge, Army goes over' - artery over, nerve under)."
    },
    {
      "id": "subclavius",
      "name": "Nerve to Subclavius",
      "origin": "Superior (Upper) Trunk",
      "roots": [
        "C5",
        "C6"
      ],
      "muscles": [
        "Subclavius"
      ],
      "clinical": "Provides accessory phrenic nerve fibers in ~20-30% of population.",
      "landmark": "Descends over subclavian vessels to enter postero-superior aspect of subclavius muscle."
    },
    {
      "id": "lateral-pectoral",
      "name": "Lateral Pectoral Nerve",
      "origin": "Lateral Cord",
      "roots": [
        "C5",
        "C6",
        "C7"
      ],
      "muscles": [
        "Pectoralis Major (Clavicular Head)"
      ],
      "clinical": "Crosses anterior to axillary artery, pierces clavipectoral fascia, communicates with medial pectoral nerve forming ansa pectoralis.",
      "landmark": "Runs medially across 1st/2nd parts of axillary artery, pierces clavipectoral fascia with thoracoacromial artery."
    },
    {
      "id": "upper-subscapular",
      "name": "Upper Subscapular Nerve",
      "origin": "Posterior Cord",
      "roots": [
        "C5",
        "C6"
      ],
      "muscles": [
        "Subscapularis (Upper Fibers)"
      ],
      "clinical": "Isolated injury is rare; involved in posterior cord lesions causing internal rotation weakness of shoulder.",
      "landmark": "Short nerve emerging high from posterior cord entering upper portion of subscapularis muscle."
    },
    {
      "id": "thoracodorsal",
      "name": "Thoracodorsal (Middle Subscapular) Nerve",
      "origin": "Posterior Cord",
      "roots": [
        "C6",
        "C7",
        "C8"
      ],
      "muscles": [
        "Latissimus Dorsi"
      ],
      "clinical": "Essential for shoulder adduction, extension, internal rotation, and cough. Tested in posterior cord localization.",
      "landmark": "Runs along posterior axillary wall with thoracodorsal artery into the medial surface of latissimus dorsi."
    },
    {
      "id": "lower-subscapular",
      "name": "Lower Subscapular Nerve",
      "origin": "Posterior Cord",
      "roots": [
        "C5",
        "C6"
      ],
      "muscles": [
        "Subscapularis (Lower Fibers)",
        "Teres Major"
      ],
      "clinical": "Innervates inferior subscapularis and teres major; involved in posterior cord injury.",
      "landmark": "Descends along subscapularis, sending branches to its lower half and to teres major."
    },
    {
      "id": "medial-pectoral",
      "name": "Medial Pectoral Nerve",
      "origin": "Medial Cord",
      "roots": [
        "C8",
        "T1"
      ],
      "muscles": [
        "Pectoralis Minor",
        "Pectoralis Major (Sternocostal Head)"
      ],
      "clinical": "Passes between axillary artery and vein, pierces pectoralis minor to reach pectoralis major.",
      "landmark": "Courses through pectoralis minor muscle to supply both pec minor and lower sternal fibers of pec major."
    },
    {
      "id": "med-cut-arm",
      "name": "Medial Cutaneous Nerve of Arm (Medial Brachial)",
      "origin": "Medial Cord",
      "roots": [
        "T1"
      ],
      "muscles": [],
      "clinical": "Pure sensory nerve. Communicates with intercostobrachial nerve (T2) supplying medial distal arm skin.",
      "landmark": "Descends medial side of axillary and brachial veins, pierces deep fascia at mid-arm.",
      "isSensory": true
    },
    {
      "id": "med-cut-forearm",
      "name": "Medial Cutaneous Nerve of Forearm (MABC)",
      "origin": "Medial Cord / Lower Trunk",
      "roots": [
        "C8",
        "T1"
      ],
      "muscles": [],
      "clinical": "CRITICAL PM&R NCS LANDMARK: Absent or reduced in True Neurogenic TOS and Lower Trunk/Medial Cord plexopathies, but NORMAL in Ulnar neuropathy at the elbow!",
      "landmark": "Passes medial to brachial artery, pierces deep fascia with basilic vein at lower third of arm.",
      "isSensory": true
    }
  ],
  "muscles": [
    {
      "name": "Serratus Anterior",
      "nerve": "Long Thoracic Nerve",
      "roots": "C5, C6, C7 (major), C8 (minor)",
      "trunk": "Root level (pre-plexus)",
      "cord": "Root branch",
      "action": "Scapular protraction and upward rotation; stabilizes scapula against thoracic cage.",
      "mmt": "Supine or sitting with arm flexed to 90 degrees; patient punches forward against resistance.",
      "perottoLandmark": "Mid-axillary line over the 5th or 6th rib, just lateral to inferior angle of scapula, directly on rib outer surface.",
      "danger": "HIGH PNEUMOTHORAX RISK: Always angle needle tangentially onto the flat surface of the rib; never insert into intercostal spaces.",
      "pmrPearls": "Direct root branch. Denervated in pre-ganglionic root avulsion and isolated Long Thoracic neuropathy (carrying heavy backpack). Spared in post-ganglionic brachial plexopathy. Produces medial scapular winging."
    },
    {
      "name": "Rhomboids (Major & Minor)",
      "nerve": "Dorsal Scapular Nerve",
      "roots": "C5 (major), C4 (minor)",
      "trunk": "Root level (pre-plexus)",
      "cord": "Root branch",
      "action": "Scapular retraction, elevation, and downward rotation of the glenoid cavity.",
      "mmt": "Prone, arm internally rotated with dorsum of hand resting on lumbar spine; patient lifts hand off back against downward resistance.",
      "perottoLandmark": "Midway between spine and inferior angle of scapula, 1-2 cm medial to the vertebral border. Electrode traverses middle trapezius.",
      "danger": "Pneumothorax: Insert needle obliquely toward scapula or tangentially over thoracic cage; avoid perpendicular plunges.",
      "pmrPearls": "⭐ Gold standard C5 preganglionic root test. Spared in Upper Trunk plexopathy (Erb-Duchenne); denervated in preganglionic C5 root avulsion (SNAP normal)."
    },
    {
      "name": "Subclavius",
      "nerve": "Nerve to Subclavius",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Trunk branch",
      "action": "Depresses and stabilizes clavicle in sternoclavicular joint during shoulder movement.",
      "mmt": "Depress clavicle and pull shoulder downward against upward resistance.",
      "perottoLandmark": "Inferior surface of clavicle at junction of medial and middle thirds (infrequently sampled in routine clinical practice).",
      "danger": "Subclavian vessels puncture, apical pleura pneumothorax.",
      "pmrPearls": "Direct branch from upper trunk. May carry accessory phrenic nerve fibers (20-30% of population)."
    },
    {
      "name": "Supraspinatus",
      "nerve": "Suprascapular Nerve",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Trunk branch",
      "action": "Initiation of shoulder abduction (first 15 degrees) and humeral head stabilization in glenoid.",
      "mmt": "Seated, arm abducted 15-30 degrees in scapular plane with thumb pointed downward ('empty can' position).",
      "perottoLandmark": "Supraspinous fossa, 2 cm above midpoint of scapular spine, directed slightly anteriorly toward bone floor.",
      "danger": "Apical pneumothorax: Traverses trapezius; stop upon contacting the bone floor of the supraspinous fossa.",
      "pmrPearls": "Hallmark Upper Trunk muscle. Normal in C5 root avulsion (pre-ganglionic paradox), abnormal in Upper Trunk plexopathy and suprascapular notch entrapment."
    },
    {
      "name": "Infraspinatus",
      "nerve": "Suprascapular Nerve",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Trunk branch",
      "action": "External rotation of the humerus at the glenohumeral joint.",
      "mmt": "Elbow at 90 degrees, forearm neutral; externally rotates against resistance applied at distal forearm.",
      "perottoLandmark": "Infraspinous fossa, 2-3 cm below the spine of the scapula, midway between acromion and vertebral border.",
      "danger": "Stop at bone floor of scapular blade; avoid going too far laterally into the posterior glenohumeral capsule.",
      "pmrPearls": "⭐ Spinoglenoid notch cyst (ganglion cyst) selectively denervates Infraspinatus while sparing Supraspinatus! Suprascapular notch entrapment involves both."
    },
    {
      "name": "Subscapularis",
      "nerve": "Upper & Lower Subscapular Nerves",
      "roots": "C5, C6, C7 (major)",
      "trunk": "Upper & Middle Trunks",
      "cord": "Posterior Cord",
      "action": "Powerful internal rotation and adduction of the humerus.",
      "mmt": "Lift-off test (dorsum of hand on lumbar spine, lift off posterior wall) or Belly-press test.",
      "perottoLandmark": "Patient supine, arm abducted; needle inserted along lateral axillary border of scapula, slipping onto the anterior concave surface of the scapula.",
      "danger": "Axillary vessels and plexus cords lie medial/anterior. Needle must hug anterior scapular bone plate strictly.",
      "pmrPearls": "Dual innervation from Upper and Lower subscapular branches of Posterior Cord."
    },
    {
      "name": "Latissimus Dorsi",
      "nerve": "Thoracodorsal (Middle Subscapular) Nerve",
      "roots": "C7, C8 (major), C6 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Shoulder adduction, extension, internal rotation, and cough facilitation.",
      "mmt": "Prone, arm extended and adducted with palm up; patient lifts arm upward and medially against downward pressure.",
      "perottoLandmark": "Posterior axillary fold, grasp anterior edge of muscle belly at mid-chest level; insert needle parallel to thoracic wall.",
      "danger": "Pneumothorax if directed deeply medially; keep needle strictly within the grasped posterior axillary fold.",
      "pmrPearls": "Key muscle for Posterior Cord / C7-C8 myotome. Spared in isolated radial and axillary neuropathies; abnormal in posterior cord plexopathy."
    },
    {
      "name": "Teres Major",
      "nerve": "Lower Subscapular Nerve",
      "roots": "C6, C7 (major), C5 (minor)",
      "trunk": "Upper & Middle Trunks",
      "cord": "Posterior Cord",
      "action": "Shoulder internal rotation, adduction, and extension.",
      "mmt": "Prone, arm adducted behind back; lift elbow upwards against downward pressure.",
      "perottoLandmark": "Lateral border of scapula, inferior third, palpate muscle belly just superior to latissimus dorsi tendon.",
      "danger": "Axillary neurovascular structures lie deep and medially; grasp muscle belly between thumb and fingers.",
      "pmrPearls": "Differentiates Lower Subscapular (Teres major + lower subscapularis) from Upper Subscapular (only upper subscapularis)."
    },
    {
      "name": "Pectoralis Major (Clavicular Head)",
      "nerve": "Lateral Pectoral Nerve",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Lateral Cord",
      "action": "Shoulder flexion and horizontal adduction.",
      "mmt": "Supine, arm abducted 90 degrees; horizontally adduct arm toward opposite shoulder against resistance.",
      "perottoLandmark": "Inferior to medial half of clavicle, mid-belly of clavicular portion.",
      "danger": "Pneumothorax: Insert needle tangentially over clavicle or 1st/2nd rib; never perpendicular to intercostal space.",
      "pmrPearls": "Supplied purely by Lateral Pectoral Nerve (C5, C6) from Lateral Cord. Spared in Lower Trunk / Medial Cord lesions."
    },
    {
      "name": "Pectoralis Major (Sternocostal Head)",
      "nerve": "Medial & Lateral Pectoral Nerves (Ansa Pectoralis)",
      "roots": "C7, C8 (major), C6, T1 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Medial & Lateral Cords",
      "action": "Shoulder adduction, internal rotation, and downward depression of shoulder girdle.",
      "mmt": "Supine, arm abducted 90 degrees; horizontally adduct arm toward opposite iliac crest against resistance.",
      "perottoLandmark": "Anterior axillary fold, inferior border of pectoralis major over anterior ribs.",
      "danger": "Pneumothorax: Grasp anterior axillary fold between fingers; insert needle parallel to chest wall.",
      "pmrPearls": "Cross-innervated via ansa pectoralis. Critical for evaluating Lower Trunk and Medial Cord plexopathies."
    },
    {
      "name": "Pectoralis Minor",
      "nerve": "Medial Pectoral Nerve",
      "roots": "C7, C8, T1 (major)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Medial Cord",
      "action": "Depression and anterior tilt of scapula; elevates ribs during forced inspiration.",
      "mmt": "Supine, shoulder pushed anteriorly off table against downward resistance.",
      "perottoLandmark": "Deep to pectoralis major, inferior to coracoid process over 3rd to 5th ribs.",
      "danger": "Apical pneumothorax and axillary vessel puncture.",
      "pmrPearls": "Key surgical landmark: divides axillary artery into 3 parts. Pierced by medial pectoral nerve."
    },
    {
      "name": "Teres Minor",
      "nerve": "Axillary Nerve",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Posterior Cord",
      "action": "Shoulder external rotation and weak adduction.",
      "mmt": "Prone, arm abducted 90 degrees, elbow flexed 90 degrees; external rotation against resistance at wrist.",
      "perottoLandmark": "Midway between acromion and inferior angle of scapula along lateral border, deep to posterior deltoid.",
      "danger": "Low risk; superficial to inferior border of infraspinatus.",
      "pmrPearls": "Quadrangular space syndrome: selectively compresses axillary nerve branch to teres minor (isolated fatty atrophy on MRI)."
    },
    {
      "name": "Deltoid (Anterior, Middle, Posterior)",
      "nerve": "Axillary Nerve",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Posterior Cord",
      "action": "Shoulder abduction (middle head), flexion (anterior head), extension (posterior head).",
      "mmt": "Seated, arm abducted to 90 degrees with neutral rotation against downward force at elbow.",
      "perottoLandmark": "Middle head: 3-5 cm inferior to lateral margin of acromion on lateral arm.",
      "danger": "Low risk. Avoid hitting humeral bone shaft.",
      "pmrPearls": "C5/C6 marker muscle. Differentiates Axillary Neuropathy (Deltoid abnormal, Biceps normal) from Upper Trunk lesion (both abnormal)."
    },
    {
      "name": "Coracobrachialis",
      "nerve": "Musculocutaneous Nerve",
      "roots": "C5, C6, C7 (major)",
      "trunk": "Upper & Middle Trunks",
      "cord": "Lateral Cord",
      "action": "Shoulder flexion and adduction.",
      "mmt": "Arm abducted to 90 degrees with slight internal rotation; flex and adduct against resistance.",
      "perottoLandmark": "Proximal third of medial arm, deep in axilla, posterior to short head of biceps and anterior to neurovascular bundle.",
      "danger": "Brachial artery and median/ulnar nerves lie immediately posterior/medial.",
      "pmrPearls": "Pierced by Musculocutaneous nerve. Entrapment can occur at coracobrachialis muscle entry point."
    },
    {
      "name": "Biceps Brachii",
      "nerve": "Musculocutaneous Nerve",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Lateral Cord",
      "action": "Forearm supination and elbow flexion (strongest supinator with flexed elbow).",
      "mmt": "Elbow flexed to 90 degrees, forearm supinated against extension resistance.",
      "perottoLandmark": "Mid-belly of anterior arm, 3 fingerbreadths above antecubital crease.",
      "danger": "Medially lies brachial artery and median nerve. Stay in muscle belly center.",
      "pmrPearls": "Together with Deltoid and Infraspinatus forms the hallmark 'Upper Trunk triad'. Biceps reflex evaluates C5/C6."
    },
    {
      "name": "Brachialis",
      "nerve": "Musculocutaneous Nerve (& small lateral slip from Radial)",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Lateral Cord (& Posterior Cord)",
      "action": "Pure elbow flexion in all forearm positions (pronated, neutral, or supinated).",
      "mmt": "Elbow flexed to 90 degrees with forearm fully pronated against extension resistance.",
      "perottoLandmark": "Lower third of arm, lateral to biceps tendon, 2-3 cm above lateral epicondyle.",
      "danger": "Radial nerve descends along lateral border; stay on anterior humeral shaft.",
      "pmrPearls": "Workhorse elbow flexor. Dual innervation from Musculocutaneous and Radial nerves."
    },
    {
      "name": "Triceps Brachii (Long, Lateral, Medial)",
      "nerve": "Radial Nerve (main trunk)",
      "roots": "C7, C8 (major), C6, T1 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Elbow extension; long head assists shoulder adduction and extension.",
      "mmt": "Prone or supine, arm abducted 90 degrees, elbow flexed 90 degrees; extend elbow against resistance.",
      "perottoLandmark": "Lateral head: upper posterolateral arm. Long head: medial posterior arm 4-5 cm below posterior axillary fold. Medial head: distal posterior arm above olecranon.",
      "danger": "Radial nerve in spiral groove between lateral and medial heads.",
      "pmrPearls": "⭐ CRUCIAL PM&R DISCRIMINATOR: Branches branch off in the axilla/proximal arm BEFORE the spiral groove. In Radial Neuropathy at the spiral groove ('Saturday Night Palsy'), Triceps is SPARED! In Posterior Cord lesion, Triceps is DENERVATED!"
    },
    {
      "name": "Anconeus",
      "nerve": "Radial Nerve",
      "roots": "C7, C8 (major)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Assists elbow extension; stabilizes humeroulnar joint during pronation/supination.",
      "mmt": "Terminal elbow extension with forearm pronated.",
      "perottoLandmark": "Triangle between lateral epicondyle, olecranon, and posterior border of ulna.",
      "danger": "Low risk; superficial subcutaneous belly.",
      "pmrPearls": "Innervated by long branch from radial nerve descending through medial head of triceps. Spared in PIN lesions."
    },
    {
      "name": "Brachioradialis",
      "nerve": "Radial Nerve (main trunk above elbow)",
      "roots": "C5, C6 (major)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Posterior Cord",
      "action": "Elbow flexion in neutral midposition ('beer drinking' muscle).",
      "mmt": "Elbow flexed at 90 degrees, forearm in neutral midposition; flex elbow against downward resistance.",
      "perottoLandmark": "Upper anterolateral forearm, 3-4 cm distal to lateral epicondyle.",
      "danger": "Radial recurrent artery; superficial radial nerve.",
      "pmrPearls": "⭐ Branches from main radial nerve ABOVE the elbow. Spared in PIN syndrome! Involved in spiral groove and high radial lesions. Brachioradialis reflex tests C6."
    },
    {
      "name": "Extensor Carpi Radialis Longus & Brevis (ECRL & ECRB)",
      "nerve": "Radial Nerve (ECRL before elbow, ECRB at/below elbow or PIN)",
      "roots": "C6, C7 (major), C5, C8 (minor)",
      "trunk": "Upper & Middle Trunks",
      "cord": "Posterior Cord",
      "action": "Wrist extension and radial deviation.",
      "mmt": "Forearm pronated; extend wrist toward radial side against flexion/ulnar deviation force.",
      "perottoLandmark": "2-3 cm distal to lateral epicondyle along lateral forearm border (ECRL); slightly distal and dorsal for ECRB.",
      "danger": "Superficial radial sensory nerve beneath brachioradialis.",
      "pmrPearls": "⭐ In PIN syndrome, ECRL is SPARED (originates proximal to Arcade of Frohse), while EDC/ECU are paralyzed. Patient extends wrist with marked RADIAL DEVIATION!"
    },
    {
      "name": "Supinator",
      "nerve": "Posterior Interosseous Nerve (PIN)",
      "roots": "C6 (major), C5 (minor)",
      "trunk": "Superior (Upper) Trunk",
      "cord": "Posterior Cord",
      "action": "Forearm supination with elbow fully extended.",
      "mmt": "Supinate forearm from full pronation with elbow fully extended to eliminate biceps.",
      "perottoLandmark": "4 cm distal to lateral epicondyle, deep to extensor digitorum communis, angled onto radius.",
      "danger": "PIN traverses through the substance of supinator between superficial and deep heads (Arcade of Frohse).",
      "pmrPearls": "Arcade of Frohse is the primary compression site for Posterior Interosseous Nerve (PIN) syndrome."
    },
    {
      "name": "Extensor Digitorum Communis (EDC)",
      "nerve": "Posterior Interosseous Nerve (PIN)",
      "roots": "C7, C8 (major), C6 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Extension of digits 2-5 at MCP joints.",
      "mmt": "Extend MCP joints of digits 2-5 with PIP/DIP joints flexed against downward pressure.",
      "perottoLandmark": "Posterior forearm, midpoint of line between lateral epicondyle and ulnar styloid.",
      "danger": "Low risk; superficial extensor belly.",
      "pmrPearls": "Hallmark muscle for C7 radiculopathy and PIN syndrome. Paralysis produces 'finger drop'."
    },
    {
      "name": "Extensor Digiti Minimi (EDM)",
      "nerve": "Posterior Interosseous Nerve (PIN)",
      "roots": "C7, C8 (major), C6 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Independent extension of 5th digit (little finger) at MCP joint.",
      "mmt": "Extend 5th digit at MCP joint while keeping digits 2-4 flexed.",
      "perottoLandmark": "Posterior forearm, just medial to extensor digitorum communis in distal third.",
      "danger": "Low risk.",
      "pmrPearls": "Allows independent extension of little finger ('tea drinking' sign)."
    },
    {
      "name": "Extensor Carpi Ulnaris (ECU)",
      "nerve": "Posterior Interosseous Nerve (PIN)",
      "roots": "C7, C8 (major), C6 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Wrist extension and ulnar deviation.",
      "mmt": "Forearm pronated; extend and ulnar deviate wrist against resistance.",
      "perottoLandmark": "Dorsal forearm, midpoint of posterior border of ulna, just lateral to ulnar crest.",
      "danger": "Low risk.",
      "pmrPearls": "Paralysis in PIN lesions causes wrist extension with radial deviation (unopposed ECRL action)."
    },
    {
      "name": "Abductor Pollicis Longus (APL)",
      "nerve": "Posterior Interosseous Nerve (PIN)",
      "roots": "C7, C8 (major), C6 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Thumb radial abduction in the plane of the palm.",
      "mmt": "Abduct thumb radially in plane of palm against resistance.",
      "perottoLandmark": "Posterior distal forearm, 4-5 cm proximal to radial styloid, just lateral to EPL/EPB tendons.",
      "danger": "Superficial radial sensory nerve branches pass superficially.",
      "pmrPearls": "Forms lateral border of anatomical snuffbox along with EPB."
    },
    {
      "name": "Extensor Pollicis Brevis (EPB)",
      "nerve": "Posterior Interosseous Nerve (PIN)",
      "roots": "C7, C8 (major), C6 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Extension of thumb MCP joint.",
      "mmt": "Extend thumb MCP joint against resistance with IP joint flexed.",
      "perottoLandmark": "Lateral dorsal forearm, 3 cm proximal to radial styloid, adjacent to APL.",
      "danger": "Superficial radial nerve branches.",
      "pmrPearls": "Enclosed in 1st dorsal wrist compartment; site of De Quervain's tenosynovitis."
    },
    {
      "name": "Extensor Pollicis Longus (EPL)",
      "nerve": "Posterior Interosseous Nerve (PIN)",
      "roots": "C7, C8 (major), C6 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Extension of thumb interphalangeal (IP) joint.",
      "mmt": "Extend thumb distal phalanx ('hitchhiker' sign) against resistance.",
      "perottoLandmark": "Posterior middle third of forearm, medial to Lister's tubercle.",
      "danger": "Deep branch of radial artery in anatomical snuffbox.",
      "pmrPearls": "Hooks around Lister's tubercle (3rd dorsal compartment). Vulnerable to delayed rupture after Colles fracture."
    },
    {
      "name": "Extensor Indicis (Proprius) [EIP]",
      "nerve": "Posterior Interosseous Nerve (PIN - terminal muscular branch)",
      "roots": "C7, C8 (major), C6 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Posterior Cord",
      "action": "Independent extension of index finger at MCP joint.",
      "mmt": "Extend index finger with remaining fingers curled into a fist.",
      "perottoLandmark": "Dorsal forearm, 3 fingerbreadths proximal to ulnar styloid, just radial to ECU tendon.",
      "danger": "Deep interosseous membrane; avoid inserting too deeply into interosseous space.",
      "pmrPearls": "⭐ THE GOLD STANDARD PM&R DISCRIMINATOR: Radial C8 fibers pass through LOWER TRUNK -> POSTERIOR CORD. In Lower Trunk lesion, EIP is ABNORMAL. In Medial Cord lesion, EIP is NORMAL! In Ulnar neuropathy, EIP is NORMAL!"
    },
    {
      "name": "Pronator Teres",
      "nerve": "Median Nerve (main trunk)",
      "roots": "C6, C7 (major)",
      "trunk": "Upper & Middle Trunks",
      "cord": "Lateral Cord",
      "action": "Forearm pronation and weak elbow flexion.",
      "mmt": "Elbow flexed 90 degrees; pronate forearm from supinated position against resistance.",
      "perottoLandmark": "Medial forearm, 2-3 cm distal to midpoint between medial epicondyle and biceps tendon.",
      "danger": "Brachial artery and median nerve lie immediately medial/deep; nerve passes between humeral and ulnar heads.",
      "pmrPearls": "⭐ First muscle innervated by median nerve in forearm. Normal in Carpal Tunnel Syndrome; abnormal in Pronator Syndrome and C6/C7 radiculopathy. Differentiates C7 radiculopathy (PT abnormal) from Radial neuropathy (PT normal!)."
    },
    {
      "name": "Flexor Carpi Radialis (FCR)",
      "nerve": "Median Nerve (main trunk)",
      "roots": "C6, C7 (major), C8 (minor)",
      "trunk": "Upper & Middle Trunks",
      "cord": "Lateral Cord",
      "action": "Wrist flexion and radial deviation.",
      "mmt": "Flex and radially deviate wrist against resistance at 2nd metacarpal.",
      "perottoLandmark": "Anterior proximal forearm, 4-5 cm distal to antecubital crease, lateral to palmaris longus tendon.",
      "danger": "Radial artery runs lateral to FCR tendon at wrist.",
      "pmrPearls": "Hallmark C7 median muscle. Differentiates C7 radiculopathy (FCR denervated) from Radial neuropathy (FCR normal)."
    },
    {
      "name": "Palmaris Longus",
      "nerve": "Median Nerve (main trunk)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Medial & Lateral Cords",
      "action": "Tenses palmar aponeurosis and assists wrist flexion.",
      "mmt": "Pinch thumb and 5th digit together while slightly flexing wrist (Schaeffer's test).",
      "perottoLandmark": "Center of anterior forearm, 4-5 cm distal to elbow crease in prominent superficial tendon belly.",
      "danger": "Superficial muscle; absent in ~15% of the population.",
      "pmrPearls": "Tendon lies superficial to transverse carpal ligament; anatomical landmark for median nerve block."
    },
    {
      "name": "Flexor Digitorum Superficialis (FDS)",
      "nerve": "Median Nerve (main trunk)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Medial Cord (& Lateral)",
      "action": "Flexion of PIP joints of digits 2-5.",
      "mmt": "Flex PIP joint of target digit while holding adjacent digits fully extended to block FDP.",
      "perottoLandmark": "Medial anterior forearm, midpoint between elbow and wrist, deep to FCR and palmaris longus.",
      "danger": "Median nerve courses along its deep surface.",
      "pmrPearls": "Innervated by median nerve BEFORE carpal tunnel. Spared in Carpal Tunnel Syndrome."
    },
    {
      "name": "Flexor Digitorum Profundus I & II (FDP Lateral Half)",
      "nerve": "Anterior Interosseous Nerve (AIN - Median)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Medial Cord",
      "action": "Flexion of distal interphalangeal (DIP) joints of index and middle fingers.",
      "mmt": "Flex DIP joint of index finger while examiner stabilizes PIP joint in full extension.",
      "perottoLandmark": "Anterior radial forearm, deep to FDS, 5-7 cm proximal to wrist over radial side of ulna.",
      "danger": "Median nerve and anterior interosseous artery.",
      "pmrPearls": "⭐ Kiloh-Nevin syndrome (AIN syndrome): unable to make 'OK' sign (pulp-to-pulp pinch instead of tip-to-tip pinch). Spared in Carpal Tunnel Syndrome!"
    },
    {
      "name": "Flexor Pollicis Longus (FPL)",
      "nerve": "Anterior Interosseous Nerve (AIN - Median)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Medial Cord",
      "action": "Flexion of thumb interphalangeal (IP) joint.",
      "mmt": "Flex thumb IP joint against resistance while holding proximal phalanx stable.",
      "perottoLandmark": "Anterior radial forearm, junction of middle and distal thirds, just medial to radial artery.",
      "danger": "Radial artery lies immediately lateral.",
      "pmrPearls": "Classic AIN muscle. Spared in CTS! Weakness confirms AIN palsy or proximal median nerve injury."
    },
    {
      "name": "Pronator Quadratus",
      "nerve": "Anterior Interosseous Nerve (AIN - terminal muscular branch)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Middle & Lower Trunks",
      "cord": "Medial Cord",
      "action": "Forearm pronation, especially when elbow is completely flexed.",
      "mmt": "Pronate forearm from full supination while elbow is fully flexed to minimize pronator teres.",
      "perottoLandmark": "Volar distal forearm, 2 cm proximal to wrist crease, deep between radius and ulna.",
      "danger": "Radial and ulnar arteries, median nerve. Insert needle between tendons to deep pronator plate.",
      "pmrPearls": "Terminal muscle of AIN. Most sensitive muscle for needle EMG sampling in subtle or partial AIN neuropathy."
    },
    {
      "name": "Abductor Pollicis Brevis (APB)",
      "nerve": "Median Nerve (Recurrent Motor Branch)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Thumb palmar abduction perpendicular to plane of palm.",
      "mmt": "Abduct thumb straight upward perpendicular to palm against downward resistance.",
      "perottoLandmark": "Highest point of thenar eminence, midpoint between 1st MCP joint and scaphoid tubercle.",
      "danger": "Superficial palmar arterial arch lies deep and medially.",
      "pmrPearls": "⭐ PRIMARY RECORDING MUSCLE for routine Median Motor CMAP in CTS. Differentiates CTS (APB abnormal) from AIN syndrome (APB normal!)."
    },
    {
      "name": "Opponens Pollicis",
      "nerve": "Median Nerve (Recurrent Motor Branch)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Thumb opposition (rotates 1st metacarpal toward 5th digit).",
      "mmt": "Touch thumb tip to base of 5th digit; resist examiner trying to pull them apart.",
      "perottoLandmark": "Lateral thenar eminence, along outer border of 1st metacarpal bone.",
      "danger": "Radial artery branches.",
      "pmrPearls": "Part of the 'AFO' mnemonic (APB, FPB, OP). Severe atrophy produces classic 'Ape Hand' deformity."
    },
    {
      "name": "Flexor Pollicis Brevis (FPB)",
      "nerve": "Superficial head: Median (Recurrent); Deep head: Ulnar (Deep branch)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Flexion of thumb MCP joint.",
      "mmt": "Flex thumb across palm toward hypothenar eminence with IP straight.",
      "perottoLandmark": "Medial part of thenar eminence, adjacent to 1st metacarpal.",
      "danger": "Deep palmar arterial arch.",
      "pmrPearls": "Dual innervation (Median + Ulnar). In severe CTS, thumb flexion is preserved by deep ulnar head."
    },
    {
      "name": "Lumbricals I & II (Median)",
      "nerve": "Median Nerve (Digital motor branches)",
      "roots": "C8 (major), C7, T1 (minor)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Flex MCP joints while extending PIP and DIP joints of digits 2 & 3.",
      "mmt": "'L-shape' position of digits 2 & 3 against resistance.",
      "perottoLandmark": "Palmar aspect of 1st and 2nd intermetacarpal spaces, radial side of FDP tendons.",
      "danger": "Digital nerves and vessels.",
      "pmrPearls": "2nd lumbrical-interosseous comparison (2L-INT) is one of the most sensitive electrodiagnostic tests for Carpal Tunnel Syndrome."
    },
    {
      "name": "Flexor Carpi Ulnaris (FCU)",
      "nerve": "Ulnar Nerve (main trunk in forearm)",
      "roots": "C8, T1 (major), C7 (minor)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Wrist flexion and ulnar deviation.",
      "mmt": "Flex and ulnar deviate wrist against resistance at 5th metacarpal.",
      "perottoLandmark": "Anterior medial proximal forearm, 3-4 fingerbreadths distal to medial epicondyle along ulnar border.",
      "danger": "Ulnar nerve and artery run immediately deep/radial to FCU tendon in distal forearm.",
      "pmrPearls": "⭐ Hallmark muscle to distinguish Ulnar Neuropathy at the Elbow (FCU may be abnormal) from Guyon Canal entrapment (FCU ALWAYS NORMAL!)."
    },
    {
      "name": "Flexor Digitorum Profundus III & IV (FDP Medial Half)",
      "nerve": "Ulnar Nerve (main trunk in forearm)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Flexion of DIP joints of 4th and 5th digits.",
      "mmt": "Flex DIP joint of 5th digit while examiner stabilizes PIP joint in full extension.",
      "perottoLandmark": "Volar ulnar forearm, mid-forearm level, deep to FCU.",
      "danger": "Ulnar nerve and artery.",
      "pmrPearls": "Innervated in proximal forearm. Spared in Guyon canal lesions; abnormal in cubital tunnel / retroepicondylar lesions."
    },
    {
      "name": "Palmaris Brevis",
      "nerve": "Ulnar Nerve (Superficial terminal branch)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Corrugates skin of hypothenar eminence, deepens hollow of palm.",
      "mmt": "Cup the hand tightly / adduct little finger against palm.",
      "perottoLandmark": "Subcutaneous tissue of hypothenar eminence, just distal to pisiform.",
      "danger": "Ulnar artery and deep branch of ulnar nerve lie immediately deep.",
      "pmrPearls": "⭐ Sole motor muscle of the superficial branch of ulnar nerve. Differentiates Guyon zone 1 vs zone 2 vs zone 3 entrapments!"
    },
    {
      "name": "Abductor Digiti Minimi (ADM)",
      "nerve": "Ulnar Nerve (Deep branch)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Abduction of 5th digit away from 4th digit.",
      "mmt": "Abduct pinky against inward resistance applied to proximal phalanx.",
      "perottoLandmark": "Medial border of hypothenar eminence, midpoint between pisiform and 5th MCP joint.",
      "danger": "Low risk; superficial muscle belly.",
      "pmrPearls": "Standard recording muscle for routine Ulnar Motor CMAP studies."
    },
    {
      "name": "Opponens Digiti Minimi",
      "nerve": "Ulnar Nerve (Deep branch)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Draws 5th metacarpal anteriorly, cupping the palm.",
      "mmt": "Oppose 5th digit toward thumb against resistance.",
      "perottoLandmark": "Deep hypothenar eminence, lateral to ADM along 5th metacarpal shaft.",
      "danger": "Deep palmar arterial arch.",
      "pmrPearls": "Deep hypothenar intrinsic muscle."
    },
    {
      "name": "Flexor Digiti Minimi Brevis",
      "nerve": "Ulnar Nerve (Deep branch)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Flexion of 5th digit at MCP joint.",
      "mmt": "Flex 5th digit at MCP joint while keeping interphalangeal joints extended.",
      "perottoLandmark": "Radial to ADM over 5th metacarpophalangeal area.",
      "danger": "Deep branch of ulnar nerve.",
      "pmrPearls": "Part of the hypothenar muscle group."
    },
    {
      "name": "Palmar Interossei (PAD)",
      "nerve": "Ulnar Nerve (Deep branch)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Adduction of digits 2, 4, 5 toward middle finger (PAD = Palmar ADduct).",
      "mmt": "Hold a sheet of paper between extended fingers against examiner pulling.",
      "perottoLandmark": "Palmar intermetacarpal spaces, deep to flexor tendons.",
      "danger": "Digital vessels and nerves.",
      "pmrPearls": "Tested clinically by card pinch test between digits (Wartenberg / Egawa test)."
    },
    {
      "name": "Dorsal Interossei (DAB, especially 1st DI - FDI)",
      "nerve": "Ulnar Nerve (Deep branch - terminal muscular branch)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Abduction of digits 2, 3, 4 away from midline (DAB = Dorsal ABduct); 1st DI abducts index finger.",
      "mmt": "Abduct index finger radially against resistance with hand flat on table.",
      "perottoLandmark": "Dorsal web space between 1st and 2nd metacarpals, midpoint of 2nd metacarpal bone.",
      "danger": "Radial artery passes between the two heads of FDI into the palm! Insert needle into fleshy belly, avoid plunging deep into 1st web space.",
      "pmrPearls": "⭐ The MOST SENSITIVE muscle for ulnar neuropathy at the elbow, Lower Trunk plexopathy, and C8/T1 radiculopathy."
    },
    {
      "name": "Lumbricals III & IV (Ulnar)",
      "nerve": "Ulnar Nerve (Deep branch)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Flex MCP joints while extending PIP and DIP joints of digits 4 & 5.",
      "mmt": "'L-shape' of ring and little fingers against resistance.",
      "perottoLandmark": "Palmar aspect of 3rd and 4th intermetacarpal spaces.",
      "danger": "Common digital vessels and nerves.",
      "pmrPearls": "Loss of 3rd & 4th lumbricals with intact FDP causes the classic 'Ulnar Claw Hand' (Duchenne sign)."
    },
    {
      "name": "Adductor Pollicis",
      "nerve": "Ulnar Nerve (Deep branch)",
      "roots": "C8, T1 (major)",
      "trunk": "Lower Trunk",
      "cord": "Medial Cord",
      "action": "Adduction of thumb toward index finger in plane of palm.",
      "mmt": "Squeeze a sheet of paper firmly between thumb and lateral side of index finger without flexing thumb IP joint.",
      "perottoLandmark": "Palmar web space between 1st and 2nd metacarpals, deep to thenar fascia.",
      "danger": "Radial artery and deep palmar arch.",
      "pmrPearls": "⭐ Froment's Sign: When pulling paper away, patient flexes thumb IP joint (via FPL - AIN/Median) to compensate for paralyzed adductor pollicis (Ulnar)."
    }
  ],
  "rootDistributionTable": [
    {
      "muscle": "Serratus anterior",
      "nerve": "Long thoracic",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "major",
      "c8": "minor",
      "t1": "-"
    },
    {
      "muscle": "Rhomboids, major and minor",
      "nerve": "Dorsal scapular",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "minor",
      "c5": "major",
      "c6": "-",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Subclavius",
      "nerve": "Nerve to subclavius",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Supraspinatus",
      "nerve": "Suprascapular",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Infraspinatus",
      "nerve": "Suprascapular",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Subscapularis",
      "nerve": "Upper & Lower subscapular",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "major",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Latissimus dorsi",
      "nerve": "Thoracodorsal",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Teres major",
      "nerve": "Lower subscapular",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "minor",
      "c6": "major",
      "c7": "major",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Pectoralis major (clavicular)",
      "nerve": "Lateral pectoral",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Pectoralis major (sternocostal)",
      "nerve": "Medial & Lateral pectoral",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Pectoralis minor",
      "nerve": "Medial pectoral",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "major",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Teres minor",
      "nerve": "Axillary",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Deltoid",
      "nerve": "Axillary",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Coracobrachialis",
      "nerve": "Musculocutaneous",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "major",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Biceps",
      "nerve": "Musculocutaneous",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Brachialis",
      "nerve": "Musculocutaneous",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Triceps",
      "nerve": "Radial",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Anconeus",
      "nerve": "Radial",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Brachioradialis",
      "nerve": "Radial",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "major",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Extensor carpi radialis longus and brevis",
      "nerve": "Radial / PIN",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "minor",
      "c6": "major",
      "c7": "major",
      "c8": "minor",
      "t1": "-"
    },
    {
      "muscle": "Supinator",
      "nerve": "PIN (Radial)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "minor",
      "c6": "major",
      "c7": "-",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Extensor digitorum",
      "nerve": "PIN (Radial)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Extensor digiti minimi",
      "nerve": "PIN (Radial)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Extensor carpi ulnaris",
      "nerve": "PIN (Radial)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Abductor pollicis longus",
      "nerve": "PIN (Radial)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Extensor pollicis brevis",
      "nerve": "PIN (Radial)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Extensor pollicis longus",
      "nerve": "PIN (Radial)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Extensor indicis",
      "nerve": "PIN (Radial)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "minor",
      "c7": "major",
      "c8": "major",
      "t1": "-"
    },
    {
      "muscle": "Pronator teres",
      "nerve": "Median",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "major",
      "c7": "major",
      "c8": "-",
      "t1": "-"
    },
    {
      "muscle": "Flexor carpi radialis",
      "nerve": "Median",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "major",
      "c7": "major",
      "c8": "minor",
      "t1": "-"
    },
    {
      "muscle": "Palmaris longus",
      "nerve": "Median",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Flexor digit. superficialis",
      "nerve": "Median",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Flexor digit. profundus I and II",
      "nerve": "AIN (Median)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Flexor pollicis longus",
      "nerve": "AIN (Median)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Pronator quadratus",
      "nerve": "AIN (Median)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Abductor pollicis brevis",
      "nerve": "Median (Recurrent motor)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Opponens pollicis",
      "nerve": "Median (Recurrent motor)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Flexor pollicis brevis",
      "nerve": "Median (superficial) & Ulnar (deep)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Lumbricals I and II",
      "nerve": "Median",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "minor"
    },
    {
      "muscle": "Flexor carpi ulnaris",
      "nerve": "Ulnar",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "minor",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Flexor digit. profundus III and IV",
      "nerve": "Ulnar",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Palmaris brevis",
      "nerve": "Ulnar (superficial br.)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Abductor digiti minimi",
      "nerve": "Ulnar (deep br.)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Opponens digiti minimi",
      "nerve": "Ulnar (deep br.)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Flexor digiti minimi",
      "nerve": "Ulnar (deep br.)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Palmar interossei",
      "nerve": "Ulnar (deep br.)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Dorsal interossei",
      "nerve": "Ulnar (deep br.)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Lumbricals III and IV",
      "nerve": "Ulnar (deep br.)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    },
    {
      "muscle": "Adductor pollicis",
      "nerve": "Ulnar (deep br.)",
      "c1": "-",
      "c2": "-",
      "c3": "-",
      "c4": "-",
      "c5": "-",
      "c6": "-",
      "c7": "-",
      "c8": "major",
      "t1": "major"
    }
  ],
  "peripheralNervesDetail": {
    "radial": {
      "name": "Radial Nerve",
      "roots": "C5, C6, C7, C8 (± T1)",
      "origin": "Posterior Cord (Largest terminal branch)",
      "course": "Originates in axilla -> enters triangular interval with profunda brachii artery -> travels in spiral (radial) groove of humerus -> pierces lateral intermuscular septum -> enters anterior compartment above lateral epicondyle -> divides into Superficial Radial and PIN.",
      "entrapments": [
        {
          "site": "Spiral Groove of Humerus",
          "cause": "Saturday night palsy, honeymoon palsy, midshaft humeral fracture",
          "clinical": "Wrist drop, finger drop, weak brachioradialis; TRICEPS is SPARED if compression is within groove; sensory loss over radial dorsum of hand."
        },
        {
          "site": "Arcade of Frohse (Supinator Arch)",
          "cause": "Fibrous band at proximal border of superficial supinator head",
          "clinical": "Posterior Interosseous Nerve (PIN) syndrome: Pure motor weakness of wrist/finger extensors with radial deviation on extension (ECRL spared); NO SENSORY LOSS (Superficial radial normal)!"
        },
        {
          "site": "Wartenberg's Syndrome",
          "cause": "Compression of superficial radial sensory nerve between brachioradialis & ECRL tendons",
          "clinical": "Pure sensory pain, burning, paresthesias in anatomical snuffbox/dorsal thumb; no motor weakness."
        }
      ],
      "branchingSequence": [
        {
          "level": "1. Axilla (Before Spiral Groove)",
          "branches": [
            {
              "name": "Branch to Triceps (Long Head)",
              "innervation": "Triceps brachii (long head)",
              "type": "Motor"
            },
            {
              "name": "Branch to Triceps (Medial Head, proximal)",
              "innervation": "Triceps brachii (medial head)",
              "type": "Motor"
            },
            {
              "name": "Posterior Cutaneous Nerve of Arm",
              "innervation": "Posterior aspect of arm",
              "type": "Sensory"
            }
          ]
        },
        {
          "level": "2. Spiral Groove of the Humerus",
          "landmark": "Spiral groove posterior to mid-humeral shaft",
          "branches": [
            {
              "name": "Branch to Triceps (Lateral Head)",
              "innervation": "Triceps brachii (lateral head)",
              "type": "Motor"
            },
            {
              "name": "Branch to Triceps (Medial Head, distal) & Anconeus",
              "innervation": "Triceps medial head, Anconeus",
              "type": "Motor"
            },
            {
              "name": "Lower Lateral Cutaneous Nerve of Arm",
              "innervation": "Inferolateral arm",
              "type": "Sensory"
            },
            {
              "name": "Posterior Cutaneous Nerve of Forearm",
              "innervation": "Dorsal strip of forearm",
              "type": "Sensory"
            }
          ]
        },
        {
          "level": "3. Distal Arm (Above Lateral Epicondyle)",
          "landmark": "Anterior compartment above elbow",
          "branches": [
            {
              "name": "Branch to Brachioradialis",
              "innervation": "Brachioradialis (C5, C6)",
              "type": "Motor"
            },
            {
              "name": "Branch to ECRL",
              "innervation": "Extensor carpi radialis longus (C6, C7)",
              "type": "Motor"
            },
            {
              "name": "Branch to ECRB (variable, often from PIN)",
              "innervation": "Extensor carpi radialis brevis",
              "type": "Motor"
            }
          ]
        },
        {
          "level": "4. Bifurcation at Cubital Fossa / Radial Tunnel",
          "branches": [
            {
              "name": "Superficial Radial Sensory Nerve",
              "innervation": "Cutaneous to anatomical snuffbox, radial 2/3 of hand dorsum, dorsal proximal digits 1, 2, 3, and radial half of 4.",
              "type": "Sensory",
              "notes": "Courses deep to brachioradialis in forearm, emerges subcutaneously 7 cm proximal to radial styloid. Pure sensory, spares motor."
            },
            {
              "name": "Posterior Interosseous Nerve (PIN)",
              "innervation": "Deep motor continuation. Passes through Arcade of Frohse into supinator muscle.",
              "type": "Motor",
              "subBranches": [
                {
                  "name": "Branch to Supinator",
                  "muscle": "Supinator (C5, C6)"
                },
                {
                  "name": "Extensor Digitorum (Communis)",
                  "muscle": "Extensor digitorum (C7, C8)"
                },
                {
                  "name": "Extensor Digiti Minimi",
                  "muscle": "Extensor digiti minimi (C7, C8)"
                },
                {
                  "name": "Extensor Carpi Ulnaris",
                  "muscle": "Extensor carpi ulnaris (C7, C8)"
                },
                {
                  "name": "Abductor Pollicis Longus",
                  "muscle": "Abductor pollicis longus (C7, C8)"
                },
                {
                  "name": "Extensor Pollicis Brevis",
                  "muscle": "Extensor pollicis brevis (C7, C8)"
                },
                {
                  "name": "Extensor Pollicis Longus",
                  "muscle": "Extensor pollicis longus (C7, C8)"
                },
                {
                  "name": "Extensor Indicis (Proprius)",
                  "muscle": "Extensor indicis proprius (C7, C8) - Terminal muscle of PIN!"
                }
              ]
            }
          ]
        }
      ]
    },
    "ulnar": {
      "name": "Ulnar Nerve",
      "roots": "C8, T1",
      "origin": "Medial Cord (terminal branch)",
      "course": "Originates in axilla -> descends medial arm without giving branches -> pierces medial intermuscular septum -> passes posterior to medial epicondyle in ulnar groove -> enters cubital tunnel through humeroulnar arcade (Osborne ligament) between FCU heads -> descends between FCU and FDP -> passes through Guyon's canal into hand.",
      "entrapments": [
        {
          "site": "Retroepicondylar Groove / Cubital Tunnel",
          "cause": "Cubital tunnel syndrome, repetitive flexion, subluxation, trauma",
          "clinical": "Numbness in 5th and medial 4th digits, weak grip, Froment sign; FCU and FDP 3/4 may be involved; Dorsal Ulnar Cutaneous (DUNC) SNAP is ABNORMAL."
        },
        {
          "site": "Guyon's Canal (Pisohamate Hiatus)",
          "cause": "Cyclist handlebar palsy, hook of hamate fracture, ganglion cyst",
          "clinical": "Classified into 3 zones. Zone 1: Motor + sensory; Zone 2: Pure deep motor branch; Zone 3: Pure superficial sensory. In ALL Guyon canal lesions, DUNC SNAP is NORMAL because DUNC branches 5-8 cm above the wrist!"
        }
      ],
      "branchingSequence": [
        {
          "level": "1. Axilla and Upper Arm",
          "branches": [
            {
              "name": "No muscular branches",
              "innervation": "None in arm",
              "type": "Vascular branches only"
            }
          ]
        },
        {
          "level": "2. Elbow (Ulnar Groove -> Humeroulnar Arcade -> Cubital Tunnel)",
          "landmark": "Retroepicondylar groove and Osborne's band between two heads of FCU",
          "branches": [
            {
              "name": "Articular branches to elbow joint",
              "innervation": "Elbow joint capsule",
              "type": "Sensory"
            },
            {
              "name": "Muscular branches to FCU",
              "innervation": "Flexor carpi ulnaris (C8, T1)",
              "type": "Motor"
            },
            {
              "name": "Muscular branches to FDP (medial half)",
              "innervation": "Flexor digitorum profundus III & IV (C8, T1)",
              "type": "Motor"
            }
          ]
        },
        {
          "level": "3. Forearm (Distal 1/3, Pre-Wrist)",
          "landmark": "5 to 8 cm proximal to the wrist crease",
          "branches": [
            {
              "name": "Palmar Cutaneous Branch",
              "innervation": "Skin over proximal hypothenar eminence",
              "type": "Sensory"
            },
            {
              "name": "Dorsal Cutaneous Branch (DUNC)",
              "innervation": "Dorsum of ulnar hand, dorsal surface of 5th digit and medial 4th digit",
              "type": "Sensory",
              "notes": "⭐ CRUCIAL PM&R LANDMARK: Branches 5-8 cm above wrist. DUNC SNAP is abnormal in Cubital Tunnel Syndrome, but NORMAL in Guyon's Canal lesions!"
            }
          ]
        },
        {
          "level": "4. Wrist & Hand (Guyon's Canal & Beyond)",
          "landmark": "Between pisiform and hook of hamate, covered by volar carpal ligament",
          "branches": [
            {
              "name": "Branch to Palmaris Brevis",
              "innervation": "Palmaris brevis (corrugates hypothenar skin, protects ulnar artery)",
              "type": "Motor"
            },
            {
              "name": "Superficial Terminal Branch",
              "innervation": "Palmar sensory branch to 5th digit and medial half of 4th digit (palmar and distal dorsal nail beds).",
              "type": "Sensory"
            },
            {
              "name": "Deep Motor Branch (Ramus Profundus)",
              "innervation": "Curves around hook of hamate across deep palmar arch to supply all intrinsic ulnar muscles:",
              "type": "Motor",
              "subBranches": [
                {
                  "name": "Abductor Digiti Minimi (ADM)",
                  "muscle": "ADM (C8, T1) - Standard ulnar CMAP recording site"
                },
                {
                  "name": "Flexor Digiti Minimi (FDM)",
                  "muscle": "FDM (C8, T1)"
                },
                {
                  "name": "Opponens Digiti Minimi (ODM)",
                  "muscle": "ODM (C8, T1)"
                },
                {
                  "name": "3rd and 4th Lumbricals",
                  "muscle": "Lumbricals III & IV (C8, T1)"
                },
                {
                  "name": "All Palmar & Dorsal Interossei",
                  "muscle": "4 Dorsal Interossei (including FDI) & 3 Palmar Interossei (C8, T1)"
                },
                {
                  "name": "Adductor Pollicis",
                  "muscle": "Adductor pollicis (C8, T1) - Froment sign test!"
                },
                {
                  "name": "Flexor Pollicis Brevis (Deep Head)",
                  "muscle": "FPB deep head (C8, T1)"
                }
              ]
            }
          ]
        }
      ]
    },
    "median": {
      "name": "Median Nerve",
      "roots": "C5, C6, C7, C8, T1",
      "origin": "Formed by union of Lateral Root (C5-C7) and Medial Root (C8-T1) anterior to axillary artery ('M' shape)",
      "thaiMnemonic": "โป - ขอ - ปาล์ม - ดี  |  AIN: ดี - โป้ง - โป  |  Carpal Tunnel: AFO",
      "course": "Descends in arm along medial border of biceps with brachial artery -> crosses anterior to elbow joint medial to biceps tendon -> passes between two heads of Pronator Teres -> gives off Anterior Interosseous Nerve (AIN) -> travels deep to FDS -> passes through Carpal Tunnel deep to flexor retinaculum.",
      "entrapments": [
        {
          "site": "Ligament of Struthers / Supracondylar Process",
          "cause": "Anomalous spur 5 cm proximal to medial epicondyle",
          "clinical": "High median neuropathy involving ALL median muscles including pronator teres; weakness in pronation, wrist flexion, thumb opposition; sensory loss."
        },
        {
          "site": "Pronator Teres Syndrome",
          "cause": "Hypertrophy or fibrous band between humeral and ulnar heads of PT",
          "clinical": "Aching proximal forearm pain, paresthesias in median digits; Pronator teres itself is SPARED or tender; Palmar cutaneous branch is INVOLVED (palmar numbness); negative Tinel at wrist."
        },
        {
          "site": "Anterior Interosseous Nerve (AIN) Syndrome (Kiloh-Nevin)",
          "cause": "Fibrous band, tendinous arch of FDS, or Parsonage-Turner syndrome",
          "clinical": "PURE MOTOR: Inability to make the 'OK' sign (pincer grasp) due to weakness of FPL (thumb IP flexion) and FDP 1 & 2 (index DIP flexion). NO SENSORY DEFICIT!"
        },
        {
          "site": "Carpal Tunnel Syndrome (CTS)",
          "cause": "Compression under transverse carpal ligament",
          "clinical": "Numbness, tingling in lateral 3½ digits; nocturnal waking; thenar atrophy (APB); Palmar cutaneous branch is SPARED (palm sensation normal); Phalen and Tinel positive."
        }
      ],
      "branchingSequence": [
        {
          "level": "1. Axilla & Arm",
          "branches": [
            {
              "name": "No muscular branches",
              "innervation": "Travels with brachial artery",
              "type": "Vascular only"
            }
          ]
        },
        {
          "level": "2. Elbow Joint & Proximal Forearm (Main Trunk)",
          "mnemonic": "โป - ขอ - ปาล์ม - ดี",
          "branches": [
            {
              "name": "1. โปร: Pronator Teres (PT)",
              "innervation": "Pronator teres (C6, C7) - passes between its 2 heads",
              "type": "Motor"
            },
            {
              "name": "2. ขอ: Flexor Carpi Radialis (FCR)",
              "innervation": "Flexor carpi radialis (C6, C7)",
              "type": "Motor"
            },
            {
              "name": "3. ปาล์ม: Palmaris Longus (PL)",
              "innervation": "Palmaris longus (C7, C8)",
              "type": "Motor"
            },
            {
              "name": "4. ดี: Flexor Digitorum Superficialis (FDS)",
              "innervation": "Flexor digitorum superficialis (C7, C8, T1)",
              "type": "Motor"
            }
          ]
        },
        {
          "level": "3. Anterior Interosseous Nerve (AIN) - Pure Motor Branch",
          "mnemonic": "ดี - โป้ง - โป  (Loss of 'OK' sign)",
          "branches": [
            {
              "name": "1. ดี: FDP I & II (Lateral Half)",
              "innervation": "Flexor digitorum profundus to digits 2 & 3 (C8, T1)",
              "type": "Motor"
            },
            {
              "name": "2. โป้ง: Flexor Pollicis Longus (FPL)",
              "innervation": "Flexor pollicis longus (C8, T1) - flexes thumb IP joint",
              "type": "Motor"
            },
            {
              "name": "3. โป: Pronator Quadratus (PQ)",
              "innervation": "Pronator quadratus (C8, T1) - pronation with elbow flexed",
              "type": "Motor"
            }
          ]
        },
        {
          "level": "4. Distal Forearm (Above Carpal Tunnel)",
          "landmark": "5 cm proximal to transverse carpal ligament",
          "branches": [
            {
              "name": "Palmar Cutaneous Branch",
              "innervation": "Skin over thenar eminence and lateral 2/3 of palm",
              "type": "Sensory",
              "notes": "⭐ CRITICAL PM&R LANDMARK: Arises PROXIMAL to carpal tunnel and passes superficial to flexor retinaculum. SPARED IN CARPAL TUNNEL SYNDROME!"
            }
          ]
        },
        {
          "level": "5. Carpal Tunnel & Hand (Terminal Branches)",
          "mnemonic": "AFO + 1st/2nd Lumbricals + Digital branches",
          "branches": [
            {
              "name": "Recurrent (Thenar) Motor Branch ('AFO')",
              "innervation": "Intrinsic thenar muscles:",
              "type": "Motor",
              "subBranches": [
                {
                  "name": "A: Abductor Pollicis Brevis (APB)",
                  "muscle": "APB (C8, T1) - Primary muscle tested in routine median motor NCS"
                },
                {
                  "name": "F: Flexor Pollicis Brevis (Superficial Head)",
                  "muscle": "FPB superficial head (C8, T1)"
                },
                {
                  "name": "O: Opponens Pollicis (OP)",
                  "muscle": "Opponens pollicis (C8, T1)"
                }
              ]
            },
            {
              "name": "Common & Proper Palmar Digital Nerves",
              "innervation": "Sensory to palmar surface of lateral 3½ digits (thumb, index, middle, radial ring) and dorsal nail beds; also motor to 1st and 2nd Lumbricals.",
              "type": "Mixed",
              "subBranches": [
                {
                  "name": "1st and 2nd Lumbricals",
                  "muscle": "Lumbricals I & II (C8, T1)"
                },
                {
                  "name": "Digital sensory to Digit 1, 2, 3, half 4",
                  "muscle": "Sensory only (Median D2 SNAP testing)"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "ncsReferences": [
    {
      "study": "Median Sensory (D2)",
      "type": "Antidromic / Orthodromic Sensory",
      "nerve": "Median",
      "roots": "C6, C7",
      "cord": "Lateral Cord",
      "trunk": "Upper & Middle",
      "recording": "Index finger (D2) ring electrodes",
      "stimulating": "Wrist (14 cm proximal to active ring electrode)",
      "normalAmp": "> 20 µV",
      "normalLatency": "< 3.5 ms",
      "normalCV": "> 50 m/s",
      "pmrRole": "Abnormal in CTS, Upper/Middle trunk plexopathy, Lateral cord lesions. NORMAL in C6/C7 radiculopathy."
    },
    {
      "study": "Superficial Radial Sensory",
      "type": "Antidromic Sensory",
      "nerve": "Radial",
      "roots": "C6, C7",
      "cord": "Posterior Cord",
      "trunk": "Upper & Middle",
      "recording": "Anatomical snuffbox / 1st web space over radial dorsal nerve",
      "stimulating": "Lateral radius, 10-12 cm proximal to recording electrode",
      "normalAmp": "> 15 µV",
      "normalLatency": "< 2.8 ms",
      "normalCV": "> 50 m/s",
      "pmrRole": "Abnormal in Posterior Cord and high Radial lesions. NORMAL in C6/C7 radiculopathy and PIN palsy."
    },
    {
      "study": "Lateral Antebrachial Cutaneous (LAC)",
      "type": "Antidromic Sensory",
      "nerve": "Musculocutaneous terminal",
      "roots": "C5, C6",
      "cord": "Lateral Cord",
      "trunk": "Superior Trunk",
      "recording": "Lateral volar forearm, 12 cm distal to stimulus",
      "stimulating": "Lateral to biceps tendon at antecubital crease",
      "normalAmp": "> 10 µV (or within 50% of contralateral)",
      "normalLatency": "< 3.0 ms",
      "normalCV": "> 55 m/s",
      "pmrRole": "MOST SENSITIVE TEST FOR UPPER TRUNK PLEXOPATHY. Abnormal in Erb's palsy / lateral cord; spared in C5/C6 radiculopathy."
    },
    {
      "study": "Medial Antebrachial Cutaneous (MABC)",
      "type": "Antidromic Sensory",
      "nerve": "Medial Cord branch",
      "roots": "C8, T1",
      "cord": "Medial Cord",
      "trunk": "Inferior Trunk",
      "recording": "Medial forearm, 10-12 cm distal to stimulus",
      "stimulating": "Medial epicondyle/axillary groove along basilic vein",
      "normalAmp": "> 10 µV (or within 50% of contralateral)",
      "normalLatency": "< 3.2 ms",
      "normalCV": "> 50 m/s",
      "pmrRole": "THE GOLD STANDARD FOR TRUE NEUROGENIC TOS! Severely reduced/absent in lower trunk plexopathy, but NORMAL in ulnar neuropathy at elbow!"
    },
    {
      "study": "Ulnar Sensory (D5)",
      "type": "Antidromic Sensory",
      "nerve": "Ulnar",
      "roots": "C8",
      "cord": "Medial Cord",
      "trunk": "Inferior Trunk",
      "recording": "Little finger (D5) ring electrodes",
      "stimulating": "Wrist, 14 cm proximal along FCU tendon",
      "normalAmp": "> 17 µV",
      "normalLatency": "< 3.1 ms",
      "normalCV": "> 50 m/s",
      "pmrRole": "Abnormal in Ulnar neuropathy and Lower Trunk / Medial Cord plexopathies. NORMAL in C8 radiculopathy."
    },
    {
      "study": "Median Motor (APB)",
      "type": "Motor Conduction Study (CMAP)",
      "nerve": "Median",
      "roots": "C8, T1",
      "cord": "Medial Cord (via Medial Root)",
      "trunk": "Inferior Trunk",
      "recording": "Abductor Pollicis Brevis (belly-tendon)",
      "stimulating": "Wrist (8 cm proximal) and Antecubital fossa",
      "normalAmp": "> 4.0 mV",
      "normalLatency": "< 4.4 ms",
      "normalCV": "> 50 m/s",
      "pmrRole": "Severely attenuated in True TOS (Gilliatt-Sumner hand), lower trunk/medial cord lesions, and severe CTS."
    },
    {
      "study": "Ulnar Motor (ADM)",
      "type": "Motor Conduction Study (CMAP)",
      "nerve": "Ulnar",
      "roots": "C8, T1",
      "cord": "Medial Cord",
      "trunk": "Inferior Trunk",
      "recording": "Abductor Digiti Minimi (ADM)",
      "stimulating": "Wrist, Below elbow, Above elbow (across cubital tunnel)",
      "normalAmp": "> 6.0 mV",
      "normalLatency": "< 3.7 ms",
      "normalCV": "> 50 m/s (forearm), drop across elbow < 10 m/s",
      "pmrRole": "Focal slowing/conduction block across elbow confirms Ulnar Neuropathy at Elbow; diffuse axon loss without focal drop favors Plexopathy."
    },
    {
      "study": "Radial Motor (EIP)",
      "type": "Motor Conduction Study (CMAP)",
      "nerve": "Radial",
      "roots": "C7, C8",
      "cord": "Posterior Cord",
      "trunk": "Middle & Inferior",
      "recording": "Extensor Indicis Proprius (EIP)",
      "stimulating": "Forearm (distal), Elbow (spiral groove), Lateral arm",
      "normalAmp": "> 4.0 mV",
      "normalLatency": "< 3.0 ms",
      "normalCV": "> 50 m/s",
      "pmrRole": "Reduced in Posterior Cord, high radial lesions, or PIN palsy."
    }
  ],
  "clinicalScenarios": [
    {
      "id": "upper-trunk",
      "title": "Erb-Duchenne Palsy (Upper Trunk Plexopathy)",
      "etiology": "Motorcycle accident (shoulder-head separation), birth trauma, backpack palsy, or neuralgic amyotrophy.",
      "anatomy": "Superior Trunk (C5-C6 junction) lesion.",
      "clinicalPresentation": "'Waiter's Tip Deformity': Arm hanging by side, adducted and internally rotated, elbow extended, forearm pronated. Loss of shoulder abduction, external rotation, and elbow flexion. Biceps and brachioradialis reflexes absent.",
      "sensoryLoss": "Lateral shoulder (axillary), lateral arm and forearm (LAC), thumb and index finger (C6 dermatome).",
      "ncsFindings": {
        "lacSnap": "Absent or marked amplitude reduction (>50% vs contralateral)",
        "radialSensory": "Reduced amplitude (superficial radial)",
        "medianSensoryD2": "Reduced amplitude (C6 contribution)",
        "mabcSnap": "NORMAL",
        "ulnarSnap": "NORMAL",
        "medianMotorApb": "NORMAL (C8-T1)",
        "ulnarMotorAdm": "NORMAL (C8-T1)",
        "musculocutaneousCmap": "Markedly reduced amplitude at biceps",
        "axillaryCmap": "Markedly reduced amplitude at deltoid"
      },
      "emgFindings": [
        {
          "muscle": "Deltoid (C5-C6)",
          "result": "3+ Fibs/PSWs, reduced recruitment"
        },
        {
          "muscle": "Biceps (C5-C6)",
          "result": "3+ Fibs/PSWs, reduced recruitment"
        },
        {
          "muscle": "Supraspinatus/Infraspinatus (C5-C6)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Brachioradialis (C5-C6)",
          "result": "2+ Fibs/PSWs"
        },
        {
          "muscle": "Pronator Teres (C6-C7)",
          "result": "Mild 1+ Fibs or normal"
        },
        {
          "muscle": "Rhomboids (C5 Root)",
          "result": "NORMAL (spared - branches off root before trunk!)"
        },
        {
          "muscle": "Serratus Anterior (C5-C7 Root)",
          "result": "NORMAL (spared)"
        },
        {
          "muscle": "Triceps (C7)",
          "result": "NORMAL"
        },
        {
          "muscle": "APB & FDI (C8-T1)",
          "result": "NORMAL"
        },
        {
          "muscle": "Cervical Paraspinals",
          "result": "NORMAL (confirms post-ganglionic trunk lesion)"
        }
      ],
      "pearls": "Key discriminator: Sparing of Rhomboid (dorsal scapular) and Serratus anterior (long thoracic) localizes the lesion distal to roots at the Upper Trunk level! Reduced LAC SNAP proves post-ganglionic lesion."
    },
    {
      "id": "lower-trunk",
      "title": "Klumpke Palsy (Inferior Trunk Plexopathy)",
      "etiology": "Breech delivery with hyperabduction traction, falling from tree grabbing a branch, apical thoracic tumors (Pancoast), or sternotomy traction.",
      "anatomy": "Inferior Trunk (C8-T1 junction) lesion.",
      "clinicalPresentation": "'True Claw Hand' deformity: Weakness of ALL intrinsic hand muscles (thenar, hypothenar, interossei, lumbricals) + long finger flexors (FDP, FPL). Possible Horner's Syndrome (ptosis, miosis, anhidrosis) if T1 sympathetic white rami communicantes involved.",
      "sensoryLoss": "Medial arm (medial brachial cutaneous), medial forearm (MABC), 4th and 5th digits (ulnar C8 territory).",
      "ncsFindings": {
        "lacSnap": "NORMAL",
        "radialSensory": "NORMAL",
        "medianSensoryD2": "NORMAL",
        "mabcSnap": "ABSENT or severely reduced",
        "ulnarSnap": "Markedly reduced or absent",
        "medianMotorApb": "Markedly reduced CMAP amplitude",
        "ulnarMotorAdm": "Markedly reduced CMAP amplitude",
        "musculocutaneousCmap": "NORMAL",
        "axillaryCmap": "NORMAL"
      },
      "emgFindings": [
        {
          "muscle": "APB (Median C8-T1)",
          "result": "3+ Fibs/PSWs, no recruitment"
        },
        {
          "muscle": "FPL (AIN C8-T1)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "ADM & FDI (Ulnar C8-T1)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "FCU & FDP 3/4 (Ulnar C8)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "EIP & EDC (Radial C8)",
          "result": "2+ to 3+ Fibs/PSWs (radial C8 fibers run through lower trunk!)"
        },
        {
          "muscle": "Biceps & Deltoid (C5-C6)",
          "result": "NORMAL"
        },
        {
          "muscle": "Triceps & PT (C7)",
          "result": "NORMAL"
        },
        {
          "muscle": "Cervical Paraspinals",
          "result": "NORMAL (unless pre-ganglionic C8-T1 avulsion)"
        }
      ],
      "pearls": "Distinguished from Ulnar Neuropathy: Lower Trunk lesion affects MEDIAN C8-T1 (APB, FPL) and RADIAL C8 (EIP) in addition to ulnar muscles, and has ABSENT MABC SNAP!"
    },
    {
      "id": "neurogenic-tos",
      "title": "True Neurogenic Thoracic Outlet Syndrome (True TOS)",
      "etiology": "Congenital anomaly: Cervical rib or fibrous band extending from elongated C7 transverse process to 1st rib compressing lower trunk / C8-T1 roots.",
      "anatomy": "Selective chronic traction/compression of lower trunk (ventral C8-T1 fibres).",
      "clinicalPresentation": "'Gilliatt-Sumner Hand': Profound thenar atrophy (APB and opponens) out of proportion to hypothenar atrophy. Aching medial arm/forearm pain and cold intolerance. Common in young adult females.",
      "sensoryLoss": "Medial forearm (MABC territory) and ulnar border of hand / 5th digit.",
      "ncsFindings": {
        "lacSnap": "NORMAL",
        "radialSensory": "NORMAL",
        "medianSensoryD2": "NORMAL",
        "mabcSnap": "ABSENT or markedly reduced (MOST SENSITIVE EDX FINDING!)",
        "ulnarSnap": "NORMAL or mildly reduced",
        "medianMotorApb": "Severely attenuated CMAP amplitude (< 2 mV) with prolonged latency",
        "ulnarMotorAdm": "Low-normal or mildly reduced CMAP",
        "musculocutaneousCmap": "NORMAL",
        "axillaryCmap": "NORMAL"
      },
      "emgFindings": [
        {
          "muscle": "APB (Thenar C8-T1)",
          "result": "Dense denervation (3+ Fibs/PSWs), high-amplitude neurogenic MUAPs"
        },
        {
          "muscle": "FPL (AIN C8-T1)",
          "result": "1+ to 2+ Fibs/PSWs"
        },
        {
          "muscle": "ADM & FDI (Ulnar C8-T1)",
          "result": "Mild to moderate denervation (1+ to 2+ Fibs)"
        },
        {
          "muscle": "EIP (Radial C8)",
          "result": "Mild 1+ Fibs or normal"
        },
        {
          "muscle": "C5-C7 muscles (Deltoid, Biceps, PT)",
          "result": "NORMAL"
        },
        {
          "muscle": "Cervical Paraspinals",
          "result": "NORMAL"
        }
      ],
      "pearls": "The classic PM&R / EMG board exam question: Why is APB more atrophied than ADM in True TOS? Because the fibers destined for the APB lie more inferiorly/anteriorly on the first rib/band and undergo greater mechanical stretch! MABC SNAP is the single most sensitive electrodiagnostic study."
    },
    {
      "id": "posterior-cord",
      "title": "Posterior Cord Lesion",
      "etiology": "Proximal humeral fractures, anterior shoulder dislocation, crutch palsy (axillary compression), or bullet/knife wound in axilla.",
      "anatomy": "Posterior Cord (formed by all 3 posterior divisions: C5-T1).",
      "clinicalPresentation": "Complete wrist drop and finger drop (radial) + profound shoulder abduction weakness (deltoid) + shoulder internal rotation/adduction weakness (latissimus dorsi & subscapularis).",
      "sensoryLoss": "Posterior arm, posterior forearm, anatomical snuffbox / radial dorsum of hand, and lateral shoulder badge area (axillary).",
      "ncsFindings": {
        "lacSnap": "NORMAL (lateral cord)",
        "radialSensory": "ABSENT or markedly reduced",
        "medianSensoryD2": "NORMAL",
        "mabcSnap": "NORMAL",
        "ulnarSnap": "NORMAL",
        "medianMotorApb": "NORMAL",
        "ulnarMotorAdm": "NORMAL",
        "radialMotorEip": "Markedly reduced or absent CMAP",
        "axillaryCmap": "Markedly reduced CMAP at deltoid"
      },
      "emgFindings": [
        {
          "muscle": "Deltoid & Teres Minor (Axillary C5-C6)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Latissimus Dorsi (Thoracodorsal C6-C8)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Triceps (Radial C7)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Brachioradialis (Radial C5-C6)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "EDC & EIP (Radial/PIN C7-C8)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Biceps (Musculocutaneous)",
          "result": "NORMAL (Lateral cord - spares biceps!)"
        },
        {
          "muscle": "Supraspinatus/Infraspinatus",
          "result": "NORMAL (Upper trunk - spares suprascapular!)"
        },
        {
          "muscle": "Pronator Teres & APB",
          "result": "NORMAL"
        },
        {
          "muscle": "Cervical Paraspinals",
          "result": "NORMAL"
        }
      ],
      "pearls": "Distinguished from high Radial neuropathy: Posterior cord lesion additionally involves Deltoid (Axillary) and Latissimus dorsi (Thoracodorsal). Distinguished from Upper trunk: Spares Biceps and Supraspinatus!"
    },
    {
      "id": "lateral-cord",
      "title": "Lateral Cord Lesion",
      "etiology": "Trauma, axillary artery aneurysms, anterior shoulder dislocation, or iatrogenic during axillary surgery/pectoral repair.",
      "anatomy": "Lateral Cord (anterior divisions of Upper and Middle Trunks, C5-C7).",
      "clinicalPresentation": "Weakness of elbow flexion (biceps, brachialis), forearm pronation (pronator teres), and wrist flexion (FCR). Weakness of Pectoralis Major (clavicular head). Thenar intrinsic muscles (APB) are SPARED!",
      "sensoryLoss": "Lateral forearm (LAC sensory territory) and sensory distribution of median nerve to thumb, index, and middle fingers.",
      "ncsFindings": {
        "lacSnap": "ABSENT or markedly reduced",
        "radialSensory": "NORMAL (posterior cord)",
        "medianSensoryD2": "ABSENT or markedly reduced",
        "mabcSnap": "NORMAL",
        "ulnarSnap": "NORMAL",
        "medianMotorApb": "NORMAL (motor fibers to APB travel through Medial Root from Medial Cord!)",
        "ulnarMotorAdm": "NORMAL",
        "musculocutaneousCmap": "Markedly reduced at biceps",
        "axillaryCmap": "NORMAL"
      },
      "emgFindings": [
        {
          "muscle": "Biceps Brachii (Musculocutaneous C5-C6)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Coracobrachialis (Musculocutaneous C6-C7)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Pectoralis Major - Clavicular (Lat Pectoral C5-C7)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Pronator Teres (Median C6-C7)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Flexor Carpi Radialis (Median C6-C7)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "APB (Median C8-T1)",
          "result": "NORMAL (innervated via medial cord!)"
        },
        {
          "muscle": "Deltoid & Triceps",
          "result": "NORMAL"
        },
        {
          "muscle": "Supraspinatus/Infraspinatus",
          "result": "NORMAL"
        },
        {
          "muscle": "Cervical Paraspinals",
          "result": "NORMAL"
        }
      ],
      "pearls": "High-yield PM&R pearl: In a lateral cord lesion, Median D2 SNAP is absent and proximal median muscles (PT, FCR) are weak, BUT Median APB CMAP is completely normal because its motor fibers come from the medial cord!"
    },
    {
      "id": "medial-cord",
      "title": "Medial Cord Lesion",
      "etiology": "Catheterization of axillary artery, anterior shoulder dislocation, trauma, Pancoast tumor, sternotomy retraction.",
      "anatomy": "Medial Cord (anterior division of Lower Trunk, C8-T1).",
      "clinicalPresentation": "Nearly identical to Lower Trunk plexopathy: weakness of all ulnar muscles + median C8-T1 muscles (APB, FPL, FDP 1-2). Claw hand deformity.",
      "sensoryLoss": "Medial arm, medial forearm (MABC), and ulnar digits (4th and 5th fingers).",
      "ncsFindings": {
        "lacSnap": "NORMAL",
        "radialSensory": "NORMAL",
        "medianSensoryD2": "NORMAL",
        "mabcSnap": "ABSENT or reduced",
        "ulnarSnap": "ABSENT or reduced",
        "medianMotorApb": "Markedly reduced CMAP",
        "ulnarMotorAdm": "Markedly reduced CMAP",
        "radialMotorEip": "NORMAL (spared!)",
        "axillaryCmap": "NORMAL"
      },
      "emgFindings": [
        {
          "muscle": "APB & Opponens (Median C8-T1)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "FPL & FDP 1/2 (AIN C8-T1)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "ADM & FDI (Ulnar C8-T1)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "FCU & FDP 3/4 (Ulnar C8)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "EIP & EDC (Radial C8)",
          "result": "NORMAL (CRUCIAL DISCRIMINATOR: radial C8 fibers run in posterior cord!)"
        },
        {
          "muscle": "Deltoid & Biceps",
          "result": "NORMAL"
        },
        {
          "muscle": "Cervical Paraspinals",
          "result": "NORMAL"
        }
      ],
      "pearls": "How to differentiate Medial Cord from Lower Trunk lesion: Needle EMG of Radial C8 muscles (Extensor Indicis Proprius - EIP). In lower trunk lesions, EIP is ABNORMAL. In medial cord lesions, EIP is SPARED because radial fibers pass through the posterior division into the posterior cord!"
    },
    {
      "id": "radiation-vs-tumor",
      "title": "Radiation Plexopathy vs Neoplastic Brachial Plexopathy",
      "etiology": "Radiation therapy (e.g. breast cancer, lymphoma, Hodgkin) vs Direct tumor invasion (Pancoast lung tumor, metastatic breast).",
      "anatomy": "Radiation typically affects Upper Trunk; Tumor typically invades Lower Trunk / Medial Cord.",
      "clinicalPresentation": "Radiation: Paresthesias, weakness, lymphedema; PAIN IS ABSENT OR MILD. Slow progression over years.<br>Tumor: SEVERE INTRACTABLE PAIN, Horner's syndrome (sympathetic chain invasion), rapid progression over weeks/months.",
      "sensoryLoss": "Radiation: Lateral arm/shoulder/forearm. Tumor: Medial arm/forearm, 4th/5th digits.",
      "ncsFindings": {
        "radiationNcs": "Conduction blocks, focal slowing across plexus, reduced Upper Trunk SNAPs (LAC).",
        "tumorNcs": "Axonal loss, reduced Lower Trunk SNAPs (MABC, Ulnar), low APB/ADM CMAPs."
      },
      "emgFindings": [
        {
          "muscle": "Radiation EMG Hallmark",
          "result": "MYOKYMIC DISCHARGES (grouped repetitive spontaneous firing at 20-70 Hz) and fasciculations in Upper Trunk distribution."
        },
        {
          "muscle": "Neoplastic EMG Hallmark",
          "result": "Active denervation (Fibs/PSWs), reduced recruitment without myokymia, affecting Lower Trunk."
        }
      ],
      "pearls": "MYOKYMIA = RADIATION! Presence of myokymic discharges on needle EMG is pathognomonic for radiation-induced plexopathy. Severe relentless pain and Horner's syndrome strongly point to tumor invasion."
    },
    {
      "id": "preganglionic-avulsion",
      "title": "Pre-Ganglionic Root Avulsion (C5-T1 Traction Injury)",
      "etiology": "High-speed motorcycle collision, severe traction with head and shoulder forced violently apart, tearing rootlets directly from spinal cord.",
      "anatomy": "Tear proximal to Dorsal Root Ganglion (DRG).",
      "clinicalPresentation": "Flail, anesthetic arm. Horner's syndrome present if T1 avulsed. Severe neuropathic deafferentation pain.",
      "sensoryLoss": "Complete sensory anesthesia throughout C5-T1 dermatomes.",
      "ncsFindings": {
        "lacSnap": "NORMAL (AMPLITUDE COMPLETELY PRESERVED!)",
        "radialSensory": "NORMAL (AMPLITUDE PRESERVED!)",
        "medianSensoryD2": "NORMAL (AMPLITUDE PRESERVED!)",
        "mabcSnap": "NORMAL (AMPLITUDE PRESERVED!)",
        "ulnarSnap": "NORMAL (AMPLITUDE PRESERVED!)",
        "medianMotorApb": "Absent or unexcitable CMAP",
        "ulnarMotorAdm": "Absent or unexcitable CMAP",
        "axillaryCmap": "Absent CMAP"
      },
      "emgFindings": [
        {
          "muscle": "Cervical Paraspinals (Dorsal Rami)",
          "result": "4+ PROFUSE FIBRILLATIONS & PSWs (hallmark of preganglionic root lesion)"
        },
        {
          "muscle": "Rhomboids (Dorsal Scapular C5)",
          "result": "4+ Fibs/PSWs (direct root branch denervated)"
        },
        {
          "muscle": "Serratus Anterior (Long Thoracic C5-C7)",
          "result": "4+ Fibs/PSWs (direct root branch denervated)"
        },
        {
          "muscle": "Limb Muscles (Biceps, Deltoid, Triceps, APB)",
          "result": "4+ Fibs/PSWs, complete absence of volitional MUAPs"
        }
      ],
      "pearls": "THE PRE-GANGLIONIC PARADOX: Despite complete clinical anesthesia of the limb, all sensory nerve action potentials (SNAPs) are completely NORMAL! Why? The sensory cell bodies reside in the DRG, which remains intact outside the spinal cord, so postganglionic sensory axons never undergo Wallerian degeneration. Conversely, motor axons undergo complete degeneration, and dorsal rami to paraspinals show profuse denervation."
    },
    {
      "id": "middle-trunk",
      "title": "Middle Trunk Plexopathy (C7 Territory)",
      "etiology": "High-energy traction trauma, compression, or surgical trauma (rare, ~1% of isolated plexopathies).",
      "anatomy": "Middle Trunk (isolated continuation of C7 anterior ramus).",
      "clinicalPresentation": "Weakness of elbow extension (Triceps), wrist extension (ECR/EDC), finger extension (EIP), and forearm pronation (Pronator Teres). Intact shoulder abduction (Deltoid C5-C6) and hand intrinsics (APB/ADM C8-T1).",
      "sensoryLoss": "Palmar and dorsal aspect of middle finger (C7 dermatome).",
      "ncsFindings": {
        "lacSnap": "NORMAL (C5-C6)",
        "radialSensory": "NORMAL or borderline",
        "medianSensoryD2": "NORMAL (C6 contribution)",
        "medianSensoryD3": "ABSENT or markedly reduced (pure C7 sensory fiber)",
        "mabcSnap": "NORMAL (C8-T1)",
        "ulnarSnap": "NORMAL (C8)",
        "medianMotorApb": "NORMAL (C8-T1)",
        "ulnarMotorAdm": "NORMAL (C8-T1)"
      },
      "emgFindings": [
        {
          "muscle": "Triceps (Radial C7)",
          "result": "2+ to 3+ Fibs/PSWs, reduced recruitment"
        },
        {
          "muscle": "Pronator Teres (Median C6-C7)",
          "result": "2+ Fibs/PSWs"
        },
        {
          "muscle": "Flexor Carpi Radialis (Median C6-C7)",
          "result": "2+ Fibs/PSWs"
        },
        {
          "muscle": "Extensor Digitorum Communis (PIN C7-C8)",
          "result": "2+ Fibs/PSWs"
        },
        {
          "muscle": "Deltoid & Biceps (C5-C6)",
          "result": "NORMAL (Upper trunk spared)"
        },
        {
          "muscle": "APB & ADM (C8-T1)",
          "result": "NORMAL (Lower trunk spared)"
        },
        {
          "muscle": "Cervical Paraspinals",
          "result": "NORMAL (Post-ganglionic lesion: spares dorsal rami)"
        }
      ],
      "pearls": "Crucial localizing rule: Middle trunk lesion mimics C7 radiculopathy clinically, but on electrodiagnosis, Median D3 SNAP is reduced (postganglionic) and cervical paraspinals are normal (spared dorsal rami)."
    },
    {
      "id": "radial-neuropathy",
      "title": "Radial Neuropathy at Spiral Groove ('Saturday Night Palsy')",
      "etiology": "Prolonged compression of radial nerve against humeral shaft (drunken sleep, crutch pressure, mid-humeral fracture).",
      "anatomy": "Radial nerve at the mid-shaft spiral (radial) groove of the humerus.",
      "clinicalPresentation": "Classic 'Wrist Drop' and 'Finger Drop': Inability to extend wrist, MCP joints, or thumb. Weakness of brachioradialis. TRICEPS STRENGTH IS NORMAL (branches to triceps arise proximal to spiral groove!).",
      "sensoryLoss": "Superficial Radial territory: Dorsal aspect of first web space, dorsal thumb, index, and long fingers proximal to PIP joints.",
      "ncsFindings": {
        "lacSnap": "NORMAL",
        "radialSensory": "ABSENT or markedly reduced (Superficial Radial SNAP)",
        "medianSensoryD2": "NORMAL",
        "mabcSnap": "NORMAL",
        "ulnarSnap": "NORMAL",
        "radialMotorEip": "Conduction block or marked amplitude drop across spiral groove",
        "medianMotorApb": "NORMAL",
        "ulnarMotorAdm": "NORMAL"
      },
      "emgFindings": [
        {
          "muscle": "Brachioradialis (Radial C5-C6)",
          "result": "3+ Fibs/PSWs, reduced recruitment"
        },
        {
          "muscle": "Extensor Carpi Radialis Longus (Radial C6-C7)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Extensor Digitorum Communis (PIN C7-C8)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Extensor Indicis Proprius (PIN C7-C8)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Triceps Brachii (Radial C7-C8)",
          "result": "NORMAL (KEY LOCALIZER: innervated proximal to spiral groove!)"
        },
        {
          "muscle": "Deltoid (Axillary C5-C6)",
          "result": "NORMAL (excludes Posterior Cord lesion)"
        },
        {
          "muscle": "Latissimus Dorsi (Thoracodorsal C6-C8)",
          "result": "NORMAL (excludes Posterior Cord lesion)"
        }
      ],
      "pearls": "Triceps sparing is the gold standard for spiral groove localization! Normal Deltoid (Axillary) and Latissimus dorsi (Thoracodorsal) rule out a posterior cord lesion."
    },
    {
      "id": "ulnar-neuropathy",
      "title": "Ulnar Neuropathy at the Elbow (Cubital Tunnel Syndrome)",
      "etiology": "Compression at retroepicondylar groove or humeroulnar aponeurotic arcade (Osborne's ligament).",
      "anatomy": "Ulnar nerve as it passes posterior to the medial epicondyle into the cubital tunnel.",
      "clinicalPresentation": "Numbness and tingling in the 5th digit and medial half of 4th digit. Weakness of finger abduction/adduction (interossei), pinch weakness (adductor pollicis), Froment's sign (+), and ulnar claw hand (4th & 5th digits).",
      "sensoryLoss": "Palmar and dorsal medial hand, entire 5th digit and medial 4th digit (involves both palmar digital and Dorsal Ulnar Cutaneous - DUNC branches).",
      "ncsFindings": {
        "lacSnap": "NORMAL",
        "radialSensory": "NORMAL",
        "ulnarSnap": "ABSENT or markedly reduced (digit 5)",
        "duncSnap": "ABSENT or reduced (dorsal ulnar cutaneous - proves lesion at/proximal to elbow!)",
        "mabcSnap": "NORMAL (crucial: rules out lower trunk/medial cord)",
        "medianSensoryD2": "NORMAL",
        "ulnarMotorAdm": "Focal slowing > 10 m/s across elbow or conduction block > 20%",
        "medianMotorApb": "NORMAL"
      },
      "emgFindings": [
        {
          "muscle": "First Dorsal Interosseous (Ulnar C8-T1)",
          "result": "3+ Fibs/PSWs, reduced recruitment"
        },
        {
          "muscle": "Abductor Digiti Minimi (Ulnar C8-T1)",
          "result": "3+ Fibs/PSWs"
        },
        {
          "muscle": "Flexor Digitorum Profundus 3/4 (Ulnar C8)",
          "result": "1+ to 2+ Fibs/PSWs"
        },
        {
          "muscle": "Flexor Carpi Ulnaris (Ulnar C8)",
          "result": "Normal to 1+ Fibs (may be spared if compression is distal in tunnel)"
        },
        {
          "muscle": "Abductor Pollicis Brevis (Median C8-T1)",
          "result": "NORMAL (excludes Lower Trunk / Medial Cord)"
        },
        {
          "muscle": "Extensor Indicis Proprius (Radial C8)",
          "result": "NORMAL (excludes Lower Trunk)"
        }
      ],
      "pearls": "DUNC SNAP & MABC SNAP: In Ulnar neuropathy at the elbow, DUNC SNAP is abnormal (unlike Guyon canal where DUNC is normal). MABC SNAP is NORMAL (unlike Lower Trunk/Medial Cord where MABC is abnormal)."
    },
    {
      "id": "median-carpal-tunnel",
      "title": "Carpal Tunnel Syndrome (CTS) vs Proximal Median Lesion",
      "etiology": "Increased pressure in carpal tunnel under transverse carpal ligament; repetitive wrist motion, tenosynovitis, fluid retention.",
      "anatomy": "Median nerve within the osteofibrous carpal tunnel at the wrist.",
      "clinicalPresentation": "Nocturnal paresthesias in digits 1-3 and radial half of 4. Flick sign positive. Weakness of thumb abduction (APB) and opposition. Palmar thenar sensation is SPARED (palmar cutaneous branch passes over retinaculum).",
      "sensoryLoss": "Volar aspects of thumb, index, middle finger, and radial ring finger. Palmar cutaneous thenar pad is spared.",
      "ncsFindings": {
        "lacSnap": "NORMAL",
        "radialSensory": "NORMAL",
        "medianSensoryD2": "Prolonged peak latency (> 3.5 ms) or transcarpal delay (> 0.4 ms vs ulnar)",
        "mabcSnap": "NORMAL",
        "ulnarSnap": "NORMAL",
        "medianMotorApb": "Prolonged distal motor latency (> 4.2 ms), reduced CMAP in severe axonal loss",
        "ulnarMotorAdm": "NORMAL"
      },
      "emgFindings": [
        {
          "muscle": "Abductor Pollicis Brevis (Median C8-T1)",
          "result": "Fibs/PSWs and neurogenic MUAPs (in axonal/moderate-to-severe CTS)"
        },
        {
          "muscle": "Opponens Pollicis (Median C8-T1)",
          "result": "Fibs/PSWs in moderate-to-severe CTS"
        },
        {
          "muscle": "Pronator Teres (Median C6-C7)",
          "result": "NORMAL (excludes Pronator Teres syndrome & plexopathy)"
        },
        {
          "muscle": "Flexor Pollicis Longus (AIN C8-T1)",
          "result": "NORMAL (excludes Anterior Interosseous syndrome & proximal lesion)"
        },
        {
          "muscle": "Abductor Digiti Minimi (Ulnar C8-T1)",
          "result": "NORMAL"
        },
        {
          "muscle": "Cervical Paraspinals",
          "result": "NORMAL"
        }
      ],
      "pearls": "Palmar cutaneous sparing is anatomical proof: Palmar cutaneous branch branches 5-6 cm proximal to the wrist and does NOT enter the carpal tunnel! If thenar eminence sensation is numb, look proximal to the wrist (Pronator syndrome or plexopathy)."
    }
  ],
  "caseQuiz": [
    {
      "id": "case-1",
      "caseNum": 1,
      "vignette": "A 42-year-old cyclist collided with a car and landed forcefully on the right shoulder with the neck bent to the left. On physical examination 4 weeks later, right shoulder abduction and elbow flexion are 1/5. Biceps and brachioradialis reflexes are absent. Triceps reflex and hand grip strength are 5/5. Sensation is decreased over the lateral shoulder, lateral forearm, and thumb.",
      "question": "Which electrodiagnostic finding would definitively localize this lesion to the Superior Trunk of the brachial plexus rather than a C5/C6 radiculopathy?",
      "options": [
        {
          "text": "Reduced CMAP amplitude of the axillary nerve recording deltoid",
          "correct": false,
          "explanation": "Axillary CMAP reduction occurs in both upper trunk plexopathy and severe C5/C6 radiculopathy."
        },
        {
          "text": "Reduced or absent Lateral Antebrachial Cutaneous (LAC) SNAP with normal cervical paraspinal EMG",
          "correct": true,
          "explanation": "Correct! In post-ganglionic upper trunk plexopathy, the sensory axon degenerates distal to the DRG causing a reduced/absent LAC SNAP, while dorsal rami (paraspinals) are spared. In C5/C6 radiculopathy, the SNAP is preserved and paraspinals show denervation."
        },
        {
          "text": "Fibrillations and positive sharp waves in the Deltoid and Biceps",
          "correct": false,
          "explanation": "Both muscles are C5-C6 innervated and will show denervation in either upper trunk plexopathy or C5/C6 radiculopathy."
        },
        {
          "text": "Prolonged median motor distal latency recording APB",
          "correct": false,
          "explanation": "APB is C8-T1 lower trunk/medial cord innervated and should be completely normal in upper trunk lesions."
        }
      ]
    },
    {
      "id": "case-2",
      "caseNum": 2,
      "vignette": "A 34-year-old woman presents with progressive weakness and muscle wasting in her right hand over 18 months, accompanied by aching along the medial forearm. Physical exam reveals marked wasting of the right thenar eminence (abductor pollicis brevis) with milder wasting of hypothenar muscles. Sensation is decreased along the medial forearm and 5th digit. Cervical spine MRI is unremarkable.",
      "question": "What is the most likely diagnosis, and what is the single most sensitive electrodiagnostic finding?",
      "options": [
        {
          "text": "Severe Carpal Tunnel Syndrome; prolonged median distal sensory latency",
          "correct": false,
          "explanation": "CTS would not explain medial forearm pain/numbness, hypothenar weakness, or MABC abnormalities."
        },
        {
          "text": "True Neurogenic Thoracic Outlet Syndrome; absent or reduced Medial Antebrachial Cutaneous (MABC) SNAP",
          "correct": true,
          "explanation": "Correct! The 'Gilliatt-Sumner hand' (profound APB wasting out of proportion to hypothenar) due to lower trunk fibrous band compression has the hallmark EDX feature of an absent or attenuated MABC SNAP."
        },
        {
          "text": "Cubital Tunnel Syndrome; focal slowing of ulnar motor velocity across the elbow",
          "correct": false,
          "explanation": "Cubital tunnel syndrome does not cause APB wasting or medial forearm (MABC) sensory deficit."
        },
        {
          "text": "Amyotrophic Lateral Sclerosis; widespread fasciculations in 3 body regions",
          "correct": false,
          "explanation": "ALS is a pure motor disease and cannot cause sensory loss or reduced SNAPs."
        }
      ]
    },
    {
      "id": "case-3",
      "caseNum": 3,
      "vignette": "A 58-year-old woman with a history of left breast cancer treated with lumpectomy and axillary radiation therapy 6 years ago presents with slowly progressive left arm stiffness and weakness. Needle EMG of the deltoid, biceps, and infraspinatus reveals spontaneous rhythmic bursts of motor units firing in groups at 35 Hz every 1.2 seconds ('marching soldiers' sound).",
      "question": "What is this spontaneous needle EMG finding, and what does it indicate?",
      "options": [
        {
          "text": "Fasciculation potentials indicative of motor neuron disease",
          "correct": false,
          "explanation": "Fasciculations fire irregularly at slow random intervals, not in rhythmic bursts."
        },
        {
          "text": "Myokymic discharges pathognomonic for radiation-induced brachial plexopathy",
          "correct": true,
          "explanation": "Correct! Myokymic discharges (grouped spontaneous repetitive discharges of single MUAPs at 20-70 Hz) are the hallmark electrodiagnostic signature of radiation plexopathy, distinguishing it from tumor recurrence."
        },
        {
          "text": "Complex repetitive discharges indicating chronic radiculopathy",
          "correct": false,
          "explanation": "CRDs have a rapid machine-gun sound with abrupt start and stop, rather than rhythmic grouping."
        },
        {
          "text": "Neuromyotonic discharges indicating Isaacs syndrome",
          "correct": false,
          "explanation": "Neuromyotonia fires at 150-300 Hz with waning amplitudes ('pinging')."
        }
      ]
    },
    {
      "id": "case-4",
      "caseNum": 4,
      "vignette": "A 22-year-old motorcyclist suffered a high-speed crash with severe left arm traction. Three weeks later, he has total flaccid paralysis and complete sensory anesthesia of the left upper limb, along with left ptosis and miosis. On NCS, the Median (D2), Ulnar (D5), Superficial Radial, and LAC SNAPs are all completely normal in amplitude.",
      "question": "How do you explain the presence of normal sensory nerve action potentials in a completely paralyzed and anesthetic arm?",
      "options": [
        {
          "text": "The sensory test was performed too early before Wallerian degeneration occurred",
          "correct": false,
          "explanation": "3 weeks is well beyond the 7-10 days required for sensory Wallerian degeneration."
        },
        {
          "text": "The patient has functional neurological disorder / conversion disorder",
          "correct": false,
          "explanation": "Ptosis/miosis (Horner's) and severe traction cannot be explained by functional disorder."
        },
        {
          "text": "Pre-ganglionic root avulsion: the lesion is proximal to the dorsal root ganglion, leaving the ganglion cell body and peripheral sensory axons intact",
          "correct": true,
          "explanation": "Correct! The pre-ganglionic paradox: rootlets are avulsed from the spinal cord proximal to the DRG. Peripheral sensory axons stay connected to their cell bodies in the DRG and never undergo Wallerian degeneration, keeping SNAPs normal despite clinical anesthesia."
        },
        {
          "text": "The patient has neuropraxia of all brachial plexus cords",
          "correct": false,
          "explanation": "Complete flaccidity, Horner's syndrome, and paraspinal denervation indicate severe axonotmesis/neurotmesis."
        }
      ]
    },
    {
      "id": "case-5",
      "caseNum": 5,
      "vignette": "A patient presents with weakness in wrist and finger extension. Needle EMG demonstrates fibrillation potentials in Extensor Indicis Proprius (EIP), Extensor Digitorum Communis (EDC), Extensor Carpi Ulnaris (ECU), and Abductor Pollicis Longus (APL). However, Brachioradialis, Extensor Carpi Radialis Longus (ECRL), and Triceps are completely normal. Superficial Radial SNAP is normal.",
      "question": "Where is the lesion localized?",
      "options": [
        {
          "text": "Radial nerve in the spiral groove of the humerus",
          "correct": false,
          "explanation": "Spiral groove lesions involve Brachioradialis and cause superficial radial sensory loss."
        },
        {
          "text": "Posterior Cord of the brachial plexus",
          "correct": false,
          "explanation": "Posterior cord lesions cause weakness in Deltoid, Latissimus, Triceps, and Brachioradialis."
        },
        {
          "text": "Posterior Interosseous Nerve (PIN) at the Arcade of Frohse",
          "correct": true,
          "explanation": "Correct! PIN branches off radial nerve after ECRL and Brachioradialis innervation, and carries no cutaneous sensory fibers. Hence ECRL/BR/Triceps are spared and Superficial Radial SNAP is completely normal!"
        },
        {
          "text": "C7 Radiculopathy",
          "correct": false,
          "explanation": "C7 radiculopathy would typically involve Triceps and Pronator Teres (median)."
        }
      ]
    },
    {
      "id": "case-6",
      "caseNum": 6,
      "vignette": "A PM&R physician is evaluating an electrodiagnostic study to differentiate a Lower Trunk Brachial Plexopathy from a Medial Cord Lesion. Weakness is present in APB, FPL, and FDI.",
      "question": "Which single muscle examination on needle EMG is the most decisive to separate Lower Trunk from Medial Cord?",
      "options": [
        {
          "text": "Abductor Digiti Minimi (ADM)",
          "correct": false,
          "explanation": "ADM is ulnar-innervated and abnormal in both lower trunk and medial cord lesions."
        },
        {
          "text": "Extensor Indicis Proprius (EIP)",
          "correct": true,
          "explanation": "Correct! EIP is innervated by Radial/PIN from C8 roots via the Posterior Division of the Lower Trunk. In a Lower Trunk lesion, EIP is abnormal. In a Medial Cord lesion, the posterior division and cord are spared, so EIP is completely normal!"
        },
        {
          "text": "Flexor Carpi Radialis (FCR)",
          "correct": false,
          "explanation": "FCR is C6-C7 lateral cord innervated and normal in both."
        },
        {
          "text": "Biceps Brachii",
          "correct": false,
          "explanation": "Biceps is C5-C6 upper trunk/lateral cord innervated."
        }
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.PLEXUS_DATA = PLEXUS_DATA;
}

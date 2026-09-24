/**
 * Brachial Plexus Electrodiagnostic & Clinical Anatomy Database
 * References:
 * 1. Preston & Shapiro: Electromyography and Neuromuscular Disorders (4th Ed. 2020)
 * 2. Perotto: Anatomical Guide for the Electromyographer (5th Ed. 2011)
 * 3. Donald A. Neumann: Kinesiology of the Musculoskeletal System - Appendix II Part B
 * 4. McLean EMG Guide (2019) & Easy EMG (Weiss, 2022)
 */

const PLEXUS_DATA = {
  segments: {
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
            "branches": []
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
            "branches": []
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
            "desc": "Terminal branch of Lateral Cord. Pierces coracobrachialis. Innervates anterior arm flexors and terminates as LAC sensory nerve."
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
            "desc": "Passes through quadrangular space with posterior circumflex humeral artery. Innervates deltoid & teres minor."
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
            "desc": "Largest terminal branch of posterior cord. Traverses triangular interval and spirals around humerus in radial groove."
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
            "desc": "Formed by union of Lateral Root (C5-C7) and Medial Root (C8-T1) anterior to 3rd part of axillary artery ('M' shape)."
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
            "desc": "Direct terminal branch of Medial Cord. Descends medial arm, passes retroepicondylar groove into cubital tunnel."
        }
    ]
},

  collateralBranches: [
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
        "landmark": "Descends medial side of axillary and brachial veins, pierces deep fascia at mid-arm."
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
        "landmark": "Passes medial to brachial artery, pierces deep fascia with basilic vein at lower third of arm."
    }
],

  muscles: [
    {
        "name": "Rhomboid Major & Minor",
        "nerve": "Dorsal Scapular Nerve",
        "roots": "C5",
        "trunk": "Root level (pre-plexus)",
        "cord": "Root branch",
        "action": "Scapular retraction and downward rotation.",
        "mmt": "Prone, arm internally rotated with dorsum of hand resting on lumbar spine; patient lifts hand off back.",
        "perottoLandmark": "Midway between spine and inferior angle of scapula, just medial to the vertebral border. Electrode traverses middle trapezius.",
        "danger": "Pneumothorax: Insert needle obliquely toward scapula or tangentially over rib cage; avoid deep vertical thrusts.",
        "pmrPearls": "Direct C5 root test. Preserved in Upper Trunk lesions (Erb's); abnormal in C5 preganglionic root avulsions."
    },
    {
        "name": "Serratus Anterior",
        "nerve": "Long Thoracic Nerve",
        "roots": "C5, C6, C7",
        "trunk": "Root level (pre-plexus)",
        "cord": "Root branch",
        "action": "Scapular protraction and upward rotation; stabilizes scapula against thoracic cage.",
        "mmt": "Supine or sitting with arm flexed to 90 degrees; patient punches forward against resistance.",
        "perottoLandmark": "Mid-axillary line over the 5th or 6th rib, just lateral to inferior angle of scapula, or over rib surface.",
        "danger": "HIGH PNEUMOTHORAX RISK: Always angle needle tangentially onto the flat surface of the rib; never insert into intercostal spaces.",
        "pmrPearls": "Essential for root vs trunk localization. Winging of scapula with normal SNAP confirms root avulsion or isolated long thoracic injury."
    },
    {
        "name": "Supraspinatus",
        "nerve": "Suprascapular Nerve",
        "roots": "C5, C6",
        "trunk": "Superior Trunk",
        "cord": "Trunk branch",
        "action": "Initiation of shoulder abduction (first 15 degrees).",
        "mmt": "Seated, arm abducted 15-30 degrees in the scapular plane with thumb pointed downward ('empty can' position).",
        "perottoLandmark": "Supraspinous fossa, 2 cm above the midpoint of the scapular spine, directed slightly anteriorly.",
        "danger": "Pneumothorax / suprascapular artery puncture: Traverses trapezius. Keep needle angled toward bone floor.",
        "pmrPearls": "Key muscle for Upper Trunk plexopathy vs C5 radiculopathy vs isolated suprascapular nerve entrapment."
    },
    {
        "name": "Infraspinatus",
        "nerve": "Suprascapular Nerve",
        "roots": "C5, C6",
        "trunk": "Superior Trunk",
        "cord": "Trunk branch",
        "action": "External rotation of the humerus.",
        "mmt": "Prone or sitting, elbow at 90 degrees; patient externally rotates forearm against resistance.",
        "perottoLandmark": "Infraspinous fossa, 2 cm below the spine of the scapula, midway between vertebral border and acromion.",
        "danger": "Direct needle into infraspinous fossa bone floor; avoid going too far laterally into the glenohumeral joint.",
        "pmrPearls": "Spinoglenoid notch cyst (ganglion cyst) selectively denervates Infraspinatus while sparing Supraspinatus!"
    },
    {
        "name": "Deltoid (Middle Head)",
        "nerve": "Axillary Nerve",
        "roots": "C5, C6",
        "trunk": "Superior Trunk",
        "cord": "Posterior Cord",
        "action": "Shoulder abduction from 15 to 90 degrees.",
        "mmt": "Seated, arm abducted to 90 degrees with neutral rotation against downward force at elbow.",
        "perottoLandmark": "Middle of the lateral aspect of the arm, 3-5 cm below the lateral tip of the acromion.",
        "danger": "Low risk. Superficial muscle; avoid excessive depth to prevent periosteal contact with humeral shaft.",
        "pmrPearls": "Tested in C5/C6 radiculopathy, upper trunk, posterior cord, and axillary neuropathy (shoulder dislocation)."
    },
    {
        "name": "Biceps Brachii",
        "nerve": "Musculocutaneous Nerve",
        "roots": "C5, C6",
        "trunk": "Superior Trunk",
        "cord": "Lateral Cord",
        "action": "Forearm supination and elbow flexion.",
        "mmt": "Supine or sitting, elbow flexed to 90 degrees and forearm fully supinated against extension resistance.",
        "perottoLandmark": "Mid-belly of the muscle on anterior aspect of arm, 3 fingerbreadths above antecubital fossa.",
        "danger": "Medially lies the brachial artery and median nerve. Stay strictly in muscle belly center.",
        "pmrPearls": "Together with Deltoid and Infraspinatus forms the hallmark 'Upper Trunk triad'."
    },
    {
        "name": "Brachioradialis",
        "nerve": "Radial Nerve",
        "roots": "C5, C6",
        "trunk": "Superior Trunk",
        "cord": "Posterior Cord",
        "action": "Elbow flexion in mid-prone (neutral) forearm position.",
        "mmt": "Forearm in neutral position (thumb up), elbow flexed to 90 degrees against flexion resistance.",
        "perottoLandmark": "Anterolateral surface of proximal forearm, 3-5 cm distal to lateral epicondyle.",
        "danger": "Superficial branch of radial nerve runs beneath muscle in forearm; keep needle centered.",
        "pmrPearls": "Crucial discriminator: Weak in C5/C6 or Upper Trunk or high Radial lesion; SPARED in PIN lesions and C7 radiculopathy."
    },
    {
        "name": "Pronator Teres",
        "nerve": "Median Nerve",
        "roots": "C6, C7",
        "trunk": "Superior & Middle Trunks",
        "cord": "Lateral Cord (mainly)",
        "action": "Forearm pronation and weak elbow flexion.",
        "mmt": "Elbow flexed, patient pronates forearm from supinated position against resistance.",
        "perottoLandmark": "2 fingerbreadths (3-4 cm) distal to medial epicondyle on a line drawn to the mid-radius.",
        "danger": "Brachial/median artery and median nerve lie medially. Insert carefully into muscle bulk.",
        "pmrPearls": "Distinguishes C7 radiculopathy (PT abnormal, triceps abnormal) from Radial neuropathy (PT normal!)."
    },
    {
        "name": "Triceps Brachii (Long & Lateral Heads)",
        "nerve": "Radial Nerve",
        "roots": "C6, C7, C8 (predom C7)",
        "trunk": "Middle Trunk (predominant)",
        "cord": "Posterior Cord",
        "action": "Elbow extension.",
        "mmt": "Prone or sitting, shoulder abducted 90 degrees, elbow extending against resistance.",
        "perottoLandmark": "Posterior arm, midway between acromion and olecranon process (lateral head lateral to midline; long head medial).",
        "danger": "Radial nerve in radial groove is deep to lateral head; avoid excessive needle depth.",
        "pmrPearls": "The primary C7 myotome marker. Preserved in Posterior Interosseous Nerve (PIN) entrapment."
    },
    {
        "name": "Extensor Carpi Radialis Longus (ECRL)",
        "nerve": "Radial Nerve (main trunk)",
        "roots": "C6, C7",
        "trunk": "Upper & Middle Trunks",
        "cord": "Posterior Cord",
        "action": "Wrist extension and radial deviation.",
        "mmt": "Extend and radially deviate wrist with fingers relaxed against resistance.",
        "perottoLandmark": "2-3 cm distal to lateral epicondyle, just lateral to brachioradialis border.",
        "danger": "Low risk. Superficial insertion.",
        "pmrPearls": "Branches above the elbow from main radial nerve: SPARED in PIN palsy (causes radial wrist extension without finger drop!)."
    },
    {
        "name": "Extensor Digitorum Communis (EDC)",
        "nerve": "Posterior Interosseous Nerve (PIN)",
        "roots": "C7, C8",
        "trunk": "Middle & Lower Trunks",
        "cord": "Posterior Cord",
        "action": "Extension of MCP joints of digits 2 through 5.",
        "mmt": "Forearm pronated, extend fingers at MCP joints against resistance on proximal phalanges.",
        "perottoLandmark": "Dorsal forearm, junction of proximal and middle thirds, between extensor carpi ulnaris and extensor carpi radialis.",
        "danger": "Avoid deep penetration into interosseous membrane.",
        "pmrPearls": "Denervated in PIN palsy, radial neuropathy, and posterior cord lesion; sensory testing (superficial radial SNAP) differentiates PIN (normal) from high radial/posterior cord (abnormal)."
    },
    {
        "name": "Extensor Indicis Proprius (EIP)",
        "nerve": "Posterior Interosseous Nerve (PIN)",
        "roots": "C7, C8",
        "trunk": "Middle & Lower Trunks",
        "cord": "Posterior Cord",
        "action": "Isolated extension of the index finger.",
        "mmt": "Fist closed, patient points index finger straight out against downward resistance.",
        "perottoLandmark": "2 fingerbreadths proximal to ulnar styloid on dorsal aspect of forearm, just radial to ulna.",
        "danger": "Low risk. Reliable muscle for routine Radial Motor NCS recording (CMAP).",
        "pmrPearls": "Most distal muscle supplied by radial nerve / PIN. Standard recording site for radial CMAP and terminal PIN needle exam."
    },
    {
        "name": "Flexor Carpi Radialis (FCR)",
        "nerve": "Median Nerve",
        "roots": "C6, C7",
        "trunk": "Upper & Middle Trunks",
        "cord": "Lateral Cord",
        "action": "Wrist flexion and radial deviation.",
        "mmt": "Flex and radially deviate wrist against resistance.",
        "perottoLandmark": "Proximal anterior forearm, 4 fingerbreadths distal to antecubital crease, lateral to palmaris longus tendon.",
        "danger": "Radial artery lies laterally; median nerve runs deep/medial. Palpate tendon before insertion.",
        "pmrPearls": "C7 median muscle. Differentiates C7 radiculopathy from Radial neuropathy (both have weak wrist extension/triceps, but FCR abnormal only in C7)."
    },
    {
        "name": "Flexor Pollicis Longus (FPL)",
        "nerve": "Anterior Interosseous Nerve (AIN - Median)",
        "roots": "C8, T1",
        "trunk": "Lower Trunk",
        "cord": "Medial & Lateral Cords",
        "action": "Flexion of the interphalangeal joint of the thumb ('OK sign').",
        "mmt": "Patient flexes thumb IP joint against resistance while examiner stabilizes proximal phalanx.",
        "perottoLandmark": "Anterior surface of radius, junction of middle and distal thirds of forearm, lateral to FCR tendon.",
        "danger": "Radial artery laterally. Angle needle directly onto volar surface of radius.",
        "pmrPearls": "Key muscle for Anterior Interosseous Neuropathy (Kiloh-Nevin) and Lower Trunk plexopathy."
    },
    {
        "name": "Flexor Digitorum Profundus (FDP 1 & 2)",
        "nerve": "Anterior Interosseous Nerve (AIN - Median)",
        "roots": "C8, T1",
        "trunk": "Lower Trunk",
        "cord": "Medial & Lateral Cords",
        "action": "Flexion of distal interphalangeal (DIP) joints of index and middle fingers.",
        "mmt": "Flex DIP joint of index finger while PIP joint is stabilized in extension.",
        "perottoLandmark": "Volar forearm, midway between elbow and wrist, deep to FDS muscle belly.",
        "danger": "Median nerve and anterior interosseous neurovascular bundle run adjacent.",
        "pmrPearls": "AIN innervates FDP 1 & 2, while Ulnar nerve innervates FDP 3 & 4. Dual innervation test for lower trunk vs ulnar nerve."
    },
    {
        "name": "Flexor Carpi Ulnaris (FCU)",
        "nerve": "Ulnar Nerve",
        "roots": "C8, T1",
        "trunk": "Lower Trunk",
        "cord": "Medial Cord",
        "action": "Wrist flexion and ulnar deviation.",
        "mmt": "Flex and ulnar-deviate wrist against resistance at hypothenar eminence.",
        "perottoLandmark": "Ulnar border of proximal forearm, 3-4 fingerbreadths distal to medial epicondyle, along ulna.",
        "danger": "Ulnar nerve and artery pass deep to FCU between its two humeral and ulnar heads.",
        "pmrPearls": "Most proximal ulnar-innervated muscle. Spared in Guyon's canal entrapment; abnormal in cubital tunnel and medial cord/lower trunk."
    },
    {
        "name": "Abductor Pollicis Brevis (APB)",
        "nerve": "Median Nerve (Recurrent Motor)",
        "roots": "C8, T1",
        "trunk": "Lower Trunk",
        "cord": "Medial Cord (via Medial Root of Median)",
        "action": "Thumb abduction perpendicular to plane of palm.",
        "mmt": "Palm supine, elevate thumb straight upward towards ceiling against downward pressure.",
        "perottoLandmark": "Midpoint of the thenar eminence on the radial border of the hand.",
        "danger": "Very superficial. Insert at 45 degree angle into subcutaneous muscle belly; avoid deep carpal ligaments.",
        "pmrPearls": "Crucial for Carpal Tunnel Syndrome, C8 radiculopathy, and True Neurogenic TOS (Gilliatt-Sumner hand: severe APB atrophy out of proportion to hypothenar!)."
    },
    {
        "name": "First Dorsal Interosseous (FDI)",
        "nerve": "Deep Branch of Ulnar Nerve",
        "roots": "C8, T1",
        "trunk": "Lower Trunk",
        "cord": "Medial Cord",
        "action": "Index finger abduction towards thumb (radial abduction).",
        "mmt": "Abduct index finger against resistance applied to lateral side of proximal phalanx.",
        "perottoLandmark": "Dorsal web space between thumb and index metacarpal, midway along the 2nd metacarpal shaft.",
        "danger": "Radial artery passes through first interosseous space. Keep needle tangential away from deep carpal base.",
        "pmrPearls": "Terminal muscle of deep ulnar motor branch. Essential marker for ulnar neuropathy, C8 radiculopathy, and lower trunk plexopathy."
    },
    {
        "name": "Abductor Digiti Minimi (ADM)",
        "nerve": "Ulnar Nerve",
        "roots": "C8, T1",
        "trunk": "Lower Trunk",
        "cord": "Medial Cord",
        "action": "Abduction of 5th digit (little finger).",
        "mmt": "Abduct little finger away from ring finger against resistance.",
        "perottoLandmark": "Ulnar border of palm, midway along the 5th metacarpal bone.",
        "danger": "Superficial muscle; avoid passing deep to avoid hypothenar branch of ulnar artery.",
        "pmrPearls": "Standard recording site for routine Ulnar Motor Conduction Study (CMAP)."
    },
    {
        "name": "Latissimus Dorsi",
        "nerve": "Thoracodorsal Nerve",
        "roots": "C6, C7, C8",
        "trunk": "Upper, Middle, Lower Trunks",
        "cord": "Posterior Cord",
        "action": "Shoulder extension, adduction, internal rotation ('cough muscle').",
        "mmt": "Prone or sitting, patient pushes arm down and backward against resistance or coughs vigorously.",
        "perottoLandmark": "Posterior axillary fold, pinch muscle fold between thumb and fingers, insert into anterior aspect.",
        "danger": "Thoracic wall and pleura lie deep. Pinch fold firmly away from rib cage to eliminate pneumothorax risk.",
        "pmrPearls": "Tested to distinguish Posterior Cord lesion from high Radial neuropathy."
    },
    {
        "name": "Cervical Paraspinals (Multifidus/Rotatores)",
        "nerve": "Dorsal Primary Rami of Cervical Nerves",
        "roots": "C5 - T1",
        "trunk": "Pre-plexus (proximal to ventral rami)",
        "cord": "Pre-plexus",
        "action": "Cervical spine extension, rotation, and lateral bending.",
        "mmt": "Prone, extend neck against gentle resistance.",
        "perottoLandmark": "1.5 to 2.0 cm lateral to cervical spinous processes (C5-C8 levels), needle inserted perpendicularly to lamina.",
        "danger": "Never insert into interspinous space; keep needle on bony lamina to prevent entering spinal canal or vertebral artery.",
        "pmrPearls": "THE GOLD STANDARD PRE-GANGLIONIC MARKER: Fibrillations in paraspinals = Radiculopathy / Root avulsion. Normal paraspinals = Plexopathy or distal neuropathy!"
    }
],

  rootDistributionTable: [
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
        "c7": "minor",
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
        "c8": "minor",
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
        "c7": "minor",
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
        "c7": "minor",
        "c8": "major",
        "t1": "minor"
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
        "c7": "minor",
        "c8": "-",
        "t1": "-"
    },
    {
        "muscle": "Biceps brachii",
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
        "muscle": "Triceps brachii",
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
        "c7": "minor",
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
        "muscle": "Extensor digitorum (communis)",
        "nerve": "PIN (Radial)",
        "c1": "-",
        "c2": "-",
        "c3": "-",
        "c4": "-",
        "c5": "-",
        "c6": "minor",
        "c7": "major",
        "c8": "minor",
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
        "c8": "minor",
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
        "c8": "minor",
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
        "c8": "minor",
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
        "c8": "minor",
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
        "c8": "minor",
        "t1": "-"
    },
    {
        "muscle": "Extensor indicis (proprius)",
        "nerve": "PIN (Radial)",
        "c1": "-",
        "c2": "-",
        "c3": "-",
        "c4": "-",
        "c5": "-",
        "c6": "minor",
        "c7": "major",
        "c8": "minor",
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

  peripheralNervesDetail: {
    "radial": {
        "name": "Radial Nerve",
        "roots": "C5, C6, C7, C8 (\u00b1 T1)",
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
                        "notes": "\u2b50 CRUCIAL PM&R LANDMARK: Branches 5-8 cm above wrist. DUNC SNAP is abnormal in Cubital Tunnel Syndrome, but NORMAL in Guyon's Canal lesions!"
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
        "thaiMnemonic": "\u0e42\u0e1b - \u0e02\u0e2d - \u0e1b\u0e32\u0e25\u0e4c\u0e21 - \u0e14\u0e35  |  AIN: \u0e14\u0e35 - \u0e42\u0e1b\u0e49\u0e07 - \u0e42\u0e1b  |  Carpal Tunnel: AFO",
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
                "clinical": "Numbness, tingling in lateral 3\u00bd digits; nocturnal waking; thenar atrophy (APB); Palmar cutaneous branch is SPARED (palm sensation normal); Phalen and Tinel positive."
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
                "mnemonic": "\u0e42\u0e1b - \u0e02\u0e2d - \u0e1b\u0e32\u0e25\u0e4c\u0e21 - \u0e14\u0e35",
                "branches": [
                    {
                        "name": "1. \u0e42\u0e1b\u0e23: Pronator Teres (PT)",
                        "innervation": "Pronator teres (C6, C7) - passes between its 2 heads",
                        "type": "Motor"
                    },
                    {
                        "name": "2. \u0e02\u0e2d: Flexor Carpi Radialis (FCR)",
                        "innervation": "Flexor carpi radialis (C6, C7)",
                        "type": "Motor"
                    },
                    {
                        "name": "3. \u0e1b\u0e32\u0e25\u0e4c\u0e21: Palmaris Longus (PL)",
                        "innervation": "Palmaris longus (C7, C8)",
                        "type": "Motor"
                    },
                    {
                        "name": "4. \u0e14\u0e35: Flexor Digitorum Superficialis (FDS)",
                        "innervation": "Flexor digitorum superficialis (C7, C8, T1)",
                        "type": "Motor"
                    }
                ]
            },
            {
                "level": "3. Anterior Interosseous Nerve (AIN) - Pure Motor Branch",
                "mnemonic": "\u0e14\u0e35 - \u0e42\u0e1b\u0e49\u0e07 - \u0e42\u0e1b  (Loss of 'OK' sign)",
                "branches": [
                    {
                        "name": "1. \u0e14\u0e35: FDP I & II (Lateral Half)",
                        "innervation": "Flexor digitorum profundus to digits 2 & 3 (C8, T1)",
                        "type": "Motor"
                    },
                    {
                        "name": "2. \u0e42\u0e1b\u0e49\u0e07: Flexor Pollicis Longus (FPL)",
                        "innervation": "Flexor pollicis longus (C8, T1) - flexes thumb IP joint",
                        "type": "Motor"
                    },
                    {
                        "name": "3. \u0e42\u0e1b: Pronator Quadratus (PQ)",
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
                        "notes": "\u2b50 CRITICAL PM&R LANDMARK: Arises PROXIMAL to carpal tunnel and passes superficial to flexor retinaculum. SPARED IN CARPAL TUNNEL SYNDROME!"
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
                        "innervation": "Sensory to palmar surface of lateral 3\u00bd digits (thumb, index, middle, radial ring) and dorsal nail beds; also motor to 1st and 2nd Lumbricals.",
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

  ncsReferences: [
    {
        "study": "Median Sensory (D2)",
        "type": "Antidromic / Orthodromic Sensory",
        "nerve": "Median",
        "roots": "C6, C7",
        "cord": "Lateral Cord",
        "trunk": "Upper & Middle",
        "recording": "Index finger (D2) ring electrodes",
        "stimulating": "Wrist (14 cm proximal to active ring electrode)",
        "normalAmp": "> 20 \u00b5V",
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
        "normalAmp": "> 15 \u00b5V",
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
        "normalAmp": "> 10 \u00b5V (or within 50% of contralateral)",
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
        "normalAmp": "> 10 \u00b5V (or within 50% of contralateral)",
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
        "normalAmp": "> 17 \u00b5V",
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

  clinicalScenarios: [
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
    }
],

  caseQuiz: [
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

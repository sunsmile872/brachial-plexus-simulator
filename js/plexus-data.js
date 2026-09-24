/**
 * Brachial Plexus Electrodiagnostic & Clinical Anatomy Database
 * References:
 * 1. Preston & Shapiro: Electromyography and Neuromuscular Disorders (4th Ed. 2020)
 * 2. Perotto: Anatomical Guide for the Electromyographer (5th Ed. 2011)
 * 3. McLean EMG Guide (2019) & Easy EMG (Weiss, 2022)
 * 4. Braddom's Physical Medicine and Rehabilitation (2020)
 */

const PLEXUS_DATA = {
  segments: {
    roots: [
      { id: "root-c5", name: "C5 Root", level: "Root", roots: ["C5"], desc: "Exits above C5 vertebra through interscalene triangle. Primary contributor to Upper Trunk.", branches: ["dorsal-scapular", "long-thoracic-c5", "phrenic-c5"] },
      { id: "root-c6", name: "C6 Root", level: "Root", roots: ["C6"], desc: "Exits above C6 vertebra through interscalene triangle. Joins C5 to form Upper Trunk.", branches: ["long-thoracic-c6"] },
      { id: "root-c7", name: "C7 Root", level: "Root", roots: ["C7"], desc: "Exits above C7 vertebra through interscalene triangle. Directly continues as Middle Trunk.", branches: ["long-thoracic-c7"] },
      { id: "root-c8", name: "C8 Root", level: "Root", roots: ["C8"], desc: "Exits above T1 vertebra through interscalene triangle. Joins T1 to form Lower Trunk.", branches: [] },
      { id: "root-t1", name: "T1 Root", level: "Root", roots: ["T1"], desc: "Exits below T1 vertebra. Joins C8 to form Lower Trunk. Closely related to sympathetic chain (stellate ganglion).", branches: ["intercostal-t1"] }
    ],
    trunks: [
      { id: "trunk-upper", name: "Superior (Upper) Trunk", level: "Trunk", roots: ["C5", "C6"], desc: "Formed by union of C5 & C6 roots. Crosses posterior triangle of neck over 1st rib. Site of Erb's point.", branches: ["suprascapular", "subclavius"] },
      { id: "trunk-middle", name: "Middle Trunk", level: "Trunk", roots: ["C7"], desc: "Direct continuation of C7 root. Crosses posterior triangle of neck over 1st rib. Gives off NO collateral branches.", branches: [] },
      { id: "trunk-lower", name: "Inferior (Lower) Trunk", level: "Trunk", roots: ["C8", "T1"], desc: "Formed by union of C8 & T1 roots. Lies on 1st rib directly behind subclavian artery. Vulnerable in Neurogenic TOS and Pancoast tumor. No collateral branches.", branches: [] }
    ],
    divisions: [
      { id: "div-upper-ant", name: "Upper Anterior Division", level: "Division", type: "Anterior", roots: ["C5", "C6"], desc: "Directs flexor fibers from Upper Trunk into Lateral Cord.", branches: [] },
      { id: "div-upper-post", name: "Upper Posterior Division", level: "Division", type: "Posterior", roots: ["C5", "C6"], desc: "Directs extensor fibers from Upper Trunk into Posterior Cord.", branches: [] },
      { id: "div-mid-ant", name: "Middle Anterior Division", level: "Division", type: "Anterior", roots: ["C7"], desc: "Directs flexor fibers from Middle Trunk into Lateral Cord.", branches: [] },
      { id: "div-mid-post", name: "Middle Posterior Division", level: "Division", type: "Posterior", roots: ["C7"], desc: "Directs extensor fibers from Middle Trunk into Posterior Cord.", branches: [] },
      { id: "div-lower-ant", name: "Lower Anterior Division", level: "Division", type: "Anterior", roots: ["C8", "T1"], desc: "Directs flexor fibers from Lower Trunk into Medial Cord.", branches: [] },
      { id: "div-lower-post", name: "Lower Posterior Division", level: "Division", type: "Posterior", roots: ["C8", "T1"], desc: "Directs extensor fibers from Lower Trunk into Posterior Cord.", branches: [] }
    ],
    cords: [
      { id: "cord-lateral", name: "Lateral Cord", level: "Cord", roots: ["C5", "C6", "C7"], desc: "Formed by anterior divisions of Upper and Middle trunks. Located lateral to 2nd part of axillary artery under pectoralis minor.", branches: ["lateral-pectoral"] },
      { id: "cord-posterior", name: "Posterior Cord", level: "Cord", roots: ["C5", "C6", "C7", "C8", "T1"], desc: "Formed by posterior divisions of ALL three trunks. Located posterior to 2nd part of axillary artery.", branches: ["upper-subscapular", "thoracodorsal", "lower-subscapular"] },
      { id: "cord-medial", name: "Medial Cord", level: "Cord", roots: ["C8", "T1"], desc: "Continuation of anterior division of Lower Trunk. Located medial to 2nd part of axillary artery.", branches: ["medial-pectoral", "med-cut-arm", "med-cut-forearm"] }
    ],
    terminals: [
      { id: "term-musculocutaneous", name: "Musculocutaneous Nerve", level: "Terminal Branch", roots: ["C5", "C6", "C7"], cord: "Lateral Cord", desc: "Terminal branch of Lateral Cord. Pierces coracobrachialis. Innervates anterior arm flexors and terminates as LAC sensory nerve." },
      { id: "term-axillary", name: "Axillary Nerve", level: "Terminal Branch", roots: ["C5", "C6"], cord: "Posterior Cord", desc: "Passes through quadrangular space with posterior circumflex humeral artery. Innervates deltoid & teres minor." },
      { id: "term-radial", name: "Radial Nerve", level: "Terminal Branch", roots: ["C5", "C6", "C7", "C8", "T1"], cord: "Posterior Cord", desc: "Largest terminal branch of posterior cord. Traverses triangular interval and spirals around humerus in radial groove." },
      { id: "term-median", name: "Median Nerve", level: "Terminal Branch", roots: ["C5", "C6", "C7", "C8", "T1"], cord: "Lateral & Medial Cords", desc: "Formed by union of Lateral Root (C5-C7) and Medial Root (C8-T1) anterior to 3rd part of axillary artery ('M' shape)." },
      { id: "term-ulnar", name: "Ulnar Nerve", level: "Terminal Branch", roots: ["C8", "T1"], cord: "Medial Cord", desc: "Direct terminal branch of Medial Cord. Descends medial arm, passes retroepicondylar groove into cubital tunnel." }
    ]
  },

  collateralBranches: [
    {
      id: "dorsal-scapular",
      name: "Dorsal Scapular Nerve",
      origin: "C5 Root",
      roots: ["C5"],
      muscles: ["Rhomboid Major", "Rhomboid Minor", "Levator Scapulae"],
      clinical: "Spared in Upper Trunk plexopathy; denervated in C5 pre-ganglionic root avulsion. Vital PM&R needle EMG landmark.",
      landmark: "Pierces scalenus medius muscle, descends deep to levator scapulae along vertebral border of scapula."
    },
    {
      id: "long-thoracic",
      name: "Long Thoracic Nerve (Nerve of Bell)",
      origin: "C5, C6, C7 Roots",
      roots: ["C5", "C6", "C7"],
      muscles: ["Serratus Anterior"],
      clinical: "Injury leads to classic medial scapular winging (scapula flips medially upon pushing against a wall). Normal in postganglionic plexopathy.",
      landmark: "Formed by rootlets from C5, C6, C7 on anterior surface of scalenus medius, descends along mid-axillary line on ribs."
    },
    {
      id: "suprascapular",
      name: "Suprascapular Nerve",
      origin: "Superior (Upper) Trunk",
      roots: ["C5", "C6"],
      muscles: ["Supraspinatus", "Infraspinatus"],
      clinical: "Involved in Upper Trunk plexopathy, Parsonage-Turner syndrome, and entrapment at suprascapular or spinoglenoid notch.",
      landmark: "Passes through scapular notch beneath superior transverse scapular ligament ('Navy goes under bridge, Army goes over' - artery over, nerve under)."
    },
    {
      id: "subclavius",
      name: "Nerve to Subclavius",
      origin: "Superior (Upper) Trunk",
      roots: ["C5", "C6"],
      muscles: ["Subclavius"],
      clinical: "Provides accessory phrenic nerve fibers in ~20-30% of population.",
      landmark: "Descends over subclavian vessels to enter postero-superior aspect of subclavius muscle."
    },
    {
      id: "lateral-pectoral",
      name: "Lateral Pectoral Nerve",
      origin: "Lateral Cord",
      roots: ["C5", "C6", "C7"],
      muscles: ["Pectoralis Major (Clavicular Head)"],
      clinical: "Crosses anterior to axillary artery, pierces clavipectoral fascia, communicates with medial pectoral nerve forming ansa pectoralis.",
      landmark: "Runs medially across 1st/2nd parts of axillary artery, pierces clavipectoral fascia with thoracoacromial artery."
    },
    {
      id: "upper-subscapular",
      name: "Upper Subscapular Nerve",
      origin: "Posterior Cord",
      roots: ["C5", "C6"],
      muscles: ["Subscapularis (Upper Fibers)"],
      clinical: "Isolated injury is rare; involved in posterior cord lesions causing internal rotation weakness of shoulder.",
      landmark: "Short nerve emerging high from posterior cord entering upper portion of subscapularis muscle."
    },
    {
      id: "thoracodorsal",
      name: "Thoracodorsal (Middle Subscapular) Nerve",
      origin: "Posterior Cord",
      roots: ["C6", "C7", "C8"],
      muscles: ["Latissimus Dorsi"],
      clinical: "Essential for shoulder adduction, extension, internal rotation, and cough. Tested in posterior cord localization.",
      landmark: "Runs along posterior axillary wall with thoracodorsal artery into the medial surface of latissimus dorsi."
    },
    {
      id: "lower-subscapular",
      name: "Lower Subscapular Nerve",
      origin: "Posterior Cord",
      roots: ["C5", "C6"],
      muscles: ["Subscapularis (Lower Fibers)", "Teres Major"],
      clinical: "Innervates inferior subscapularis and teres major; involved in posterior cord injury.",
      landmark: "Descends along subscapularis, sending branches to its lower half and to teres major."
    },
    {
      id: "medial-pectoral",
      name: "Medial Pectoral Nerve",
      origin: "Medial Cord",
      roots: ["C8", "T1"],
      muscles: ["Pectoralis Minor", "Pectoralis Major (Sternocostal Head)"],
      clinical: "Passes between axillary artery and vein, pierces pectoralis minor to reach pectoralis major.",
      landmark: "Courses through pectoralis minor muscle to supply both pec minor and lower sternal fibers of pec major."
    },
    {
      id: "med-cut-arm",
      name: "Medial Cutaneous Nerve of Arm (Medial Brachial)",
      origin: "Medial Cord",
      roots: ["T1"],
      muscles: [],
      clinical: "Pure sensory nerve. Communicates with intercostobrachial nerve (T2) supplying medial distal arm skin.",
      landmark: "Descends medial side of axillary and brachial veins, pierces deep fascia at mid-arm."
    },
    {
      id: "med-cut-forearm",
      name: "Medial Cutaneous Nerve of Forearm (MABC)",
      origin: "Medial Cord / Lower Trunk",
      roots: ["C8", "T1"],
      muscles: [],
      clinical: "CRITICAL PM&R NCS LANDMARK: Absent or reduced in True Neurogenic TOS and Lower Trunk/Medial Cord plexopathies, but NORMAL in Ulnar neuropathy at the elbow!",
      landmark: "Passes medial to brachial artery, pierces deep fascia with basilic vein at lower third of arm."
    }
  ],

  muscles: [
    {
      name: "Rhomboid Major & Minor",
      nerve: "Dorsal Scapular Nerve",
      roots: "C5",
      trunk: "Root level (pre-plexus)",
      cord: "Root branch",
      action: "Scapular retraction and downward rotation.",
      mmt: "Prone, arm internally rotated with dorsum of hand resting on lumbar spine; patient lifts hand off back.",
      perottoLandmark: "Midway between spine and inferior angle of scapula, just medial to the vertebral border. Electrode traverses middle trapezius.",
      danger: "Pneumothorax: Insert needle obliquely toward scapula or tangentially over rib cage; avoid deep vertical thrusts.",
      pmrPearls: "Direct C5 root test. Preserved in Upper Trunk lesions (Erb's); abnormal in C5 preganglionic root avulsions."
    },
    {
      name: "Serratus Anterior",
      nerve: "Long Thoracic Nerve",
      roots: "C5, C6, C7",
      trunk: "Root level (pre-plexus)",
      cord: "Root branch",
      action: "Scapular protraction and upward rotation; stabilizes scapula against thoracic cage.",
      mmt: "Supine or sitting with arm flexed to 90 degrees; patient punches forward against resistance.",
      perottoLandmark: "Mid-axillary line over the 5th or 6th rib, just lateral to inferior angle of scapula, or over rib surface.",
      danger: "HIGH PNEUMOTHORAX RISK: Always angle needle tangentially onto the flat surface of the rib; never insert into intercostal spaces.",
      pmrPearls: "Essential for root vs trunk localization. Winging of scapula with normal SNAP confirms root avulsion or isolated long thoracic injury."
    },
    {
      name: "Supraspinatus",
      nerve: "Suprascapular Nerve",
      roots: "C5, C6",
      trunk: "Superior Trunk",
      cord: "Trunk branch",
      action: "Initiation of shoulder abduction (first 15 degrees).",
      mmt: "Seated, arm abducted 15-30 degrees in the scapular plane with thumb pointed downward ('empty can' position).",
      perottoLandmark: "Supraspinous fossa, 2 cm above the midpoint of the scapular spine, directed slightly anteriorly.",
      danger: "Pneumothorax / suprascapular artery puncture: Traverses trapezius. Keep needle angled toward bone floor.",
      pmrPearls: "Key muscle for Upper Trunk plexopathy vs C5 radiculopathy vs isolated suprascapular nerve entrapment."
    },
    {
      name: "Infraspinatus",
      nerve: "Suprascapular Nerve",
      roots: "C5, C6",
      trunk: "Superior Trunk",
      cord: "Trunk branch",
      action: "External rotation of the humerus.",
      mmt: "Prone or sitting, elbow at 90 degrees; patient externally rotates forearm against resistance.",
      perottoLandmark: "Infraspinous fossa, 2 cm below the spine of the scapula, midway between vertebral border and acromion.",
      danger: "Direct needle into infraspinous fossa bone floor; avoid going too far laterally into the glenohumeral joint.",
      pmrPearls: "Spinoglenoid notch cyst (ganglion cyst) selectively denervates Infraspinatus while sparing Supraspinatus!"
    },
    {
      name: "Deltoid (Middle Head)",
      nerve: "Axillary Nerve",
      roots: "C5, C6",
      trunk: "Superior Trunk",
      cord: "Posterior Cord",
      action: "Shoulder abduction from 15 to 90 degrees.",
      mmt: "Seated, arm abducted to 90 degrees with neutral rotation against downward force at elbow.",
      perottoLandmark: "Middle of the lateral aspect of the arm, 3-5 cm below the lateral tip of the acromion.",
      danger: "Low risk. Superficial muscle; avoid excessive depth to prevent periosteal contact with humeral shaft.",
      pmrPearls: "Tested in C5/C6 radiculopathy, upper trunk, posterior cord, and axillary neuropathy (shoulder dislocation)."
    },
    {
      name: "Biceps Brachii",
      nerve: "Musculocutaneous Nerve",
      roots: "C5, C6",
      trunk: "Superior Trunk",
      cord: "Lateral Cord",
      action: "Forearm supination and elbow flexion.",
      mmt: "Supine or sitting, elbow flexed to 90 degrees and forearm fully supinated against extension resistance.",
      perottoLandmark: "Mid-belly of the muscle on anterior aspect of arm, 3 fingerbreadths above antecubital fossa.",
      danger: "Medially lies the brachial artery and median nerve. Stay strictly in muscle belly center.",
      pmrPearls: "Together with Deltoid and Infraspinatus forms the hallmark 'Upper Trunk triad'."
    },
    {
      name: "Brachioradialis",
      nerve: "Radial Nerve",
      roots: "C5, C6",
      trunk: "Superior Trunk",
      cord: "Posterior Cord",
      action: "Elbow flexion in mid-prone (neutral) forearm position.",
      mmt: "Forearm in neutral position (thumb up), elbow flexed to 90 degrees against flexion resistance.",
      perottoLandmark: "Anterolateral surface of proximal forearm, 3-5 cm distal to lateral epicondyle.",
      danger: "Superficial branch of radial nerve runs beneath muscle in forearm; keep needle centered.",
      pmrPearls: "Crucial discriminator: Weak in C5/C6 or Upper Trunk or high Radial lesion; SPARED in PIN lesions and C7 radiculopathy."
    },
    {
      name: "Pronator Teres",
      nerve: "Median Nerve",
      roots: "C6, C7",
      trunk: "Superior & Middle Trunks",
      cord: "Lateral Cord (mainly)",
      action: "Forearm pronation and weak elbow flexion.",
      mmt: "Elbow flexed, patient pronates forearm from supinated position against resistance.",
      perottoLandmark: "2 fingerbreadths (3-4 cm) distal to medial epicondyle on a line drawn to the mid-radius.",
      danger: "Brachial/median artery and median nerve lie medially. Insert carefully into muscle bulk.",
      pmrPearls: "Distinguishes C7 radiculopathy (PT abnormal, triceps abnormal) from Radial neuropathy (PT normal!)."
    },
    {
      name: "Triceps Brachii (Long & Lateral Heads)",
      nerve: "Radial Nerve",
      roots: "C6, C7, C8 (predom C7)",
      trunk: "Middle Trunk (predominant)",
      cord: "Posterior Cord",
      action: "Elbow extension.",
      mmt: "Prone or sitting, shoulder abducted 90 degrees, elbow extending against resistance.",
      perottoLandmark: "Posterior arm, midway between acromion and olecranon process (lateral head lateral to midline; long head medial).",
      danger: "Radial nerve in radial groove is deep to lateral head; avoid excessive needle depth.",
      pmrPearls: "The primary C7 myotome marker. Preserved in Posterior Interosseous Nerve (PIN) entrapment."
    },
    {
      name: "Extensor Carpi Radialis Longus (ECRL)",
      nerve: "Radial Nerve (main trunk)",
      roots: "C6, C7",
      trunk: "Upper & Middle Trunks",
      cord: "Posterior Cord",
      action: "Wrist extension and radial deviation.",
      mmt: "Extend and radially deviate wrist with fingers relaxed against resistance.",
      perottoLandmark: "2-3 cm distal to lateral epicondyle, just lateral to brachioradialis border.",
      danger: "Low risk. Superficial insertion.",
      pmrPearls: "Branches above the elbow from main radial nerve: SPARED in PIN palsy (causes radial wrist extension without finger drop!)."
    },
    {
      name: "Extensor Digitorum Communis (EDC)",
      nerve: "Posterior Interosseous Nerve (PIN)",
      roots: "C7, C8",
      trunk: "Middle & Lower Trunks",
      cord: "Posterior Cord",
      action: "Extension of MCP joints of digits 2 through 5.",
      mmt: "Forearm pronated, extend fingers at MCP joints against resistance on proximal phalanges.",
      perottoLandmark: "Dorsal forearm, junction of proximal and middle thirds, between extensor carpi ulnaris and extensor carpi radialis.",
      danger: "Avoid deep penetration into interosseous membrane.",
      pmrPearls: "Denervated in PIN palsy, radial neuropathy, and posterior cord lesion; sensory testing (superficial radial SNAP) differentiates PIN (normal) from high radial/posterior cord (abnormal)."
    },
    {
      name: "Extensor Indicis Proprius (EIP)",
      nerve: "Posterior Interosseous Nerve (PIN)",
      roots: "C7, C8",
      trunk: "Middle & Lower Trunks",
      cord: "Posterior Cord",
      action: "Isolated extension of the index finger.",
      mmt: "Fist closed, patient points index finger straight out against downward resistance.",
      perottoLandmark: "2 fingerbreadths proximal to ulnar styloid on dorsal aspect of forearm, just radial to ulna.",
      danger: "Low risk. Reliable muscle for routine Radial Motor NCS recording (CMAP).",
      pmrPearls: "Most distal muscle supplied by radial nerve / PIN. Standard recording site for radial CMAP and terminal PIN needle exam."
    },
    {
      name: "Flexor Carpi Radialis (FCR)",
      nerve: "Median Nerve",
      roots: "C6, C7",
      trunk: "Upper & Middle Trunks",
      cord: "Lateral Cord",
      action: "Wrist flexion and radial deviation.",
      mmt: "Flex and radially deviate wrist against resistance.",
      perottoLandmark: "Proximal anterior forearm, 4 fingerbreadths distal to antecubital crease, lateral to palmaris longus tendon.",
      danger: "Radial artery lies laterally; median nerve runs deep/medial. Palpate tendon before insertion.",
      pmrPearls: "C7 median muscle. Differentiates C7 radiculopathy from Radial neuropathy (both have weak wrist extension/triceps, but FCR abnormal only in C7)."
    },
    {
      name: "Flexor Pollicis Longus (FPL)",
      nerve: "Anterior Interosseous Nerve (AIN - Median)",
      roots: "C8, T1",
      trunk: "Lower Trunk",
      cord: "Medial & Lateral Cords",
      action: "Flexion of the interphalangeal joint of the thumb ('OK sign').",
      mmt: "Patient flexes thumb IP joint against resistance while examiner stabilizes proximal phalanx.",
      perottoLandmark: "Anterior surface of radius, junction of middle and distal thirds of forearm, lateral to FCR tendon.",
      danger: "Radial artery laterally. Angle needle directly onto volar surface of radius.",
      pmrPearls: "Key muscle for Anterior Interosseous Neuropathy (Kiloh-Nevin) and Lower Trunk plexopathy."
    },
    {
      name: "Flexor Digitorum Profundus (FDP 1 & 2)",
      nerve: "Anterior Interosseous Nerve (AIN - Median)",
      roots: "C8, T1",
      trunk: "Lower Trunk",
      cord: "Medial & Lateral Cords",
      action: "Flexion of distal interphalangeal (DIP) joints of index and middle fingers.",
      mmt: "Flex DIP joint of index finger while PIP joint is stabilized in extension.",
      perottoLandmark: "Volar forearm, midway between elbow and wrist, deep to FDS muscle belly.",
      danger: "Median nerve and anterior interosseous neurovascular bundle run adjacent.",
      pmrPearls: "AIN innervates FDP 1 & 2, while Ulnar nerve innervates FDP 3 & 4. Dual innervation test for lower trunk vs ulnar nerve."
    },
    {
      name: "Flexor Carpi Ulnaris (FCU)",
      nerve: "Ulnar Nerve",
      roots: "C8, T1",
      trunk: "Lower Trunk",
      cord: "Medial Cord",
      action: "Wrist flexion and ulnar deviation.",
      mmt: "Flex and ulnar-deviate wrist against resistance at hypothenar eminence.",
      perottoLandmark: "Ulnar border of proximal forearm, 3-4 fingerbreadths distal to medial epicondyle, along ulna.",
      danger: "Ulnar nerve and artery pass deep to FCU between its two humeral and ulnar heads.",
      pmrPearls: "Most proximal ulnar-innervated muscle. Spared in Guyon's canal entrapment; abnormal in cubital tunnel and medial cord/lower trunk."
    },
    {
      name: "Abductor Pollicis Brevis (APB)",
      nerve: "Median Nerve (Recurrent Motor)",
      roots: "C8, T1",
      trunk: "Lower Trunk",
      cord: "Medial Cord (via Medial Root of Median)",
      action: "Thumb abduction perpendicular to plane of palm.",
      mmt: "Palm supine, elevate thumb straight upward towards ceiling against downward pressure.",
      perottoLandmark: "Midpoint of the thenar eminence on the radial border of the hand.",
      danger: "Very superficial. Insert at 45 degree angle into subcutaneous muscle belly; avoid deep carpal ligaments.",
      pmrPearls: "Crucial for Carpal Tunnel Syndrome, C8 radiculopathy, and True Neurogenic TOS (Gilliatt-Sumner hand: severe APB atrophy out of proportion to hypothenar!)."
    },
    {
      name: "First Dorsal Interosseous (FDI)",
      nerve: "Deep Branch of Ulnar Nerve",
      roots: "C8, T1",
      trunk: "Lower Trunk",
      cord: "Medial Cord",
      action: "Index finger abduction towards thumb (radial abduction).",
      mmt: "Abduct index finger against resistance applied to lateral side of proximal phalanx.",
      perottoLandmark: "Dorsal web space between thumb and index metacarpal, midway along the 2nd metacarpal shaft.",
      danger: "Radial artery passes through first interosseous space. Keep needle tangential away from deep carpal base.",
      pmrPearls: "Terminal muscle of deep ulnar motor branch. Essential marker for ulnar neuropathy, C8 radiculopathy, and lower trunk plexopathy."
    },
    {
      name: "Abductor Digiti Minimi (ADM)",
      nerve: "Ulnar Nerve",
      roots: "C8, T1",
      trunk: "Lower Trunk",
      cord: "Medial Cord",
      action: "Abduction of 5th digit (little finger).",
      mmt: "Abduct little finger away from ring finger against resistance.",
      perottoLandmark: "Ulnar border of palm, midway along the 5th metacarpal bone.",
      danger: "Superficial muscle; avoid passing deep to avoid hypothenar branch of ulnar artery.",
      pmrPearls: "Standard recording site for routine Ulnar Motor Conduction Study (CMAP)."
    },
    {
      name: "Latissimus Dorsi",
      nerve: "Thoracodorsal Nerve",
      roots: "C6, C7, C8",
      trunk: "Upper, Middle, Lower Trunks",
      cord: "Posterior Cord",
      action: "Shoulder extension, adduction, internal rotation ('cough muscle').",
      mmt: "Prone or sitting, patient pushes arm down and backward against resistance or coughs vigorously.",
      perottoLandmark: "Posterior axillary fold, pinch muscle fold between thumb and fingers, insert into anterior aspect.",
      danger: "Thoracic wall and pleura lie deep. Pinch fold firmly away from rib cage to eliminate pneumothorax risk.",
      pmrPearls: "Tested to distinguish Posterior Cord lesion from high Radial neuropathy."
    },
    {
      name: "Cervical Paraspinals (Multifidus/Rotatores)",
      nerve: "Dorsal Primary Rami of Cervical Nerves",
      roots: "C5 - T1",
      trunk: "Pre-plexus (proximal to ventral rami)",
      cord: "Pre-plexus",
      action: "Cervical spine extension, rotation, and lateral bending.",
      mmt: "Prone, extend neck against gentle resistance.",
      perottoLandmark: "1.5 to 2.0 cm lateral to cervical spinous processes (C5-C8 levels), needle inserted perpendicularly to lamina.",
      danger: "Never insert into interspinous space; keep needle on bony lamina to prevent entering spinal canal or vertebral artery.",
      pmrPearls: "THE GOLD STANDARD PRE-GANGLIONIC MARKER: Fibrillations in paraspinals = Radiculopathy / Root avulsion. Normal paraspinals = Plexopathy or distal neuropathy!"
    }
  ],

  ncsReferences: [
    {
      study: "Median Sensory (D2)",
      type: "Antidromic / Orthodromic Sensory",
      nerve: "Median",
      roots: "C6, C7",
      cord: "Lateral Cord",
      trunk: "Upper & Middle",
      recording: "Index finger (D2) ring electrodes",
      stimulating: "Wrist (14 cm proximal to active ring electrode)",
      normalAmp: "> 20 µV",
      normalLatency: "< 3.5 ms",
      normalCV: "> 50 m/s",
      pmrRole: "Abnormal in CTS, Upper/Middle trunk plexopathy, Lateral cord lesions. NORMAL in C6/C7 radiculopathy."
    },
    {
      study: "Superficial Radial Sensory",
      type: "Antidromic Sensory",
      nerve: "Radial",
      roots: "C6, C7",
      cord: "Posterior Cord",
      trunk: "Upper & Middle",
      recording: "Anatomical snuffbox / 1st web space over radial dorsal nerve",
      stimulating: "Lateral radius, 10-12 cm proximal to recording electrode",
      normalAmp: "> 15 µV",
      normalLatency: "< 2.8 ms",
      normalCV: "> 50 m/s",
      pmrRole: "Abnormal in Posterior Cord and high Radial lesions. NORMAL in C6/C7 radiculopathy and PIN palsy."
    },
    {
      study: "Lateral Antebrachial Cutaneous (LAC)",
      type: "Antidromic Sensory",
      nerve: "Musculocutaneous terminal",
      roots: "C5, C6",
      cord: "Lateral Cord",
      trunk: "Superior Trunk",
      recording: "Lateral volar forearm, 12 cm distal to stimulus",
      stimulating: "Lateral to biceps tendon at antecubital crease",
      normalAmp: "> 10 µV (or within 50% of contralateral)",
      normalLatency: "< 3.0 ms",
      normalCV: "> 55 m/s",
      pmrRole: "MOST SENSITIVE TEST FOR UPPER TRUNK PLEXOPATHY. Abnormal in Erb's palsy / lateral cord; spared in C5/C6 radiculopathy."
    },
    {
      study: "Medial Antebrachial Cutaneous (MABC)",
      type: "Antidromic Sensory",
      nerve: "Medial Cord branch",
      roots: "C8, T1",
      cord: "Medial Cord",
      trunk: "Inferior Trunk",
      recording: "Medial forearm, 10-12 cm distal to stimulus",
      stimulating: "Medial epicondyle/axillary groove along basilic vein",
      normalAmp: "> 10 µV (or within 50% of contralateral)",
      normalLatency: "< 3.2 ms",
      normalCV: "> 50 m/s",
      pmrRole: "THE GOLD STANDARD FOR TRUE NEUROGENIC TOS! Severely reduced/absent in lower trunk plexopathy, but NORMAL in ulnar neuropathy at elbow!"
    },
    {
      study: "Ulnar Sensory (D5)",
      type: "Antidromic Sensory",
      nerve: "Ulnar",
      roots: "C8",
      cord: "Medial Cord",
      trunk: "Inferior Trunk",
      recording: "Little finger (D5) ring electrodes",
      stimulating: "Wrist, 14 cm proximal along FCU tendon",
      normalAmp: "> 17 µV",
      normalLatency: "< 3.1 ms",
      normalCV: "> 50 m/s",
      pmrRole: "Abnormal in Ulnar neuropathy and Lower Trunk / Medial Cord plexopathies. NORMAL in C8 radiculopathy."
    },
    {
      study: "Median Motor (APB)",
      type: "Motor Conduction Study (CMAP)",
      nerve: "Median",
      roots: "C8, T1",
      cord: "Medial Cord (via Medial Root)",
      trunk: "Inferior Trunk",
      recording: "Abductor Pollicis Brevis (belly-tendon)",
      stimulating: "Wrist (8 cm proximal) and Antecubital fossa",
      normalAmp: "> 4.0 mV",
      normalLatency: "< 4.4 ms",
      normalCV: "> 50 m/s",
      pmrRole: "Severely attenuated in True TOS (Gilliatt-Sumner hand), lower trunk/medial cord lesions, and severe CTS."
    },
    {
      study: "Ulnar Motor (ADM)",
      type: "Motor Conduction Study (CMAP)",
      nerve: "Ulnar",
      roots: "C8, T1",
      cord: "Medial Cord",
      trunk: "Inferior Trunk",
      recording: "Abductor Digiti Minimi (ADM)",
      stimulating: "Wrist, Below elbow, Above elbow (across cubital tunnel)",
      normalAmp: "> 6.0 mV",
      normalLatency: "< 3.7 ms",
      normalCV: "> 50 m/s (forearm), drop across elbow < 10 m/s",
      pmrRole: "Focal slowing/conduction block across elbow confirms Ulnar Neuropathy at Elbow; diffuse axon loss without focal drop favors Plexopathy."
    },
    {
      study: "Radial Motor (EIP)",
      type: "Motor Conduction Study (CMAP)",
      nerve: "Radial",
      roots: "C7, C8",
      cord: "Posterior Cord",
      trunk: "Middle & Inferior",
      recording: "Extensor Indicis Proprius (EIP)",
      stimulating: "Forearm (distal), Elbow (spiral groove), Lateral arm",
      normalAmp: "> 4.0 mV",
      normalLatency: "< 3.0 ms",
      normalCV: "> 50 m/s",
      pmrRole: "Reduced in Posterior Cord, high radial lesions, or PIN palsy."
    }
  ],

  clinicalScenarios: [
    {
      id: "upper-trunk",
      title: "Erb-Duchenne Palsy (Upper Trunk Plexopathy)",
      etiology: "Motorcycle accident (shoulder-head separation), birth trauma, backpack palsy, or neuralgic amyotrophy.",
      anatomy: "Superior Trunk (C5-C6 junction) lesion.",
      clinicalPresentation: "'Waiter's Tip Deformity': Arm hanging by side, adducted and internally rotated, elbow extended, forearm pronated. Loss of shoulder abduction, external rotation, and elbow flexion. Biceps and brachioradialis reflexes absent.",
      sensoryLoss: "Lateral shoulder (axillary), lateral arm and forearm (LAC), thumb and index finger (C6 dermatome).",
      ncsFindings: {
        lacSnap: "Absent or marked amplitude reduction (>50% vs contralateral)",
        radialSensory: "Reduced amplitude (superficial radial)",
        medianSensoryD2: "Reduced amplitude (C6 contribution)",
        mabcSnap: "NORMAL",
        ulnarSnap: "NORMAL",
        medianMotorApb: "NORMAL (C8-T1)",
        ulnarMotorAdm: "NORMAL (C8-T1)",
        musculocutaneousCmap: "Markedly reduced amplitude at biceps",
        axillaryCmap: "Markedly reduced amplitude at deltoid"
      },
      emgFindings: [
        { muscle: "Deltoid (C5-C6)", result: "3+ Fibs/PSWs, reduced recruitment" },
        { muscle: "Biceps (C5-C6)", result: "3+ Fibs/PSWs, reduced recruitment" },
        { muscle: "Supraspinatus/Infraspinatus (C5-C6)", result: "3+ Fibs/PSWs" },
        { muscle: "Brachioradialis (C5-C6)", result: "2+ Fibs/PSWs" },
        { muscle: "Pronator Teres (C6-C7)", result: "Mild 1+ Fibs or normal" },
        { muscle: "Rhomboids (C5 Root)", result: "NORMAL (spared - branches off root before trunk!)" },
        { muscle: "Serratus Anterior (C5-C7 Root)", result: "NORMAL (spared)" },
        { muscle: "Triceps (C7)", result: "NORMAL" },
        { muscle: "APB & FDI (C8-T1)", result: "NORMAL" },
        { muscle: "Cervical Paraspinals", result: "NORMAL (confirms post-ganglionic trunk lesion)" }
      ],
      pearls: "Key discriminator: Sparing of Rhomboid (dorsal scapular) and Serratus anterior (long thoracic) localizes the lesion distal to roots at the Upper Trunk level! Reduced LAC SNAP proves post-ganglionic lesion."
    },
    {
      id: "lower-trunk",
      title: "Klumpke Palsy (Inferior Trunk Plexopathy)",
      etiology: "Breech delivery with hyperabduction traction, falling from tree grabbing a branch, apical thoracic tumors (Pancoast), or sternotomy traction.",
      anatomy: "Inferior Trunk (C8-T1 junction) lesion.",
      clinicalPresentation: "'True Claw Hand' deformity: Weakness of ALL intrinsic hand muscles (thenar, hypothenar, interossei, lumbricals) + long finger flexors (FDP, FPL). Possible Horner's Syndrome (ptosis, miosis, anhidrosis) if T1 sympathetic white rami communicantes involved.",
      sensoryLoss: "Medial arm (medial brachial cutaneous), medial forearm (MABC), 4th and 5th digits (ulnar C8 territory).",
      ncsFindings: {
        lacSnap: "NORMAL",
        radialSensory: "NORMAL",
        medianSensoryD2: "NORMAL",
        mabcSnap: "ABSENT or severely reduced",
        ulnarSnap: "Markedly reduced or absent",
        medianMotorApb: "Markedly reduced CMAP amplitude",
        ulnarMotorAdm: "Markedly reduced CMAP amplitude",
        musculocutaneousCmap: "NORMAL",
        axillaryCmap: "NORMAL"
      },
      emgFindings: [
        { muscle: "APB (Median C8-T1)", result: "3+ Fibs/PSWs, no recruitment" },
        { muscle: "FPL (AIN C8-T1)", result: "3+ Fibs/PSWs" },
        { muscle: "ADM & FDI (Ulnar C8-T1)", result: "3+ Fibs/PSWs" },
        { muscle: "FCU & FDP 3/4 (Ulnar C8)", result: "3+ Fibs/PSWs" },
        { muscle: "EIP & EDC (Radial C8)", result: "2+ to 3+ Fibs/PSWs (radial C8 fibers run through lower trunk!)" },
        { muscle: "Biceps & Deltoid (C5-C6)", result: "NORMAL" },
        { muscle: "Triceps & PT (C7)", result: "NORMAL" },
        { muscle: "Cervical Paraspinals", result: "NORMAL (unless pre-ganglionic C8-T1 avulsion)" }
      ],
      pearls: "Distinguished from Ulnar Neuropathy: Lower Trunk lesion affects MEDIAN C8-T1 (APB, FPL) and RADIAL C8 (EIP) in addition to ulnar muscles, and has ABSENT MABC SNAP!"
    },
    {
      id: "neurogenic-tos",
      title: "True Neurogenic Thoracic Outlet Syndrome (True TOS)",
      etiology: "Congenital anomaly: Cervical rib or fibrous band extending from elongated C7 transverse process to 1st rib compressing lower trunk / C8-T1 roots.",
      anatomy: "Selective chronic traction/compression of lower trunk (ventral C8-T1 fibres).",
      clinicalPresentation: "'Gilliatt-Sumner Hand': Profound thenar atrophy (APB and opponens) out of proportion to hypothenar atrophy. Aching medial arm/forearm pain and cold intolerance. Common in young adult females.",
      sensoryLoss: "Medial forearm (MABC territory) and ulnar border of hand / 5th digit.",
      ncsFindings: {
        lacSnap: "NORMAL",
        radialSensory: "NORMAL",
        medianSensoryD2: "NORMAL",
        mabcSnap: "ABSENT or markedly reduced (MOST SENSITIVE EDX FINDING!)",
        ulnarSnap: "NORMAL or mildly reduced",
        medianMotorApb: "Severely attenuated CMAP amplitude (< 2 mV) with prolonged latency",
        ulnarMotorAdm: "Low-normal or mildly reduced CMAP",
        musculocutaneousCmap: "NORMAL",
        axillaryCmap: "NORMAL"
      },
      emgFindings: [
        { muscle: "APB (Thenar C8-T1)", result: "Dense denervation (3+ Fibs/PSWs), high-amplitude neurogenic MUAPs" },
        { muscle: "FPL (AIN C8-T1)", result: "1+ to 2+ Fibs/PSWs" },
        { muscle: "ADM & FDI (Ulnar C8-T1)", result: "Mild to moderate denervation (1+ to 2+ Fibs)" },
        { muscle: "EIP (Radial C8)", result: "Mild 1+ Fibs or normal" },
        { muscle: "C5-C7 muscles (Deltoid, Biceps, PT)", result: "NORMAL" },
        { muscle: "Cervical Paraspinals", result: "NORMAL" }
      ],
      pearls: "The classic PM&R / EMG board exam question: Why is APB more atrophied than ADM in True TOS? Because the fibers destined for the APB lie more inferiorly/anteriorly on the first rib/band and undergo greater mechanical stretch! MABC SNAP is the single most sensitive electrodiagnostic study."
    },
    {
      id: "posterior-cord",
      title: "Posterior Cord Lesion",
      etiology: "Proximal humeral fractures, anterior shoulder dislocation, crutch palsy (axillary compression), or bullet/knife wound in axilla.",
      anatomy: "Posterior Cord (formed by all 3 posterior divisions: C5-T1).",
      clinicalPresentation: "Complete wrist drop and finger drop (radial) + profound shoulder abduction weakness (deltoid) + shoulder internal rotation/adduction weakness (latissimus dorsi & subscapularis).",
      sensoryLoss: "Posterior arm, posterior forearm, anatomical snuffbox / radial dorsum of hand, and lateral shoulder badge area (axillary).",
      ncsFindings: {
        lacSnap: "NORMAL (lateral cord)",
        radialSensory: "ABSENT or markedly reduced",
        medianSensoryD2: "NORMAL",
        mabcSnap: "NORMAL",
        ulnarSnap: "NORMAL",
        medianMotorApb: "NORMAL",
        ulnarMotorAdm: "NORMAL",
        radialMotorEip: "Markedly reduced or absent CMAP",
        axillaryCmap: "Markedly reduced CMAP at deltoid"
      },
      emgFindings: [
        { muscle: "Deltoid & Teres Minor (Axillary C5-C6)", result: "3+ Fibs/PSWs" },
        { muscle: "Latissimus Dorsi (Thoracodorsal C6-C8)", result: "3+ Fibs/PSWs" },
        { muscle: "Triceps (Radial C7)", result: "3+ Fibs/PSWs" },
        { muscle: "Brachioradialis (Radial C5-C6)", result: "3+ Fibs/PSWs" },
        { muscle: "EDC & EIP (Radial/PIN C7-C8)", result: "3+ Fibs/PSWs" },
        { muscle: "Biceps (Musculocutaneous)", result: "NORMAL (Lateral cord - spares biceps!)" },
        { muscle: "Supraspinatus/Infraspinatus", result: "NORMAL (Upper trunk - spares suprascapular!)" },
        { muscle: "Pronator Teres & APB", result: "NORMAL" },
        { muscle: "Cervical Paraspinals", result: "NORMAL" }
      ],
      pearls: "Distinguished from high Radial neuropathy: Posterior cord lesion additionally involves Deltoid (Axillary) and Latissimus dorsi (Thoracodorsal). Distinguished from Upper trunk: Spares Biceps and Supraspinatus!"
    },
    {
      id: "lateral-cord",
      title: "Lateral Cord Lesion",
      etiology: "Trauma, axillary artery aneurysms, anterior shoulder dislocation, or iatrogenic during axillary surgery/pectoral repair.",
      anatomy: "Lateral Cord (anterior divisions of Upper and Middle Trunks, C5-C7).",
      clinicalPresentation: "Weakness of elbow flexion (biceps, brachialis), forearm pronation (pronator teres), and wrist flexion (FCR). Weakness of Pectoralis Major (clavicular head). Thenar intrinsic muscles (APB) are SPARED!",
      sensoryLoss: "Lateral forearm (LAC sensory territory) and sensory distribution of median nerve to thumb, index, and middle fingers.",
      ncsFindings: {
        lacSnap: "ABSENT or markedly reduced",
        radialSensory: "NORMAL (posterior cord)",
        medianSensoryD2: "ABSENT or markedly reduced",
        mabcSnap: "NORMAL",
        ulnarSnap: "NORMAL",
        medianMotorApb: "NORMAL (motor fibers to APB travel through Medial Root from Medial Cord!)",
        ulnarMotorAdm: "NORMAL",
        musculocutaneousCmap: "Markedly reduced at biceps",
        axillaryCmap: "NORMAL"
      },
      emgFindings: [
        { muscle: "Biceps Brachii (Musculocutaneous C5-C6)", result: "3+ Fibs/PSWs" },
        { muscle: "Coracobrachialis (Musculocutaneous C6-C7)", result: "3+ Fibs/PSWs" },
        { muscle: "Pectoralis Major - Clavicular (Lat Pectoral C5-C7)", result: "3+ Fibs/PSWs" },
        { muscle: "Pronator Teres (Median C6-C7)", result: "3+ Fibs/PSWs" },
        { muscle: "Flexor Carpi Radialis (Median C6-C7)", result: "3+ Fibs/PSWs" },
        { muscle: "APB (Median C8-T1)", result: "NORMAL (innervated via medial cord!)" },
        { muscle: "Deltoid & Triceps", result: "NORMAL" },
        { muscle: "Supraspinatus/Infraspinatus", result: "NORMAL" },
        { muscle: "Cervical Paraspinals", result: "NORMAL" }
      ],
      pearls: "High-yield PM&R pearl: In a lateral cord lesion, Median D2 SNAP is absent and proximal median muscles (PT, FCR) are weak, BUT Median APB CMAP is completely normal because its motor fibers come from the medial cord!"
    },
    {
      id: "medial-cord",
      title: "Medial Cord Lesion",
      etiology: "Catheterization of axillary artery, anterior shoulder dislocation, trauma, Pancoast tumor, sternotomy retraction.",
      anatomy: "Medial Cord (anterior division of Lower Trunk, C8-T1).",
      clinicalPresentation: "Nearly identical to Lower Trunk plexopathy: weakness of all ulnar muscles + median C8-T1 muscles (APB, FPL, FDP 1-2). Claw hand deformity.",
      sensoryLoss: "Medial arm, medial forearm (MABC), and ulnar digits (4th and 5th fingers).",
      ncsFindings: {
        lacSnap: "NORMAL",
        radialSensory: "NORMAL",
        medianSensoryD2: "NORMAL",
        mabcSnap: "ABSENT or reduced",
        ulnarSnap: "ABSENT or reduced",
        medianMotorApb: "Markedly reduced CMAP",
        ulnarMotorAdm: "Markedly reduced CMAP",
        radialMotorEip: "NORMAL (spared!)",
        axillaryCmap: "NORMAL"
      },
      emgFindings: [
        { muscle: "APB & Opponens (Median C8-T1)", result: "3+ Fibs/PSWs" },
        { muscle: "FPL & FDP 1/2 (AIN C8-T1)", result: "3+ Fibs/PSWs" },
        { muscle: "ADM & FDI (Ulnar C8-T1)", result: "3+ Fibs/PSWs" },
        { muscle: "FCU & FDP 3/4 (Ulnar C8)", result: "3+ Fibs/PSWs" },
        { muscle: "EIP & EDC (Radial C8)", result: "NORMAL (CRUCIAL DISCRIMINATOR: radial C8 fibers run in posterior cord!)" },
        { muscle: "Deltoid & Biceps", result: "NORMAL" },
        { muscle: "Cervical Paraspinals", result: "NORMAL" }
      ],
      pearls: "How to differentiate Medial Cord from Lower Trunk lesion: Needle EMG of Radial C8 muscles (Extensor Indicis Proprius - EIP). In lower trunk lesions, EIP is ABNORMAL. In medial cord lesions, EIP is SPARED because radial fibers pass through the posterior division into the posterior cord!"
    },
    {
      id: "radiation-vs-tumor",
      title: "Radiation Plexopathy vs Neoplastic Brachial Plexopathy",
      etiology: "Radiation therapy (e.g. breast cancer, lymphoma, Hodgkin) vs Direct tumor invasion (Pancoast lung tumor, metastatic breast).",
      anatomy: "Radiation typically affects Upper Trunk; Tumor typically invades Lower Trunk / Medial Cord.",
      clinicalPresentation: "Radiation: Paresthesias, weakness, lymphedema; PAIN IS ABSENT OR MILD. Slow progression over years.<br>Tumor: SEVERE INTRACTABLE PAIN, Horner's syndrome (sympathetic chain invasion), rapid progression over weeks/months.",
      sensoryLoss: "Radiation: Lateral arm/shoulder/forearm. Tumor: Medial arm/forearm, 4th/5th digits.",
      ncsFindings: {
        radiationNcs: "Conduction blocks, focal slowing across plexus, reduced Upper Trunk SNAPs (LAC).",
        tumorNcs: "Axonal loss, reduced Lower Trunk SNAPs (MABC, Ulnar), low APB/ADM CMAPs."
      },
      emgFindings: [
        { muscle: "Radiation EMG Hallmark", result: "MYOKYMIC DISCHARGES (grouped repetitive spontaneous firing at 20-70 Hz) and fasciculations in Upper Trunk distribution." },
        { muscle: "Neoplastic EMG Hallmark", result: "Active denervation (Fibs/PSWs), reduced recruitment without myokymia, affecting Lower Trunk." }
      ],
      pearls: "MYOKYMIA = RADIATION! Presence of myokymic discharges on needle EMG is pathognomonic for radiation-induced plexopathy. Severe relentless pain and Horner's syndrome strongly point to tumor invasion."
    },
    {
      id: "preganglionic-avulsion",
      title: "Pre-Ganglionic Root Avulsion (C5-T1 Traction Injury)",
      etiology: "High-speed motorcycle collision, severe traction with head and shoulder forced violently apart, tearing rootlets directly from spinal cord.",
      anatomy: "Tear proximal to Dorsal Root Ganglion (DRG).",
      clinicalPresentation: "Flail, anesthetic arm. Horner's syndrome present if T1 avulsed. Severe neuropathic deafferentation pain.",
      sensoryLoss: "Complete sensory anesthesia throughout C5-T1 dermatomes.",
      ncsFindings: {
        lacSnap: "NORMAL (AMPLITUDE COMPLETELY PRESERVED!)",
        radialSensory: "NORMAL (AMPLITUDE PRESERVED!)",
        medianSensoryD2: "NORMAL (AMPLITUDE PRESERVED!)",
        mabcSnap: "NORMAL (AMPLITUDE PRESERVED!)",
        ulnarSnap: "NORMAL (AMPLITUDE PRESERVED!)",
        medianMotorApb: "Absent or unexcitable CMAP",
        ulnarMotorAdm: "Absent or unexcitable CMAP",
        axillaryCmap: "Absent CMAP"
      },
      emgFindings: [
        { muscle: "Cervical Paraspinals (Dorsal Rami)", result: "4+ PROFUSE FIBRILLATIONS & PSWs (hallmark of preganglionic root lesion)" },
        { muscle: "Rhomboids (Dorsal Scapular C5)", result: "4+ Fibs/PSWs (direct root branch denervated)" },
        { muscle: "Serratus Anterior (Long Thoracic C5-C7)", result: "4+ Fibs/PSWs (direct root branch denervated)" },
        { muscle: "Limb Muscles (Biceps, Deltoid, Triceps, APB)", result: "4+ Fibs/PSWs, complete absence of volitional MUAPs" }
      ],
      pearls: "THE PRE-GANGLIONIC PARADOX: Despite complete clinical anesthesia of the limb, all sensory nerve action potentials (SNAPs) are completely NORMAL! Why? The sensory cell bodies reside in the DRG, which remains intact outside the spinal cord, so postganglionic sensory axons never undergo Wallerian degeneration. Conversely, motor axons undergo complete degeneration, and dorsal rami to paraspinals show profuse denervation."
    }
  ],

  caseQuiz: [
    {
      id: "case-1",
      caseNum: 1,
      vignette: "A 42-year-old cyclist collided with a car and landed forcefully on the right shoulder with the neck bent to the left. On physical examination 4 weeks later, right shoulder abduction and elbow flexion are 1/5. Biceps and brachioradialis reflexes are absent. Triceps reflex and hand grip strength are 5/5. Sensation is decreased over the lateral shoulder, lateral forearm, and thumb.",
      question: "Which electrodiagnostic finding would definitively localize this lesion to the Superior Trunk of the brachial plexus rather than a C5/C6 radiculopathy?",
      options: [
        { text: "Reduced CMAP amplitude of the axillary nerve recording deltoid", correct: false, explanation: "Axillary CMAP reduction occurs in both upper trunk plexopathy and severe C5/C6 radiculopathy." },
        { text: "Reduced or absent Lateral Antebrachial Cutaneous (LAC) SNAP with normal cervical paraspinal EMG", correct: true, explanation: "Correct! In post-ganglionic upper trunk plexopathy, the sensory axon degenerates distal to the DRG causing a reduced/absent LAC SNAP, while dorsal rami (paraspinals) are spared. In C5/C6 radiculopathy, the SNAP is preserved and paraspinals show denervation." },
        { text: "Fibrillations and positive sharp waves in the Deltoid and Biceps", correct: false, explanation: "Both muscles are C5-C6 innervated and will show denervation in either upper trunk plexopathy or C5/C6 radiculopathy." },
        { text: "Prolonged median motor distal latency recording APB", correct: false, explanation: "APB is C8-T1 lower trunk/medial cord innervated and should be completely normal in upper trunk lesions." }
      ]
    },
    {
      id: "case-2",
      caseNum: 2,
      vignette: "A 34-year-old woman presents with progressive weakness and muscle wasting in her right hand over 18 months, accompanied by aching along the medial forearm. Physical exam reveals marked wasting of the right thenar eminence (abductor pollicis brevis) with milder wasting of hypothenar muscles. Sensation is decreased along the medial forearm and 5th digit. Cervical spine MRI is unremarkable.",
      question: "What is the most likely diagnosis, and what is the single most sensitive electrodiagnostic finding?",
      options: [
        { text: "Severe Carpal Tunnel Syndrome; prolonged median distal sensory latency", correct: false, explanation: "CTS would not explain medial forearm pain/numbness, hypothenar weakness, or MABC abnormalities." },
        { text: "True Neurogenic Thoracic Outlet Syndrome; absent or reduced Medial Antebrachial Cutaneous (MABC) SNAP", correct: true, explanation: "Correct! The 'Gilliatt-Sumner hand' (profound APB wasting out of proportion to hypothenar) due to lower trunk fibrous band compression has the hallmark EDX feature of an absent or attenuated MABC SNAP." },
        { text: "Cubital Tunnel Syndrome; focal slowing of ulnar motor velocity across the elbow", correct: false, explanation: "Cubital tunnel syndrome does not cause APB wasting or medial forearm (MABC) sensory deficit." },
        { text: "Amyotrophic Lateral Sclerosis; widespread fasciculations in 3 body regions", correct: false, explanation: "ALS is a pure motor disease and cannot cause sensory loss or reduced SNAPs." }
      ]
    },
    {
      id: "case-3",
      caseNum: 3,
      vignette: "A 58-year-old woman with a history of left breast cancer treated with lumpectomy and axillary radiation therapy 6 years ago presents with slowly progressive left arm stiffness and weakness. Needle EMG of the deltoid, biceps, and infraspinatus reveals spontaneous rhythmic bursts of motor units firing in groups at 35 Hz every 1.2 seconds ('marching soldiers' sound).",
      question: "What is this spontaneous needle EMG finding, and what does it indicate?",
      options: [
        { text: "Fasciculation potentials indicative of motor neuron disease", correct: false, explanation: "Fasciculations fire irregularly at slow random intervals, not in rhythmic bursts." },
        { text: "Myokymic discharges pathognomonic for radiation-induced brachial plexopathy", correct: true, explanation: "Correct! Myokymic discharges (grouped spontaneous repetitive discharges of single MUAPs at 20-70 Hz) are the hallmark electrodiagnostic signature of radiation plexopathy, distinguishing it from tumor recurrence." },
        { text: "Complex repetitive discharges indicating chronic radiculopathy", correct: false, explanation: "CRDs have a rapid machine-gun sound with abrupt start and stop, rather than rhythmic grouping." },
        { text: "Neuromyotonic discharges indicating Isaacs syndrome", correct: false, explanation: "Neuromyotonia fires at 150-300 Hz with waning amplitudes ('pinging')." }
      ]
    },
    {
      id: "case-4",
      caseNum: 4,
      vignette: "A 22-year-old motorcyclist suffered a high-speed crash with severe left arm traction. Three weeks later, he has total flaccid paralysis and complete sensory anesthesia of the left upper limb, along with left ptosis and miosis. On NCS, the Median (D2), Ulnar (D5), Superficial Radial, and LAC SNAPs are all completely normal in amplitude.",
      question: "How do you explain the presence of normal sensory nerve action potentials in a completely paralyzed and anesthetic arm?",
      options: [
        { text: "The sensory test was performed too early before Wallerian degeneration occurred", correct: false, explanation: "3 weeks is well beyond the 7-10 days required for sensory Wallerian degeneration." },
        { text: "The patient has functional neurological disorder / conversion disorder", correct: false, explanation: "Ptosis/miosis (Horner's) and severe traction cannot be explained by functional disorder." },
        { text: "Pre-ganglionic root avulsion: the lesion is proximal to the dorsal root ganglion, leaving the ganglion cell body and peripheral sensory axons intact", correct: true, explanation: "Correct! The pre-ganglionic paradox: rootlets are avulsed from the spinal cord proximal to the DRG. Peripheral sensory axons stay connected to their cell bodies in the DRG and never undergo Wallerian degeneration, keeping SNAPs normal despite clinical anesthesia." },
        { text: "The patient has neuropraxia of all brachial plexus cords", correct: false, explanation: "Complete flaccidity, Horner's syndrome, and paraspinal denervation indicate severe axonotmesis/neurotmesis." }
      ]
    },
    {
      id: "case-5",
      caseNum: 5,
      vignette: "A patient presents with weakness in wrist and finger extension. Needle EMG demonstrates fibrillation potentials in Extensor Indicis Proprius (EIP), Extensor Digitorum Communis (EDC), Extensor Carpi Ulnaris (ECU), and Abductor Pollicis Longus (APL). However, Brachioradialis, Extensor Carpi Radialis Longus (ECRL), and Triceps are completely normal. Superficial Radial SNAP is normal.",
      question: "Where is the lesion localized?",
      options: [
        { text: "Radial nerve in the spiral groove of the humerus", correct: false, explanation: "Spiral groove lesions involve Brachioradialis and cause superficial radial sensory loss." },
        { text: "Posterior Cord of the brachial plexus", correct: false, explanation: "Posterior cord lesions cause weakness in Deltoid, Latissimus, Triceps, and Brachioradialis." },
        { text: "Posterior Interosseous Nerve (PIN) at the Arcade of Frohse", correct: true, explanation: "Correct! PIN branches off radial nerve after ECRL and Brachioradialis innervation, and carries no cutaneous sensory fibers. Hence ECRL/BR/Triceps are spared and Superficial Radial SNAP is completely normal!" },
        { text: "C7 Radiculopathy", correct: false, explanation: "C7 radiculopathy would typically involve Triceps and Pronator Teres (median)." }
      ]
    },
    {
      id: "case-6",
      caseNum: 6,
      vignette: "A PM&R physician is evaluating an electrodiagnostic study to differentiate a Lower Trunk Brachial Plexopathy from a Medial Cord Lesion. Weakness is present in APB, FPL, and FDI.",
      question: "Which single muscle examination on needle EMG is the most decisive to separate Lower Trunk from Medial Cord?",
      options: [
        { text: "Abductor Digiti Minimi (ADM)", correct: false, explanation: "ADM is ulnar-innervated and abnormal in both lower trunk and medial cord lesions." },
        { text: "Extensor Indicis Proprius (EIP)", correct: true, explanation: "Correct! EIP is innervated by Radial/PIN from C8 roots via the Posterior Division of the Lower Trunk. In a Lower Trunk lesion, EIP is abnormal. In a Medial Cord lesion, the posterior division and cord are spared, so EIP is completely normal!" },
        { text: "Flexor Carpi Radialis (FCR)", correct: false, explanation: "FCR is C6-C7 lateral cord innervated and normal in both." },
        { text: "Biceps Brachii", correct: false, explanation: "Biceps is C5-C6 upper trunk/lateral cord innervated." }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.PLEXUS_DATA = PLEXUS_DATA;
}

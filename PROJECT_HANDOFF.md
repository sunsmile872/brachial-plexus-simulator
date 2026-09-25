# 📋 Brachial Plexus Clinical Anatomy & Electrodiagnostic Suite — Project Handoff

> **To the Next AI Assistant / Developer**:  
> Read this document to immediately inherit the full context, domain calibrations, architectural design, solved edge cases, and repository state of this project.

---

## 📌 Project Overview & Quick Links
* **Repository**: [https://github.com/sunsmile872/brachial-plexus-simulator.git](https://github.com/sunsmile872/brachial-plexus-simulator.git)
* **Live Web App (GitHub Pages)**: [https://sunsmile872.github.io/brachial-plexus-simulator/](https://sunsmile872.github.io/brachial-plexus-simulator/)
* **Original Conversation**: [Antigravity Chat Session](conversation://3d603869-eba4-4fe6-882f-739963fba7e0)
* **Target Audience**: Physical Medicine & Rehabilitation (PM&R) physicians, physiatrists, neurology residents, clinical neurophysiology fellows, and EMG technologists preparing for electrodiagnostic board certifications (ABEM, ABPMR, Thai PM&R Board).
* **Core Mission**: A zero-dependency, ultra-fast, high-precision web-based clinical simulator and reference suite covering brachial plexus neuroanatomy, needle electromyography (EMG), nerve conduction studies (NCS), peripheral nerve branching hierarchies, and clinical lesion localization.

### 📚 Authoritative Medical & Scientific Standards
1. **Preston DC, Shapiro BE**: *Electromyography and Neuromuscular Disorders: Clinical-Electrophysiologic-Ultrasound Correlations*, 4th Edition (Elsevier).
2. **Perotto AO, Delagi EF**: *Anatomical Guide for the Electromyographer: The Limbs and Trunk*, 5th Edition (Charles C Thomas).
3. **Neumann DA**: *Kinesiology of the Musculoskeletal System: Foundations for Rehabilitation*, 3rd/4th Edition — Appendix II (Upper Extremity Muscle Innervation Table).
4. **Wilbourn AJ**: *Electrodiagnosis of plexopathies*, Neurologic Clinics 1985;3(3):511–529 (The Gold Standard for Plexopathy SNAP/CMAP localization).
5. **Geeky Medics & Netter**: Standardized schematic topology for the Brachial Plexus.

---

## 🏗️ Technology Stack & Directory Architecture

The project is built on a pure **Vanilla Web Stack** (HTML5, Modern CSS3 with Flex/Grid, Modular ES6 JavaScript, SVG, and HTML5 Web Audio API). There is **zero build step**, zero npm bloat, and zero external framework overhead, ensuring 100% offline capability, instantaneous page loads, and seamless GitHub Pages deployment.

```
/Users/ss/Gemini Antigravity/Playground/brachial-plexus-simulator/
├── index.html                  # Main responsive single-page application shell (8 tabs)
├── PROJECT_HANDOFF.md          # Full project context & session migration specification
├── README.md                   # Repository overview and quick start guide
├── css/
│   └── styles.css              # Custom medical dark theme, SVG styling, mobile/tablet media queries
├── js/
│   ├── app.js                  # Application orchestrator, tab navigation, search/filter engine, zoom controls
│   ├── plexus-data.js          # 124KB+ comprehensive medical database (Roots C1-T1, Plexus, Scenarios, Perotto EMG)
│   ├── plexus-svg.js           # Interactive SVG renderer for the Brachial Plexus schematic & active tracing
│   ├── peripheral-tree-svg.js  # Proximodistal stem tree visualizer for Median, Radial, and Ulnar nerves
│   └── emg-audio.js            # Web Audio API synthesizer for EMG waveforms (MUAP, Fibs, PSW, Fascics, CRD)
├── assets/                     # High-resolution clinical reference images & posters
│   ├── median_nerve_branching.jpg
│   ├── radial_nerve_branching.jpg
│   ├── root_distribution_table.jpg
│   └── ulnar_nerve_branching.jpg
└── scripts/
    ├── autobackup.sh           # Automated Git sync and backup script
    └── autobackup.log          # Execution log
```

### 💻 Development, Test & Deployment Workflow
* **Local Preview**: Run any static server, e.g.:
  ```bash
  python3 -m http.server 8000
  # Open http://localhost:8000
  ```
* **Syntax Verification**:
  ```bash
  node -c js/app.js && node -c js/emg-audio.js && node -c js/peripheral-tree-svg.js && node -c js/plexus-data.js && node -c js/plexus-svg.js
  ```
* **Git Commit & Deployment**:
  The repository automatically serves from the `main` branch root on GitHub Pages:
  ```bash
  git add -A
  git commit -m "feat/fix: <description>"
  git push origin main
  ```

---

## 🧠 Calibrated Models, Domain Equations & Clinical Rules

### 1. Root Distribution Matrix (Neumann Appendix II)
* **Scope**: 49 Upper Extremity muscles mapped across spinal cord levels **C1 through T1**.
* **Classification**:
  * **Major distribution (`X` badge)**: Primary myotomal innervation. E.g., Deltoid (C5 major), Biceps (C5, C6 major), Triceps (C7 major), APB (C8, T1 major), FDI (C8, T1 major).
  * **Minor-to-moderate distribution (`x` badge)**: Variable or accessory innervation.
* **Filter Modes**: Supports viewing "Major Distribution Only" or full spectrum, searchable by muscle or peripheral nerve.

### 2. Pre-ganglionic vs. Post-ganglionic Electrodiagnostic Axiom
* **Pre-ganglionic Root Avulsion (Root lesion proximal to DRG)**:
  * **Sensory Nerve Action Potentials (SNAPs) are strictly NORMAL / PRESERVED** (e.g. LAC, Superficial Radial, MABC SNAPs remain normal despite complete clinical anesthesia, because the sensory dorsal root ganglion cell body lies outside the spinal cord in the intervertebral foramen).
  * **Paraspinal Needle EMG**: Shows active denervation (fibrillation potentials & positive sharp waves) because the posterior primary rami originate directly from spinal roots.
  * **Rhomboids & Serratus Anterior**: Denervated (Dorsal Scapular & Long Thoracic nerves arise directly from roots).
* **Post-ganglionic Plexopathy / Peripheral Neuropathy (Distal to DRG)**:
  * **SNAPs are ABNORMAL / REDUCED / ABSENT** (due to Wallerian degeneration of distal sensory axons).
  * **Paraspinal Needle EMG**: Strictly normal.

### 3. Wilbourn 1985 Plexopathy Localization Matrix
| Anatomical Level | Characteristic SNAP Abnormalities | Sparing Pearls (SNAPs Normal) | Key Muscle Denervations |
| :--- | :--- | :--- | :--- |
| **Upper Trunk** (C5-C6) | **LAC**, **Median D1-D2** (Lateral cord sensory fibers) | Superficial Radial, PABC, MABC, Ulnar D5 | Biceps, Deltoid, Infraspinatus, Brachioradialis, Supraspinatus |
| **Middle Trunk** (C7) | **Superficial Radial** (base of 1st digit), **Median D3**, **PABC** | LAC, MABC, Ulnar D5 | Triceps, Pronator Teres, FCR, ECRL/ECRB (Biceps & hand intrinsics spared!) |
| **Lower Trunk** (C8-T1) | **MABC** (Forearm), **Ulnar D5**, **DUNC** | LAC, Superficial Radial | APB, FPL, PQ, ADM, FDI, Interossei, FDP 3-4 (All hand intrinsics!) |
| **Lateral Cord** | LAC, Median D1-D2 | MABC, Ulnar D5, Superficial Radial | Biceps, Coracobrachialis, PT, FCR (Hand intrinsics APB/ADM spared!) |
| **Posterior Cord** | Superficial Radial, Axillary sensory, PABC | LAC, Median D1-D3, MABC | Deltoid, Teres Minor, Triceps, Wrist/Finger Extensors, Latissimus Dorsi |
| **Medial Cord** | MABC, Ulnar D5 | LAC, Superficial Radial | All Ulnar muscles + Median thenars (APB, OP, FPB, FDS), but **PT & FCR spared!** |

### 4. Dual Innervation High-Yield Clinical Facts
* **Brachialis**: Medial portion innervated by **Musculocutaneous Nerve** (C5-C6); lateral portion innervated by **Radial Nerve** (C7).
* **Pectoralis Major**: Clavicular head by **Lateral Pectoral Nerve** (C5-C7); Sternocostal head by **Medial Pectoral Nerve** (C8-T1).
* **Flexor Pollicis Brevis (FPB)**: Superficial head by **Median Nerve** (C8-T1); Deep head by **Deep Branch of Ulnar Nerve** (C8-T1).
* **Flexor Digitorum Profundus (FDP)**: Lateral half (Digits 2-3) by **Median/AIN** (C8-T1); Medial half (Digits 4-5) by **Ulnar Nerve** (C8-T1).
* **Subscapularis**: Upper part by **Upper Subscapular** (C5-C6); Lower part by **Lower Subscapular** (C5-C6).

### 5. The DUNC & Palmar Cutaneous Sparing Rules
* **Dorsal Ulnar Cutaneous (DUNC)**: Branches **5–8 cm proximal to the wrist**. Therefore, DUNC SNAP is strictly **NORMAL** in Guyon Canal syndrome, but **ABNORMAL** in Cubital Tunnel syndrome and Lower Trunk plexopathy.
* **Palmar Cutaneous Branch of Median Nerve**: Arises **5 cm proximal to the flexor retinaculum** and passes superficial to the carpal tunnel. Therefore, thenar pad sensation is strictly **SPARED** in Carpal Tunnel Syndrome (CTS); loss of thenar pad sensation signifies a proximal lesion at or above the pronator teres.

---

## 🐛 Solved Bugs, Edge Cases & Guardrails (DO NOT REGRESS)

### 1. SVG Transform Collision & Hover Flickering Loop (`css/styles.css`)
* **Symptom**: Hovering the mouse over entrapment pins (e.g. Carpal Tunnel, Cubital Tunnel) caused intense, rapid 60fps flashing/flickering.
* **Root Cause**: In SVG, `<g class="svg-entrapment-pin" transform="translate(440, 880)">` defines coordinates. The CSS rule `.svg-entrapment-pin:hover { transform: scale(1.1); }` overrode the presentation attribute, resetting the element's origin to `(0, 0)`. The element teleported away from the cursor, triggered `mouseleave`, jumped back, triggered `mouseenter`, and flickered in an infinite frame loop.
* **Guardrail / Fix**: **NEVER use CSS `transform: scale()` on SVG elements that have `transform="translate(...)"`**. Instead, use `filter: drop-shadow(...) brightness(...)` and `stroke: #ffffff`. Ensure all inner text/icons have `pointer-events: none`.

### 2. Mobile Text Overlap in Peripheral Branches (`js/peripheral-tree-svg.js`)
* **Symptom**: Muscle names collided and overlapped with Thai clinical mnemonics on smartphone screens.
* **Root Cause**: Both text elements were rendered on the exact same vertical `y` coordinate line inside a narrow 220px box.
* **Guardrail / Fix**: Enforced a **2-Line High-Contrast Layout** via `renderNodeBox(x, y, width, height, title, subtitle, status, type)`:
  * Line 1: Bold 12.5px white muscle name (`y + 20`).
  * Line 2: 10.5px subtitle / roots / Thai mnemonic (`y + 38`).
  * SVG Canvas width widened to `880px`, individual boxes widened to `310–330px`.
  * Added `overflow-x: auto` with `-webkit-overflow-scrolling: touch`.

### 3. iPad Diagram Clipping Bug (`js/plexus-svg.js` & `css/styles.css`)
* **Symptom**: Terminal branch boxes (`MUSCULOCUTANEOUS`, `AXILLARY`, `RADIAL`, `MEDIAN`, `ULNAR`) had their right sides cut off (`MUSCULOCUTA...`) on iPad Safari.
* **Root Cause**: SVG `viewBox` was constrained to `0 0 1140 700`, while terminal boxes extended to `x = 1210px` (70px out of bounds). Additionally, a 2-column CSS grid squeezed the diagram at 1180px iPad landscape.
* **Guardrail / Fix**:
  * Set SVG `viewBox="0 0 1240 700"` with background `<rect width="1240" ... />`.
  * Adjusted terminal boxes to `transform="translate(1020, y)"` with `width="185"`, placing the rightmost pixel at `1205px` (35px safe padding).
  * Shifted media query breakpoint to `1250px` so iPads receive a full 100% width diagram.

### 4. Visual Blur & Eye Strain on Root Tracing (`js/plexus-svg.js`)
* **Symptom**: Tracing roots (C5–T1) caused fuzzy haloing and visual fatigue ("ตาลาย มองยาก").
* **Root Cause**: Cyan `#38bdf8` had low contrast on navy background and used `feGaussianBlur stdDeviation="4"`, while unselected nerves were dimmed to near-black (`0.08`).
* **Guardrail / Fix**:
  * Traced pathways use **Electric Gold (`#fbbf24` / `#f59e0b`)** with **zero blur filters** (`filter: none`).
  * Active strokes thickened by `+2.5px`.
  * Background nerves kept gently visible as a **blueprint outline (`opacity: 0.22`, `#334155`)** so the user maintains anatomical orientation.
  * Root filter buttons (`[C5]`–`[T1]`) glow in gold to match.

### 5. Median Nerve False-Lesion Appearance (`js/plexus-svg.js`)
* **Symptom**: Median nerve was uniquely yellow in normal state, creating false impression of a Carpal Tunnel lesion or bug.
* **Root Cause**: Developer originally hardcoded yellow to emphasize the "Median 'M' Junction".
* **Guardrail / Fix**: Harmonized Median nerve in the normal state to standard emerald green (`#10b981`) and terminal box to `#082f49` / `#38bdf8`, exactly matching the other 4 terminal branches.

### 6. Part B Academic Jargon in Tabs (`index.html`)
* **Symptom**: Tab title was named "Root Distribution Table (Part B)", confusing clinicians.
* **Guardrail / Fix**: Renamed tab to clean **`📊 Root Distribution Table`**, moving the citation to a subtle footnote.

---

## 🎨 UI/UX & Responsive Architecture

* **Color Palette (WCAG Compliant Medical Theme)**:
  * Backgrounds: Deep Midnight Navy (`#061320`, `#071426`, `#090d16`, `#0f172a`).
  * Normal / Spared Nerves: Emerald Green & Mint (`#10b981`, `#0d9488`, `#34d399`).
  * Traced / Active Pathway: Electric Gold / Amber (`#fbbf24`, `#f59e0b`, `#fef08a`).
  * Lesion / Denervated: Crimson Red & Rose (`#ef4444`, `#f43f5e`, `#450a0a`).
  * Blueprint Ghosting: Muted Slate (`#334155`, `#475569`, `#94a3b8`).
* **Responsive Breakpoints**:
  * **Desktop ($\ge 1250\text{px}$)**: 2-column layout (Diagram + Inspector Sidebar).
  * **iPad & Tablets ($769\text{px} - 1249\text{px}$)**: 1-column layout, 100% full-width diagram, spacious inspection cards stacked below.
  * **iPhone & Smartphones ($\le 768\text{px}$)**: Minimum SVG width `840–860px` with horizontal touch scrolling (`-webkit-overflow-scrolling: touch`), persistent swipe indicator banner, and Zoom & Pan controls (`[➖]` `[🔍 Reset/Fit]` `[➕]`).

---

## 🎯 Current Project Status & Immediate Next Tasks

The core simulator, audio synthesizer, peripheral tree, and responsive layout are fully stable, validated in Node.js, and live on GitHub.

### 🚀 Immediate Next Features to Build (from Wilbourn 1985 & User Request):
1. **Task 1: NCS Sensory SNAP Overlay Mode on Interactive Plexus**:
   * Add a toggle button `[👁️ Show NCS SNAP Landmarks]` in `.diagram-toolbar`.
   * Render interactive oval badges on the plexus for:
     * `LAC` (Musculocutaneous)
     * `PABC` & `Superficial Radial` (Radial)
     * `Median D1, D2, D3` (Lateral cord sensory)
     * `MABC` (Medial cord)
     * `Ulnar D5` & `DUNC` (Ulnar)
   * Clicking a SNAP badge displays stimulation site, recording site, and normal amplitude/latency values.
2. **Task 2: Interactive Wilbourn 1985 Plexopathy Diagnostic Matrix**:
   * Create a dedicated sub-view or interactive modal implementing the complete Wilbourn 1985 table.
   * Provide a *"Simulate this Pattern"* button for Upper Trunk, Middle Trunk, Lower Trunk, Lateral Cord, Posterior Cord, and Medial Cord that updates the SVG diagram colors in real-time.
3. **Task 3: Dual Innervation Badges**:
   * Add prominent `⚡ DUAL INNERVATION` badges in the Anatomy Inspector and Needle EMG Atlas for Brachialis, Pectoralis Major, FPB, and FDP.
4. **Task 4: Median Nerve Cord Origin Split**:
   * In the Peripheral Tree visualizer and Anatomy Inspector, visually demarcate muscles derived from the Lateral Cord (PT, FCR) versus Medial Cord (FDS, FDP, Thenars).

---

## 💬 Resumption Prompt for the Next Session

> *Copy and paste the prompt below into your new chat to instantly resume work with zero context loss:*

```markdown
I am continuing development on the **Brachial Plexus Clinical Anatomy & Electrodiagnostic Suite** repository (`sunsmile872/brachial-plexus-simulator`). 
Please read `PROJECT_HANDOFF.md` at the project root first to inherit our full architectural design, authoritative clinical references (Preston & Shapiro 4th Ed, Perotto 5th Ed, Neumann Appendix II, Wilbourn 1985), calibrated electrodiagnostic rules, solved bugs (SVG transform hover collision, iPad clipping, 2-line mobile layout), and git deployment pipeline.

Our immediate next objective is:
1. Implement the "NCS Sensory SNAP Overlay Mode" on the Interactive Plexus Diagram with interactive badges for LAC, PABC, Superficial Radial, Median D1-D3, MABC, Ulnar D5, and DUNC.
2. Add the interactive "Wilbourn 1985 Plexopathy Diagnostic Matrix" with one-click pattern simulation.
```

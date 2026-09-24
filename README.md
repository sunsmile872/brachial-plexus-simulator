# Brachial Plexus PM&R Clinical Anatomy & Electrodiagnostic (NCS / EMG) Simulator

An interactive, high-fidelity neuroanatomy simulation and electrodiagnostic clinical suite designed specifically for **Physical Medicine & Rehabilitation (PM&R) physicians**, neurologists, physiatrists, and electrodiagnosticians.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PM&R Reference](https://img.shields.io/badge/PM%26R-Preston%20%26%20Shapiro%204th%20Ed-teal)
![Perotto Guide](https://img.shields.io/badge/Needle%20EMG-Perotto%205th%20Ed-10b981)

---

## 🌟 Key Features

1. **Interactive Vector Brachial Plexus Topology**:
   - Structured around the classic **5 Roots $\rightarrow$ 3 Trunks $\rightarrow$ 6 Divisions $\rightarrow$ 3 Cords $\rightarrow$ 5 Terminal Branches** architecture.
   - Includes all 12 collateral branches (Dorsal scapular, Long thoracic, Suprascapular, Lateral/Medial pectorals, Subscapulars, Thoracodorsal, MABC, etc.).
   - Interactive root filter buttons (`C5`, `C6`, `C7`, `C8`, `T1`) to trace the continuous axonal path through trunks, divisions, cords, and terminal nerves.
   - Anatomical landmark toggles (Interscalene triangle, Posterior triangle / Erb's point, Retroclavicular space, Axilla / 2nd part of axillary artery).

2. **Electrodiagnostic (NCS & Needle EMG) Simulator**:
   - **8 Real-World Clinical Scenarios**:
     - Upper Trunk Plexopathy (Erb-Duchenne Palsy)
     - Lower Trunk Plexopathy (Klumpke Palsy)
     - True Neurogenic Thoracic Outlet Syndrome (True TOS / Gilliatt-Sumner Hand)
     - Posterior Cord Lesion (Crutch / Dislocation)
     - Lateral Cord Lesion (Axillary surgery / Trauma)
     - Medial Cord Lesion (Catheterization / Trauma)
     - Radiation-Induced Brachial Plexopathy (RIPP) vs Neoplastic Plexopathy (Pancoast / NIPP)
     - Pre-Ganglionic Root Avulsion (Motorcycle traction injury)
   - Synchronized sensory & motor NCS profiles (SNAP & CMAP amplitudes, latencies, side-to-side asymmetries).
   - Needle EMG denervation matrix covering insertional activity, spontaneous activity (Fibs, PSWs), and MUAP recruitment.

3. **Live Web Audio EMG Synthesizer & Phosphor Oscilloscope**:
   - Web Audio API acoustic generator reproducing true audio signatures:
     - **Normal voluntary MUAPs** (crisp 10-15 Hz triphasic firing)
     - **Fibrillation Potentials** ("rain falling on a tin roof")
     - **Positive Sharp Waves** (dull "thump/pop")
     - **Myokymic Discharges** ("marching soldiers", pathognomonic hallmark of radiation plexopathy)
     - **Fasciculation Potentials** ("popcorn popping")
     - **Complex Repetitive Discharges** ("revving motorcycle")
   - Calibrated 10 ms/div, 50 µV/div CRT oscilloscope visualizer.

4. **Perotto Needle EMG Upper Limb Muscle Atlas**:
   - Complete database of 20+ muscles referenced directly from *Perotto's Anatomical Guide for the Electromyographer* (5th Ed.).
   - Exact surface anatomical landmarks, needle angle, insertion depth, test activation maneuvers.
   - **High-Risk Danger Zones**: Critical warnings and prevention protocols for pneumothorax (Serratus anterior, Rhomboids, Supraspinatus) and neurovascular puncture.

5. **PM&R Clinical Decision Flowcharts & Differential Matrices**:
   - **Pre-ganglionic vs Post-ganglionic Paradigm**: The physiologic basis of the SNAP preservation paradox and paraspinal dorsal rami examination.
   - **Lower Trunk vs Ulnar Neuropathy at Elbow vs C8 Radiculopathy**: The diagnostic value of MABC SNAP and APB CMAP.
   - **Medial Cord vs Lower Trunk**: The "EIP Rule" (Extensor Indicis Proprius).
   - **Radiation vs Neoplastic Plexopathy**: RIPP vs NIPP differential matrix.

6. **PM&R Board Review Case Challenges**:
   - 6 clinical vignettes with interactive multiple-choice questions, diagnostic pearls, and rationale.

7. **Printable Vertical A4 Medical Poster View**:
   - Clean, structured medical poster format adhering to high-contrast dark navy (`#0a192f`), teal (`#0d9488`), and mint (`#10b981`) aesthetics.
   - 1-click "Print / Export A4 PDF Poster" button.

---

## 🚀 Getting Started

### Local Setup
Simply serve the files using any HTTP server:

```bash
# Clone the repository
git clone https://github.com/sunsmile872/brachial-plexus-simulator.git
cd brachial-plexus-simulator

# Start a local Python server
python3 -m http.server 8085
```

Open your browser and navigate to:
```
http://localhost:8085
```

---

## 📚 Academic & Clinical References

1. **Preston DC, Shapiro BE.** *Electromyography and Neuromuscular Disorders: Clinical-Electrophysiologic-Ultrasound Correlations*. 4th ed. Elsevier; 2020.
   - Chapter 33: Brachial Plexopathy (pp. 579–618)
   - Chapter 34: Proximal Neuropathies of the Shoulder and Arm (pp. 619–634)
2. **Perotto AO, Delagi EF.** *Anatomical Guide for the Electromyographer: The Limbs and Trunk*. 5th ed. Charles C Thomas; 2011.
3. **Chu SK, Jayabalan P, Visco CJ.** *McLean EMG Guide*. 2nd ed. Demos Medical; 2019.
4. **Weiss LD, Weiss JM, Silver JK.** *Easy EMG: A Guide to Performing Nerve Conduction Studies and Electromyography*. 3rd ed. Elsevier; 2022.
5. **Cifu DX, et al.** *Braddom's Physical Medicine and Rehabilitation*. 7th ed. Elsevier; 2020.

---

## 🔄 Automated Backup

An automated backup script is included in `scripts/autobackup.sh`. It monitors local changes and pushes them automatically to GitHub.

```bash
# Manual run
./scripts/autobackup.sh
```

---

## 📄 License
MIT License. Created for medical education and PM&R clinical training.

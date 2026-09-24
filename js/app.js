/**
 * Main Controller for Brachial Plexus PM&R Simulator
 * Robust event binding with safe initializations
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Brachial Plexus Suite Initializing...');

  let svgRenderer = null;
  let emgAudio = null;

  // Initialize EMG Audio Engine safely
  try {
    if (typeof EMGAudioEngine !== 'undefined') {
      emgAudio = new EMGAudioEngine('emg-oscilloscope');
    }
  } catch (err) {
    console.warn('EMG Audio initialization skipped:', err);
  }

  // --- TAB NAVIGATION (Priority 1) ---
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // If switching to simulator, re-layout canvas
      if (targetId === 'tab-simulator' && emgAudio) {
        setTimeout(() => emgAudio.initCanvas(), 100);
      }
    });
  });

  // Initialize SVG Renderer
  const svgContainer = document.getElementById('plexus-svg-container');
  if (svgContainer && typeof PlexusSVGRenderer !== 'undefined') {
    svgRenderer = new PlexusSVGRenderer('plexus-svg-container', (elementId) => {
      inspectElement(elementId);
    });
  }

  // --- ROOT PATHWAY TRACER DOSSIER ---
  const rootDossiers = {
    'C5': {
      title: 'C5 Spinal Nerve Root Pathway',
      exit: 'Exits intervertebral foramen above C5 vertebra through Interscalene Triangle (between Anterior & Middle Scalenes over 1st rib).',
      plexusPath: 'C5 Root joins C6 to form <strong>Superior (Upper) Trunk</strong> -> passes to <strong>Anterior Division</strong> (into Lateral Cord) and <strong>Posterior Division</strong> (into Posterior Cord).',
      collaterals: [
        'Dorsal Scapular Nerve (C5): Rhomboids major/minor, Levator scapulae',
        'Long Thoracic Nerve (C5 rootlet): Serratus anterior',
        'Phrenic Nerve contribution (C3-C5): Diaphragm',
        'Suprascapular Nerve (via Upper Trunk): Supraspinatus, Infraspinatus'
      ],
      terminalNerves: 'Musculocutaneous N. (Lateral cord), Axillary N. (Posterior cord), Radial N. (Posterior cord), Median N. (Lateral root)',
      primaryMuscles: [
        'Rhomboids (C5 major)', 'Serratus anterior (C5 major)', 'Supraspinatus (C5 major)', 
        'Infraspinatus (C5 major)', 'Deltoid (C5 major)', 'Biceps brachii (C5 major)', 
        'Brachialis (C5 major)', 'Brachioradialis (C5 major)', 'Teres minor (C5 major)', 'Subclavius (C5 major)'
      ],
      dermatome: 'Lateral shoulder badge area (Axillary) and lateral upper arm/forearm down to base of thumb.',
      reflex: 'Biceps Reflex (C5/C6) and Brachioradialis Reflex (C5/C6).',
      clinicalPearls: '⭐ In C5 pre-ganglionic root avulsion, Rhomboids & Serratus anterior are denervated, but SNAPs (LAC, Superficial Radial) are completely NORMAL (Pre-ganglionic Paradox!). In Upper Trunk plexopathy, Rhomboids/Serratus are spared.'
    },
    'C6': {
      title: 'C6 Spinal Nerve Root Pathway',
      exit: 'Exits intervertebral foramen above C6 vertebra through Interscalene Triangle.',
      plexusPath: 'C6 Root joins C5 to form <strong>Superior (Upper) Trunk</strong> -> branches into <strong>Anterior Division</strong> (to Lateral Cord) and <strong>Posterior Division</strong> (to Posterior Cord).',
      collaterals: [
        'Long Thoracic Nerve (C6 rootlet): Serratus anterior',
        'Suprascapular Nerve (via Upper Trunk): Supraspinatus, Infraspinatus',
        'Nerve to Subclavius (via Upper Trunk): Subclavius'
      ],
      terminalNerves: 'Musculocutaneous N., Axillary N., Radial N., Median N. (Lateral root)',
      primaryMuscles: [
        'Biceps brachii (C6 major)', 'Brachioradialis (C6 major)', 'Pronator teres (C6 major)', 
        'Flexor carpi radialis (C6 major)', 'ECRL / ECRB (C6 major)', 'Supinator (C6 major)', 
        'Deltoid (C6 major)', 'Supraspinatus (C6 major)', 'Infraspinatus (C6 major)'
      ],
      dermatome: 'Lateral forearm, thumb, and index finger (via Lateral Antebrachial Cutaneous and Superficial Radial / Median D1-D2).',
      reflex: 'Brachioradialis Reflex (C6) and Biceps Reflex (C5/C6).',
      clinicalPearls: '⭐ Most common cervical radiculopathy level. LAC SNAP is the gold standard: abnormal in upper trunk plexopathy, but normal in C6 radiculopathy.'
    },
    'C7': {
      title: 'C7 Spinal Nerve Root Pathway',
      exit: 'Exits intervertebral foramen above C7 vertebra through Interscalene Triangle.',
      plexusPath: 'Directly continues as the <strong>Middle Trunk</strong> -> divides into <strong>Anterior Division</strong> (to Lateral Cord) and <strong>Posterior Division</strong> (to Posterior Cord). Gives NO collateral branches off trunk!',
      collaterals: [
        'Long Thoracic Nerve (C7 rootlet): Serratus anterior'
      ],
      terminalNerves: 'Radial Nerve (Posterior cord), Median Nerve (Lateral root & Median trunk)',
      primaryMuscles: [
        'Triceps brachii (C7 major)', 'Pronator teres (C7 major)', 'Flexor carpi radialis (C7 major)', 
        'Extensor digitorum communis (C7 major)', 'Extensor indicis proprius (C7 major)', 
        'Extensor carpi ulnaris (C7 major)', 'Latissimus dorsi (C7 major)', 'Anconeus (C7 major)'
      ],
      dermatome: 'Middle finger (dorsal & palmar) and central palm strip.',
      reflex: 'Triceps Reflex (C7).',
      clinicalPearls: '⭐ How to separate C7 radiculopathy from Radial Neuropathy: Check Pronator Teres & FCR (Median C7). In C7 radiculopathy, PT/FCR are weak/denervated. In Radial neuropathy, PT/FCR are completely NORMAL!'
    },
    'C8': {
      title: 'C8 Spinal Nerve Root Pathway',
      exit: 'Exits intervertebral foramen above T1 vertebra through Interscalene Triangle.',
      plexusPath: 'Joins T1 root to form <strong>Inferior (Lower) Trunk</strong> -> crosses over 1st rib -> divides into <strong>Anterior Division</strong> (continues as Medial Cord) and <strong>Posterior Division</strong> (joins Posterior Cord).',
      collaterals: [
        'Medial Pectoral Nerve (via Medial Cord): Pec minor & sternal pec major',
        'Medial Cutaneous Nerve of Forearm / MABC (via Medial Cord): Pure sensory to medial forearm'
      ],
      terminalNerves: 'Ulnar Nerve, Median Nerve (via Medial Root), Radial Nerve (EIP & EDC via posterior cord)',
      primaryMuscles: [
        'Abductor pollicis brevis (C8 major)', 'Flexor pollicis longus (C8 major)', 'FDP I & II (C8 major)', 
        'Flexor carpi ulnaris (C8 major)', 'FDP III & IV (C8 major)', 'ADM & FDI (C8 major)', 
        'All Interossei (C8 major)', 'Extensor indicis proprius (C8 minor/major)', 'Triceps (C8 major)'
      ],
      dermatome: 'Medial hand, 4th and 5th digits, and medial distal forearm.',
      reflex: 'Finger Flexor Reflex (Hoffmann sign).',
      clinicalPearls: '⭐ Crucial discriminator: Radial C8 fibers pass through lower trunk to posterior cord! In Lower Trunk lesion, EIP (Radial C8) is abnormal. In Medial Cord lesion, EIP is SPARED!'
    },
    'T1': {
      title: 'T1 Spinal Nerve Root Pathway',
      exit: 'Exits intervertebral foramen below T1 vertebra. Passes over neck of 1st rib to join C8.',
      plexusPath: 'Joins C8 to form <strong>Inferior (Lower) Trunk</strong> -> enters <strong>Anterior Division</strong> -> <strong>Medial Cord</strong> -> <strong>Medial Root of Median</strong> & <strong>Ulnar Nerve</strong>.',
      collaterals: [
        'First Intercostal Nerve',
        'Sympathetic White Rami Communicantes (connects to Stellate / Superior Cervical Ganglion)',
        'Medial Cutaneous Nerve of Arm (T1): Pure sensory to medial upper arm'
      ],
      terminalNerves: 'Ulnar Nerve (all intrinsics) and Median Nerve (Thenar intrinsics: APB, FPB, OP)',
      primaryMuscles: [
        'Abductor pollicis brevis (T1 minor/major)', 'Abductor digiti minimi (T1 major)', 
        'First dorsal interosseous (T1 major)', 'All Palmar & Dorsal Interossei (T1 major)', 
        'Lumbricals (T1 major)', 'Adductor pollicis (T1 major)', 'FCU (T1 major)'
      ],
      dermatome: 'Medial arm and axilla (Medial brachial cutaneous territory).',
      reflex: 'None specific; autonomic pupillary & eyelid fibers pass through T1.',
      clinicalPearls: "⭐ Horner's Syndrome (Ptosis, Miosis, Anhidrosis) is the hallmark of T1 pre-ganglionic root avulsion or Pancoast tumor invasion due to disruption of sympathetic outflow!"
    }
  };

  function inspectRootPathway(rootVal) {
    const detailsPanel = document.getElementById('element-details-card');
    const dossier = rootDossiers[rootVal];
    if (!detailsPanel || !dossier) return;

    const majorFromTable = PLEXUS_DATA.rootDistributionTable
      ? PLEXUS_DATA.rootDistributionTable.filter(m => m[rootVal.toLowerCase()] === 'major').map(m => m.muscle)
      : dossier.primaryMuscles;

    detailsPanel.innerHTML = `
      <div class="detail-header" style="border-bottom: 2px solid var(--accent-sky);">
        <span class="category-tag" style="color: var(--accent-sky); font-size:11px;">🔍 ROOT PATHWAY ACTIVE TRACING</span>
        <h3 style="color: #38bdf8;">${dossier.title}</h3>
      </div>
      <div class="detail-body">
        <div class="detail-row">
          <span class="label">Anatomical Exit:</span>
          <p style="font-size: 12.5px; color: var(--text-secondary);">${dossier.exit}</p>
        </div>

        <div class="detail-row">
          <span class="label">Plexus Course & Distribution:</span>
          <div class="text-content">${dossier.plexusPath}</div>
        </div>

        <div class="detail-row">
          <span class="label">Direct Collateral Branches:</span>
          <ul style="padding-left: 18px; font-size: 12px; color: var(--teal-light); display: flex; flex-direction: column; gap: 3px;">
            ${dossier.collaterals.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div class="detail-row">
          <span class="label">Primary Target Muscles (Major ${rootVal} Myotome - ${majorFromTable.length} Muscles):</span>
          <div class="badges-wrap">
            ${majorFromTable.map(m => `<span class="badge badge-teal">${m}</span>`).join(' ')}
          </div>
        </div>

        <div class="detail-row">
          <span class="label">Sensory Dermatome:</span>
          <p style="font-size: 12px; color: var(--text-secondary);">${dossier.dermatome}</p>
        </div>

        <div class="detail-row">
          <span class="label">Deep Tendon Reflex:</span>
          <p style="font-size: 12px; color: var(--accent-amber); font-weight: 600;">${dossier.reflex}</p>
        </div>

        <div class="scenario-box highlight-box mt-2">
          <h4 style="font-size: 12px; color: var(--accent-amber); margin-bottom: 4px;">💡 PM&R Clinical Pearl:</h4>
          <p style="font-size: 12px; line-height: 1.45;">${dossier.clinicalPearls}</p>
        </div>
      </div>
    `;
  }

  // --- ELEMENT INSPECTOR ---
  function inspectElement(id) {
    const detailsPanel = document.getElementById('element-details-card');
    if (!detailsPanel) return;

    // Direct root click handler
    if (id.startsWith('root-')) {
      const rName = id.replace('root-', '').toUpperCase();
      filterBtns.forEach(b => {
        if (b.getAttribute('data-root') === rName) b.classList.add('active');
        else b.classList.remove('active');
      });
      if (svgRenderer) svgRenderer.setFilter('root', rName);
      inspectRootPathway(rName);
      return;
    }

    let item = null;
    let category = '';

    // Search in segments
    ['roots', 'trunks', 'divisions', 'cords', 'terminals'].forEach(cat => {
      const found = PLEXUS_DATA.segments[cat].find(s => s.id === id);
      if (found) {
        item = found;
        category = cat.toUpperCase();
      }
    });

    // Search in collateral branches
    if (!item) {
      const foundBranch = PLEXUS_DATA.collateralBranches.find(b => b.id === id);
      if (foundBranch) {
        item = foundBranch;
        category = 'COLLATERAL BRANCH';
      }
    }

    if (!item) return;

    // Check if Pure Sensory Nerve (NO MOTOR INNERVATION)
    const isPureSensory = item.isSensory ||
                          item.id === 'med-cut-forearm' || 
                          item.id === 'med-cut-arm' || 
                          item.id === 'intercostal-t1' || 
                          item.name.toLowerCase().includes('cutaneous') ||
                          (category === 'COLLATERAL BRANCH' && (!item.muscles || item.muscles.length === 0));

    let musclesSection = '';
    if (isPureSensory) {
      musclesSection = `
        <div class="detail-row">
          <span class="label">Functional Modality:</span>
          <div style="background: rgba(245, 158, 11, 0.15); border: 1.5px solid #f59e0b; border-radius: var(--radius-sm); padding: 8px 12px; color: #fef08a; font-weight: 800; font-size: 12.5px; display: flex; align-items: center; gap: 8px;">
            <span>🛡️</span> Pure Sensory Nerve (NO Motor / Muscle Innervation)
          </div>
        </div>
        <div class="detail-row">
          <span class="label">Sensory Cutaneous Territory:</span>
          <div class="text-content">
            ${item.landmark || item.clinical || 'Supplies cutaneous sensation to its designated dermatome / sensory zone.'}
          </div>
        </div>
      `;
    } else if (item.muscles && item.muscles.length > 0) {
      musclesSection = `
        <div class="detail-row">
          <span class="label">Innervated Muscles:</span>
          <div class="badges-wrap">${item.muscles.map(m => `<span class="badge badge-teal">${m}</span>`).join(' ')}</div>
        </div>
      `;
    }

    detailsPanel.innerHTML = `
      <div class="detail-header">
        <span class="category-tag">${category}</span>
        <h3>${item.name}</h3>
      </div>
      <div class="detail-body">
        <p class="desc">${item.desc || item.clinical || 'Key anatomical segment of the brachial plexus.'}</p>
        
        ${item.roots ? `
          <div class="detail-row">
            <span class="label">Spinal Roots:</span>
            <div class="badges">${item.roots.map(r => `<span class="badge badge-root">${r}</span>`).join(' ')}</div>
          </div>
        ` : ''}

        ${item.cord ? `
          <div class="detail-row">
            <span class="label">Plexus Origin Cord:</span>
            <span class="badge badge-teal">${item.cord}</span>
          </div>
        ` : ''}

        ${item.landmark ? `
          <div class="detail-row">
            <span class="label">Anatomical Landmark:</span>
            <div class="text-content">${item.landmark}</div>
          </div>
        ` : ''}

        ${musclesSection}

        <div class="detail-actions mt-3">
          <button class="btn btn-sm btn-primary" id="btn-quick-lesion" data-lesion-id="${item.id}">
            ⚡ Simulate Lesion at this site
          </button>
        </div>
      </div>
    `;

    const quickLesionBtn = document.getElementById('btn-quick-lesion');
    if (quickLesionBtn) {
      quickLesionBtn.addEventListener('click', () => {
        let scenarioId = 'upper-trunk';
        if (id.includes('trunk-upper') || id.includes('c5') || id.includes('c6')) scenarioId = 'upper-trunk';
        else if (id.includes('trunk-lower') || id.includes('c8') || id.includes('t1')) scenarioId = 'lower-trunk';
        else if (id.includes('posterior')) scenarioId = 'posterior-cord';
        else if (id.includes('lateral')) scenarioId = 'lateral-cord';
        else if (id.includes('medial')) scenarioId = 'medial-cord';
        
        loadScenario(scenarioId);
        const simTab = document.querySelector('[data-target="tab-simulator"]');
        if (simTab) simTab.click();
      });
    }
  }

  // --- FILTER CONTROLS ON DIAGRAM (ROOT TRACING) ---
  const filterBtns = document.querySelectorAll('.root-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const rootVal = btn.getAttribute('data-root');
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        if (svgRenderer) svgRenderer.clearFilter();
        inspectElement('trunk-upper');
      } else {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (svgRenderer) svgRenderer.setFilter('root', rootVal);
        inspectRootPathway(rootVal);
      }
    });
  });

  const clearFilterBtn = document.getElementById('btn-clear-filters');
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      if (svgRenderer) svgRenderer.clearFilter();
      inspectElement('trunk-upper');
    });
  }

  const landmarkToggle = document.getElementById('toggle-landmarks');
  if (landmarkToggle) {
    landmarkToggle.addEventListener('change', (e) => {
      if (svgRenderer) svgRenderer.toggleLandmarks(e.target.checked);
    });
  }

  // --- SCENARIO SELECTOR (SIMULATOR TAB) ---
  const scenarioSelect = document.getElementById('scenario-select');
  if (scenarioSelect) {
    scenarioSelect.addEventListener('change', (e) => {
      loadScenario(e.target.value);
    });
  }

  function loadScenario(scenarioId) {
    if (!PLEXUS_DATA || !PLEXUS_DATA.clinicalScenarios) return;
    const scenario = PLEXUS_DATA.clinicalScenarios.find(s => s.id === scenarioId) || PLEXUS_DATA.clinicalScenarios[0];
    if (!scenario) return;

    if (scenarioSelect) scenarioSelect.value = scenario.id;
    if (svgRenderer) svgRenderer.setLesion(scenario.id);

    // Update Clinical Presentation Card
    const infoContainer = document.getElementById('scenario-presentation-info');
    if (infoContainer) {
      infoContainer.innerHTML = `
        <div class="scenario-banner">
          <h3>${scenario.title}</h3>
          <p class="etiology"><strong>Etiology:</strong> ${scenario.etiology}</p>
        </div>
        <div class="grid-2col mt-3">
          <div class="scenario-box">
            <h4>🩺 Physical Findings & Presentation</h4>
            <p>${scenario.clinicalPresentation}</p>
            <p class="mt-2"><strong>Sensory Deficit:</strong> ${scenario.sensoryLoss}</p>
          </div>
          <div class="scenario-box highlight-box">
            <h4>💡 High-Yield PM&R Board Pearls</h4>
            <p>${scenario.pearls}</p>
          </div>
        </div>
      `;
    }

    // Update NCS Table
    const ncsTbody = document.getElementById('scenario-ncs-tbody');
    if (ncsTbody) {
      let rows = '';
      if (scenario.ncsFindings) {
        Object.entries(scenario.ncsFindings).forEach(([key, val]) => {
          let label = key.replace(/([A-Z])/g, ' $1').toUpperCase();
          let isAbnormal = val.includes('Absent') || val.includes('reduced') || val.includes('Markedly') || val.includes('Attenuated') || val.includes('Prolonged');
          let statusBadge = isAbnormal ? '<span class="badge badge-red">ABNORMAL / REDUCED</span>' : '<span class="badge badge-green">NORMAL</span>';
          rows += `
            <tr>
              <td><strong>${label}</strong></td>
              <td>${statusBadge}</td>
              <td class="${isAbnormal ? 'text-red' : 'text-slate'}">${val}</td>
            </tr>
          `;
        });
      }
      ncsTbody.innerHTML = rows;
    }

    // Update EMG Table
    const emgTbody = document.getElementById('scenario-emg-tbody');
    if (emgTbody) {
      let rows = '';
      if (scenario.emgFindings) {
        scenario.emgFindings.forEach(f => {
          let isAbnormal = f.result.includes('Fibs') || f.result.includes('MYOKYMIC') || f.result.includes('denervation');
          let statusBadge = isAbnormal ? '<span class="badge badge-red">DENERVATED</span>' : '<span class="badge badge-green">NORMAL</span>';
          rows += `
            <tr>
              <td><strong>${f.muscle}</strong></td>
              <td>${statusBadge}</td>
              <td class="${isAbnormal ? 'text-amber' : 'text-slate'}">${f.result}</td>
            </tr>
          `;
        });
      }
      emgTbody.innerHTML = rows;
    }

    // Update Audio Mode
    if (emgAudio) {
      if (scenario.id === 'radiation-vs-tumor') {
        emgAudio.setMode('myokymia');
        updateAudioControls('myokymia');
      } else if (scenario.id === 'preganglionic-avulsion' || scenario.id === 'upper-trunk') {
        emgAudio.setMode('fibs');
        updateAudioControls('fibs');
      } else {
        emgAudio.setMode('normal');
        updateAudioControls('normal');
      }
    }
  }

  function updateAudioControls(mode) {
    const waveBtns = document.querySelectorAll('.wave-btn');
    waveBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-wave') === mode);
    });
  }

  // --- EMG AUDIO CONTROLS ---
  const playBtn = document.getElementById('btn-emg-play');
  const stopBtn = document.getElementById('btn-emg-stop');
  const volSlider = document.getElementById('emg-volume-slider');
  const waveBtns = document.querySelectorAll('.wave-btn');

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (emgAudio) emgAudio.start();
      playBtn.classList.add('btn-success');
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      if (emgAudio) emgAudio.stop();
      if (playBtn) playBtn.classList.remove('btn-success');
    });
  }

  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      if (emgAudio) emgAudio.setVolume(parseFloat(e.target.value));
    });
  }

  waveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      waveBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const wave = btn.getAttribute('data-wave');
      if (emgAudio) emgAudio.setMode(wave);

      const infoLabel = document.getElementById('wave-desc-text');
      if (infoLabel) {
        const descs = {
          normal: 'Normal voluntary triphasic MUAP firing crisply during voluntary muscle contraction (10-15 Hz).',
          fibs: 'Fibrillation Potentials: High-pitched irregular clicking ("rain on a tin roof"), 1-3 ms, 1000-2500 Hz. Indicates active denervation.',
          psws: 'Positive Sharp Waves: Distinctive dull "thump/pop" with sharp positive onset followed by slow negative decay. Hallmarks acute axonal denervation.',
          myokymia: '⭐ Myokymic Discharges: Spontaneous grouped repetitive firing (20-70 Hz within burst) every 1-2 sec ("marching soldiers"). Pathognomonic for radiation plexopathy!',
          fascics: 'Fasciculation Potentials: Spontaneous irregular "popcorn" pops from an entire motor unit. Seen in motor neuron disease, radiculopathy, benign cramps.',
          crd: 'Complex Repetitive Discharges: Rapid machine-gun like ephaptic firing (50-100 Hz), starts abruptly and stops abruptly without waning.'
        };
        infoLabel.textContent = descs[wave] || '';
      }
    });
  });

  // --- PERIPHERAL NERVE ANATOMY (TAB 3) ---
  const nervePillBtns = document.querySelectorAll('.nerve-pill-btn');
  const nerveDetailsContainer = document.getElementById('nerve-branches-detail-container');

  function renderPeripheralNerve(nerveKey) {
    if (!nerveDetailsContainer || !PLEXUS_DATA.peripheralNervesDetail) return;
    const data = PLEXUS_DATA.peripheralNervesDetail[nerveKey];
    if (!data) return;

    let html = `
      <div class="info-card mb-3" style="border-left: 4px solid var(--teal-primary);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 20px; font-weight: 800; color: #fff;">${data.name}</h3>
            <div style="font-size: 13px; color: var(--teal-light); margin-top: 2px;">
              <strong>Spinal Roots:</strong> ${data.roots} &nbsp;|&nbsp; <strong>Origin:</strong> ${data.origin}
            </div>
          </div>
          <span class="badge badge-teal" style="font-size: 12px;">Preston & Shapiro / Perotto Guide</span>
        </div>
        <p style="margin-top: 10px; font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
          <strong>Anatomical Course:</strong> ${data.course}
        </p>
      </div>
    `;

    if (data.thaiMnemonic) {
      html += `
        <div class="mnemonic-banner">
          <div>
            <div class="mnemonic-tag">💡 THAI PM&R CLINICAL MEMORY MNEMONIC</div>
            <div class="mnemonic-text">${data.thaiMnemonic}</div>
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-left: auto;">
            <strong>โปร-ขอ-ปาล์ม-ดี</strong> = Elbow main trunk<br>
            <strong>ดี-โป้ง-โป</strong> = AIN (lateral FDP, FPL, PQ)<br>
            <strong>AFO</strong> = Thenar Recurrent (APB, FPB, OP)
          </div>
        </div>
      `;
    }

    html += `<div class="nerve-tree-container">`;
    data.branchingSequence.forEach((step) => {
      html += `
        <div class="nerve-step-node">
          <div class="step-node-header">
            <div class="step-level-title">
              <span>📍</span> ${step.level}
            </div>
            ${step.landmark ? `<span class="step-landmark-badge">${step.landmark}</span>` : ''}
            ${step.mnemonic ? `<span class="badge badge-amber" style="font-size:12px;">คำจำ: ${step.mnemonic}</span>` : ''}
          </div>
          <div class="branches-grid">
      `;

      step.branches.forEach(br => {
        let cardType = br.type === 'Motor' ? 'motor' : (br.type === 'Sensory' ? 'sensory' : 'entrapment-landmark');
        html += `
          <div class="branch-item-card ${cardType}">
            <div class="branch-name">${br.name}</div>
            <div class="branch-innervation">${br.innervation}</div>
            ${br.notes ? `<div class="branch-note">${br.notes}</div>` : ''}
            ${br.subBranches ? `
              <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed rgba(255,255,255,0.1);">
                <span style="font-size: 11px; font-weight:700; color: var(--teal-light);">Muscles Innervated:</span>
                <ul style="padding-left: 16px; margin-top: 4px; font-size: 11.5px; color: var(--text-primary);">
                  ${br.subBranches.map(sb => `<li><strong>${sb.name}:</strong> ${sb.muscle}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        `;
      });

      html += `</div></div>`;
    });
    html += `</div>`;

    if (data.entrapments && data.entrapments.length > 0) {
      html += `
        <div class="table-card mt-3">
          <div class="table-title">
            <h4>⚠️ Key Clinical Entrapment Sites & PM&R Differential Points</h4>
            <span class="badge badge-amber">Clinical Correlation</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 14px; margin-top: 10px;">
            ${data.entrapments.map(e => `
              <div class="entrapment-box">
                <div class="entrapment-title">🛑 ${e.site}</div>
                <div style="font-size: 11px; color: #f59e0b; font-weight:600; margin-bottom: 4px;">Etiology: ${e.cause}</div>
                <div class="entrapment-desc">${e.clinical}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    nerveDetailsContainer.innerHTML = html;
  }

  nervePillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      nervePillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const nerveKey = btn.getAttribute('data-nerve');
      renderPeripheralNerve(nerveKey);
    });
  });

  // --- ROOT DISTRIBUTION TABLE (TAB 4) ---
  const rootSearchInput = document.getElementById('root-dist-search');
  const rootTableTbody = document.getElementById('root-dist-tbody');
  const rootFilterSelector = document.getElementById('root-filter-select');
  const rootMajorOnlyCheckbox = document.getElementById('root-major-only');

  function renderRootTable() {
    if (!rootTableTbody || !PLEXUS_DATA.rootDistributionTable) return;
    const query = (rootSearchInput && rootSearchInput.value ? String(rootSearchInput.value) : '').toLowerCase().trim();
    const filterRoot = rootFilterSelector && rootFilterSelector.value ? rootFilterSelector.value : 'all';
    const majorOnly = rootMajorOnlyCheckbox ? Boolean(rootMajorOnlyCheckbox.checked) : false;

    let filtered = PLEXUS_DATA.rootDistributionTable.filter(item => {
      const matchQuery = item.muscle.toLowerCase().includes(query) || item.nerve.toLowerCase().includes(query);
      if (!matchQuery) return false;

      if (filterRoot !== 'all') {
        const val = item[filterRoot.toLowerCase()];
        if (majorOnly) return val === 'major';
        return val === 'major' || val === 'minor';
      }

      if (majorOnly) {
        return ['c1','c2','c3','c4','c5','c6','c7','c8','t1'].some(r => item[r] === 'major');
      }

      return true;
    });

    if (filtered.length === 0) {
      rootTableTbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding: 24px; color: var(--text-muted);">No muscles matched your search criteria.</td></tr>`;
      return;
    }

    rootTableTbody.innerHTML = filtered.map(row => {
      const formatCell = (val) => {
        if (val === 'major') return `<span class="badge-major-root">X</span>`;
        if (val === 'minor') return `<span class="badge-minor-root">X</span>`;
        return `<span style="color: rgba(255,255,255,0.15);">-</span>`;
      };

      return `
        <tr>
          <td><strong style="color: #fff;">${row.muscle}</strong></td>
          <td style="color: var(--teal-light); font-size: 11.5px;">${row.nerve}</td>
          <td style="text-align:center;">${formatCell(row.c1)}</td>
          <td style="text-align:center;">${formatCell(row.c2)}</td>
          <td style="text-align:center;">${formatCell(row.c3)}</td>
          <td style="text-align:center;">${formatCell(row.c4)}</td>
          <td style="text-align:center;">${formatCell(row.c5)}</td>
          <td style="text-align:center;">${formatCell(row.c6)}</td>
          <td style="text-align:center;">${formatCell(row.c7)}</td>
          <td style="text-align:center;">${formatCell(row.c8)}</td>
          <td style="text-align:center;">${formatCell(row.t1)}</td>
        </tr>
      `;
    }).join('');
  }

  if (rootSearchInput) rootSearchInput.addEventListener('input', renderRootTable);
  if (rootFilterSelector) rootFilterSelector.addEventListener('change', renderRootTable);
  if (rootMajorOnlyCheckbox) rootMajorOnlyCheckbox.addEventListener('change', renderRootTable);

  // --- PEROTTO MUSCLE ATLAS SEARCH ---
  const muscleSearchInput = document.getElementById('muscle-search-input');
  const muscleListContainer = document.getElementById('muscle-cards-grid');

  function renderMuscleCards(muscles) {
    if (!muscleListContainer) return;
    if (!muscles || muscles.length === 0) {
      muscleListContainer.innerHTML = '<div class="no-results">No muscles matched your search criteria.</div>';
      return;
    }

    muscleListContainer.innerHTML = muscles.map(m => `
      <div class="muscle-card">
        <div class="muscle-card-header">
          <h4>${m.name}</h4>
          <span class="badge badge-root">${m.roots}</span>
        </div>
        <div class="muscle-card-meta">
          <span class="meta-item"><strong>Nerve:</strong> ${m.nerve}</span>
          <span class="meta-item"><strong>Trunk/Cord:</strong> ${m.trunk} / ${m.cord}</span>
        </div>
        <div class="muscle-card-section">
          <span class="section-label">Action & MMT:</span>
          <p>${m.action} (<em>${m.mmt}</em>)</p>
        </div>
        <div class="muscle-card-section landmark-section">
          <span class="section-label">📍 Perotto Needle Insertion Landmark:</span>
          <p>${m.perottoLandmark}</p>
        </div>
        <div class="muscle-card-section danger-section">
          <span class="section-label">⚠️ Caution / Danger Zone:</span>
          <p class="text-danger">${m.danger}</p>
        </div>
        <div class="muscle-card-footer">
          <small>💡 ${m.pmrPearls}</small>
        </div>
      </div>
    `).join('');
  }

  if (muscleSearchInput) {
    muscleSearchInput.addEventListener('input', (e) => {
      const q = (e && e.target && e.target.value ? String(e.target.value) : '').toLowerCase().trim();
      const filtered = PLEXUS_DATA.muscles.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.roots.toLowerCase().includes(q) ||
        m.nerve.toLowerCase().includes(q) ||
        m.perottoLandmark.toLowerCase().includes(q) ||
        m.danger.toLowerCase().includes(q)
      );
      renderMuscleCards(filtered);
    });
  }

  // --- CLINICAL CASE QUIZ ---
  const quizContainer = document.getElementById('quiz-questions-container');
  function renderQuiz() {
    if (!quizContainer || !PLEXUS_DATA.caseQuiz) return;
    quizContainer.innerHTML = PLEXUS_DATA.caseQuiz.map((c) => `
      <div class="quiz-card" id="quiz-card-${c.id}">
        <div class="quiz-header">
          <span class="badge badge-primary">Clinical Vignette #${c.caseNum}</span>
        </div>
        <p class="vignette-text"><strong>Case History:</strong> ${c.vignette}</p>
        <p class="question-text"><strong>Question:</strong> ${c.question}</p>
        <div class="quiz-options">
          ${c.options.map((opt, oIdx) => `
            <button class="quiz-option-btn" data-case="${c.id}" data-opt-idx="${oIdx}">
              <span class="opt-letter">${['A', 'B', 'C', 'D'][oIdx]}</span>
              <span class="opt-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-explanation hidden" id="explanation-${c.id}"></div>
      </div>
    `).join('');

    const optionBtns = quizContainer.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const caseId = btn.getAttribute('data-case');
        const optIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        const card = document.getElementById(`quiz-card-${caseId}`);
        const explDiv = document.getElementById(`explanation-${caseId}`);
        const caseData = PLEXUS_DATA.caseQuiz.find(q => q.id === caseId);

        if (!card || !explDiv || !caseData) return;

        const allCardBtns = card.querySelectorAll('.quiz-option-btn');
        allCardBtns.forEach(b => b.disabled = true);

        const chosenOpt = caseData.options[optIdx];
        if (chosenOpt.correct) {
          btn.classList.add('correct');
          explDiv.className = 'quiz-explanation alert-success';
          explDiv.innerHTML = `<strong>🎉 Correct!</strong> ${chosenOpt.explanation}`;
        } else {
          btn.classList.add('incorrect');
          const correctIdx = caseData.options.findIndex(o => o.correct);
          if (correctIdx !== -1) {
            allCardBtns[correctIdx].classList.add('correct');
          }
          explDiv.className = 'quiz-explanation alert-danger';
          explDiv.innerHTML = `<strong>Incorrect.</strong> ${chosenOpt.explanation}<br><br><em>Correct Answer: ${caseData.options[correctIdx].text}</em>`;
        }
        explDiv.classList.remove('hidden');
      });
    });
  }

  // Print button
  const printPosterBtn = document.getElementById('btn-print-poster');
  if (printPosterBtn) {
    printPosterBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // INITIAL RUNS
  if (PLEXUS_DATA.muscles) renderMuscleCards(PLEXUS_DATA.muscles);
  loadScenario('upper-trunk');
  inspectElement('trunk-upper');
  renderPeripheralNerve('median');
  renderRootTable();
  renderQuiz();

  console.log('Brachial Plexus Suite Initialized Successfully!');
});

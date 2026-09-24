/**
 * Main Controller for Brachial Plexus PM&R Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Components
  let svgRenderer = null;
  let emgAudio = null;

  // Initialize SVG
  const svgContainer = document.getElementById('plexus-svg-container');
  if (svgContainer) {
    svgRenderer = new PlexusSVGRenderer('plexus-svg-container', (elementId) => {
      inspectElement(elementId);
    });
  }

  // Initialize EMG Audio Engine
  emgAudio = new EMGAudioEngine('emg-oscilloscope');

  // --- TAB NAVIGATION ---
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      // If switching to simulator, re-layout canvas
      if (targetId === 'tab-simulator' && emgAudio) {
        setTimeout(() => emgAudio.initCanvas(), 100);
      }
    });
  });

  // --- ELEMENT INSPECTOR ---
  function inspectElement(id) {
    const detailsPanel = document.getElementById('element-details-card');
    if (!detailsPanel) return;

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

    let musclesList = '';
    if (item.muscles && item.muscles.length > 0) {
      musclesList = item.muscles.map(m => `<span class="badge badge-teal">${m}</span>`).join(' ');
    } else {
      // Find muscles innervated by this terminal nerve or root
      const matchingMuscles = PLEXUS_DATA.muscles.filter(m => {
        if (item.name && m.nerve && m.nerve.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])) return true;
        if (item.roots && item.roots.some(r => m.roots.includes(r))) return true;
        return false;
      });
      if (matchingMuscles.length > 0) {
        musclesList = matchingMuscles.slice(0, 6).map(m => `<span class="badge badge-teal">${m.name}</span>`).join(' ');
      }
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

        ${item.landmark ? `
          <div class="detail-row">
            <span class="label">Anatomical Landmark:</span>
            <div class="text-content">${item.landmark}</div>
          </div>
        ` : ''}

        ${musclesList ? `
          <div class="detail-row">
            <span class="label">Innervated Muscles:</span>
            <div class="badges-wrap">${musclesList}</div>
          </div>
        ` : ''}

        <div class="detail-actions">
          <button class="btn btn-sm btn-primary" id="btn-quick-lesion" data-lesion-id="${item.id}">
            ⚡ Simulate Lesion at this site
          </button>
        </div>
      </div>
    `;

    const quickLesionBtn = document.getElementById('btn-quick-lesion');
    if (quickLesionBtn) {
      quickLesionBtn.addEventListener('click', () => {
        // Map to corresponding scenario if possible
        let scenarioId = 'upper-trunk';
        if (id.includes('trunk-upper') || id.includes('c5') || id.includes('c6')) scenarioId = 'upper-trunk';
        else if (id.includes('trunk-lower') || id.includes('c8') || id.includes('t1')) scenarioId = 'lower-trunk';
        else if (id.includes('posterior')) scenarioId = 'posterior-cord';
        else if (id.includes('lateral')) scenarioId = 'lateral-cord';
        else if (id.includes('medial')) scenarioId = 'medial-cord';
        
        loadScenario(scenarioId);
        // Switch to simulator tab
        document.querySelector('[data-target="tab-simulator"]').click();
      });
    }
  }

  // --- FILTER CONTROLS ON DIAGRAM ---
  const filterBtns = document.querySelectorAll('.root-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const rootVal = btn.getAttribute('data-root');
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        svgRenderer.clearFilter();
      } else {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        svgRenderer.setFilter('root', rootVal);
      }
    });
  });

  const clearFilterBtn = document.getElementById('btn-clear-filters');
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      svgRenderer.clearFilter();
    });
  }

  const landmarkToggle = document.getElementById('toggle-landmarks');
  if (landmarkToggle) {
    landmarkToggle.addEventListener('change', (e) => {
      svgRenderer.toggleLandmarks(e.target.checked);
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

    // Update NCS Findings Table
    const ncsTbody = document.getElementById('scenario-ncs-tbody');
    if (ncsTbody) {
      let rows = '';
      if (scenario.ncsFindings) {
        Object.entries(scenario.ncsFindings).forEach(([key, val]) => {
          let label = key.replace(/([A-Z])/g, ' ').toUpperCase();
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

    // Update Needle EMG Table
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

    // Switch EMG audio mode based on scenario
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

  // --- EMG AUDIO & OSCILLOSCOPE CONTROLS ---
  const playBtn = document.getElementById('btn-emg-play');
  const stopBtn = document.getElementById('btn-emg-stop');
  const volSlider = document.getElementById('emg-volume-slider');
  const waveBtns = document.querySelectorAll('.wave-btn');

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      emgAudio.start();
      playBtn.classList.add('btn-success');
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      emgAudio.stop();
      if (playBtn) playBtn.classList.remove('btn-success');
    });
  }

  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      emgAudio.setVolume(parseFloat(e.target.value));
    });
  }

  waveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      waveBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const wave = btn.getAttribute('data-wave');
      emgAudio.setMode(wave);

      // Update waveform info label
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

  // --- PEROTTO MUSCLE ATLAS SEARCH & FILTER ---
  const muscleSearchInput = document.getElementById('muscle-search-input');
  const muscleListContainer = document.getElementById('muscle-cards-grid');

  function renderMuscleCards(muscles) {
    if (!muscleListContainer) return;
    if (muscles.length === 0) {
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
      const q = e.target.value.toLowerCase().trim();
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
  if (quizContainer) {
    renderQuiz();
  }

  function renderQuiz() {
    quizContainer.innerHTML = PLEXUS_DATA.caseQuiz.map((c, idx) => `
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

    // Attach Quiz Click Handlers
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
          // Highlight correct option
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

  // Print / Export Poster button
  const printPosterBtn = document.getElementById('btn-print-poster');
  if (printPosterBtn) {
    printPosterBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Initial renders
  renderMuscleCards(PLEXUS_DATA.muscles);
  loadScenario('upper-trunk');
  inspectElement('trunk-upper');
});

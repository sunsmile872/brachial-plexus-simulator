/**
 * Peripheral Nerve Branching Visual Diagram (Interactive SVG Stem Tree)
 * 100% Anatomically Calibrated from Preston & Shapiro 4th Ed, Neumann Appendix II Part B, and Perotto 5th Ed.
 * Features:
 * - Proximodistal anatomical compartment bands (Axilla -> Arm -> Elbow -> Forearm -> Wrist -> Hand)
 * - Color-coded nodes: Motor (Emerald Green), Sensory (Amber Gold), Entrapment Landmarks (Crimson Hazard Pin)
 * - Interactive Entrapment Click-to-Simulate: Highlights Spared (Normal) vs Involved (Denervated) branches
 * - Dynamic Thai PM&R Mnemonic & Clinical Sparing Pearls
 */

class PeripheralTreeVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentNerve = 'median';
    this.activeLesion = null;
    this.activeBranch = null;
    this.viewMode = 'visual'; // 'visual' or 'table'
  }

  setNerve(nerveKey) {
    this.currentNerve = nerveKey;
    this.activeLesion = null;
    this.activeBranch = null;
    this.render();
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.render();
  }

  simulateLesion(lesionId) {
    if (this.activeLesion === lesionId) {
      this.activeLesion = null; // Toggle off if clicked again
    } else {
      this.activeLesion = lesionId;
    }
    this.render();
  }

  clearLesion() {
    this.activeLesion = null;
    this.render();
  }

  selectBranch(branchId) {
    this.activeBranch = branchId;
    this.updateBranchDetailCard();
  }

  render() {
    if (!this.container) return;
    if (this.viewMode === 'table') {
      this.renderTableView();
      return;
    }
    this.renderVisualView();
  }

  renderTableView() {
    if (!PLEXUS_DATA || !PLEXUS_DATA.peripheralNervesDetail) return;
    const data = PLEXUS_DATA.peripheralNervesDetail[this.currentNerve];
    if (!data) return;

    let html = `
      <div class="peripheral-toolbar">
        <div class="view-toggle-group">
          <button class="btn btn-sm" id="btn-toggle-visual">🌳 Interactive Stem Tree</button>
          <button class="btn btn-sm btn-primary active" id="btn-toggle-table">📋 Detailed Clinical Guide & Perotto Cards</button>
        </div>
      </div>

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
        </div>
      `;
    }

    html += `<div class="nerve-tree-container">`;
    data.branchingSequence.forEach((step) => {
      html += `
        <div class="nerve-step-node">
          <div class="step-node-header">
            <div class="step-level-title"><span>📍</span> ${step.level}</div>
            ${step.landmark ? `<span class="step-landmark-badge">${step.landmark}</span>` : ''}
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

    this.container.innerHTML = html;
    this.bindViewToggleEvents();
  }

  renderVisualView() {
    if (!PLEXUS_DATA || !PLEXUS_DATA.peripheralNervesDetail) return;
    const data = PLEXUS_DATA.peripheralNervesDetail[this.currentNerve];
    if (!data) return;

    const svgMarkup = this.getNerveSvgMarkup(this.currentNerve);
    const mnemonicData = this.getMnemonicBreakdown(this.currentNerve);
    const lesionInfo = this.getLesionInfo(this.currentNerve, this.activeLesion);

    let html = `
      <div class="peripheral-toolbar">
        <div class="view-toggle-group">
          <button class="btn btn-sm btn-primary active" id="btn-toggle-visual">🌳 Interactive Stem Tree</button>
          <button class="btn btn-sm" id="btn-toggle-table">📋 Detailed Clinical Guide & Perotto Cards</button>
        </div>
        <div class="peripheral-legend">
          <span class="legend-tag motor"><span class="dot" style="background:#10b981;"></span> Motor Branch</span>
          <span class="legend-tag sensory"><span class="dot" style="background:#f59e0b;"></span> Sensory Branch</span>
          <span class="legend-tag entrapment"><span class="dot" style="background:#ef4444;"></span> Entrapment Site (Click to Simulate)</span>
          ${this.activeLesion ? `<button class="btn btn-xs btn-outline-danger" id="btn-tree-clear-lesion">✕ Clear Lesion / Normal View</button>` : ''}
        </div>
      </div>

      <div class="visual-tree-layout">
        <!-- Left: Interactive SVG Diagram Canvas -->
        <div class="visual-tree-canvas-card">
          <div class="tree-canvas-header">
            <div>
              <span class="tree-title">${data.name} Visual Stem Diagram</span>
              <span class="tree-subtitle">Proximodistal Branching & Entrapment Hierarchy (Preston & Shapiro 4th Ed.)</span>
            </div>
            <span class="badge ${this.activeLesion ? 'badge-amber' : 'badge-teal'}">
              ${this.activeLesion ? '⚡ LESION ACTIVE: ' + this.getLesionName(this.activeLesion) : '🟢 Normal Anatomy'}
            </span>
          </div>

          <div class="tree-svg-wrapper">
            ${svgMarkup}
          </div>
        </div>

        <!-- Right: Thai Mnemonic & Lesion Clinical Insights Sidebar -->
        <aside class="visual-tree-sidebar">
          <!-- Thai PM&R Mnemonic Card -->
          <div class="mnemonic-card-box">
            <div class="mnemonic-card-header">
              <span style="font-size: 16px;">💡</span>
              <span style="font-weight: 800; font-size: 13px; color: #fff;">สูตรจำคลินิก (Thai PM&R Mnemonics)</span>
            </div>
            <div class="mnemonic-lead">${data.thaiMnemonic || ''}</div>
            <div class="mnemonic-breakdown-list">
              ${mnemonicData.map(m => `
                <div class="mnemonic-row">
                  <span class="mnemonic-word">${m.word}</span>
                  <span class="mnemonic-arrow">➔</span>
                  <span class="mnemonic-desc"><strong>${m.name}</strong> ${m.muscles}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Dynamic Lesion Localization Card -->
          <div class="lesion-insight-card ${this.activeLesion ? 'active-lesion' : ''}">
            <div class="lesion-card-header">
              <span style="font-size: 16px;">${this.activeLesion ? '🛑' : '🩺'}</span>
              <span style="font-weight: 800; font-size: 13.5px; color: #fff;">
                ${this.activeLesion ? 'Clinical Lesion: ' + lesionInfo.title : 'Interactive Entrapment Simulator'}
              </span>
            </div>

            ${this.activeLesion ? `
              <div class="lesion-card-body">
                <div class="lesion-alert-banner">
                  <strong>Site:</strong> ${lesionInfo.site}<br>
                  <strong>Etiology:</strong> ${lesionInfo.cause}
                </div>

                <div class="lesion-findings-grid">
                  <div class="finding-box spared">
                    <div class="finding-header">🟢 SPARED (Above Lesion / Normal)</div>
                    <ul class="finding-list">
                      ${lesionInfo.spared.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                  </div>

                  <div class="finding-box involved">
                    <div class="finding-header">🔴 INVOLVED (Below Lesion / Denervated)</div>
                    <ul class="finding-list">
                      ${lesionInfo.involved.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                  </div>
                </div>

                <div class="lesion-edx-pearls">
                  <div class="pearl-title">⭐ High-Yield PM&R Electrodiagnostic Pearls:</div>
                  <p>${lesionInfo.pearls}</p>
                </div>
              </div>
            ` : `
              <div class="lesion-placeholder">
                <p>💡 <strong>วิธีใช้งาน:</strong> คลิกที่ <strong>ไอคอนหมุดสีแดง (🔴 Entrapment Sites)</strong> บนแผนภาพกิ่งประสาททางซ้าย เพื่อจำลองรอยโรค ณ ตำแหน่งนั้นทันที:</p>
                <ul style="padding-left: 18px; margin-top: 8px; font-size: 12px; color: var(--text-secondary); line-height: 1.6;">
                  <li>ระบบจะระบายสีเขียว (🟢) ให้กับกล้ามเนื้อและแขนงที่ <strong>Spared (ปกติ)</strong></li>
                  <li>ระบบจะระบายสีแดง (🔴) ให้กับกล้ามเนื้อที่ <strong>Involved (อ่อนแรง/Denervated)</strong></li>
                  <li>วิเคราะห์การแยกโรคด้วย <strong>Needle EMG & NCS (SNAP Sparing)</strong> โดยอัตโนมัติ</li>
                </ul>
              </div>
            `}
          </div>

          <!-- Muscle Inspector (Perotto Atlas) -->
          <div class="branch-inspector-card" id="branch-inspector-box">
            <div style="font-size: 11.5px; color: var(--teal-light); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Selected Branch / Muscle:</div>
            <div id="inspector-branch-name" style="font-size: 15px; font-weight: 800; color: #fff; margin-top: 4px;">Click any muscle or branch node</div>
            <div id="inspector-branch-content" style="font-size: 12px; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">
              คลิกที่กล้ามเนื้อหรือแขนงบนแผนภาพเพื่อดูข้อมูลรากประสาทและคำแนะนำการแทงเข็ม Needle EMG จาก Perotto 5th Edition
            </div>
          </div>
        </aside>
      </div>
    `;

    this.container.innerHTML = html;
    this.bindViewToggleEvents();
    this.bindSvgInteractions();
  }

  bindViewToggleEvents() {
    const btnVisual = document.getElementById('btn-toggle-visual');
    const btnTable = document.getElementById('btn-toggle-table');
    if (btnVisual) btnVisual.addEventListener('click', () => this.setViewMode('visual'));
    if (btnTable) btnTable.addEventListener('click', () => this.setViewMode('table'));

    const clearLesionBtn = document.getElementById('btn-tree-clear-lesion');
    if (clearLesionBtn) clearLesionBtn.addEventListener('click', () => this.clearLesion());
  }

  bindSvgInteractions() {
    const pins = this.container.querySelectorAll('.svg-entrapment-pin');
    pins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const lesionId = pin.getAttribute('data-lesion');
        this.simulateLesion(lesionId);
      });
    });

    const nodes = this.container.querySelectorAll('.svg-branch-node');
    nodes.forEach(node => {
      node.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = node.getAttribute('data-name');
        const roots = node.getAttribute('data-roots') || '';
        const desc = node.getAttribute('data-desc') || '';
        const type = node.getAttribute('data-type') || '';
        this.showBranchDetail(name, roots, desc, type);
      });
    });
  }

  showBranchDetail(name, roots, desc, type) {
    const nameEl = document.getElementById('inspector-branch-name');
    const contentEl = document.getElementById('inspector-branch-content');
    if (!nameEl || !contentEl) return;

    nameEl.innerHTML = `${name} <span class="badge ${type === 'motor' ? 'badge-green' : 'badge-amber'}" style="font-size:10px; margin-left:6px;">${type.toUpperCase()}</span>`;
    contentEl.innerHTML = `
      ${roots ? `<div><strong>Major Roots:</strong> <span style="color:var(--teal-light); font-weight:700;">${roots}</span></div>` : ''}
      <div style="margin-top: 6px;">${desc}</div>
    `;
  }

  getNerveSvgMarkup(nerveKey) {
    if (nerveKey === 'median') return this.getMedianSvg();
    if (nerveKey === 'radial') return this.getRadialSvg();
    if (nerveKey === 'ulnar') return this.getUlnarSvg();
    return '';
  }

  // --- MEDIAN NERVE SVG ---
  getMedianSvg() {
    const isLesion = this.activeLesion;
    const isStruthers = isLesion === 'struthers';
    const isPT = isLesion === 'pronator';
    const isAIN = isLesion === 'ain';
    const isCTS = isLesion === 'cts';

    const getNodeClass = (nodeLevel, specificNerve) => {
      if (!isLesion) return '';
      if (isStruthers) return 'status-involved';
      if (isPT) {
        if (nodeLevel === 'arm') return 'status-spared';
        if (specificNerve === 'pt') return 'status-involved';
        return 'status-involved';
      }
      if (isAIN) {
        if (specificNerve === 'ain-group') return 'status-involved';
        return 'status-spared';
      }
      if (isCTS) {
        if (specificNerve === 'palmar-cutaneous') return 'status-spared';
        if (nodeLevel === 'hand') return 'status-involved';
        return 'status-spared';
      }
      return '';
    };

    return `
      <svg viewBox="0 0 760 1160" class="peripheral-stem-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="medianStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#10b981"/>
            <stop offset="50%" stop-color="#14b8a6"/>
            <stop offset="100%" stop-color="#06b6d4"/>
          </linearGradient>
          <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <g class="compartment-bands">
          <rect x="20" y="20" width="720" height="200" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="45" class="comp-label">AXILLA & ARM (BRACHIUM)</text>
          <text x="720" y="45" class="comp-sub" text-anchor="end">No muscular branches in arm</text>

          <rect x="20" y="230" width="720" height="340" rx="8" fill="rgba(13, 148, 136, 0.05)" stroke="rgba(45, 212, 191, 0.15)"/>
          <text x="35" y="255" class="comp-label">ELBOW & PROXIMAL FOREARM</text>
          <text x="720" y="255" class="comp-sub" text-anchor="end">Main Trunk Forearm Flexors + AIN</text>

          <rect x="20" y="580" width="720" height="220" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="605" class="comp-label">DISTAL FOREARM (PRE-WRIST)</text>
          <text x="720" y="605" class="comp-sub" text-anchor="end">5-6 cm proximal to wrist crease</text>

          <rect x="20" y="810" width="720" height="330" rx="8" fill="rgba(245, 158, 11, 0.04)" stroke="rgba(245, 158, 11, 0.2)"/>
          <text x="35" y="835" class="comp-label">CARPAL TUNNEL & HAND (THENAR)</text>
          <text x="720" y="835" class="comp-sub" text-anchor="end">Under Transverse Carpal Ligament</text>
        </g>

        <g class="roots-convergence">
          <text x="380" y="45" text-anchor="middle" class="svg-header-roots">MEDIAN NERVE (C5, C6, C7, C8, T1)</text>
          <path d="M 280 60 Q 380 90 380 120" stroke="#10b981" stroke-width="2.5" fill="none"/>
          <path d="M 330 60 Q 380 90 380 120" stroke="#10b981" stroke-width="2.5" fill="none"/>
          <path d="M 380 60 L 380 120" stroke="#10b981" stroke-width="4" fill="none"/>
          <path d="M 430 60 Q 380 90 380 120" stroke="#10b981" stroke-width="2.5" fill="none"/>
          <path d="M 480 60 Q 380 90 380 120" stroke="#10b981" stroke-width="2.5" fill="none"/>

          <circle cx="280" cy="60" r="4" fill="#10b981"/>
          <circle cx="330" cy="60" r="4" fill="#10b981"/>
          <circle cx="380" cy="60" r="5" fill="#10b981"/>
          <circle cx="430" cy="60" r="4" fill="#10b981"/>
          <circle cx="480" cy="60" r="4" fill="#10b981"/>
          <text x="280" y="52" class="root-dot-lbl" text-anchor="middle">C5</text>
          <text x="330" y="52" class="root-dot-lbl" text-anchor="middle">C6</text>
          <text x="380" y="52" class="root-dot-lbl" text-anchor="middle">C7</text>
          <text x="430" y="52" class="root-dot-lbl" text-anchor="middle">C8</text>
          <text x="480" y="52" class="root-dot-lbl" text-anchor="middle">T1</text>
        </g>

        <path d="M 380 120 L 380 820" stroke="url(#medianStemGrad)" stroke-width="8" stroke-linecap="round" fill="none" filter="url(#glowGreen)"/>

        <!-- Vascular branch -->
        <path d="M 380 140 C 340 140, 310 155, 270 155" stroke="#0ea5e9" stroke-width="2" fill="none" stroke-dasharray="3,3"/>
        <g class="svg-branch-node" data-name="Arterial Branch" data-desc="Vascular vasomotor fibers to brachial artery" data-type="sensory">
          <rect x="150" y="140" width="120" height="30" rx="6" class="node-box autonomic"/>
          <text x="210" y="160" text-anchor="middle" class="node-txt">To Brachial Artery</text>
        </g>

        <!-- Entrapment Pin 1: Struthers -->
        <g class="svg-entrapment-pin ${isStruthers ? 'active' : ''}" data-lesion="struthers" transform="translate(380, 185)">
          <circle cx="0" cy="0" r="14" class="pin-halo"/>
          <circle cx="0" cy="0" r="9" class="pin-core"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <rect x="25" y="-12" width="220" height="24" rx="4" class="pin-badge-box"/>
          <text x="35" y="4" class="pin-label">Ligament of Struthers (5cm > Med. Epicondyle)</text>
        </g>

        <!-- Entrapment Pin 2: Pronator Teres Syndrome -->
        <g class="svg-entrapment-pin ${isPT ? 'active' : ''}" data-lesion="pronator" transform="translate(380, 275)">
          <circle cx="0" cy="0" r="14" class="pin-halo"/>
          <circle cx="0" cy="0" r="9" class="pin-core"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <rect x="-240" y="-12" width="220" height="24" rx="4" class="pin-badge-box"/>
          <text x="-130" y="4" class="pin-label" text-anchor="middle">Pronator Teres Syndrome (2 heads)</text>
        </g>

        <!-- Right Side: Main Trunk Muscles (โปร - ขอ - ปาล์ม - ดี) -->
        <path d="M 380 295 C 430 295, 460 305, 500 305" stroke="#10b981" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('elbow', 'pt')}" data-name="Pronator Teres (PT)" data-roots="C6, C7" data-desc="Humeral & ulnar heads. Primary forearm pronator. Key test: Spared in AIN and CTS, weak in Struthers/Upper trunk." data-type="motor">
          <rect x="500" y="288" width="220" height="34" rx="6" class="node-box motor"/>
          <text x="515" y="310" class="node-title">🥩 Pronator Teres (PT)</text>
          <text x="705" y="310" class="node-mnemonic" text-anchor="end">โปร [C6-C7]</text>
        </g>

        <path d="M 380 340 C 430 340, 460 350, 500 350" stroke="#10b981" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('elbow', 'fcr')}" data-name="Flexor Carpi Radialis (FCR)" data-roots="C6, C7" data-desc="Forearm wrist flexion with radial deviation. Standard C6-C7 needle EMG target." data-type="motor">
          <rect x="500" y="333" width="220" height="34" rx="6" class="node-box motor"/>
          <text x="515" y="355" class="node-title">🥩 Flexor Carpi Radialis (FCR)</text>
          <text x="705" y="355" class="node-mnemonic" text-anchor="end">ขอ [C6-C7]</text>
        </g>

        <path d="M 380 385 C 430 385, 460 395, 500 395" stroke="#10b981" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('elbow', 'pl')}" data-name="Palmaris Longus (PL)" data-roots="C7, C8" data-desc="Tenses palmar aponeurosis. Absent in ~14% of population." data-type="motor">
          <rect x="500" y="378" width="220" height="34" rx="6" class="node-box motor"/>
          <text x="515" y="400" class="node-title">🥩 Palmaris Longus (PL)</text>
          <text x="705" y="400" class="node-mnemonic" text-anchor="end">ปาล์ม [C7-C8]</text>
        </g>

        <path d="M 380 430 C 430 430, 460 440, 500 440" stroke="#10b981" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('elbow', 'fds')}" data-name="Flexor Digitorum Superficialis (FDS)" data-roots="C7, C8, T1" data-desc="Flexes PIP joints of digits 2-5. Innervated by multiple branches along forearm." data-type="motor">
          <rect x="500" y="423" width="220" height="34" rx="6" class="node-box motor"/>
          <text x="515" y="445" class="node-title">🥩 Flexor Digit. Superficialis (FDS)</text>
          <text x="705" y="445" class="node-mnemonic" text-anchor="end">ดี [C7-T1]</text>
        </g>

        <!-- Left Side: AIN Branch (Anterior Interosseous Nerve) -->
        <path d="M 380 320 C 330 320, 290 350, 270 380 L 270 540" stroke="#a855f7" stroke-width="4.5" fill="none" stroke-dasharray="4,2"/>
        
        <g class="svg-entrapment-pin ${isAIN ? 'active' : ''}" data-lesion="ain" transform="translate(270, 375)">
          <circle cx="0" cy="0" r="13" class="pin-halo"/>
          <circle cx="0" cy="0" r="8" class="pin-core" fill="#a855f7"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <rect x="-220" y="-12" width="205" height="24" rx="4" class="pin-badge-box"/>
          <text x="-120" y="4" class="pin-label" text-anchor="middle">AIN Syndrome (Kiloh-Nevin)</text>
        </g>

        <rect x="180" y="325" width="80" height="22" rx="4" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7"/>
        <text x="220" y="340" text-anchor="middle" font-size="11" font-weight="800" fill="#c084fc">AIN BRANCH</text>

        <path d="M 270 410 L 230 410" stroke="#a855f7" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('elbow', 'ain-group')}" data-name="FDP Lateral (Digits 2 & 3)" data-roots="C7, C8" data-desc="Flexes DIP joints of index and long fingers. Essential for OK sign." data-type="motor">
          <rect x="40" y="395" width="190" height="32" rx="6" class="node-box motor" style="border-left: 3px solid #a855f7;"/>
          <text x="50" y="415" class="node-title">🥩 FDP (Digits 2 & 3)</text>
          <text x="220" y="415" class="node-mnemonic" text-anchor="end">ดี [C7-C8]</text>
        </g>

        <path d="M 270 460 L 230 460" stroke="#a855f7" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('elbow', 'ain-group')}" data-name="Flexor Pollicis Longus (FPL)" data-roots="C7, C8" data-desc="Flexes IP joint of thumb. Tested via pinch test. Characteristic loss of IP flexion in AIN palsy." data-type="motor">
          <rect x="40" y="445" width="190" height="32" rx="6" class="node-box motor" style="border-left: 3px solid #a855f7;"/>
          <text x="50" y="465" class="node-title">🥩 Flexor Pollicis Longus (FPL)</text>
          <text x="220" y="465" class="node-mnemonic" text-anchor="end">โป้ง [C7-C8]</text>
        </g>

        <path d="M 270 510 L 230 510" stroke="#a855f7" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('elbow', 'ain-group')}" data-name="Pronator Quadratus (PQ)" data-roots="C7, C8" data-desc="Deep pronator at distal wrist. Terminal muscle of AIN. Needle EMG tested with forearm fully pronated." data-type="motor">
          <rect x="40" y="495" width="190" height="32" rx="6" class="node-box motor" style="border-left: 3px solid #a855f7;"/>
          <text x="50" y="515" class="node-title">🥩 Pronator Quadratus (PQ)</text>
          <text x="220" y="515" class="node-mnemonic" text-anchor="end">โป [C7-C8]</text>
        </g>

        <!-- Palmar Cutaneous Branch -->
        <path d="M 380 640 C 330 640, 290 660, 240 660" stroke="#f59e0b" stroke-width="3" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('distal', 'palmar-cutaneous')}" data-name="Palmar Cutaneous Branch" data-roots="C6, C7" data-desc="Arises 5-6 cm proximal to wrist, passes SUPERFICIAL to carpal tunnel into thenar pad. CRUCIAL: Spared in Carpal Tunnel Syndrome! If numb, lesion is at or proximal to Pronator Teres." data-type="sensory">
          <rect x="30" y="640" width="210" height="42" rx="6" class="node-box sensory" style="border: 2px solid #fbbf24;"/>
          <text x="40" y="658" class="node-title" style="fill:#fef08a;">👁️ Palmar Cutaneous Branch</text>
          <text x="40" y="674" class="node-sub" style="fill:#fde047;">⭐ SPARED IN CTS (Thenar pad)</text>
        </g>

        <text x="380" y="700" text-anchor="middle" font-size="11.5" fill="#fde047" font-weight="700">
          ▲ Passes superficial to transverse carpal ligament (No tunnel entrapment)
        </text>

        <!-- Entrapment Pin 4: Carpal Tunnel Syndrome -->
        <g class="svg-entrapment-pin ${isCTS ? 'active' : ''}" data-lesion="cts" transform="translate(380, 820)">
          <rect x="-140" y="-14" width="280" height="28" rx="6" class="carpal-tunnel-band"/>
          <circle cx="0" cy="0" r="14" class="pin-halo"/>
          <circle cx="0" cy="0" r="9" class="pin-core"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <text x="0" y="32" class="pin-label-center" text-anchor="middle">Carpal Tunnel Syndrome (Transverse Carpal Ligament)</text>
        </g>

        <path d="M 380 840 L 380 890" stroke="#10b981" stroke-width="6" fill="none"/>
        <path d="M 380 890 C 330 920, 280 940, 240 960" stroke="#10b981" stroke-width="3" fill="none"/>
        <path d="M 380 890 C 430 920, 480 940, 520 960" stroke="#f59e0b" stroke-width="3" fill="none"/>

        <!-- RECURRENT THENAR MOTOR BRANCH (A-F-O) -->
        <rect x="40" y="930" width="310" height="205" rx="8" class="hand-box-group"/>
        <text x="55" y="952" class="hand-group-title">RECURRENT THENAR MOTOR BRANCH (A-F-O)</text>
        <text x="55" y="968" class="comp-sub">Standard Median Motor CMAP recording site</text>

        <g class="svg-branch-node ${getNodeClass('hand', 'apb')}" data-name="Abductor Pollicis Brevis (APB)" data-roots="C8, T1" data-desc="Primary muscle tested in Median motor NCS & Needle EMG. Palmar thumb abduction." data-type="motor">
          <rect x="55" y="980" width="280" height="32" rx="5" class="node-box motor"/>
          <text x="68" y="1001" class="node-title">🥩 Abductor Pollicis Brevis (APB)</text>
          <text x="325" y="1001" class="node-mnemonic" text-anchor="end">A [C8-T1]</text>
        </g>

        <g class="svg-branch-node ${getNodeClass('hand', 'fpb')}" data-name="Flexor Pollicis Brevis (Superficial Head)" data-roots="C8, T1" data-desc="Flexes MCP of thumb. Deep head is innervated by ulnar nerve." data-type="motor">
          <rect x="55" y="1020" width="280" height="32" rx="5" class="node-box motor"/>
          <text x="68" y="1041" class="node-title">🥩 Flexor Pollicis Brevis (FPB sup.)</text>
          <text x="325" y="1041" class="node-mnemonic" text-anchor="end">F [C8-T1]</text>
        </g>

        <g class="svg-branch-node ${getNodeClass('hand', 'op')}" data-name="Opponens Pollicis (OP)" data-roots="C8, T1" data-desc="Rotates 1st metacarpal for thumb opposition against fingertips." data-type="motor">
          <rect x="55" y="1060" width="280" height="32" rx="5" class="node-box motor"/>
          <text x="68" y="1081" class="node-title">🥩 Opponens Pollicis (OP)</text>
          <text x="325" y="1081" class="node-mnemonic" text-anchor="end">O [C8-T1]</text>
        </g>

        <g class="svg-branch-node ${getNodeClass('hand', 'lumbricals')}" data-name="1st & 2nd Lumbricals" data-roots="C8, T1" data-desc="Flexes MCP and extends IP of index and long fingers. Useful for 2L-INT comparison study." data-type="motor">
          <rect x="55" y="1100" width="280" height="26" rx="5" class="node-box motor"/>
          <text x="68" y="1118" class="node-title" font-size="11.5">🥩 1st & 2nd Lumbricals</text>
          <text x="325" y="1118" class="node-mnemonic" text-anchor="end">[C8-T1]</text>
        </g>

        <!-- PALMAR DIGITAL SENSORY BRANCHES -->
        <rect x="400" y="930" width="320" height="150" rx="8" class="hand-box-group sensory"/>
        <text x="415" y="952" class="hand-group-title sensory">PALMAR DIGITAL SENSORY BRANCHES</text>
        <text x="415" y="968" class="comp-sub">Common & Proper Digital Nerves</text>

        <g class="svg-branch-node ${getNodeClass('hand', 'digitals')}" data-name="Palmar Digital Nerves" data-roots="C6, C7, C8" data-desc="Sensory to volar thumb, index, middle, and radial half of ring finger + dorsal tips over distal phalanges. Involved in CTS." data-type="sensory">
          <rect x="415" y="980" width="290" height="42" rx="6" class="node-box sensory"/>
          <text x="428" y="1000" class="node-title">🖐️ Digits 1, 2, 3, & 1/2 of 4 (Volar)</text>
          <text x="428" y="1015" class="node-sub">Thumb, Index, Middle, Radial Ring Finger</text>
        </g>

        <g class="svg-branch-node ${getNodeClass('hand', 'nailbeds')}" data-name="Dorsal Nail Bed Sensation" data-roots="C6, C7" data-desc="Supplies skin over the dorsum of distal and middle phalanges of digits 1-3.5." data-type="sensory">
          <rect x="415" y="1030" width="290" height="36" rx="6" class="node-box sensory"/>
          <text x="428" y="1052" class="node-title">🖐️ Dorsal Distal Nail Beds (Digits 1-3.5)</text>
        </g>
      </svg>
    `;
  }

  // --- RADIAL NERVE SVG ---
  getRadialSvg() {
    const isLesion = this.activeLesion;
    const isHighAxilla = isLesion === 'axilla-radial';
    const isSpiral = isLesion === 'spiral-groove';
    const isFrohse = isLesion === 'frohse';
    const isWartenberg = isLesion === 'wartenberg';

    const getNodeClass = (nodeGroup) => {
      if (!isLesion) return '';
      if (isHighAxilla) return 'status-involved';
      if (isSpiral) {
        if (nodeGroup === 'triceps') return 'status-spared';
        return 'status-involved';
      }
      if (isFrohse) {
        if (nodeGroup === 'triceps' || nodeGroup === 'br-ecrl' || nodeGroup === 'srn-sensory') return 'status-spared';
        if (nodeGroup === 'pin-muscles') return 'status-involved';
        return 'status-spared';
      }
      if (isWartenberg) {
        if (nodeGroup === 'srn-sensory') return 'status-involved';
        return 'status-spared';
      }
      return '';
    };

    return `
      <svg viewBox="0 0 760 1160" class="peripheral-stem-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="radialStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#a855f7"/>
            <stop offset="50%" stop-color="#8b5cf6"/>
            <stop offset="100%" stop-color="#6366f1"/>
          </linearGradient>
        </defs>

        <g class="compartment-bands">
          <rect x="20" y="20" width="720" height="220" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="45" class="comp-label">AXILLA & PROXIMAL ARM (BEFORE SPIRAL GROOVE)</text>
          <text x="720" y="45" class="comp-sub" text-anchor="end">Triceps innervation PROXIMAL to groove</text>

          <rect x="20" y="250" width="720" height="150" rx="8" fill="rgba(168, 85, 247, 0.05)" stroke="rgba(168, 85, 247, 0.2)"/>
          <text x="35" y="275" class="comp-label">SPIRAL (RADIAL) GROOVE OF HUMERUS</text>
          <text x="720" y="275" class="comp-sub" text-anchor="end">Saturday Night Palsy / Shaft Fracture</text>

          <rect x="20" y="410" width="720" height="160" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="435" class="comp-label">DISTAL ARM & CUBITAL FOSSA</text>
          <text x="720" y="435" class="comp-sub" text-anchor="end">BR & ECRL + Terminal Bifurcation</text>

          <rect x="20" y="580" width="720" height="560" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="605" class="comp-label">FOREARM & HAND: TERMINAL DICHOTOMY</text>
          <text x="720" y="605" class="comp-sub" text-anchor="end">PIN (Pure Motor) vs SRN (Pure Sensory)</text>
        </g>

        <g class="roots-convergence">
          <text x="380" y="45" text-anchor="middle" class="svg-header-roots" fill="#c084fc">RADIAL NERVE (C5, C6, C7, C8, ±T1)</text>
          <path d="M 290 60 Q 380 90 380 120" stroke="#a855f7" stroke-width="2.5" fill="none"/>
          <path d="M 335 60 Q 380 90 380 120" stroke="#a855f7" stroke-width="2.5" fill="none"/>
          <path d="M 380 60 L 380 120" stroke="#a855f7" stroke-width="4" fill="none"/>
          <path d="M 425 60 Q 380 90 380 120" stroke="#a855f7" stroke-width="2.5" fill="none"/>
          <path d="M 470 60 Q 380 90 380 120" stroke="#a855f7" stroke-width="2.5" fill="none"/>

          <circle cx="290" cy="60" r="4" fill="#a855f7"/>
          <circle cx="335" cy="60" r="4" fill="#a855f7"/>
          <circle cx="380" cy="60" r="5" fill="#a855f7"/>
          <circle cx="425" cy="60" r="4" fill="#a855f7"/>
          <circle cx="470" cy="60" r="4" fill="#a855f7"/>
          <text x="290" y="52" class="root-dot-lbl" text-anchor="middle">C5</text>
          <text x="335" y="52" class="root-dot-lbl" text-anchor="middle">C6</text>
          <text x="380" y="52" class="root-dot-lbl" text-anchor="middle">C7</text>
          <text x="425" y="52" class="root-dot-lbl" text-anchor="middle">C8</text>
          <text x="470" y="52" class="root-dot-lbl" text-anchor="middle">T1</text>
        </g>

        <path d="M 380 120 L 380 500" stroke="url(#radialStemGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>

        <!-- Triceps Long & Medial heads -->
        <path d="M 380 145 C 430 145, 460 145, 490 145" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('triceps')}" data-name="Triceps - Long & Medial Heads" data-roots="C6, C7, C8" data-desc="Arises in axilla / high arm BEFORE spiral groove! SPARED IN SATURDAY NIGHT PALSY." data-type="motor">
          <rect x="490" y="130" width="230" height="34" rx="6" class="node-box motor" style="border-left: 3px solid #a855f7;"/>
          <text x="505" y="152" class="node-title">🥩 Triceps (Long & Med. Heads)</text>
          <text x="710" y="152" class="node-mnemonic" text-anchor="end">ไตร [C6-C8]</text>
        </g>

        <!-- Triceps Lateral head -->
        <path d="M 380 185 C 330 185, 300 185, 270 185" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('triceps')}" data-name="Triceps - Lateral Head" data-roots="C6, C7, C8" data-desc="Arises just proximal to spiral groove. Extends elbow." data-type="motor">
          <rect x="40" y="170" width="230" height="34" rx="6" class="node-box motor" style="border-left: 3px solid #a855f7;"/>
          <text x="55" y="192" class="node-title">🥩 Triceps (Lateral Head)</text>
          <text x="260" y="192" class="node-mnemonic" text-anchor="end">ไตร [C6-C8]</text>
        </g>

        <!-- Posterior Cutaneous Nerve of Arm -->
        <path d="M 380 215 C 430 215, 460 215, 490 215" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('triceps')}" data-name="Posterior Cutaneous Nerve of Arm" data-roots="C8" data-desc="Sensory to posterior aspect of arm. Spared in midshaft spiral groove palsy." data-type="sensory">
          <rect x="490" y="200" width="230" height="30" rx="6" class="node-box sensory"/>
          <text x="505" y="220" class="node-title">👁️ Post. Cutaneous Nerve of Arm</text>
        </g>

        <!-- Entrapment Pin: Spiral Groove -->
        <g class="svg-entrapment-pin ${isSpiral ? 'active' : ''}" data-lesion="spiral-groove" transform="translate(380, 290)">
          <rect x="-140" y="-14" width="280" height="28" rx="6" class="spiral-groove-band"/>
          <circle cx="0" cy="0" r="14" class="pin-halo"/>
          <circle cx="0" cy="0" r="9" class="pin-core"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <text x="0" y="32" class="pin-label-center" text-anchor="middle">Spiral Groove (Saturday Night Palsy / Fracture)</text>
        </g>

        <!-- Distal medial head & Anconeus -->
        <path d="M 380 340 C 430 340, 460 345, 490 345" stroke="#a855f7" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('triceps')}" data-name="Anconeus & Distal Medial Head" data-roots="C7, C8" data-desc="Anconeus stabilizes elbow during pronation/supination." data-type="motor">
          <rect x="490" y="330" width="230" height="30" rx="6" class="node-box motor"/>
          <text x="505" y="350" class="node-title">🥩 Anconeus & Med. Head (Distal)</text>
        </g>

        <!-- Lower Lateral Cutaneous Nerve of Arm -->
        <path d="M 380 375 C 330 375, 300 375, 270 375" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('post-spiral')}" data-name="Lower Lateral Cutaneous of Arm" data-roots="C5, C6" data-desc="Supplies lower lateral skin of arm. Involved in spiral groove lesion." data-type="sensory">
          <rect x="40" y="360" width="230" height="30" rx="6" class="node-box sensory"/>
          <text x="55" y="380" class="node-title">👁️ Lower Lat. Cutaneous of Arm</text>
        </g>

        <!-- Brachioradialis (เบียร์) -->
        <path d="M 380 445 C 430 445, 460 445, 490 445" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('br-ecrl')}" data-name="Brachioradialis (BR)" data-roots="C5, C6" data-desc="CRUCIAL DISCRIMINATOR: Weak in Spiral Groove lesion, SPARED in PIN / Arcade of Frohse lesion!" data-type="motor">
          <rect x="490" y="430" width="230" height="34" rx="6" class="node-box motor" style="border-left: 3px solid #a855f7;"/>
          <text x="505" y="452" class="node-title">🥩 Brachioradialis (BR)</text>
          <text x="710" y="452" class="node-mnemonic" text-anchor="end">เบียร์ [C5-C6]</text>
        </g>

        <!-- ECRL (แอล) -->
        <path d="M 380 485 C 430 485, 460 485, 490 485" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('br-ecrl')}" data-name="Extensor Carpi Radialis Longus (ECRL)" data-roots="C6, C7" data-desc="Wrist extension with radial deviation. Innervated proximal to elbow. Spared in PIN palsy (causes radial deviation on extension)!" data-type="motor">
          <rect x="490" y="470" width="230" height="34" rx="6" class="node-box motor" style="border-left: 3px solid #a855f7;"/>
          <text x="505" y="492" class="node-title">🥩 Extensor Carpi Radialis Longus</text>
          <text x="710" y="492" class="node-mnemonic" text-anchor="end">แอล [C6-C7]</text>
        </g>

        <!-- Bifurcation -->
        <circle cx="380" cy="520" r="6" fill="#a855f7"/>
        <path d="M 380 520 C 320 550, 230 580, 230 630 L 230 1120" stroke="#8b5cf6" stroke-width="6" fill="none"/>
        <path d="M 380 520 C 440 550, 530 580, 530 630 L 530 1120" stroke="#f59e0b" stroke-width="4.5" fill="none"/>

        <!-- Entrapment Pin: Arcade of Frohse -->
        <g class="svg-entrapment-pin ${isFrohse ? 'active' : ''}" data-lesion="frohse" transform="translate(230, 630)">
          <circle cx="0" cy="0" r="14" class="pin-halo"/>
          <circle cx="0" cy="0" r="9" class="pin-core"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <rect x="-195" y="-12" width="180" height="24" rx="4" class="pin-badge-box"/>
          <text x="-105" y="4" class="pin-label" text-anchor="middle">Arcade of Frohse (PIN Entrapment)</text>
        </g>

        <!-- Supinator (สู้) -->
        <path d="M 230 675 L 190 675" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('pin-muscles')}" data-name="Supinator" data-roots="C6, C7" data-desc="Surrounds radius; Arcade of Frohse is its proximal fibrous edge." data-type="motor">
          <rect x="30" y="660" width="160" height="30" rx="5" class="node-box motor"/>
          <text x="40" y="680" class="node-title">🥩 Supinator</text>
          <text x="180" y="680" class="node-mnemonic" text-anchor="end">สู้ [C6-C7]</text>
        </g>

        <!-- EDC (ดี) -->
        <path d="M 230 720 L 190 720" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('pin-muscles')}" data-name="Extensor Digitorum Communis (EDC)" data-roots="C7, C8" data-desc="Extends digits 2-5 at MCP joints. Standard muscle for radial motor study." data-type="motor">
          <rect x="30" y="705" width="160" height="30" rx="5" class="node-box motor"/>
          <text x="40" y="725" class="node-title">🥩 EDC (Communis)</text>
          <text x="180" y="725" class="node-mnemonic" text-anchor="end">ดี [C7-C8]</text>
        </g>

        <!-- ECU (ยู) -->
        <path d="M 230 765 L 190 765" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('pin-muscles')}" data-name="Extensor Carpi Ulnaris (ECU)" data-roots="C7, C8" data-desc="Extends and adducts wrist (ulnar deviation)." data-type="motor">
          <rect x="30" y="750" width="160" height="30" rx="5" class="node-box motor"/>
          <text x="40" y="770" class="node-title">🥩 ECU (Ulnaris)</text>
          <text x="180" y="770" class="node-mnemonic" text-anchor="end">ยู [C7-C8]</text>
        </g>

        <!-- Thumb Extensors: APL, EPB, EPL (โป้ง) -->
        <path d="M 230 815 L 190 815" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('pin-muscles')}" data-name="APL & EPB & EPL" data-roots="C7, C8" data-desc="Abductor pollicis longus, extensor pollicis brevis and longus. Form anatomical snuffbox." data-type="motor">
          <rect x="30" y="800" width="160" height="34" rx="5" class="node-box motor"/>
          <text x="40" y="822" class="node-title">🥩 APL / EPB / EPL</text>
          <text x="180" y="822" class="node-mnemonic" text-anchor="end">โป้ง [C7-C8]</text>
        </g>

        <!-- EIP (ชี้ - TERMINAL PIN TARGET) -->
        <path d="M 230 870 L 190 870" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('pin-muscles')}" data-name="Extensor Indicis Proprius (EIP)" data-roots="C7, C8" data-desc="⭐ TERMINAL PIN MUSCLE: Standard muscle for radial motor NCS recording and needle EMG! Separates Lower Trunk from Medial Cord." data-type="motor">
          <rect x="20" y="855" width="170" height="38" rx="5" class="node-box motor" style="border: 2px solid #a855f7;"/>
          <text x="30" y="876" class="node-title" style="fill:#e9d5ff;">⭐ EIP (Ext. Indicis)</text>
          <text x="180" y="876" class="node-mnemonic" text-anchor="end">ชี้ [C7-C8]</text>
          <text x="30" y="888" font-size="9" fill="#c084fc">TERMINAL PIN TARGET</text>
        </g>

        <!-- RIGHT TOWER: SUPERFICIAL RADIAL (PURE SENSORY) -->
        <g class="svg-entrapment-pin ${isWartenberg ? 'active' : ''}" data-lesion="wartenberg" transform="translate(530, 840)">
          <circle cx="0" cy="0" r="14" class="pin-halo"/>
          <circle cx="0" cy="0" r="9" class="pin-core"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <rect x="25" y="-12" width="180" height="24" rx="4" class="pin-badge-box"/>
          <text x="115" y="4" class="pin-label" text-anchor="middle">Wartenberg's Syndrome (Handcuffs)</text>
        </g>

        <path d="M 530 920 L 565 920" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('srn-sensory')}" data-name="Superficial Radial Sensory" data-roots="C6, C7" data-desc="Cutaneous supply to anatomical snuffbox, radial 2/3 of dorsum of hand, dorsal proximal digits 1, 2, 3, and radial half of 4. SPARED IN PIN PALSY!" data-type="sensory">
          <rect x="565" y="900" width="165" height="52" rx="6" class="node-box sensory"/>
          <text x="575" y="922" class="node-title">👁️ Superficial Radial SNAP</text>
          <text x="575" y="940" class="node-sub">Snuffbox & 1st Web Space</text>
        </g>
      </svg>
    `;
  }

  // --- ULNAR NERVE SVG ---
  getUlnarSvg() {
    const isLesion = this.activeLesion;
    const isCubital = isLesion === 'cubital-tunnel';
    const isGuyon1 = isLesion === 'guyon-zone1';
    const isGuyon2 = isLesion === 'guyon-zone2';
    const isGuyon3 = isLesion === 'guyon-zone3';

    const getNodeClass = (nodeGroup) => {
      if (!isLesion) return '';
      if (isCubital) return 'status-involved';
      if (isGuyon1 || isGuyon2 || isGuyon3) {
        if (nodeGroup === 'forearm' || nodeGroup === 'dunc-sensory') return 'status-spared';
        if (isGuyon2 && nodeGroup === 'palmar-sensory') return 'status-spared';
        if (isGuyon3 && nodeGroup === 'hand-motor') return 'status-spared';
        return 'status-involved';
      }
      return '';
    };

    return `
      <svg viewBox="0 0 760 1160" class="peripheral-stem-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ulnarStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="50%" stop-color="#3b82f6"/>
            <stop offset="100%" stop-color="#2563eb"/>
          </linearGradient>
        </defs>

        <g class="compartment-bands">
          <rect x="20" y="20" width="720" height="200" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="45" class="comp-label">AXILLA & MEDIAL ARM</text>
          <text x="720" y="45" class="comp-sub" text-anchor="end">No muscular branches in arm</text>

          <rect x="20" y="230" width="720" height="260" rx="8" fill="rgba(56, 189, 248, 0.05)" stroke="rgba(56, 189, 248, 0.2)"/>
          <text x="35" y="255" class="comp-label">ELBOW: RETROEPICONDYLAR GROOVE & CUBITAL TUNNEL</text>
          <text x="720" y="255" class="comp-sub" text-anchor="end">Osborne's Arcade between 2 heads of FCU</text>

          <rect x="20" y="500" width="720" height="280" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="525" class="comp-label">FOREARM & PRE-WRIST SENSORY BRANCHES</text>
          <text x="720" y="525" class="comp-sub" text-anchor="end">DUNC branches 5-8 cm ABOVE wrist!</text>

          <rect x="20" y="790" width="720" height="350" rx="8" fill="rgba(245, 158, 11, 0.04)" stroke="rgba(245, 158, 11, 0.2)"/>
          <text x="35" y="815" class="comp-label">WRIST & HAND: GUYON'S CANAL (PISOHAMATE)</text>
          <text x="720" y="815" class="comp-sub" text-anchor="end">Zones 1, 2, and 3 Dichotomy</text>
        </g>

        <g class="roots-convergence">
          <text x="380" y="45" text-anchor="middle" class="svg-header-roots" fill="#60a5fa">ULNAR NERVE (C8, T1, ±C7)</text>
          <path d="M 330 60 Q 380 90 380 120" stroke="#38bdf8" stroke-width="3" fill="none"/>
          <path d="M 380 60 L 380 120" stroke="#38bdf8" stroke-width="4.5" fill="none"/>
          <path d="M 430 60 Q 380 90 380 120" stroke="#38bdf8" stroke-width="3" fill="none"/>

          <circle cx="330" cy="60" r="4" fill="#38bdf8"/>
          <circle cx="380" cy="60" r="5" fill="#38bdf8"/>
          <circle cx="430" cy="60" r="4" fill="#38bdf8"/>
          <text x="330" y="52" class="root-dot-lbl" text-anchor="middle">C7</text>
          <text x="380" y="52" class="root-dot-lbl" text-anchor="middle">C8</text>
          <text x="430" y="52" class="root-dot-lbl" text-anchor="middle">T1</text>
        </g>

        <path d="M 380 120 L 380 810" stroke="url(#ulnarStemGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>

        <!-- Entrapment Pin: Cubital Tunnel -->
        <g class="svg-entrapment-pin ${isCubital ? 'active' : ''}" data-lesion="cubital-tunnel" transform="translate(380, 280)">
          <rect x="-140" y="-14" width="280" height="28" rx="6" class="cubital-tunnel-band"/>
          <circle cx="0" cy="0" r="14" class="pin-halo"/>
          <circle cx="0" cy="0" r="9" class="pin-core"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <text x="0" y="32" class="pin-label-center" text-anchor="middle">Cubital Tunnel / Retroepicondylar Groove</text>
        </g>

        <!-- FCU Branch (ยู) -->
        <path d="M 380 360 C 430 360, 460 360, 490 360" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('forearm')}" data-name="Flexor Carpi Ulnaris (FCU)" data-roots="C8, T1" data-desc="Innervated at or immediately distal to cubital tunnel. Wrist flexion with ulnar deviation." data-type="motor">
          <rect x="490" y="345" width="230" height="34" rx="6" class="node-box motor" style="border-left: 3px solid #38bdf8;"/>
          <text x="505" y="367" class="node-title">🥩 Flexor Carpi Ulnaris (FCU)</text>
          <text x="710" y="367" class="node-mnemonic" text-anchor="end">ยู [C8-T1]</text>
        </g>

        <!-- FDP 3 & 4 (ดี) -->
        <path d="M 380 410 C 430 410, 460 410, 490 410" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('forearm')}" data-name="Flexor Digitorum Profundus III & IV" data-roots="C8, T1" data-desc="Flexes DIP joints of ring and little fingers. Ulnar claw deformity is worse if FDP is intact ('Ulnar Paradox')." data-type="motor">
          <rect x="490" y="395" width="230" height="34" rx="6" class="node-box motor" style="border-left: 3px solid #38bdf8;"/>
          <text x="505" y="417" class="node-title">🥩 FDP (Medial 4th & 5th Digits)</text>
          <text x="710" y="417" class="node-mnemonic" text-anchor="end">ดี [C8-T1]</text>
        </g>

        <!-- Palmar Cutaneous Branch of Ulnar Nerve -->
        <path d="M 380 570 C 330 570, 300 570, 270 570" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('dunc-sensory')}" data-name="Palmar Cutaneous of Ulnar" data-roots="C8, T1" data-desc="Arises in mid-forearm, supplies skin over hypothenar eminence. Spared in Guyon canal." data-type="sensory">
          <rect x="40" y="555" width="230" height="30" rx="6" class="node-box sensory"/>
          <text x="55" y="575" class="node-title">👁️ Palmar Cutaneous of Ulnar</text>
        </g>

        <!-- DUNC: Dorsal Ulnar Cutaneous Nerve -->
        <path d="M 380 640 C 430 640, 460 640, 490 640" stroke="#f59e0b" stroke-width="3.5" fill="none"/>
        <g class="svg-branch-node ${getNodeClass('dunc-sensory')}" data-name="Dorsal Ulnar Cutaneous (DUNC)" data-roots="C8, T1" data-desc="⭐ CRUCIAL PM&R GOLD STANDARD: Branches 5-8 cm PROXIMAL to the wrist! DUNC SNAP is ABNORMAL in Cubital Tunnel, but NORMAL in Guyon's Canal!" data-type="sensory">
          <rect x="490" y="618" width="235" height="44" rx="6" class="node-box sensory" style="border: 2px solid #fbbf24;"/>
          <text x="502" y="638" class="node-title" style="fill:#fef08a;">👁️ DUNC (Dorsal Cutaneous)</text>
          <text x="502" y="654" class="node-sub" style="fill:#fde047;">⭐ SPARED IN GUYON'S CANAL</text>
        </g>

        <text x="380" y="720" text-anchor="middle" font-size="11.5" fill="#fde047" font-weight="700">
          ▲ Branches 5-8 cm proximal to wrist (Does NOT enter Guyon's canal!)
        </text>

        <!-- Entrapment Pin: Guyon's Canal -->
        <g class="svg-entrapment-pin ${isGuyon1 ? 'active' : ''}" data-lesion="guyon-zone1" transform="translate(380, 810)">
          <rect x="-140" y="-14" width="280" height="28" rx="6" class="guyon-canal-band"/>
          <circle cx="0" cy="0" r="14" class="pin-halo"/>
          <circle cx="0" cy="0" r="9" class="pin-core"/>
          <text x="0" y="4" text-anchor="middle" class="pin-symbol">⚠️</text>
          <text x="0" y="32" class="pin-label-center" text-anchor="middle">Guyon's Canal (Pisohamate Hiatus)</text>
        </g>

        <!-- Bifurcation in Hand -->
        <path d="M 380 830 L 380 870" stroke="#38bdf8" stroke-width="6" fill="none"/>
        <path d="M 380 870 C 330 900, 270 920, 220 940" stroke="#f59e0b" stroke-width="3" fill="none"/>
        <path d="M 380 870 C 430 900, 490 920, 540 940" stroke="#38bdf8" stroke-width="4.5" fill="none"/>

        <!-- LEFT SIDE: SUPERFICIAL TERMINAL BRANCH -->
        <rect x="30" y="930" width="280" height="150" rx="8" class="hand-box-group sensory"/>
        <text x="45" y="952" class="hand-group-title sensory">SUPERFICIAL TERMINAL BRANCH</text>
        <text x="45" y="968" class="comp-sub">Zone 3 involvement</text>

        <!-- Palmaris Brevis (สั้น) -->
        <g class="svg-branch-node ${getNodeClass('palmar-sensory')}" data-name="Palmaris Brevis" data-roots="C8, T1" data-desc="Small subcutaneous motor muscle; puckers hypothenar skin." data-type="motor">
          <rect x="45" y="980" width="250" height="28" rx="5" class="node-box motor"/>
          <text x="55" y="999" class="node-title" font-size="12">🥩 Palmaris Brevis (PB)</text>
          <text x="285" y="999" class="node-mnemonic" text-anchor="end">สั้น [C8-T1]</text>
        </g>

        <!-- Palmar Digital Sensory (ผิว) -->
        <g class="svg-branch-node ${getNodeClass('palmar-sensory')}" data-name="Ulnar Digital Sensory" data-roots="C8, T1" data-desc="Sensory to entire 5th digit and medial half of 4th digit (volar aspect and nail beds)." data-type="sensory">
          <rect x="45" y="1018" width="250" height="48" rx="6" class="node-box sensory"/>
          <text x="55" y="1038" class="node-title">🖐️ Digits 5 & 1/2 of 4 (Volar)</text>
          <text x="55" y="1054" class="node-sub">Little Finger & Medial Ring Finger</text>
        </g>

        <!-- RIGHT SIDE: DEEP MOTOR BRANCH -->
        <rect x="340" y="930" width="380" height="215" rx="8" class="hand-box-group"/>
        <text x="355" y="952" class="hand-group-title">DEEP MOTOR BRANCH (ALL INTRINSICS)</text>
        <text x="355" y="968" class="comp-sub">Zone 2 involvement: Curves around hook of hamate</text>

        <!-- ADM -->
        <g class="svg-branch-node ${getNodeClass('hand-motor')}" data-name="Abductor Digiti Minimi (ADM)" data-roots="C8, T1" data-desc="Standard ulnar CMAP recording site. Abducts 5th digit." data-type="motor">
          <rect x="355" y="980" width="350" height="30" rx="5" class="node-box motor"/>
          <text x="368" y="1000" class="node-title">🥩 Abductor Digiti Minimi (ADM)</text>
          <text x="695" y="1000" class="node-mnemonic" text-anchor="end">ADM [C8-T1]</text>
        </g>

        <!-- FDI & Interossei -->
        <g class="svg-branch-node ${getNodeClass('hand-motor')}" data-name="First Dorsal Interosseous (FDI)" data-roots="C8, T1" data-desc="Primary muscle for ulnar needle EMG! 4 Dorsal Interossei (abduct) + 3 Palmar Interossei (adduct)." data-type="motor">
          <rect x="355" y="1018" width="350" height="32" rx="5" class="node-box motor" style="border: 2px solid #38bdf8;"/>
          <text x="368" y="1039" class="node-title" style="fill:#e0f2fe;">⭐ First Dorsal Interosseous (FDI) & All Interossei</text>
          <text x="695" y="1039" class="node-mnemonic" text-anchor="end">FDI [C8-T1]</text>
        </g>

        <!-- Lumbricals 3 & 4 + FDM/ODM -->
        <g class="svg-branch-node ${getNodeClass('hand-motor')}" data-name="Lumbricals 3 & 4 and ODM/FDM" data-roots="C8, T1" data-desc="Flex MCP and extend IP of digits 4 and 5." data-type="motor">
          <rect x="355" y="1058" width="350" height="30" rx="5" class="node-box motor"/>
          <text x="368" y="1078" class="node-title">🥩 Lumbricals 3 & 4, ODM, FDM</text>
          <text x="695" y="1078" class="node-mnemonic" text-anchor="end">[C8-T1]</text>
        </g>

        <!-- Adductor Pollicis & FPB deep head -->
        <g class="svg-branch-node ${getNodeClass('hand-motor')}" data-name="Adductor Pollicis & FPB deep head" data-roots="C8, T1" data-desc="Adductor pollicis weakness causes Froment's sign (thumb IP flexes via FPL to compensate)." data-type="motor">
          <rect x="355" y="1096" width="350" height="34" rx="5" class="node-box motor"/>
          <text x="368" y="1118" class="node-title">🥩 Adductor Pollicis (Froment Sign)</text>
          <text x="695" y="1118" class="node-mnemonic" text-anchor="end">AP [C8-T1]</text>
        </g>
      </svg>
    `;
  }

  getMnemonicBreakdown(nerveKey) {
    if (nerveKey === 'median') {
      return [
        { word: 'โปร (Pro)', name: 'Pronator Teres', muscles: '[C6-C7] Main trunk elbow' },
        { word: 'ขอ (Khor)', name: 'FCR', muscles: '[C6-C7] Flexor carpi radialis' },
        { word: 'ปาล์ม (Palm)', name: 'Palmaris Longus', muscles: '[C7-C8]' },
        { word: 'ดี (Dee)', name: 'FDS', muscles: '[C7-T1] Superficial finger flexor' },
        { word: 'ดี (AIN 1)', name: 'FDP 2nd & 3rd', muscles: '[C7-C8] AIN branch (lateral)' },
        { word: 'โป้ง (AIN 2)', name: 'FPL', muscles: '[C7-C8] Thumb IP flexion (OK sign)' },
        { word: 'โป (AIN 3)', name: 'Pronator Quadratus', muscles: '[C7-C8] Deep terminal muscle' },
        { word: 'A - F - O', name: 'Thenar Group', muscles: 'APB (A), FPB (F), Opponens (O) [C8-T1]' }
      ];
    }
    if (nerveKey === 'radial') {
      return [
        { word: 'ไตร (Tri)', name: 'Triceps Brachii', muscles: '[C6-C8] 3 heads (Proximal to groove!)' },
        { word: 'เบียร์ (Beer)', name: 'Brachioradialis (BR)', muscles: '[C5-C6] Elbow flexion in mid-pronation' },
        { word: 'แอล (L)', name: 'ECRL', muscles: '[C6-C7] Wrist ext. (Spared in PIN palsy)' },
        { word: 'สู้ (Su)', name: 'Supinator', muscles: '[C6-C7] Arcade of Frohse entrance' },
        { word: 'ดี (Dee)', name: 'EDC', muscles: '[C7-C8] Extensor digitorum communis' },
        { word: 'ยู (U)', name: 'ECU', muscles: '[C7-C8] Extensor carpi ulnaris' },
        { word: 'โป้ง (Pong)', name: 'APL / EPB / EPL', muscles: '[C7-C8] Thumb extensors & abductor' },
        { word: 'ชี้ (Chee)', name: 'EIP (Ext. Indicis)', muscles: '[C7-C8] Terminal PIN needle EMG target!' }
      ];
    }
    if (nerveKey === 'ulnar') {
      return [
        { word: 'ยู (U)', name: 'FCU', muscles: '[C8-T1] Flexor carpi ulnaris' },
        { word: 'ดี (Dee)', name: 'FDP 3 & 4', muscles: '[C8-T1] Ring and little finger DIP flexors' },
        { word: 'DUNC', name: 'Dorsal Ulnar Cutaneous', muscles: '[C8-T1] Branches 5-8 cm ABOVE wrist!' },
        { word: 'สั้น (Short)', name: 'Palmaris Brevis', muscles: '[C8-T1] Superficial Guyon motor' },
        { word: 'ผิว (Skin)', name: 'Palmar Digitals', muscles: '[C8-T1] Volar 5th and half 4th digits' },
        { word: 'ลึก (Deep)', name: 'Deep Motor Branch', muscles: '[C8-T1] ADM, All Interossei (FDI), AP' }
      ];
    }
    return [];
  }

  getLesionName(lesionId) {
    const map = {
      'struthers': "Ligament of Struthers",
      'pronator': "Pronator Teres Syndrome",
      'ain': "AIN Syndrome (Kiloh-Nevin)",
      'cts': "Carpal Tunnel Syndrome",
      'spiral-groove': "Spiral Groove (Saturday Night Palsy)",
      'frohse': "Arcade of Frohse (PIN Palsy)",
      'wartenberg': "Wartenberg's Syndrome",
      'cubital-tunnel': "Cubital Tunnel Syndrome",
      'guyon-zone1': "Guyon's Canal (Zone 1)",
      'guyon-zone2': "Guyon's Canal (Zone 2)",
      'guyon-zone3': "Guyon's Canal (Zone 3)"
    };
    return map[lesionId] || lesionId;
  }

  getLesionInfo(nerveKey, lesionId) {
    if (!lesionId) return null;

    if (nerveKey === 'median') {
      if (lesionId === 'cts') {
        return {
          title: "Carpal Tunnel Syndrome (CTS)",
          site: "Under Transverse Carpal Ligament at wrist",
          cause: "Increased intracarpal canal pressure, repetitive motion, fluid retention.",
          spared: [
            "Pronator Teres, FCR, PL, FDS (Normal elbow flexors)",
            "FDP 1&2, FPL, PQ (Normal AIN muscles - OK sign preserved)",
            "⭐ PALMAR CUTANEOUS BRANCH SPARED! (Normal thenar eminence sensation)"
          ],
          involved: [
            "Abductor Pollicis Brevis (APB) - Thenar atrophy & weakness",
            "Opponens Pollicis (OP) & FPB superficial head",
            "1st & 2nd Lumbricals",
            "Palmar digital sensory to digits 1, 2, 3, and radial 4"
          ],
          pearls: "Why is thenar pad sensation normal in CTS? Because the Palmar Cutaneous Branch arises 5-6 cm proximal to the carpal tunnel and passes superficial to the flexor retinaculum! Prolonged Median D2/D3 sensory peak latency (>3.5 ms) and prolonged Median APB distal motor latency (>4.2 ms)."
        };
      }
      if (lesionId === 'ain') {
        return {
          title: "Anterior Interosseous Nerve (AIN) Syndrome (Kiloh-Nevin)",
          site: "Tendinous arch of FDS or fibrous band in proximal forearm",
          cause: "Compression or brachial neuritis (Parsonage-Turner syndrome).",
          spared: [
            "Pronator Teres, FCR, PL, FDS (Spared main trunk)",
            "APB, FPB, Opponens (Spared carpal tunnel hand intrinsics)",
            "ALL SENSORY TERRITORIES (Palmar cutaneous & digital SNAPs completely NORMAL!)"
          ],
          involved: [
            "Flexor Pollicis Longus (FPL) - Loss of thumb IP flexion",
            "FDP (digits 2 & 3) - Loss of index/long DIP flexion",
            "Pronator Quadratus (PQ) - Weak deep pronation",
            "Pinch deformity: Inability to make the 'OK' sign (pad-to-pad instead of tip-to-tip)"
          ],
          pearls: "PURE MOTOR SYNDROME! All sensory studies are completely normal. Needle EMG shows denervation in FPL, FDP 1-2, and PQ, while APB and PT are completely normal."
        };
      }
      if (lesionId === 'pronator') {
        return {
          title: "Pronator Teres Syndrome",
          site: "Between humeral and ulnar heads of Pronator Teres / Lacertus fibrosus",
          cause: "Muscular hypertrophy, fibrous band, repetitive forceful pronation.",
          spared: [
            "Pronator Teres itself is SPARED or tender (branches arise proximal to or within arcade)",
            "Proximal shoulder/arm muscles"
          ],
          involved: [
            "FCR, PL, FDS, AIN muscles (FPL, FDP 1-2, PQ)",
            "APB, Opponens, Lumbricals 1-2",
            "⭐ PALMAR CUTANEOUS BRANCH IS INVOLVED! (Numbness over thenar pad - distinguishes from CTS!)",
            "Digital sensation to digits 1-3.5"
          ],
          pearls: "Key discriminator from CTS: Sensation over the thenar eminence (Palmar Cutaneous) is NUMB in Pronator Teres syndrome, but NORMAL in CTS! Negative Tinel at wrist, positive tenderness over PT."
        };
      }
      if (lesionId === 'struthers') {
        return {
          title: "Supracondylar Process / Ligament of Struthers Syndrome",
          site: "Anomalous osseous spur 5 cm proximal to medial epicondyle",
          cause: "Fibrous band stretching from supracondylar spur to medial epicondyle.",
          spared: ["Biceps, Brachialis, Shoulder muscles"],
          involved: [
            "Pronator Teres (WEAK pronation!)",
            "All forearm flexors and AIN muscles",
            "All thenar intrinsics (APB)",
            "Entire median sensory distribution including thenar pad"
          ],
          pearls: "High median neuropathy! Distinguishable from Pronator syndrome because Pronator Teres itself is markedly weak and denervated on needle EMG."
        };
      }
    }

    if (nerveKey === 'radial') {
      if (lesionId === 'spiral-groove') {
        return {
          title: "Radial Neuropathy at Spiral Groove ('Saturday Night Palsy')",
          site: "Mid-shaft spiral (radial) groove of the humerus",
          cause: "Compression against humerus during sleep, intoxication, humeral fracture.",
          spared: [
            "⭐ TRICEPS BRACHII IS SPARED! (Branches arise proximal to spiral groove!)",
            "Deltoid (Axillary) & Latissimus dorsi (Thoracodorsal) - excludes Posterior Cord"
          ],
          involved: [
            "Brachioradialis (BR) - Weak elbow flexion in mid-pronation",
            "Extensor Carpi Radialis Longus & Brevis (ECRL/ECRB) - Complete WRIST DROP",
            "All PIN muscles (EDC, ECU, EDM, APL, EPB, EPL, EIP) - FINGER DROP",
            "Superficial Radial Sensory SNAP (Numbness in anatomical snuffbox & 1st web space)"
          ],
          pearls: "TRICEPS SPARING IS THE GOLD STANDARD! Because motor branches to the triceps arise in the axilla proximal to the spiral groove, triceps strength and reflex are strictly preserved. Conduction block across the spiral groove on radial motor NCS."
        };
      }
      if (lesionId === 'frohse') {
        return {
          title: "Posterior Interosseous Nerve (PIN) Palsy / Supinator Syndrome",
          site: "Arcade of Frohse (fibrous proximal edge of superficial supinator)",
          cause: "Fibrous band, repetitive forearm pronation/supination, lipoma, radial head fracture.",
          spared: [
            "Triceps brachii (Normal)",
            "Brachioradialis (BR) - Normal (innervated above elbow!)",
            "⭐ ECRL IS SPARED! (Causes radial deviation on wrist extension!)",
            "⭐ SUPERFICIAL RADIAL SENSORY (SRN) SNAP IS COMPLETELY NORMAL!"
          ],
          involved: [
            "Supinator, EDC, EDM, ECU (Finger drop, ulnar extension weakness)",
            "APL, EPB, EPL (Thumb extension and abduction drop)",
            "Extensor Indicis (EIP) - Denervated terminal PIN muscle"
          ],
          pearls: "PURE MOTOR DROP WITH PRESERVED SENSATION! ECRL is innervated proximal to the bifurcation, so the patient can still extend the wrist, but it deviates radially. Superficial radial SNAP is 100% normal."
        };
      }
      if (lesionId === 'wartenberg') {
        return {
          title: "Wartenberg's Syndrome (Cheiralgia Paresthetica)",
          site: "Subcutaneous emergence between Brachioradialis & ECRL tendons",
          cause: "Tight handcuffs, wristwatch, wrist casts, or repetitive pronation.",
          spared: ["ALL MOTOR MUSCLES COMPLETELY NORMAL! (No wrist or finger drop)"],
          involved: [
            "Superficial Radial Sensory Nerve (SRN)",
            "Burning, tingling, numbness over anatomical snuffbox and dorsal radial hand"
          ],
          pearls: "PURE SENSORY MONONEUROPATHY! Needle EMG is completely normal. Superficial Radial SNAP shows reduced amplitude or absent response compared to contralateral limb."
        };
      }
    }

    if (nerveKey === 'ulnar') {
      if (lesionId === 'cubital-tunnel') {
        return {
          title: "Ulnar Neuropathy at the Elbow (Cubital Tunnel Syndrome)",
          site: "Retroepicondylar groove & Osborne's band between 2 heads of FCU",
          cause: "Repetitive elbow flexion, prolonged leaning on elbow, subluxation, trauma.",
          spared: [
            "Median muscles (APB, FPL) & Radial muscles (EIP) - excludes Lower Trunk",
            "Medial Antebrachial Cutaneous (MABC) SNAP is NORMAL! (excludes Lower Trunk/Medial Cord)"
          ],
          involved: [
            "FCU & FDP 3-4 (May show denervation on needle EMG)",
            "⭐ DORSAL ULNAR CUTANEOUS (DUNC) SNAP IS ABNORMAL! (Proves elbow localization!)",
            "All ulnar hand intrinsics (ADM, FDI, interossei, adductor pollicis)",
            "Palmar digital sensory to digit 5 and medial 4",
            "Froment sign positive, ulnar claw hand (digits 4 & 5)"
          ],
          pearls: "DUNC SNAP & MABC SNAP: In cubital tunnel syndrome, DUNC SNAP is abnormal (unlike Guyon canal where DUNC is normal). MABC SNAP is normal (unlike Lower Trunk/Medial Cord where MABC is abnormal). Motor NCS shows focal slowing > 10 m/s across elbow."
        };
      }
      if (lesionId && lesionId.startsWith('guyon')) {
        return {
          title: "Ulnar Neuropathy at the Wrist (Guyon's Canal Syndrome)",
          site: "Pisohamate canal under volar carpal ligament",
          cause: "Cyclist handlebar palsy, hook of hamate fracture, ganglion cyst.",
          spared: [
            "FCU & FDP 3-4 (Forearm muscles strictly normal!)",
            "⭐ DORSAL ULNAR CUTANEOUS (DUNC) SNAP IS COMPLETELY NORMAL! (Branches 5-8 cm above wrist!)",
            "MABC SNAP normal"
          ],
          involved: [
            "Zone 1: Deep motor branch + Superficial sensory branch (Claw hand + volar 5th digit numbness)",
            "Zone 2: Pure Deep Motor (ADM, FDI, Interossei, AP weak; Sensation 100% normal!)",
            "Zone 3: Pure Superficial Sensory (Volar 5th and half 4th digit numb; Motor 100% normal!)"
          ],
          pearls: "THE DUNC GOLD STANDARD: Because DUNC arises 5-8 cm proximal to the wrist, sensation on the dorsum of the ulnar hand and DUNC SNAP are strictly preserved in ALL Guyon canal lesions! If DUNC is abnormal, look at the elbow."
        };
      }
    }

    return null;
  }
}

/**
 * Peripheral Nerve Branching Visual Diagram (Interactive SVG Stem Tree)
 * 100% Anatomically Calibrated from Preston & Shapiro 4th Ed, Neumann Appendix II Part B, and Perotto 5th Ed.
 * Features:
 * - Proximodistal anatomical compartment bands (Axilla -> Arm -> Elbow -> Forearm -> Wrist -> Hand)
 * - 2-Line High-Contrast Node Layout: Completely prevents text overlap on mobile and desktop
 * - High-Yield Entrapment Simulation: Explicitly labels branches as 🔴 DENERVATED vs 🟢 SPARED (NORMAL)
 * - Touch & Click Optimized: Large tap targets + Quick Lesion Pills toolbar for seamless mobile experience
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
    const quickLesionOptions = this.getQuickLesionsForNerve(this.currentNerve);

    let html = `
      <div class="peripheral-toolbar">
        <div class="view-toggle-group">
          <button class="btn btn-sm btn-primary active" id="btn-toggle-visual">🌳 Interactive Stem Tree</button>
          <button class="btn btn-sm" id="btn-toggle-table">📋 Detailed Clinical Guide & Perotto Cards</button>
        </div>
        <div class="peripheral-legend">
          <span class="legend-tag motor"><span class="dot" style="background:#10b981;"></span> Motor</span>
          <span class="legend-tag sensory"><span class="dot" style="background:#f59e0b;"></span> Sensory</span>
          <span class="legend-tag entrapment"><span class="dot" style="background:#ef4444;"></span> Entrapment Pin</span>
        </div>
      </div>

      <!-- Quick Mobile-Friendly Lesion Simulation Pills Bar -->
      <div class="quick-lesion-bar">
        <span class="quick-lesion-label">⚡ SIMULATE LESION AT:</span>
        <div class="quick-lesion-pills">
          <button class="lesion-pill-btn ${!this.activeLesion ? 'active-normal' : ''}" data-lesion="">
            🟢 Normal Anatomy
          </button>
          ${quickLesionOptions.map(opt => `
            <button class="lesion-pill-btn ${this.activeLesion === opt.id ? 'active-lesion' : ''}" data-lesion="${opt.id}">
              🔴 ${opt.title}
            </button>
          `).join('')}
        </div>
      </div>

      ${this.activeLesion ? `
        <div class="active-lesion-callout-banner">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span style="font-size:18px;">🛑</span>
            <div>
              <strong style="color:#fca5a5; font-size:14px;">ACTIVE LESION SIMULATION: ${lesionInfo.title}</strong>
              <div style="font-size:12px; color:#cbd5e1;">เส้นประสาทด้านล่างรอยโรคถูกทำเครื่องหมายเป็น <span style="color:#f87171; font-weight:800;">🔴 DENERVATED</span> และด้านบนเป็น <span style="color:#34d399; font-weight:800;">🟢 SPARED</span></div>
            </div>
          </div>
          <button class="btn btn-xs btn-outline-danger" id="btn-banner-clear-lesion">✕ Reset to Normal View</button>
        </div>
      ` : ''}

      <div class="visual-tree-layout">
        <!-- Left: Interactive SVG Diagram Canvas -->
        <div class="visual-tree-canvas-card">
          <div class="tree-canvas-header">
            <div>
              <span class="tree-title">${data.name} Visual Stem Diagram</span>
              <span class="tree-subtitle">Proximodistal Branching & Entrapment Hierarchy (Preston & Shapiro 4th Ed.)</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge ${this.activeLesion ? 'badge-amber' : 'badge-teal'}">
                ${this.activeLesion ? '⚡ LESION: ' + this.getLesionName(this.activeLesion) : '🟢 Normal Anatomy'}
              </span>
            </div>
          </div>

          <div class="mobile-scroll-indicator">
            <span>↔️ ปัดซ้าย-ขวาเพื่อเลื่อนดูแผนภาพกายวิภาคฉบับเต็ม</span>
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
                <p>💡 <strong>วิธีใช้งาน:</strong> กดที่แถบปุ่ม <strong>🔴 SIMULATE LESION</strong> ด้านบน หรือแตะที่ <strong>หมุดสีแดง (⚠️ Entrapment Sites)</strong> บนแผนภาพ:</p>
                <ul style="padding-left: 18px; margin-top: 8px; font-size: 12px; color: var(--text-secondary); line-height: 1.6;">
                  <li>กล้ามเนื้อที่อ่อนแรงหรือเสียการทำงานจะถูกเปลี่ยนเป็น <strong style="color:#f87171;">🔴 DENERVATED</strong></li>
                  <li>กล้ามเนื้อที่รอดพ้นจะถูกเปลี่ยนเป็น <strong style="color:#34d399;">🟢 SPARED (NORMAL)</strong></li>
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

    const bannerClearBtn = document.getElementById('btn-banner-clear-lesion');
    if (bannerClearBtn) bannerClearBtn.addEventListener('click', () => this.clearLesion());

    // Bind Quick Lesion Pills
    const lesionPillBtns = this.container.querySelectorAll('.lesion-pill-btn');
    lesionPillBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lesionId = btn.getAttribute('data-lesion');
        if (!lesionId) {
          this.clearLesion();
        } else {
          this.simulateLesion(lesionId);
        }
      });
    });
  }

  bindSvgInteractions() {
    // Entrapment pin clicks / touch
    const pins = this.container.querySelectorAll('.svg-entrapment-pin');
    pins.forEach(pin => {
      const handleTrigger = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lesionId = pin.getAttribute('data-lesion');
        this.simulateLesion(lesionId);
      };
      pin.addEventListener('click', handleTrigger);
      pin.addEventListener('touchend', handleTrigger);
    });

    // Branch node clicks / touch
    const nodes = this.container.querySelectorAll('.svg-branch-node');
    nodes.forEach(node => {
      const handleNode = (e) => {
        e.stopPropagation();
        const name = node.getAttribute('data-name');
        const roots = node.getAttribute('data-roots') || '';
        const desc = node.getAttribute('data-desc') || '';
        const type = node.getAttribute('data-type') || '';
        this.showBranchDetail(name, roots, desc, type);
      };
      node.addEventListener('click', handleNode);
      node.addEventListener('touchend', handleNode);
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

  getQuickLesionsForNerve(nerveKey) {
    if (nerveKey === 'median') {
      return [
        { id: 'struthers', title: "Struthers' Ligament" },
        { id: 'pronator', title: "Pronator Teres" },
        { id: 'ain', title: "AIN (Kiloh-Nevin)" },
        { id: 'cts', title: "Carpal Tunnel (CTS)" }
      ];
    }
    if (nerveKey === 'radial') {
      return [
        { id: 'spiral-groove', title: "Spiral Groove (Saturday Night)" },
        { id: 'frohse', title: "Arcade of Frohse (PIN)" },
        { id: 'wartenberg', title: "Wartenberg's (Sensory)" }
      ];
    }
    if (nerveKey === 'ulnar') {
      return [
        { id: 'cubital-tunnel', title: "Cubital Tunnel (Elbow)" },
        { id: 'guyon-zone1', title: "Guyon's Canal (Zone 1)" },
        { id: 'guyon-zone2', title: "Guyon's Zone 2 (Deep Motor)" },
        { id: 'guyon-zone3', title: "Guyon's Zone 3 (Sensory)" }
      ];
    }
    return [];
  }

  // =========================================================================
  // HELPER FOR RENDERING HIGH-CONTRAST 2-LINE BRANCH NODES (NO OVERLAP)
  // =========================================================================

  renderNodeBox(x, y, width, height, title, subtitle, status, type = 'motor') {
    const isDenervated = status === 'involved';
    const isSpared = status === 'spared';

    let boxClass = `node-box ${type}`;
    let boxStroke = type === 'motor' ? '#10b981' : '#f59e0b';
    let boxFill = type === 'motor' ? '#064e3b' : '#78350f';
    let titleColor = '#ffffff';
    let subColor = type === 'motor' ? '#34d399' : '#fbbf24';
    let statusText = subtitle;

    if (isDenervated) {
      boxClass += ' status-involved';
      boxStroke = '#ef4444';
      boxFill = '#450a0a';
      titleColor = '#fca5a5';
      subColor = '#f87171';
      statusText = `🔴 DENERVATED • ${subtitle}`;
    } else if (isSpared) {
      boxClass += ' status-spared';
      boxStroke = '#10b981';
      boxFill = '#064e3b';
      titleColor = '#a7f3d0';
      subColor = '#34d399';
      statusText = `🟢 SPARED • ${subtitle}`;
    }

    return `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="7" class="${boxClass}" fill="${boxFill}" stroke="${boxStroke}" stroke-width="${isDenervated || isSpared ? '2.5' : '1.5'}"/>
      ${isDenervated ? `<line x1="${x+12}" y1="${y + 19}" x2="${x + width - 12}" y2="${y + 19}" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2"/>` : ''}
      <text x="${x + 14}" y="${y + 20}" class="node-title-line" fill="${titleColor}" font-size="12.5" font-weight="700">${title}</text>
      <text x="${x + 14}" y="${y + 38}" class="node-sub-line" fill="${subColor}" font-size="10.5" font-weight="${isDenervated || isSpared ? '800' : '600'}">${statusText}</text>
    `;
  }

  // =========================================================================
  // SVG SCHEMATICS FOR MEDIAN, RADIAL, AND ULNAR
  // =========================================================================

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

    const getStatus = (nodeLevel, specificNerve) => {
      if (!isLesion) return 'normal';
      if (isStruthers) return 'involved';
      if (isPT) {
        if (nodeLevel === 'arm') return 'spared';
        return 'involved';
      }
      if (isAIN) {
        if (specificNerve === 'ain-group') return 'involved';
        return 'spared';
      }
      if (isCTS) {
        if (specificNerve === 'palmar-cutaneous') return 'spared'; // CRUCIAL SPARING!
        if (nodeLevel === 'hand') return 'involved';
        return 'spared';
      }
      return 'normal';
    };

    return `
      <svg viewBox="0 0 880 1260" class="peripheral-stem-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="medianStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#10b981"/>
            <stop offset="50%" stop-color="#14b8a6"/>
            <stop offset="100%" stop-color="#06b6d4"/>
          </linearGradient>
        </defs>

        <!-- Compartment Background Bands -->
        <g class="compartment-bands">
          <!-- Axilla & Arm -->
          <rect x="20" y="20" width="840" height="210" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="45" class="comp-label">AXILLA & ARM (BRACHIUM)</text>
          <text x="840" y="45" class="comp-sub" text-anchor="end">No muscular branches in arm</text>

          <!-- Elbow & Cubital Fossa -->
          <rect x="20" y="240" width="840" height="380" rx="8" fill="rgba(13, 148, 136, 0.05)" stroke="rgba(45, 212, 191, 0.15)"/>
          <text x="35" y="265" class="comp-label">ELBOW & PROXIMAL FOREARM</text>
          <text x="840" y="265" class="comp-sub" text-anchor="end">Main Trunk Forearm Flexors + AIN</text>

          <!-- Distal Forearm -->
          <rect x="20" y="630" width="840" height="220" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="655" class="comp-label">DISTAL FOREARM (PRE-WRIST)</text>
          <text x="840" y="655" class="comp-sub" text-anchor="end">5-6 cm proximal to wrist crease</text>

          <!-- Carpal Tunnel & Hand -->
          <rect x="20" y="860" width="840" height="380" rx="8" fill="rgba(245, 158, 11, 0.04)" stroke="rgba(245, 158, 11, 0.2)"/>
          <text x="35" y="885" class="comp-label">CARPAL TUNNEL & HAND (THENAR)</text>
          <text x="840" y="885" class="comp-sub" text-anchor="end">Under Transverse Carpal Ligament</text>
        </g>

        <!-- Spinal Roots Origin (Top Convergence) -->
        <g class="roots-convergence">
          <text x="440" y="45" text-anchor="middle" class="svg-header-roots">MEDIAN NERVE (C5, C6, C7, C8, T1)</text>
          <path d="M 340 60 Q 440 90 440 120" stroke="#10b981" stroke-width="2.5" fill="none"/>
          <path d="M 390 60 Q 440 90 440 120" stroke="#10b981" stroke-width="2.5" fill="none"/>
          <path d="M 440 60 L 440 120" stroke="#10b981" stroke-width="4.5" fill="none"/>
          <path d="M 490 60 Q 440 90 440 120" stroke="#10b981" stroke-width="2.5" fill="none"/>
          <path d="M 540 60 Q 440 90 440 120" stroke="#10b981" stroke-width="2.5" fill="none"/>

          <circle cx="340" cy="60" r="4" fill="#10b981"/>
          <circle cx="390" cy="60" r="4" fill="#10b981"/>
          <circle cx="440" cy="60" r="5" fill="#10b981"/>
          <circle cx="490" cy="60" r="4" fill="#10b981"/>
          <circle cx="540" cy="60" r="4" fill="#10b981"/>
          <text x="340" y="52" class="root-dot-lbl" text-anchor="middle">C5</text>
          <text x="390" y="52" class="root-dot-lbl" text-anchor="middle">C6</text>
          <text x="440" y="52" class="root-dot-lbl" text-anchor="middle">C7</text>
          <text x="490" y="52" class="root-dot-lbl" text-anchor="middle">C8</text>
          <text x="540" y="52" class="root-dot-lbl" text-anchor="middle">T1</text>
        </g>

        <!-- Main Vertical Stem -->
        <path d="M 440 120 L 440 880" stroke="url(#medianStemGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>

        <!-- Vascular branch -->
        <path d="M 440 145 C 380 145, 340 155, 300 155" stroke="#0ea5e9" stroke-width="2" fill="none" stroke-dasharray="3,3"/>
        <g class="svg-branch-node" data-name="Arterial Branch" data-desc="Vascular vasomotor fibers to brachial artery" data-type="sensory">
          <rect x="160" y="135" width="140" height="38" rx="6" class="node-box autonomic"/>
          <text x="230" y="158" text-anchor="middle" class="node-title-line" font-size="11.5">To Brachial Artery</text>
        </g>

        <!-- Entrapment Pin 1: Struthers -->
        <g class="svg-entrapment-pin ${isStruthers ? 'active' : ''}" data-lesion="struthers" transform="translate(440, 190)">
          <rect x="-155" y="-18" width="310" height="36" rx="18" class="pin-pill-box" fill="${isStruthers ? '#ef4444' : 'rgba(239, 68, 68, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="800">⚠️ Struthers' Ligament (5cm > Med. Epicondyle)</text>
        </g>

        <!-- Entrapment Pin 2: Pronator Teres Syndrome -->
        <g class="svg-entrapment-pin ${isPT ? 'active' : ''}" data-lesion="pronator" transform="translate(440, 290)">
          <rect x="-155" y="-18" width="310" height="36" rx="18" class="pin-pill-box" fill="${isPT ? '#ef4444' : 'rgba(239, 68, 68, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="800">⚠️ Pronator Teres Syndrome (PT 2 heads)</text>
        </g>

        <!-- Right Side: Main Trunk Muscles (โปร - ขอ - ปาล์ม - ดี) -->
        <!-- 1. PT (โปร) -->
        <path d="M 440 340 C 480 340, 500 340, 530 340" stroke="#10b981" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Pronator Teres (PT)" data-roots="C6, C7" data-desc="Humeral & ulnar heads. Primary forearm pronator. Key test: Spared in AIN and CTS, weak in Struthers/Upper trunk." data-type="motor">
          ${this.renderNodeBox(530, 315, 310, 48, "🥩 Pronator Teres (PT)", "สูตรจำ: โปร • Major Roots: C6-C7", getStatus('elbow', 'pt'))}
        </g>

        <!-- 2. FCR (ขอ) -->
        <path d="M 440 405 C 480 405, 500 405, 530 405" stroke="#10b981" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Flexor Carpi Radialis (FCR)" data-roots="C6, C7" data-desc="Forearm wrist flexion with radial deviation. Standard C6-C7 needle EMG target." data-type="motor">
          ${this.renderNodeBox(530, 380, 310, 48, "🥩 Flexor Carpi Radialis (FCR)", "สูตรจำ: ขอ • Major Roots: C6-C7", getStatus('elbow', 'fcr'))}
        </g>

        <!-- 3. PL (ปาล์ม) -->
        <path d="M 440 470 C 480 470, 500 470, 530 470" stroke="#10b981" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Palmaris Longus (PL)" data-roots="C7, C8" data-desc="Tenses palmar aponeurosis. Absent in ~14% of population." data-type="motor">
          ${this.renderNodeBox(530, 445, 310, 48, "🥩 Palmaris Longus (PL)", "สูตรจำ: ปาล์ม • Major Roots: C7-C8", getStatus('elbow', 'pl'))}
        </g>

        <!-- 4. FDS (ดี) -->
        <path d="M 440 535 C 480 535, 500 535, 530 535" stroke="#10b981" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Flexor Digitorum Superficialis (FDS)" data-roots="C7, C8, T1" data-desc="Flexes PIP joints of digits 2-5. Innervated by multiple branches along forearm." data-type="motor">
          ${this.renderNodeBox(530, 510, 310, 48, "🥩 Flexor Digit. Superficialis (FDS)", "สูตรจำ: ดี • Major Roots: C7, C8, T1", getStatus('elbow', 'fds'))}
        </g>

        <!-- Left Side: AIN Branch (Anterior Interosseous Nerve) -->
        <path d="M 440 330 C 370 330, 330 360, 330 400 L 330 580" stroke="#a855f7" stroke-width="4.5" fill="none" stroke-dasharray="4,2"/>
        
        <!-- Entrapment Pin 3: AIN Syndrome -->
        <g class="svg-entrapment-pin ${isAIN ? 'active' : ''}" data-lesion="ain" transform="translate(190, 365)">
          <rect x="-150" y="-18" width="300" height="36" rx="18" class="pin-pill-box" fill="${isAIN ? '#ef4444' : 'rgba(168, 85, 247, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="800">⚠️ AIN Syndrome (Kiloh-Nevin)</text>
        </g>

        <!-- AIN 1: FDP (lateral half) -->
        <path d="M 330 425 L 310 425" stroke="#a855f7" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="FDP Lateral (Digits 2 & 3)" data-roots="C7, C8" data-desc="Flexes DIP joints of index and long fingers. Essential for OK sign." data-type="motor">
          ${this.renderNodeBox(40, 400, 270, 48, "🥩 FDP (Digits 2 & 3)", "สูตรจำ: ดี (AIN) • Roots: C7-C8", getStatus('elbow', 'ain-group'))}
        </g>

        <!-- AIN 2: FPL -->
        <path d="M 330 490 L 310 490" stroke="#a855f7" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="Flexor Pollicis Longus (FPL)" data-roots="C7, C8" data-desc="Flexes IP joint of thumb. Tested via pinch test. Characteristic loss of IP flexion in AIN palsy." data-type="motor">
          ${this.renderNodeBox(40, 465, 270, 48, "🥩 Flexor Pollicis Longus (FPL)", "สูตรจำ: โป้ง (AIN) • Roots: C7-C8", getStatus('elbow', 'ain-group'))}
        </g>

        <!-- AIN 3: Pronator Quadratus -->
        <path d="M 330 555 L 310 555" stroke="#a855f7" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="Pronator Quadratus (PQ)" data-roots="C7, C8" data-desc="Deep pronator at distal wrist. Terminal muscle of AIN. Needle EMG tested with forearm fully pronated." data-type="motor">
          ${this.renderNodeBox(40, 530, 270, 48, "🥩 Pronator Quadratus (PQ)", "สูตรจำ: โป (AIN) • Roots: C7-C8", getStatus('elbow', 'ain-group'))}
        </g>

        <!-- Palmar Cutaneous Branch (5-6 cm above wrist) -->
        <path d="M 440 700 C 370 700, 310 720, 270 720" stroke="#f59e0b" stroke-width="3.5" fill="none"/>
        <g class="svg-branch-node" data-name="Palmar Cutaneous Branch" data-roots="C6, C7" data-desc="Arises 5-6 cm proximal to wrist, passes SUPERFICIAL to carpal tunnel into thenar pad. CRUCIAL: Spared in Carpal Tunnel Syndrome! If numb, lesion is at or proximal to Pronator Teres." data-type="sensory">
          ${this.renderNodeBox(40, 695, 300, 52, "👁️ Palmar Cutaneous Branch", "⭐ SPARED IN CTS (Thenar Pad)", getStatus('distal', 'palmar-cutaneous'), 'sensory')}
        </g>

        <text x="440" y="775" text-anchor="middle" font-size="12" fill="#fde047" font-weight="700">
          ▲ Passes superficial to transverse carpal ligament (No tunnel entrapment!)
        </text>

        <!-- Entrapment Pin 4: Carpal Tunnel Syndrome -->
        <g class="svg-entrapment-pin ${isCTS ? 'active' : ''}" data-lesion="cts" transform="translate(440, 880)">
          <rect x="-170" y="-18" width="340" height="36" rx="18" class="pin-pill-box" fill="${isCTS ? '#ef4444' : 'rgba(239, 68, 68, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">⚠️ Carpal Tunnel Syndrome (TCL Ligament)</text>
        </g>

        <!-- Terminal Bifurcation in Hand -->
        <path d="M 440 900 L 440 940" stroke="#10b981" stroke-width="6" fill="none"/>
        <path d="M 440 940 C 380 970, 330 990, 280 1010" stroke="#10b981" stroke-width="3" fill="none"/>
        <path d="M 440 940 C 500 970, 560 990, 610 1010" stroke="#f59e0b" stroke-width="3" fill="none"/>

        <!-- RECURRENT THENAR MOTOR BRANCH (A-F-O) -->
        <g class="svg-branch-node" data-name="Abductor Pollicis Brevis (APB)" data-roots="C8, T1" data-desc="Primary muscle tested in Median motor NCS & Needle EMG. Palmar thumb abduction." data-type="motor">
          ${this.renderNodeBox(40, 970, 330, 48, "🥩 Abductor Pollicis Brevis (APB)", "สูตรจำ: A (AFO) • Major Roots: C8-T1", getStatus('hand', 'apb'))}
        </g>

        <g class="svg-branch-node" data-name="Flexor Pollicis Brevis (Superficial Head)" data-roots="C8, T1" data-desc="Flexes MCP of thumb. Deep head is innervated by ulnar nerve." data-type="motor">
          ${this.renderNodeBox(40, 1030, 330, 48, "🥩 Flexor Pollicis Brevis (FPB sup.)", "สูตรจำ: F (AFO) • Major Roots: C8-T1", getStatus('hand', 'fpb'))}
        </g>

        <g class="svg-branch-node" data-name="Opponens Pollicis (OP)" data-roots="C8, T1" data-desc="Rotates 1st metacarpal for thumb opposition against fingertips." data-type="motor">
          ${this.renderNodeBox(40, 1090, 330, 48, "🥩 Opponens Pollicis (OP)", "สูตรจำ: O (AFO) • Major Roots: C8-T1", getStatus('hand', 'op'))}
        </g>

        <g class="svg-branch-node" data-name="1st & 2nd Lumbricals" data-roots="C8, T1" data-desc="Flexes MCP and extends IP of index and long fingers. Useful for 2L-INT comparison study." data-type="motor">
          ${this.renderNodeBox(40, 1150, 330, 48, "🥩 1st & 2nd Lumbricals", "Index & Middle Finger • Roots: C8-T1", getStatus('hand', 'lumbricals'))}
        </g>

        <!-- PALMAR DIGITAL SENSORY BRANCHES -->
        <g class="svg-branch-node" data-name="Palmar Digital Nerves" data-roots="C6, C7, C8" data-desc="Sensory to volar thumb, index, middle, and radial half of ring finger. Involved in CTS." data-type="sensory">
          ${this.renderNodeBox(510, 970, 330, 52, "🖐️ Palmar Digital Nerves (Digits 1-3.5)", "Cutaneous: Thumb, Index, Middle, 1/2 Ring", getStatus('hand', 'digitals'), 'sensory')}
        </g>

        <g class="svg-branch-node" data-name="Dorsal Nail Bed Sensation" data-roots="C6, C7" data-desc="Supplies skin over the dorsum of distal and middle phalanges of digits 1-3.5." data-type="sensory">
          ${this.renderNodeBox(510, 1040, 330, 48, "🖐️ Dorsal Distal Nail Beds", "Digits 1, 2, 3, & radial 1/2 of 4", getStatus('hand', 'nailbeds'), 'sensory')}
        </g>
      </svg>
    `;
  }

  // --- RADIAL NERVE SVG ---
  getRadialSvg() {
    const isLesion = this.activeLesion;
    const isSpiral = isLesion === 'spiral-groove';
    const isFrohse = isLesion === 'frohse';
    const isWartenberg = isLesion === 'wartenberg';

    const getStatus = (nodeGroup) => {
      if (!isLesion) return 'normal';
      if (isSpiral) {
        if (nodeGroup === 'triceps') return 'spared'; // KEY DISCRIMINATOR
        return 'involved';
      }
      if (isFrohse) {
        if (nodeGroup === 'triceps' || nodeGroup === 'br-ecrl' || nodeGroup === 'srn-sensory') return 'spared';
        if (nodeGroup === 'pin-muscles') return 'involved';
        return 'spared';
      }
      if (isWartenberg) {
        if (nodeGroup === 'srn-sensory') return 'involved';
        return 'spared';
      }
      return 'normal';
    };

    return `
      <svg viewBox="0 0 880 1260" class="peripheral-stem-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="radialStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#a855f7"/>
            <stop offset="50%" stop-color="#8b5cf6"/>
            <stop offset="100%" stop-color="#6366f1"/>
          </linearGradient>
        </defs>

        <g class="compartment-bands">
          <rect x="20" y="20" width="840" height="230" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="45" class="comp-label">AXILLA & PROXIMAL ARM (BEFORE SPIRAL GROOVE)</text>
          <text x="840" y="45" class="comp-sub" text-anchor="end">Triceps innervation PROXIMAL to groove</text>

          <rect x="20" y="260" width="840" height="150" rx="8" fill="rgba(168, 85, 247, 0.05)" stroke="rgba(168, 85, 247, 0.2)"/>
          <text x="35" y="285" class="comp-label">SPIRAL (RADIAL) GROOVE OF HUMERUS</text>
          <text x="840" y="285" class="comp-sub" text-anchor="end">Saturday Night Palsy / Shaft Fracture</text>

          <rect x="20" y="420" width="840" height="160" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="445" class="comp-label">DISTAL ARM & CUBITAL FOSSA</text>
          <text x="840" y="445" class="comp-sub" text-anchor="end">BR & ECRL + Terminal Bifurcation</text>

          <rect x="20" y="590" width="840" height="650" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="615" class="comp-label">FOREARM & HAND: TERMINAL DICHOTOMY</text>
          <text x="840" y="615" class="comp-sub" text-anchor="end">PIN (Pure Motor) vs SRN (Pure Sensory)</text>
        </g>

        <!-- Spinal Roots Origin -->
        <g class="roots-convergence">
          <text x="440" y="45" text-anchor="middle" class="svg-header-roots" fill="#c084fc">RADIAL NERVE (C5, C6, C7, C8, ±T1)</text>
          <path d="M 340 60 Q 440 90 440 120" stroke="#a855f7" stroke-width="2.5" fill="none"/>
          <path d="M 390 60 Q 440 90 440 120" stroke="#a855f7" stroke-width="2.5" fill="none"/>
          <path d="M 440 60 L 440 120" stroke="#a855f7" stroke-width="4.5" fill="none"/>
          <path d="M 490 60 Q 440 90 440 120" stroke="#a855f7" stroke-width="2.5" fill="none"/>
          <path d="M 540 60 Q 440 90 440 120" stroke="#a855f7" stroke-width="2.5" fill="none"/>

          <circle cx="340" cy="60" r="4" fill="#a855f7"/>
          <circle cx="390" cy="60" r="4" fill="#a855f7"/>
          <circle cx="440" cy="60" r="5" fill="#a855f7"/>
          <circle cx="490" cy="60" r="4" fill="#a855f7"/>
          <circle cx="540" cy="60" r="4" fill="#a855f7"/>
          <text x="340" y="52" class="root-dot-lbl" text-anchor="middle">C5</text>
          <text x="390" y="52" class="root-dot-lbl" text-anchor="middle">C6</text>
          <text x="440" y="52" class="root-dot-lbl" text-anchor="middle">C7</text>
          <text x="490" y="52" class="root-dot-lbl" text-anchor="middle">C8</text>
          <text x="540" y="52" class="root-dot-lbl" text-anchor="middle">T1</text>
        </g>

        <path d="M 440 120 L 440 520" stroke="url(#radialStemGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>

        <!-- Triceps Long & Medial heads -->
        <path d="M 440 145 C 480 145, 500 145, 530 145" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Triceps - Long & Medial Heads" data-roots="C6, C7, C8" data-desc="Arises in axilla / high arm BEFORE spiral groove! SPARED IN SATURDAY NIGHT PALSY." data-type="motor">
          ${this.renderNodeBox(530, 120, 310, 48, "🥩 Triceps (Long & Medial Heads)", "สูตรจำ: ไตร • Major Roots: C6-C8", getStatus('triceps'))}
        </g>

        <!-- Triceps Lateral head -->
        <path d="M 440 195 C 400 195, 370 195, 340 195" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Triceps - Lateral Head" data-roots="C6, C7, C8" data-desc="Arises just proximal to spiral groove. Extends elbow." data-type="motor">
          ${this.renderNodeBox(40, 170, 300, 48, "🥩 Triceps (Lateral Head)", "สูตรจำ: ไตร • Major Roots: C6-C8", getStatus('triceps'))}
        </g>

        <!-- Entrapment Pin: Spiral Groove -->
        <g class="svg-entrapment-pin ${isSpiral ? 'active' : ''}" data-lesion="spiral-groove" transform="translate(440, 305)">
          <rect x="-165" y="-18" width="330" height="36" rx="18" class="pin-pill-box" fill="${isSpiral ? '#ef4444' : 'rgba(239, 68, 68, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">⚠️ Spiral Groove (Saturday Night Palsy / Fracture)</text>
        </g>

        <!-- Brachioradialis (เบียร์) -->
        <path d="M 440 455 C 480 455, 500 455, 530 455" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Brachioradialis (BR)" data-roots="C5, C6" data-desc="CRUCIAL DISCRIMINATOR: Weak in Spiral Groove lesion, SPARED in PIN / Arcade of Frohse lesion!" data-type="motor">
          ${this.renderNodeBox(530, 430, 310, 48, "🥩 Brachioradialis (BR)", "สูตรจำ: เบียร์ • Major Roots: C5-C6", getStatus('br-ecrl'))}
        </g>

        <!-- ECRL (แอล) -->
        <path d="M 440 515 C 480 515, 500 515, 530 515" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Extensor Carpi Radialis Longus (ECRL)" data-roots="C6, C7" data-desc="Wrist extension with radial deviation. Innervated proximal to elbow. Spared in PIN palsy (causes radial deviation on extension)!" data-type="motor">
          ${this.renderNodeBox(530, 490, 310, 48, "🥩 Extensor Carpi Radialis Longus", "สูตรจำ: แอล • Major Roots: C6-C7", getStatus('br-ecrl'))}
        </g>

        <!-- Bifurcation -->
        <circle cx="440" cy="540" r="6" fill="#a855f7"/>
        <path d="M 440 540 C 370 570, 270 600, 270 650 L 270 1200" stroke="#8b5cf6" stroke-width="6" fill="none"/>
        <path d="M 440 540 C 510 570, 610 600, 610 650 L 610 1200" stroke="#f59e0b" stroke-width="4.5" fill="none"/>

        <!-- Entrapment Pin: Arcade of Frohse -->
        <g class="svg-entrapment-pin ${isFrohse ? 'active' : ''}" data-lesion="frohse" transform="translate(270, 650)">
          <rect x="-140" y="-18" width="280" height="36" rx="18" class="pin-pill-box" fill="${isFrohse ? '#ef4444' : 'rgba(168, 85, 247, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="800">⚠️ Arcade of Frohse (PIN Entrapment)</text>
        </g>

        <!-- Supinator (สู้) -->
        <path d="M 270 705 L 240 705" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="Supinator" data-roots="C6, C7" data-desc="Surrounds radius; Arcade of Frohse is its proximal fibrous edge." data-type="motor">
          ${this.renderNodeBox(30, 680, 240, 48, "🥩 Supinator", "สูตรจำ: สู้ • Roots: C6-C7", getStatus('pin-muscles'))}
        </g>

        <!-- EDC (ดี) -->
        <path d="M 270 765 L 240 765" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="Extensor Digitorum Communis (EDC)" data-roots="C7, C8" data-desc="Extends digits 2-5 at MCP joints. Standard muscle for radial motor study." data-type="motor">
          ${this.renderNodeBox(30, 740, 240, 48, "🥩 EDC (Communis)", "สูตรจำ: ดี • Roots: C7-C8", getStatus('pin-muscles'))}
        </g>

        <!-- ECU (ยู) -->
        <path d="M 270 825 L 240 825" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="Extensor Carpi Ulnaris (ECU)" data-roots="C7, C8" data-desc="Extends and adducts wrist (ulnar deviation)." data-type="motor">
          ${this.renderNodeBox(30, 800, 240, 48, "🥩 ECU (Ulnaris)", "สูตรจำ: ยู • Roots: C7-C8", getStatus('pin-muscles'))}
        </g>

        <!-- Thumb Extensors: APL, EPB, EPL (โป้ง) -->
        <path d="M 270 885 L 240 885" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="APL & EPB & EPL" data-roots="C7, C8" data-desc="Abductor pollicis longus, extensor pollicis brevis and longus. Form anatomical snuffbox." data-type="motor">
          ${this.renderNodeBox(30, 860, 240, 48, "🥩 APL / EPB / EPL", "สูตรจำ: โป้ง • Roots: C7-C8", getStatus('pin-muscles'))}
        </g>

        <!-- EIP (ชี้ - TERMINAL PIN TARGET) -->
        <path d="M 270 945 L 240 945" stroke="#8b5cf6" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="Extensor Indicis Proprius (EIP)" data-roots="C7, C8" data-desc="⭐ TERMINAL PIN MUSCLE: Standard muscle for radial motor NCS recording and needle EMG! Separates Lower Trunk from Medial Cord." data-type="motor">
          ${this.renderNodeBox(20, 920, 250, 52, "⭐ EIP (Ext. Indicis)", "สูตรจำ: ชี้ • TERMINAL PIN TARGET", getStatus('pin-muscles'))}
        </g>

        <!-- RIGHT TOWER: SUPERFICIAL RADIAL (PURE SENSORY) -->
        <g class="svg-entrapment-pin ${isWartenberg ? 'active' : ''}" data-lesion="wartenberg" transform="translate(610, 780)">
          <rect x="-140" y="-18" width="280" height="36" rx="18" class="pin-pill-box" fill="${isWartenberg ? '#ef4444' : 'rgba(245, 158, 11, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="800">⚠️ Wartenberg's Syndrome (Handcuffs)</text>
        </g>

        <path d="M 610 880 L 590 880" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="Superficial Radial Sensory" data-roots="C6, C7" data-desc="Cutaneous supply to anatomical snuffbox, radial 2/3 of dorsum of hand, dorsal proximal digits 1, 2, 3, and radial half of 4. SPARED IN PIN PALSY!" data-type="sensory">
          ${this.renderNodeBox(560, 855, 300, 52, "👁️ Superficial Radial SNAP", "Snuffbox & 1st Web Space [C6-C7]", getStatus('srn-sensory'), 'sensory')}
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

    const getStatus = (nodeGroup) => {
      if (!isLesion) return 'normal';
      if (isCubital) return 'involved';
      if (isGuyon1 || isGuyon2 || isGuyon3) {
        if (nodeGroup === 'forearm' || nodeGroup === 'dunc-sensory') return 'spared';
        if (isGuyon2 && nodeGroup === 'palmar-sensory') return 'spared';
        if (isGuyon3 && nodeGroup === 'hand-motor') return 'spared';
        return 'involved';
      }
      return 'normal';
    };

    return `
      <svg viewBox="0 0 880 1260" class="peripheral-stem-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ulnarStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="50%" stop-color="#3b82f6"/>
            <stop offset="100%" stop-color="#2563eb"/>
          </linearGradient>
        </defs>

        <g class="compartment-bands">
          <rect x="20" y="20" width="840" height="210" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="45" class="comp-label">AXILLA & MEDIAL ARM</text>
          <text x="840" y="45" class="comp-sub" text-anchor="end">No muscular branches in arm</text>

          <rect x="20" y="240" width="840" height="260" rx="8" fill="rgba(56, 189, 248, 0.05)" stroke="rgba(56, 189, 248, 0.2)"/>
          <text x="35" y="265" class="comp-label">ELBOW: RETROEPICONDYLAR GROOVE & CUBITAL TUNNEL</text>
          <text x="840" y="265" class="comp-sub" text-anchor="end">Osborne's Arcade between 2 heads of FCU</text>

          <rect x="20" y="510" width="840" height="280" rx="8" fill="rgba(15, 23, 42, 0.45)" stroke="rgba(255,255,255,0.06)"/>
          <text x="35" y="535" class="comp-label">FOREARM & PRE-WRIST SENSORY BRANCHES</text>
          <text x="840" y="535" class="comp-sub" text-anchor="end">DUNC branches 5-8 cm ABOVE wrist!</text>

          <rect x="20" y="800" width="840" height="440" rx="8" fill="rgba(245, 158, 11, 0.04)" stroke="rgba(245, 158, 11, 0.2)"/>
          <text x="35" y="825" class="comp-label">WRIST & HAND: GUYON'S CANAL (PISOHAMATE)</text>
          <text x="840" y="825" class="comp-sub" text-anchor="end">Zones 1, 2, and 3 Dichotomy</text>
        </g>

        <!-- Spinal Roots Origin -->
        <g class="roots-convergence">
          <text x="440" y="45" text-anchor="middle" class="svg-header-roots" fill="#60a5fa">ULNAR NERVE (C8, T1, ±C7)</text>
          <path d="M 390 60 Q 440 90 440 120" stroke="#38bdf8" stroke-width="3" fill="none"/>
          <path d="M 440 60 L 440 120" stroke="#38bdf8" stroke-width="4.5" fill="none"/>
          <path d="M 490 60 Q 440 90 440 120" stroke="#38bdf8" stroke-width="3" fill="none"/>

          <circle cx="390" cy="60" r="4" fill="#38bdf8"/>
          <circle cx="440" cy="60" r="5" fill="#38bdf8"/>
          <circle cx="490" cy="60" r="4" fill="#38bdf8"/>
          <text x="390" y="52" class="root-dot-lbl" text-anchor="middle">C7</text>
          <text x="440" y="52" class="root-dot-lbl" text-anchor="middle">C8</text>
          <text x="490" y="52" class="root-dot-lbl" text-anchor="middle">T1</text>
        </g>

        <path d="M 440 120 L 440 820" stroke="url(#ulnarStemGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>

        <!-- Entrapment Pin: Cubital Tunnel -->
        <g class="svg-entrapment-pin ${isCubital ? 'active' : ''}" data-lesion="cubital-tunnel" transform="translate(440, 290)">
          <rect x="-160" y="-18" width="320" height="36" rx="18" class="pin-pill-box" fill="${isCubital ? '#ef4444' : 'rgba(239, 68, 68, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">⚠️ Cubital Tunnel / Retroepicondylar Groove</text>
        </g>

        <!-- FCU Branch (ยู) -->
        <path d="M 440 365 C 480 365, 500 365, 530 365" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Flexor Carpi Ulnaris (FCU)" data-roots="C8, T1" data-desc="Innervated at or immediately distal to cubital tunnel. Wrist flexion with ulnar deviation." data-type="motor">
          ${this.renderNodeBox(530, 340, 310, 48, "🥩 Flexor Carpi Ulnaris (FCU)", "สูตรจำ: ยู • Major Roots: C8-T1", getStatus('forearm'))}
        </g>

        <!-- FDP 3 & 4 (ดี) -->
        <path d="M 440 435 C 480 435, 500 435, 530 435" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
        <g class="svg-branch-node" data-name="Flexor Digitorum Profundus III & IV" data-roots="C8, T1" data-desc="Flexes DIP joints of ring and little fingers. Ulnar claw deformity is worse if FDP is intact ('Ulnar Paradox')." data-type="motor">
          ${this.renderNodeBox(530, 410, 310, 48, "🥩 FDP (Medial 4th & 5th Digits)", "สูตรจำ: ดี • Major Roots: C8-T1", getStatus('forearm'))}
        </g>

        <!-- Palmar Cutaneous Branch -->
        <path d="M 440 590 C 390 590, 360 590, 330 590" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <g class="svg-branch-node" data-name="Palmar Cutaneous of Ulnar" data-roots="C8, T1" data-desc="Arises in mid-forearm, supplies skin over hypothenar eminence. Spared in Guyon canal." data-type="sensory">
          ${this.renderNodeBox(30, 565, 300, 48, "👁️ Palmar Cutaneous of Ulnar", "Skin over hypothenar eminence", getStatus('dunc-sensory'), 'sensory')}
        </g>

        <!-- DUNC: Dorsal Ulnar Cutaneous Nerve -->
        <path d="M 440 660 C 480 660, 500 660, 530 660" stroke="#f59e0b" stroke-width="3.5" fill="none"/>
        <g class="svg-branch-node" data-name="Dorsal Ulnar Cutaneous (DUNC)" data-roots="C8, T1" data-desc="⭐ CRUCIAL PM&R GOLD STANDARD: Branches 5-8 cm PROXIMAL to the wrist! DUNC SNAP is ABNORMAL in Cubital Tunnel, but NORMAL in Guyon's Canal!" data-type="sensory">
          ${this.renderNodeBox(530, 635, 310, 52, "👁️ DUNC (Dorsal Cutaneous)", "⭐ SPARED IN GUYON'S CANAL (Dorsal Hand)", getStatus('dunc-sensory'), 'sensory')}
        </g>

        <text x="440" y="735" text-anchor="middle" font-size="12" fill="#fde047" font-weight="700">
          ▲ Branches 5-8 cm proximal to wrist (Does NOT enter Guyon's canal!)
        </text>

        <!-- Entrapment Pin: Guyon's Canal -->
        <g class="svg-entrapment-pin ${isGuyon1 || isGuyon2 || isGuyon3 ? 'active' : ''}" data-lesion="guyon-zone1" transform="translate(440, 820)">
          <rect x="-160" y="-18" width="320" height="36" rx="18" class="pin-pill-box" fill="${isGuyon1 || isGuyon2 || isGuyon3 ? '#ef4444' : 'rgba(239, 68, 68, 0.85)'}"/>
          <text x="0" y="5" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">⚠️ Guyon's Canal (Pisohamate Hiatus)</text>
        </g>

        <!-- Bifurcation in Hand -->
        <path d="M 440 840 L 440 880" stroke="#38bdf8" stroke-width="6" fill="none"/>
        <path d="M 440 880 C 370 910, 310 930, 260 950" stroke="#f59e0b" stroke-width="3" fill="none"/>
        <path d="M 440 880 C 510 910, 570 930, 620 950" stroke="#38bdf8" stroke-width="4.5" fill="none"/>

        <!-- LEFT SIDE: SUPERFICIAL TERMINAL BRANCH -->
        <g class="svg-branch-node" data-name="Palmaris Brevis" data-roots="C8, T1" data-desc="Small subcutaneous motor muscle; puckers hypothenar skin." data-type="motor">
          ${this.renderNodeBox(30, 930, 310, 48, "🥩 Palmaris Brevis (PB)", "สูตรจำ: สั้น • Major Roots: C8-T1", getStatus('palmar-sensory'))}
        </g>

        <g class="svg-branch-node" data-name="Ulnar Digital Sensory" data-roots="C8, T1" data-desc="Sensory to entire 5th digit and medial half of 4th digit." data-type="sensory">
          ${this.renderNodeBox(30, 995, 310, 48, "🖐️ Digits 5 & 1/2 of 4 (Volar)", "สูตรจำ: ผิว • Little & Ring Finger", getStatus('palmar-sensory'), 'sensory')}
        </g>

        <!-- RIGHT SIDE: DEEP MOTOR BRANCH -->
        <g class="svg-branch-node" data-name="Abductor Digiti Minimi (ADM)" data-roots="C8, T1" data-desc="Standard ulnar CMAP recording site. Abducts 5th digit." data-type="motor">
          ${this.renderNodeBox(530, 930, 310, 48, "🥩 Abductor Digiti Minimi (ADM)", "สูตรจำ: ลึก • Standard CMAP Site", getStatus('hand-motor'))}
        </g>

        <g class="svg-branch-node" data-name="First Dorsal Interosseous (FDI)" data-roots="C8, T1" data-desc="Primary muscle for ulnar needle EMG! 4 Dorsal Interossei (abduct) + 3 Palmar Interossei (adduct)." data-type="motor">
          ${this.renderNodeBox(530, 990, 310, 48, "⭐ First Dorsal Interosseous (FDI)", "สูตรจำ: ลึก • Primary EMG Muscle", getStatus('hand-motor'))}
        </g>

        <g class="svg-branch-node" data-name="Lumbricals 3 & 4 and ODM/FDM" data-roots="C8, T1" data-desc="Flex MCP and extend IP of digits 4 and 5." data-type="motor">
          ${this.renderNodeBox(530, 1050, 310, 48, "🥩 Lumbricals 3 & 4, ODM, FDM", "สูตรจำ: ลึก • Hand Intrinsics", getStatus('hand-motor'))}
        </g>

        <g class="svg-branch-node" data-name="Adductor Pollicis & FPB deep head" data-roots="C8, T1" data-desc="Adductor pollicis weakness causes Froment's sign (thumb IP flexes via FPL to compensate)." data-type="motor">
          ${this.renderNodeBox(530, 1110, 310, 48, "🥩 Adductor Pollicis (Froment Sign)", "สูตรจำ: ลึก • Froment Sign Test", getStatus('hand-motor'))}
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

if (typeof window !== 'undefined') {
  window.PeripheralTreeVisualizer = PeripheralTreeVisualizer;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PeripheralTreeVisualizer };
}

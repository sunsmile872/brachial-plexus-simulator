/**
 * Interactive SVG Renderer for Brachial Plexus Simulator
 * Faithfully maps the Geeky Medics / PM&R neuroanatomy topology:
 * Roots -> Trunks -> Divisions -> Cords -> Terminal Branches & Collaterals
 */

class PlexusSVGRenderer {
  constructor(containerId, onSelectElement) {
    this.container = document.getElementById(containerId);
    this.onSelectElement = onSelectElement;
    this.activeFilter = null; // 'C5', 'lateral-cord', etc.
    this.activeLesion = null;
    this.showLandmarks = true;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  setFilter(filterType, filterValue) {
    this.activeFilter = { type: filterType, value: filterValue };
    this.applyHighlighting();
  }

  clearFilter() {
    this.activeFilter = null;
    this.applyHighlighting();
  }

  setLesion(lesionId) {
    this.activeLesion = lesionId;
    this.renderLesionIndicator();
    this.applyHighlighting();
  }

  toggleLandmarks(show) {
    this.showLandmarks = show;
    const g = document.getElementById('svg-landmarks-group');
    if (g) {
      g.style.display = this.showLandmarks ? 'block' : 'none';
    }
  }

  render() {
    // Canvas dimensions: 1120 x 700
    const svgHTML = `
      <svg id="brachial-plexus-svg" viewBox="0 0 1140 700" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lesion-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="nerve-grad-normal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#34d399" />
          </linearGradient>

          <linearGradient id="nerve-grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#818cf8" />
          </linearGradient>

          <linearGradient id="nerve-grad-lesion" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f43f5e" />
            <stop offset="100%" stop-color="#fb7185" />
          </linearGradient>

          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
          </marker>
        </defs>

        <rect width="1140" height="700" fill="#071426" rx="14" />

        <!-- Anatomical Section Column Headers -->
        <g id="column-headers" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#94a3b8" letter-spacing="1.5">
          <text x="80" y="42" text-anchor="middle">ROOTS (5)</text>
          <text x="285" y="42" text-anchor="middle">TRUNKS (3)</text>
          <text x="480" y="42" text-anchor="middle">DIVISIONS (6)</text>
          <text x="685" y="42" text-anchor="middle">CORDS (3)</text>
          <text x="960" y="42" text-anchor="middle">TERMINAL BRANCHES (5)</text>
          
          <line x1="185" y1="30" x2="185" y2="650" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
          <line x1="385" y1="30" x2="385" y2="650" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
          <line x1="580" y1="30" x2="580" y2="650" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
          <line x1="785" y1="30" x2="785" y2="650" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
        </g>

        <!-- Anatomical Landmark Overlays -->
        <g id="svg-landmarks-group" style="display: ${this.showLandmarks ? 'block' : 'none'};">
          <!-- Interscalene Triangle (Roots) -->
          <rect x="45" y="58" width="130" height="585" rx="8" fill="rgba(13, 148, 136, 0.07)" stroke="rgba(13, 148, 136, 0.35)" stroke-dasharray="3,3" />
          <text x="110" y="630" text-anchor="middle" fill="#5eead4" font-size="10.5" font-weight="600">Interscalene Triangle</text>
          <text x="110" y="642" text-anchor="middle" fill="#64748b" font-size="9">Ant/Mid Scalenes • 1st Rib</text>

          <!-- Posterior Triangle (Trunks) -->
          <rect x="205" y="58" width="165" height="585" rx="8" fill="rgba(14, 165, 233, 0.05)" stroke="rgba(14, 165, 233, 0.3)" stroke-dasharray="3,3" />
          <text x="285" y="630" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="600">Posterior Triangle</text>
          <text x="285" y="642" text-anchor="middle" fill="#64748b" font-size="9">Erb's Point • Subclavian A.</text>

          <!-- Retroclavicular (Divisions) -->
          <rect x="400" y="58" width="165" height="585" rx="8" fill="rgba(245, 158, 11, 0.05)" stroke="rgba(245, 158, 11, 0.25)" stroke-dasharray="3,3" />
          <text x="480" y="630" text-anchor="middle" fill="#fbbf24" font-size="10.5" font-weight="600">Retroclavicular Space</text>
          <text x="480" y="642" text-anchor="middle" fill="#64748b" font-size="9">Behind Middle 1/3 Clavicle</text>

          <!-- Axilla / Pectoralis Minor (Cords) -->
          <rect x="595" y="58" width="175" height="585" rx="8" fill="rgba(168, 85, 247, 0.05)" stroke="rgba(168, 85, 247, 0.25)" stroke-dasharray="3,3" />
          <text x="682" y="630" text-anchor="middle" fill="#c084fc" font-size="10.5" font-weight="600">Axilla (Deep to Pec Minor)</text>
          <text x="682" y="642" text-anchor="middle" fill="#64748b" font-size="9">2nd Part Axillary Artery</text>
        </g>

        <!-- ================= NERVE PATHWAYS ================= -->
        <g id="nerve-paths-group" stroke-linecap="round" stroke-linejoin="round">
          
          <!-- ROOT C5 (y: 110) -->
          <path id="path-root-c5" class="nerve-segment" data-id="root-c5" data-roots="C5" data-level="root"
            d="M 65 110 L 175 110" stroke="#10b981" stroke-width="9" />
          
          <!-- ROOT C6 (y: 200) -->
          <path id="path-root-c6" class="nerve-segment" data-id="root-c6" data-roots="C6" data-level="root"
            d="M 65 200 L 175 200" stroke="#10b981" stroke-width="9" />

          <!-- ROOT C7 (y: 310) -->
          <path id="path-root-c7" class="nerve-segment" data-id="root-c7" data-roots="C7" data-level="root"
            d="M 65 310 L 220 310" stroke="#10b981" stroke-width="9" />

          <!-- ROOT C8 (y: 440) -->
          <path id="path-root-c8" class="nerve-segment" data-id="root-c8" data-roots="C8" data-level="root"
            d="M 65 440 L 175 440" stroke="#10b981" stroke-width="9" />

          <!-- ROOT T1 (y: 530) -->
          <path id="path-root-t1" class="nerve-segment" data-id="root-t1" data-roots="T1" data-level="root"
            d="M 65 530 L 175 530" stroke="#10b981" stroke-width="9" />

          <!-- ROOT UNIONS TO TRUNKS -->
          <!-- C5 to Superior Trunk -->
          <path id="path-c5-to-trunk" class="nerve-segment" data-id="trunk-upper" data-roots="C5"
            d="M 175 110 C 205 110, 215 155, 245 155" stroke="#10b981" stroke-width="8" fill="none" />
          <!-- C6 to Superior Trunk -->
          <path id="path-c6-to-trunk" class="nerve-segment" data-id="trunk-upper" data-roots="C6"
            d="M 175 200 C 205 200, 215 155, 245 155" stroke="#10b981" stroke-width="8" fill="none" />

          <!-- C8 to Inferior Trunk -->
          <path id="path-c8-to-trunk" class="nerve-segment" data-id="trunk-lower" data-roots="C8"
            d="M 175 440 C 205 440, 215 485, 245 485" stroke="#10b981" stroke-width="8" fill="none" />
          <!-- T1 to Inferior Trunk -->
          <path id="path-t1-to-trunk" class="nerve-segment" data-id="trunk-lower" data-roots="T1"
            d="M 175 530 C 205 530, 215 485, 245 485" stroke="#10b981" stroke-width="8" fill="none" />

          <!-- TRUNKS -->
          <!-- Superior Trunk (y: 155) -->
          <path id="path-trunk-upper" class="nerve-segment" data-id="trunk-upper" data-roots="C5,C6" data-level="trunk"
            d="M 245 155 L 365 155" stroke="#10b981" stroke-width="11" />
          <!-- Middle Trunk (y: 310) -->
          <path id="path-trunk-middle" class="nerve-segment" data-id="trunk-middle" data-roots="C7" data-level="trunk"
            d="M 220 310 L 365 310" stroke="#10b981" stroke-width="10" />
          <!-- Inferior Trunk (y: 485) -->
          <path id="path-trunk-lower" class="nerve-segment" data-id="trunk-lower" data-roots="C8,T1" data-level="trunk"
            d="M 245 485 L 365 485" stroke="#10b981" stroke-width="11" />

          <!-- DIVISIONS (6) -->
          <!-- Upper Trunk -> Anterior Division (to Lateral Cord, y: 155) -->
          <path id="path-div-upper-ant" class="nerve-segment" data-id="div-upper-ant" data-roots="C5,C6" data-division="anterior"
            d="M 365 155 L 565 155" stroke="#10b981" stroke-width="8" />

          <!-- Upper Trunk -> Posterior Division (crosses to Posterior Cord, y: 155 -> 310) -->
          <path id="path-div-upper-post" class="nerve-segment" data-id="div-upper-post" data-roots="C5,C6" data-division="posterior"
            d="M 365 155 C 440 155, 470 310, 565 310" stroke="#059669" stroke-dasharray="6,3" stroke-width="7" fill="none" />

          <!-- Middle Trunk -> Anterior Division (rises to Lateral Cord, y: 310 -> 155) -->
          <path id="path-div-mid-ant" class="nerve-segment" data-id="div-mid-ant" data-roots="C7" data-division="anterior"
            d="M 365 310 C 440 310, 480 155, 565 155" stroke="#10b981" stroke-width="7" fill="none" />

          <!-- Middle Trunk -> Posterior Division (straight to Posterior Cord, y: 310) -->
          <path id="path-div-mid-post" class="nerve-segment" data-id="div-mid-post" data-roots="C7" data-division="posterior"
            d="M 365 310 L 565 310" stroke="#059669" stroke-dasharray="6,3" stroke-width="7" />

          <!-- Lower Trunk -> Posterior Division (rises to Posterior Cord, y: 485 -> 310) -->
          <path id="path-div-lower-post" class="nerve-segment" data-id="div-lower-post" data-roots="C8,T1" data-division="posterior"
            d="M 365 485 C 440 485, 480 310, 565 310" stroke="#059669" stroke-dasharray="6,3" stroke-width="7" fill="none" />

          <!-- Lower Trunk -> Anterior Division (straight to Medial Cord, y: 485) -->
          <path id="path-div-lower-ant" class="nerve-segment" data-id="div-lower-ant" data-roots="C8,T1" data-division="anterior"
            d="M 365 485 L 565 485" stroke="#10b981" stroke-width="8" />

          <!-- CORDS (3) -->
          <!-- Lateral Cord (y: 155) -->
          <path id="path-cord-lateral" class="nerve-segment" data-id="cord-lateral" data-roots="C5,C6,C7" data-level="cord"
            d="M 565 155 L 755 155" stroke="#10b981" stroke-width="11" />

          <!-- Posterior Cord (y: 310) -->
          <path id="path-cord-posterior" class="nerve-segment" data-id="cord-posterior" data-roots="C5,C6,C7,C8,T1" data-level="cord"
            d="M 565 310 L 755 310" stroke="#10b981" stroke-width="13" />

          <!-- Medial Cord (y: 485) -->
          <path id="path-cord-medial" class="nerve-segment" data-id="cord-medial" data-roots="C8,T1" data-level="cord"
            d="M 565 485 L 755 485" stroke="#10b981" stroke-width="11" />

          <!-- ================= TERMINAL BRANCHES & THE 'M' SHAPE ================= -->
          
          <!-- MUSCULOCUTANEOUS NERVE (from Lateral Cord, continues straight out y: 155) -->
          <path id="path-term-musculocutaneous" class="nerve-segment" data-id="term-musculocutaneous" data-roots="C5,C6,C7" data-level="terminal"
            d="M 755 155 L 1020 155" stroke="#10b981" stroke-width="9" />

          <!-- LATERAL ROOT OF MEDIAN NERVE (dives down from Lateral Cord to form Median 'M', y: 155 -> 400) -->
          <path id="path-median-lat-root" class="nerve-segment" data-id="term-median" data-roots="C5,C6,C7"
            d="M 755 155 C 800 155, 820 400, 875 400" stroke="#fbbf24" stroke-width="8" fill="none" />

          <!-- MEDIAL ROOT OF MEDIAN NERVE (climbs up from Medial Cord to form Median 'M', y: 485 -> 400) -->
          <path id="path-median-med-root" class="nerve-segment" data-id="term-median" data-roots="C8,T1"
            d="M 755 485 C 800 485, 820 400, 875 400" stroke="#fbbf24" stroke-width="8" fill="none" />

          <!-- COMMON MEDIAN NERVE TRUNK (continues horizontally y: 400) -->
          <path id="path-term-median" class="nerve-segment" data-id="term-median" data-roots="C5,C6,C7,C8,T1" data-level="terminal"
            d="M 875 400 L 1020 400" stroke="#fbbf24" stroke-width="11" />

          <!-- ULNAR NERVE (continues straight out from Medial Cord, y: 485) -->
          <path id="path-term-ulnar" class="nerve-segment" data-id="term-ulnar" data-roots="C8,T1" data-level="terminal"
            d="M 755 485 L 1020 485" stroke="#10b981" stroke-width="9" />

          <!-- AXILLARY NERVE (branches upward from Posterior Cord, y: 310 -> 245) -->
          <path id="path-term-axillary" class="nerve-segment" data-id="term-axillary" data-roots="C5,C6" data-level="terminal"
            d="M 755 310 C 805 310, 840 245, 1020 245" stroke="#10b981" stroke-width="8" fill="none" />

          <!-- RADIAL NERVE (continues straight/slightly downward from Posterior Cord, y: 310 -> 310) -->
          <path id="path-term-radial" class="nerve-segment" data-id="term-radial" data-roots="C5,C6,C7,C8,T1" data-level="terminal"
            d="M 755 310 L 1020 310" stroke="#10b981" stroke-width="11" />

          <!-- ================= COLLATERAL EXTRA BRANCHES ================= -->

          <!-- 1. Dorsal Scapular Nerve (from C5 root, shoots upward) -->
          <path id="path-dorsal-scapular" class="nerve-segment branch-line" data-id="dorsal-scapular" data-roots="C5"
            d="M 105 110 C 105 75, 120 62, 165 62" stroke="#34d399" stroke-width="4.5" fill="none" />

          <!-- 2. Long Thoracic Nerve (roots C5, C6, C7 union, drops vertically down) -->
          <path id="path-long-thoracic-c5" class="nerve-segment branch-line" data-id="long-thoracic" data-roots="C5"
            d="M 145 110 L 145 590" stroke="#34d399" stroke-width="3.5" />
          <path id="path-long-thoracic-c6" class="nerve-segment branch-line" data-id="long-thoracic" data-roots="C6"
            d="M 145 200 L 145 310" stroke="#34d399" stroke-width="3.5" />
          <path id="path-long-thoracic-c7" class="nerve-segment branch-line" data-id="long-thoracic" data-roots="C7"
            d="M 145 310 L 145 590" stroke="#34d399" stroke-width="4.5" />

          <!-- 3. First Intercostal / T1 branch -->
          <path id="path-intercostal-t1" class="nerve-segment branch-line" data-id="intercostal-t1" data-roots="T1"
            d="M 100 530 C 100 565, 110 578, 140 578" stroke="#34d399" stroke-width="3.5" fill="none" />

          <!-- 4. Suprascapular Nerve (from Upper Trunk, shoots upward) -->
          <path id="path-suprascapular" class="nerve-segment branch-line" data-id="suprascapular" data-roots="C5,C6"
            d="M 275 155 C 275 95, 290 85, 345 85" stroke="#34d399" stroke-width="4.5" fill="none" />

          <!-- 5. Nerve to Subclavius (from Upper Trunk, shoots upward) -->
          <path id="path-subclavius" class="nerve-segment branch-line" data-id="subclavius" data-roots="C5,C6"
            d="M 305 155 C 305 120, 315 115, 360 115" stroke="#34d399" stroke-width="4" fill="none" />

          <!-- 6. Lateral Pectoral Nerve (from Lateral Cord, shoots downward) -->
          <path id="path-lateral-pectoral" class="nerve-segment branch-line" data-id="lateral-pectoral" data-roots="C5,C6,C7"
            d="M 625 155 C 625 210, 640 220, 695 220" stroke="#34d399" stroke-width="4" fill="none" />

          <!-- 7. Upper Subscapular Nerve (from Posterior Cord, shoots downward) -->
          <path id="path-upper-subscapular" class="nerve-segment branch-line" data-id="upper-subscapular" data-roots="C5,C6"
            d="M 610 310 C 610 355, 620 365, 665 365" stroke="#34d399" stroke-width="4" fill="none" />

          <!-- 8. Thoracodorsal Nerve (from Posterior Cord, shoots downward) -->
          <path id="path-thoracodorsal" class="nerve-segment branch-line" data-id="thoracodorsal" data-roots="C6,C7,C8"
            d="M 660 310 C 660 410, 675 420, 725 420" stroke="#34d399" stroke-width="4.5" fill="none" />

          <!-- 9. Lower Subscapular Nerve (from Posterior Cord, shoots downward) -->
          <path id="path-lower-subscapular" class="nerve-segment branch-line" data-id="lower-subscapular" data-roots="C5,C6"
            d="M 710 310 C 710 375, 720 380, 770 380" stroke="#34d399" stroke-width="4" fill="none" />

          <!-- 10. Medial Pectoral Nerve (from Medial Cord, shoots downward) -->
          <path id="path-medial-pectoral" class="nerve-segment branch-line" data-id="medial-pectoral" data-roots="C8,T1"
            d="M 605 485 C 605 550, 615 560, 670 560" stroke="#34d399" stroke-width="4" fill="none" />

          <!-- 11. Medial Cutaneous Nerve of Arm (from Medial Cord, shoots downward) -->
          <path id="path-med-cut-arm" class="nerve-segment branch-line" data-id="med-cut-arm" data-roots="T1"
            d="M 655 485 C 655 600, 665 610, 720 610" stroke="#34d399" stroke-width="4" fill="none" />

          <!-- 12. Medial Cutaneous Nerve of Forearm - MABC (from Medial Cord, shoots downward) -->
          <path id="path-med-cut-forearm" class="nerve-segment branch-line" data-id="med-cut-forearm" data-roots="C8,T1"
            d="M 705 485 C 705 545, 720 555, 785 555" stroke="#34d399" stroke-width="4.5" fill="none" />

        </g>

        <!-- ================= CLICKABLE NODES & LABELS ================= -->
        <g id="nerve-labels-group" font-family="system-ui, -apple-system, sans-serif">
          
          <!-- ROOT LABELS (Big Bold) -->
          <g class="interactive-node" data-id="root-c5" transform="translate(35, 110)">
            <circle cx="0" cy="0" r="18" fill="#0d9488" stroke="#5eead4" stroke-width="2.5" />
            <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">C5</text>
          </g>
          <g class="interactive-node" data-id="root-c6" transform="translate(35, 200)">
            <circle cx="0" cy="0" r="18" fill="#0d9488" stroke="#5eead4" stroke-width="2.5" />
            <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">C6</text>
          </g>
          <g class="interactive-node" data-id="root-c7" transform="translate(35, 310)">
            <circle cx="0" cy="0" r="18" fill="#0d9488" stroke="#5eead4" stroke-width="2.5" />
            <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">C7</text>
          </g>
          <g class="interactive-node" data-id="root-c8" transform="translate(35, 440)">
            <circle cx="0" cy="0" r="18" fill="#0d9488" stroke="#5eead4" stroke-width="2.5" />
            <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">C8</text>
          </g>
          <g class="interactive-node" data-id="root-t1" transform="translate(35, 530)">
            <circle cx="0" cy="0" r="18" fill="#0d9488" stroke="#5eead4" stroke-width="2.5" />
            <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">T1</text>
          </g>

          <!-- COLLATERAL LABELS: ROOTS -->
          <g class="interactive-node branch-tag" data-id="dorsal-scapular" transform="translate(170, 56)">
            <rect x="0" y="-12" width="130" height="28" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1.2" />
            <text x="65" y="1" text-anchor="middle" fill="#5eead4" font-size="9.5" font-weight="700">Dorsal Scapular (C5)</text>
            <text x="65" y="11" text-anchor="middle" fill="#94a3b8" font-size="8">Rhomboids • Lev. Scapulae</text>
          </g>

          <g class="interactive-node branch-tag" data-id="long-thoracic" transform="translate(145, 608)">
            <rect x="-65" y="-12" width="130" height="30" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1.2" />
            <text x="0" y="1" text-anchor="middle" fill="#5eead4" font-size="9.5" font-weight="700">Long Thoracic (C5-C7)</text>
            <text x="0" y="12" text-anchor="middle" fill="#94a3b8" font-size="8">Serratus Anterior (Winging)</text>
          </g>

          <!-- TRUNK LABELS -->
          <g class="interactive-node" data-id="trunk-upper" transform="translate(305, 175)">
            <text x="0" y="0" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="800">SUPERIOR TRUNK</text>
            <text x="0" y="11" text-anchor="middle" fill="#94a3b8" font-size="9">C5, C6 (Erb's Point)</text>
          </g>
          <g class="interactive-node" data-id="trunk-middle" transform="translate(290, 328)">
            <text x="0" y="0" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="800">MIDDLE TRUNK</text>
            <text x="0" y="11" text-anchor="middle" fill="#94a3b8" font-size="9">C7 (Pure Continuation)</text>
          </g>
          <g class="interactive-node" data-id="trunk-lower" transform="translate(305, 505)">
            <text x="0" y="0" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="800">INFERIOR TRUNK</text>
            <text x="0" y="11" text-anchor="middle" fill="#94a3b8" font-size="9">C8, T1 (Over 1st Rib)</text>
          </g>

          <!-- COLLATERAL LABELS: TRUNKS -->
          <g class="interactive-node branch-tag" data-id="suprascapular" transform="translate(350, 78)">
            <rect x="0" y="-12" width="135" height="28" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1.2" />
            <text x="67" y="1" text-anchor="middle" fill="#5eead4" font-size="9.5" font-weight="700">Suprascapular (C5/C6)</text>
            <text x="67" y="11" text-anchor="middle" fill="#94a3b8" font-size="8">Supraspinatus • Infraspinatus</text>
          </g>
          <g class="interactive-node branch-tag" data-id="subclavius" transform="translate(365, 110)">
            <rect x="0" y="-10" width="110" height="22" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1" />
            <text x="55" y="4" text-anchor="middle" fill="#5eead4" font-size="9" font-weight="700">N. to Subclavius (C5/6)</text>
          </g>

          <!-- DIVISION LABELS -->
          <g font-size="9" font-weight="700" fill="#64748b">
            <text x="425" y="145">ANTERIOR</text>
            <text x="450" y="190" fill="#10b981">POSTERIOR</text>
            <text x="425" y="295">POSTERIOR</text>
            <text x="445" y="260" fill="#38bdf8">ANTERIOR</text>
            <text x="425" y="475">ANTERIOR</text>
            <text x="445" y="420" fill="#10b981">POSTERIOR</text>
          </g>

          <!-- CORD LABELS -->
          <g class="interactive-node" data-id="cord-lateral" transform="translate(650, 142)">
            <text x="0" y="0" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="800">LATERAL CORD</text>
            <text x="0" y="10" text-anchor="middle" fill="#94a3b8" font-size="9">C5, C6, C7</text>
          </g>
          <g class="interactive-node" data-id="cord-posterior" transform="translate(660, 298)">
            <text x="0" y="0" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="800">POSTERIOR CORD</text>
            <text x="0" y="10" text-anchor="middle" fill="#94a3b8" font-size="9">C5, C6, C7, C8, T1</text>
          </g>
          <g class="interactive-node" data-id="cord-medial" transform="translate(650, 472)">
            <text x="0" y="0" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="800">MEDIAL CORD</text>
            <text x="0" y="10" text-anchor="middle" fill="#94a3b8" font-size="9">C8, T1</text>
          </g>

          <!-- COLLATERAL LABELS: CORDS -->
          <!-- Lateral Cord: Lateral Pectoral -->
          <g class="interactive-node branch-tag" data-id="lateral-pectoral" transform="translate(700, 215)">
            <rect x="0" y="-10" width="125" height="26" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1.2" />
            <text x="62" y="2" text-anchor="middle" fill="#5eead4" font-size="9" font-weight="700">Lateral Pectoral (C5-7)</text>
            <text x="62" y="11" text-anchor="middle" fill="#94a3b8" font-size="8">Pectoralis Major (Clavicular)</text>
          </g>

          <!-- Posterior Cord Collaterals: Upper Subscapular, Thoracodorsal, Lower Subscapular -->
          <g class="interactive-node branch-tag" data-id="upper-subscapular" transform="translate(668, 360)">
            <rect x="0" y="-10" width="115" height="24" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1" />
            <text x="57" y="2" text-anchor="middle" fill="#5eead4" font-size="8.5" font-weight="700">Upper Subscapular</text>
            <text x="57" y="10" text-anchor="middle" fill="#94a3b8" font-size="7.5">Subscapularis C5/6</text>
          </g>
          <g class="interactive-node branch-tag" data-id="thoracodorsal" transform="translate(730, 415)">
            <rect x="0" y="-11" width="120" height="26" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1.2" />
            <text x="60" y="2" text-anchor="middle" fill="#5eead4" font-size="9" font-weight="700">Thoracodorsal (C6-8)</text>
            <text x="60" y="11" text-anchor="middle" fill="#94a3b8" font-size="8">Latissimus Dorsi</text>
          </g>
          <g class="interactive-node branch-tag" data-id="lower-subscapular" transform="translate(775, 375)">
            <rect x="0" y="-10" width="120" height="24" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1" />
            <text x="60" y="2" text-anchor="middle" fill="#5eead4" font-size="8.5" font-weight="700">Lower Subscapular</text>
            <text x="60" y="10" text-anchor="middle" fill="#94a3b8" font-size="7.5">Teres Major • Subscap.</text>
          </g>

          <!-- Medial Cord Collaterals: Medial Pectoral, Med Cut Arm, Med Cut Forearm (MABC) -->
          <g class="interactive-node branch-tag" data-id="medial-pectoral" transform="translate(675, 555)">
            <rect x="0" y="-10" width="125" height="26" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1" />
            <text x="62" y="2" text-anchor="middle" fill="#5eead4" font-size="9" font-weight="700">Medial Pectoral (C8/T1)</text>
            <text x="62" y="11" text-anchor="middle" fill="#94a3b8" font-size="8">Pec Minor & Sternal Major</text>
          </g>
          <g class="interactive-node branch-tag" data-id="med-cut-arm" transform="translate(725, 605)">
            <rect x="0" y="-9" width="115" height="22" rx="4" fill="#062326" stroke="#2dd4bf" stroke-width="1" />
            <text x="57" y="5" text-anchor="middle" fill="#5eead4" font-size="8.5" font-weight="700">Med Cut Arm (T1)</text>
          </g>
          <g class="interactive-node branch-tag" data-id="med-cut-forearm" transform="translate(790, 550)">
            <rect x="0" y="-11" width="145" height="28" rx="4" fill="#062326" stroke="#38bdf8" stroke-width="1.8" />
            <text x="72" y="2" text-anchor="middle" fill="#38bdf8" font-size="9.5" font-weight="800">MABC Sensory (C8/T1)</text>
            <text x="72" y="12" text-anchor="middle" fill="#f59e0b" font-size="8.5" font-weight="700">⭐ Key True TOS Landmark</text>
          </g>

          <!-- TERMINAL BRANCH LABELS -->
          <!-- Musculocutaneous -->
          <g class="interactive-node terminal-node" data-id="term-musculocutaneous" transform="translate(1030, 155)">
            <rect x="0" y="-16" width="180" height="32" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="2" />
            <text x="90" y="-1" text-anchor="middle" fill="#e0f2fe" font-size="11.5" font-weight="800">MUSCULOCUTANEOUS</text>
            <text x="90" y="11" text-anchor="middle" fill="#7dd3fc" font-size="9.5">C5, C6, C7 • Biceps • LAC</text>
          </g>

          <!-- Axillary -->
          <g class="interactive-node terminal-node" data-id="term-axillary" transform="translate(1030, 245)">
            <rect x="0" y="-16" width="180" height="32" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="2" />
            <text x="90" y="-1" text-anchor="middle" fill="#e0f2fe" font-size="11.5" font-weight="800">AXILLARY NERVE</text>
            <text x="90" y="11" text-anchor="middle" fill="#7dd3fc" font-size="9.5">C5, C6 • Deltoid • Quadrangular</text>
          </g>

          <!-- Radial -->
          <g class="interactive-node terminal-node" data-id="term-radial" transform="translate(1030, 310)">
            <rect x="0" y="-16" width="180" height="32" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="2" />
            <text x="90" y="-1" text-anchor="middle" fill="#e0f2fe" font-size="11.5" font-weight="800">RADIAL NERVE</text>
            <text x="90" y="11" text-anchor="middle" fill="#7dd3fc" font-size="9.5">C5-T1 • Extensors • Triceps</text>
          </g>

          <!-- Median ('M' junction) -->
          <g class="interactive-node terminal-node" data-id="term-median" transform="translate(1030, 400)">
            <rect x="0" y="-18" width="180" height="36" rx="6" fill="#3f2b05" stroke="#f59e0b" stroke-width="2.5" />
            <text x="90" y="-2" text-anchor="middle" fill="#fef3c7" font-size="12.5" font-weight="900">MEDIAN NERVE</text>
            <text x="90" y="12" text-anchor="middle" fill="#fbbf24" font-size="9.5" font-weight="700">C5-T1 • "M" Shape • APB/PT</text>
          </g>

          <!-- Ulnar -->
          <g class="interactive-node terminal-node" data-id="term-ulnar" transform="translate(1030, 485)">
            <rect x="0" y="-16" width="180" height="32" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="2" />
            <text x="90" y="-1" text-anchor="middle" fill="#e0f2fe" font-size="11.5" font-weight="800">ULNAR NERVE</text>
            <text x="90" y="11" text-anchor="middle" fill="#7dd3fc" font-size="9.5">C8, T1 • Intrinsics • FCU/ADM</text>
          </g>

        </g>

        <!-- Lesion Marker Group (Dynamic) -->
        <g id="svg-lesion-overlay"></g>

      </svg>
    `;

    this.container.innerHTML = svgHTML;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const nodes = this.container.querySelectorAll('.interactive-node, .nerve-segment');
    nodes.forEach(node => {
      node.style.cursor = 'pointer';
      node.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = node.getAttribute('data-id');
        if (id && this.onSelectElement) {
          this.onSelectElement(id);
        }
      });
      node.addEventListener('mouseenter', () => {
        this.highlightHovered(node);
      });
      node.addEventListener('mouseleave', () => {
        this.clearHoverHighlight();
      });
    });
  }

  highlightHovered(element) {
    const id = element.getAttribute('data-id');
    const roots = element.getAttribute('data-roots');
    const matched = this.container.querySelectorAll(`[data-id="${id}"]`);
    matched.forEach(el => {
      el.style.filter = 'url(#glow-effect)';
      el.style.stroke = '#38bdf8';
    });
  }

  clearHoverHighlight() {
    this.applyHighlighting();
  }

  applyHighlighting() {
    const allSegments = this.container.querySelectorAll('.nerve-segment');
    allSegments.forEach(el => {
      el.style.filter = '';
      el.style.opacity = '1';
      // restore default color
      const id = el.getAttribute('data-id');
      if (id === 'term-median' || el.id === 'path-median-lat-root' || el.id === 'path-median-med-root') {
        el.style.stroke = '#fbbf24';
      } else if (el.classList.contains('branch-line')) {
        el.style.stroke = '#34d399';
      } else if (el.getAttribute('data-division') === 'posterior') {
        el.style.stroke = '#059669';
      } else {
        el.style.stroke = '#10b981';
      }
    });

    if (!this.activeFilter && !this.activeLesion) return;

    if (this.activeFilter) {
      const { type, value } = this.activeFilter;
      allSegments.forEach(el => {
        let isMatch = false;
        if (type === 'root') {
          const roots = (el.getAttribute('data-roots') || '').split(',');
          if (roots.includes(value)) isMatch = true;
        } else if (type === 'segment') {
          if (el.getAttribute('data-id') === value) isMatch = true;
        }

        if (isMatch) {
          el.style.stroke = '#38bdf8';
          el.style.filter = 'url(#glow-effect)';
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0.22';
        }
      });
    }

    if (this.activeLesion) {
      this.renderLesionIndicator();
    }
  }

  renderLesionIndicator() {
    const g = document.getElementById('svg-lesion-overlay');
    if (!g) return;
    g.innerHTML = '';

    if (!this.activeLesion) return;

    let coords = { x: 305, y: 155, label: 'Lesion Site' }; // default upper trunk
    let affectedRoots = [];

    switch (this.activeLesion) {
      case 'upper-trunk':
        coords = { x: 305, y: 155, label: 'Upper Trunk Lesion (Erb-Duchenne)' };
        affectedRoots = ['C5', 'C6'];
        break;
      case 'lower-trunk':
      case 'neurogenic-tos':
        coords = { x: 305, y: 485, label: 'Lower Trunk Lesion (Klumpke / True TOS)' };
        affectedRoots = ['C8', 'T1'];
        break;
      case 'posterior-cord':
        coords = { x: 660, y: 310, label: 'Posterior Cord Lesion' };
        affectedRoots = ['C5', 'C6', 'C7', 'C8', 'T1'];
        break;
      case 'lateral-cord':
        coords = { x: 650, y: 155, label: 'Lateral Cord Lesion' };
        affectedRoots = ['C5', 'C6', 'C7'];
        break;
      case 'medial-cord':
        coords = { x: 650, y: 485, label: 'Medial Cord Lesion' };
        affectedRoots = ['C8', 'T1'];
        break;
      case 'preganglionic-avulsion':
        coords = { x: 65, y: 110, label: 'Root Avulsion (Pre-ganglionic)' };
        affectedRoots = ['C5', 'C6', 'C7', 'C8', 'T1'];
        break;
    }

    // Draw animated lesion pulse circle & cross
    g.innerHTML = `
      <!-- Lesion Marker Pin -->
      <circle cx="${coords.x}" cy="${coords.y}" r="24" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" stroke-width="2.5" filter="url(#lesion-glow)">
        <animate attributeName="r" values="16;28;16" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="${coords.x}" cy="${coords.y}" r="8" fill="#f43f5e" stroke="#ffffff" stroke-width="2" />
      
      <!-- Lesion Callout Banner -->
      <g transform="translate(${coords.x}, ${coords.y - 36})">
        <rect x="-110" y="-14" width="220" height="28" rx="6" fill="#e11d48" stroke="#ffe4e6" stroke-width="1.5" />
        <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800" font-family="system-ui">⚠️ ${coords.label}</text>
      </g>
    `;
  }
}

if (typeof window !== 'undefined') {
  window.PlexusSVGRenderer = PlexusSVGRenderer;
}

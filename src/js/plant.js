/**
 * Crownwork — SVG plant viewport with pan/zoom, anatomy labels, focusable cut markers.
 * Cream-paper palette: wood browns + teal #0B8A8F (not dark void blues).
 */
(function (global) {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const VIEW_W = 400;
  const VIEW_H = 360;

  const C = {
    soil: '#C4B5A0',
    wood: '#6B5344',
    woodMid: '#8A6F5C',
    woodLight: '#A08B78',
    teal: '#0B8A8F',
    tealSoft: '#0D9FA5',
    tealDim: '#086F73',
    cut: '#B86A3C',
    mute: '#7A7368',
    ink: '#1C1916',
    paper: '#FAF7F1',
    foliage: '#0B8A8F',
    dash: '#A89888',
  };

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (attrs[k] !== undefined && attrs[k] !== null) {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function soil(g, rx) {
    el('ellipse', {
      cx: 200, cy: 332, rx: rx || 92, ry: 13,
      fill: C.soil, opacity: '0.55',
    }, g);
    el('ellipse', {
      cx: 200, cy: 328, rx: (rx || 92) - 18, ry: 7,
      fill: C.wood, opacity: '0.12',
    }, g);
  }

  function limb(g, d, width, color, opacity) {
    el('path', {
      d,
      stroke: color || C.wood,
      'stroke-width': String(width),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      fill: 'none',
      opacity: String(opacity != null ? opacity : 0.92),
    }, g);
  }

  function foliage(g, spots) {
    spots.forEach(([cx, cy, r]) => {
      el('circle', {
        cx, cy, r,
        fill: C.foliage,
        opacity: '0.10',
      }, g);
    });
  }

  /** Central-leader apple-style tree with richer scaffolding */
  function drawTree(g) {
    soil(g, 95);
    // Trunk (wood brown + teal highlight)
    limb(g, 'M189 322 C191 270 193 210 197 125 C198 100 199 78 200 55', 11, C.wood, 0.95);
    limb(g, 'M200 55 C201 78 202 100 203 125 C207 210 209 270 211 322', 6, C.teal, 0.45);
    // Lower scaffolds
    limb(g, 'M197 128 C155 122 125 138 98 168', 5.5, C.woodMid);
    limb(g, 'M203 142 C245 136 278 152 305 178', 5.5, C.woodMid);
    limb(g, 'M198 182 C150 192 122 220 108 252', 4.5, C.wood);
    limb(g, 'M202 198 C250 208 282 230 308 258', 4.5, C.wood);
    // Upper scaffolds / laterals
    limb(g, 'M200 92 C168 86 148 92 130 108', 3.8, C.woodLight);
    limb(g, 'M200 102 C232 96 258 105 278 124', 3.8, C.woodLight);
    // Secondary laterals
    limb(g, 'M120 155 C105 150 95 152 88 160', 2.5, C.teal, 0.7);
    limb(g, 'M280 160 C295 155 305 158 312 168', 2.5, C.teal, 0.7);
    limb(g, 'M130 230 C118 240 112 255 110 268', 2.4, C.woodLight, 0.8);
    limb(g, 'M290 240 C302 248 308 262 310 275', 2.4, C.woodLight, 0.8);
    // Spur suggestions
    [[150, 208], [158, 218], [145, 225], [250, 215], [258, 225]].forEach(([x, y]) => {
      limb(g, `M${x} ${y} L${x + 6} ${y - 8}`, 1.6, C.tealDim, 0.75);
    });
    foliage(g, [
      [98, 165, 30], [305, 175, 28], [108, 248, 24], [308, 255, 26],
      [130, 105, 20], [278, 120, 22], [200, 52, 32], [160, 200, 16], [250, 210, 16],
    ]);
    // Crossing hint
    el('path', {
      d: 'M152 172 C172 158 184 172 196 188',
      stroke: C.dash,
      'stroke-width': '2.4',
      'stroke-dasharray': '4 3',
      fill: 'none',
      opacity: '0.55',
    }, g);
    // Watersprout
    limb(g, 'M206 278 C209 258 211 245 209 228', 3, C.cut, 0.8);
  }

  /** Open-center peach vase */
  function drawTreeOpen(g) {
    soil(g, 100);
    // Short trunk
    limb(g, 'M192 322 C194 290 196 265 200 235', 12, C.wood, 0.95);
    limb(g, 'M200 235 C204 265 206 290 208 322', 6, C.teal, 0.4);
    // Vase scaffolds (3–4 arms)
    limb(g, 'M198 235 C160 210 120 170 95 125', 6, C.woodMid);
    limb(g, 'M202 235 C240 210 280 170 305 128', 6, C.woodMid);
    limb(g, 'M200 238 C175 250 145 270 125 295', 5, C.wood);
    limb(g, 'M200 238 C225 250 255 270 278 295', 5, C.wood);
    // Fruiting one-year wood (finer)
    limb(g, 'M110 145 C100 120 105 100 115 85', 3, C.woodLight);
    limb(g, 'M145 155 C140 125 150 100 160 82', 3.2, C.teal, 0.75);
    limb(g, 'M255 155 C260 125 250 100 242 82', 3.2, C.teal, 0.75);
    limb(g, 'M290 148 C300 125 298 105 288 88', 3, C.woodLight);
    limb(g, 'M130 200 C115 190 100 185 90 178', 2.5, C.woodLight, 0.85);
    limb(g, 'M270 200 C285 190 300 185 310 178', 2.5, C.woodLight, 0.85);
    // Crossing in bowl
    el('path', {
      d: 'M160 130 C180 115 210 125 235 118',
      stroke: C.dash,
      'stroke-width': '2.2',
      'stroke-dasharray': '4 3',
      fill: 'none',
      opacity: '0.5',
    }, g);
    foliage(g, [
      [100, 120, 26], [305, 125, 26], [150, 90, 22], [250, 90, 22],
      [125, 290, 18], [278, 290, 18], [200, 200, 36],
    ]);
    // Watersprout in center
    limb(g, 'M205 250 C208 230 210 215 208 200', 3, C.cut, 0.8);
  }

  /** Upright pear with spur accents */
  function drawTreeUpright(g) {
    soil(g, 88);
    // Tall narrow trunk
    limb(g, 'M192 322 C194 260 196 190 198 110 C199 85 200 65 200 48', 10, C.wood, 0.95);
    limb(g, 'M200 48 C201 65 202 85 203 110 C205 190 207 260 208 322', 5, C.teal, 0.42);
    // Steep scaffolds
    limb(g, 'M198 120 C170 115 150 125 135 150', 4.5, C.woodMid);
    limb(g, 'M202 135 C235 128 255 140 268 165', 4.5, C.woodMid);
    limb(g, 'M199 175 C165 180 145 200 132 230', 4, C.wood);
    limb(g, 'M201 190 C235 195 255 215 270 245', 4, C.wood);
    limb(g, 'M200 85 C178 80 165 85 152 98', 3.2, C.woodLight);
    limb(g, 'M200 95 C222 90 240 96 255 110', 3.2, C.woodLight);
    // Extra upright competitor
    limb(g, 'M205 145 C212 125 218 110 222 95', 3.5, C.cut, 0.65);
    // Spur clusters
    [[140, 195], [148, 205], [138, 212], [250, 200], [258, 210], [160, 155], [245, 160]].forEach(([x, y]) => {
      limb(g, `M${x} ${y} L${x + 5} ${y - 7}`, 1.5, C.tealDim, 0.8);
      limb(g, `M${x} ${y} L${x - 4} ${y - 6}`, 1.3, C.teal, 0.55);
    });
    foliage(g, [
      [135, 148, 22], [268, 162, 22], [132, 228, 20], [270, 242, 20],
      [152, 95, 16], [255, 108, 16], [200, 45, 28],
    ]);
    el('path', {
      d: 'M155 170 C175 155 185 170 195 185',
      stroke: C.dash,
      'stroke-width': '2.2',
      'stroke-dasharray': '4 3',
      fill: 'none',
      opacity: '0.5',
    }, g);
    limb(g, 'M204 275 C207 255 209 242 207 228', 3, C.cut, 0.8);
  }

  function drawBerry(g) {
    soil(g, 82);
    const canes = [
      [160, 320, 128, 78],
      [180, 320, 168, 58],
      [200, 320, 200, 48],
      [220, 320, 242, 68],
      [240, 320, 282, 98],
    ];
    canes.forEach(([x1, y1, x2, y2], i) => {
      limb(
        g,
        `M${x1} ${y1} Q${(x1 + x2) / 2 + (i - 2) * 8} ${(y1 + y2) / 2} ${x2} ${y2}`,
        i === 0 ? 5 : 3.5,
        i === 0 ? C.woodLight : (i % 2 ? C.wood : C.teal),
        i === 0 ? 0.55 : 0.88
      );
      limb(
        g,
        `M${x2} ${y2 + 40} L${x2 + (i < 2 ? -25 : 25)} ${y2 + 20}`,
        2,
        C.teal,
        0.65
      );
    });
    foliage(g, [[128, 78, 14], [168, 58, 14], [200, 48, 16], [242, 68, 14], [282, 98, 14]]);
  }

  function drawVine(g) {
    soil(g, 52);
    limb(g, 'M200 320 L200 200', 8, C.wood);
    el('line', {
      x1: 60, y1: 160, x2: 340, y2: 160,
      stroke: C.dash,
      'stroke-width': '2',
      'stroke-dasharray': '6 4',
      opacity: '0.7',
    }, g);
    limb(g, 'M200 200 L200 160 M200 160 L80 155 M200 160 L320 155', 5, C.woodMid);
    [[100, 155, 95, 100], [140, 156, 145, 110], [180, 158, 175, 105],
     [240, 158, 250, 100], [280, 156, 290, 115], [310, 155, 320, 130]].forEach(([x1, y1, x2, y2], i) => {
      limb(g, `M${x1} ${y1} L${x2} ${y2}`, 2.5, i % 2 ? C.wood : C.teal, 0.85);
    });
    limb(g, 'M205 290 L220 250', 2.5, C.cut, 0.8);
  }

  function drawOther(g) {
    soil(g, 88);
    [[170, 320, 150, 90], [200, 320, 200, 55], [230, 320, 260, 95]].forEach(([x1, y1, x2, y2], i) => {
      limb(
        g,
        `M${x1} ${y1} Q${(x1 + x2) / 2} ${y1 - 80} ${x2} ${y2}`,
        6,
        i === 1 ? C.wood : C.woodMid,
        0.88
      );
    });
    foliage(g, [[150, 90, 40], [200, 55, 48], [260, 95, 36]]);
    limb(g, 'M175 180 L120 150 M225 170 L290 145 M200 120 L160 100 M200 130 L250 110', 3, C.teal, 0.7);
  }

  const DIAGRAMS = {
    tree: drawTree,
    'tree-open': drawTreeOpen,
    'tree-upright': drawTreeUpright,
    berry: drawBerry,
    vine: drawVine,
    other: drawOther,
  };

  const KIND_COLORS = {
    heading: C.teal,
    thinning: C.tealDim,
    renewal: C.tealSoft,
    sucker: C.cut,
    deadwood: C.mute,
    structural: C.woodMid,
  };

  /**
   * @param {HTMLElement} host
   * @param {{ onSelect?: (cut: object|null) => void }} options
   */
  function createPlantView(host, options) {
    const opts = options || {};
    let onSelect = typeof opts.onSelect === 'function' ? opts.onSelect : function () {};
    let plant = null;
    let selectedId = null;
    let anatomyVisible = true;

    let scale = 1;
    let tx = 0;
    let ty = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let pointers = new Map();
    let pinchStartDist = 0;
    let pinchStartScale = 1;

    host.innerHTML = '';
    host.classList.add('touch-none');

    const svg = el('svg', {
      viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
      class: 'w-full h-full',
      role: 'img',
      'aria-label': 'Interactive plant diagram with pruning cut markers',
    }, host);
    svg.style.cursor = 'grab';
    svg.style.userSelect = 'none';
    svg.style.touchAction = 'none';

    const root = el('g', { class: 'cw-root' }, svg);
    const world = el('g', { class: 'cw-world' }, root);
    const plantLayer = el('g', { class: 'cw-plant' }, world);
    const anatomyLayer = el('g', { class: 'cw-anatomy' }, world);
    const marksLayer = el('g', { class: 'cw-marks' }, world);

    function applyTransform() {
      world.setAttribute('transform', `translate(${tx} ${ty}) scale(${scale})`);
    }

    function clampScale(s) {
      return Math.min(4, Math.max(0.5, s));
    }

    function zoomAt(clientX, clientY, nextScale) {
      const rect = svg.getBoundingClientRect();
      const mx = ((clientX - rect.left) / rect.width) * VIEW_W;
      const my = ((clientY - rect.top) / rect.height) * VIEW_H;
      const s2 = clampScale(nextScale);
      const k = s2 / scale;
      tx = mx - k * (mx - tx);
      ty = my - k * (my - ty);
      scale = s2;
      applyTransform();
    }

    function clearLayer(layer) {
      while (layer.firstChild) layer.removeChild(layer.firstChild);
    }

    function renderAnatomy() {
      clearLayer(anatomyLayer);
      anatomyLayer.setAttribute('display', anatomyVisible ? 'inline' : 'none');
      if (!anatomyVisible || !plant || !plant.anatomyLabels) return;
      plant.anatomyLabels.forEach((item) => {
        const g = el('g', {
          class: 'cw-anatomy-item pointer-events-none',
          transform: `translate(${item.x} ${item.y})`,
        }, anatomyLayer);
        el('circle', {
          r: '3',
          fill: C.teal,
          opacity: '0.7',
        }, g);
        const labelBg = el('rect', {
          x: '6',
          y: '-8',
          rx: '3',
          ry: '3',
          fill: C.paper,
          stroke: C.dash,
          'stroke-width': '1',
          opacity: '0.92',
        }, g);
        const text = el('text', {
          x: '10',
          y: '3',
          fill: C.ink,
          'font-size': '9',
          'font-family': 'Inter, system-ui, sans-serif',
          'font-weight': '500',
        }, g);
        text.textContent = item.label;
        try {
          const bbox = text.getBBox();
          labelBg.setAttribute('width', String(bbox.width + 8));
          labelBg.setAttribute('height', String(bbox.height + 4));
          labelBg.setAttribute('y', String(-bbox.height + 2));
        } catch (_) {
          labelBg.setAttribute('width', String(Math.max(28, item.label.length * 5.5 + 8)));
          labelBg.setAttribute('height', '14');
        }
      });
    }

    function renderMarks() {
      clearLayer(marksLayer);
      if (!plant || !plant.cuts) return;
      plant.cuts.forEach((cut) => {
        const color = KIND_COLORS[cut.kind] || C.cut;
        const g = el('g', {
          class: 'cw-mark',
          transform: `translate(${cut.x} ${cut.y})`,
        }, marksLayer);

        el('circle', { r: '14', fill: 'transparent', class: 'cw-mark-hit' }, g);

        const ring = el('circle', {
          r: '9',
          fill: color,
          opacity: '0.22',
          class: 'cw-mark-ring',
        }, g);

        el('circle', {
          r: '5',
          fill: color,
          stroke: C.paper,
          'stroke-width': '1.5',
          class: 'cw-mark-dot',
        }, g);

        const btn = el('circle', {
          r: '11',
          fill: 'transparent',
          stroke: selectedId === cut.id ? C.ink : 'transparent',
          'stroke-width': selectedId === cut.id ? '2' : '0',
          tabindex: '0',
          role: 'button',
          'aria-label': cut.label,
          'data-cut-id': cut.id,
          class: 'cw-mark-btn focus:outline-none',
        }, g);

        if (selectedId === cut.id) {
          ring.setAttribute('r', '12');
          ring.setAttribute('opacity', '0.4');
          try {
            ring.classList.add('animate-pulse-cut');
          } catch (_) { /* ok */ }
        }

        function select() {
          selectedId = cut.id;
          renderMarks();
          onSelect(cut);
          const next = marksLayer.querySelector(`[data-cut-id="${cut.id}"]`);
          if (next && typeof next.focus === 'function') {
            try { next.focus(); } catch (_) { /* ignore */ }
          }
        }

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          select();
        });
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select();
          }
        });

        const short = cut.label.split('—')[0].trim();
        const label = el('text', {
          x: '14',
          y: '4',
          fill: C.mute,
          'font-size': '9',
          'font-family': 'Inter, system-ui, sans-serif',
          class: 'cw-mark-label pointer-events-none',
          opacity: '0.9',
        }, g);
        label.textContent = short;
      });
    }

    function renderPlant() {
      clearLayer(plantLayer);
      if (!plant) return;
      const drawer = DIAGRAMS[plant.diagram] || drawTree;
      drawer(plantLayer);
      renderAnatomy();
      renderMarks();
      svg.setAttribute(
        'aria-label',
        `${plant.label} pruning diagram with ${plant.cuts.length} cut markers`
      );
    }

    svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      zoomAt(e.clientX, e.clientY, scale * factor);
    }, { passive: false });

    svg.addEventListener('pointerdown', (e) => {
      if (e.target && e.target.getAttribute && e.target.getAttribute('data-cut-id')) {
        return;
      }
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      svg.setPointerCapture(e.pointerId);
      if (pointers.size === 1) {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        svg.style.cursor = 'grabbing';
      } else if (pointers.size === 2) {
        dragging = false;
        const pts = Array.from(pointers.values());
        pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartScale = scale;
      }
    });

    svg.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const pts = Array.from(pointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinchStartDist > 0) {
          const midX = (pts[0].x + pts[1].x) / 2;
          const midY = (pts[0].y + pts[1].y) / 2;
          zoomAt(midX, midY, pinchStartScale * (dist / pinchStartDist));
        }
      } else if (dragging && pointers.size === 1) {
        const rect = svg.getBoundingClientRect();
        const dx = ((e.clientX - lastX) / rect.width) * VIEW_W;
        const dy = ((e.clientY - lastY) / rect.height) * VIEW_H;
        tx += dx;
        ty += dy;
        lastX = e.clientX;
        lastY = e.clientY;
        applyTransform();
      }
    });

    function endPointer(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchStartDist = 0;
      if (pointers.size === 0) {
        dragging = false;
        svg.style.cursor = 'grab';
      }
    }

    svg.addEventListener('pointerup', endPointer);
    svg.addEventListener('pointercancel', endPointer);

    svg.addEventListener('click', (e) => {
      if (e.target === svg || e.target === root || e.target === world || e.target === plantLayer ||
          (e.target.closest && e.target.closest('.cw-plant'))) {
        if (!(e.target.getAttribute && e.target.getAttribute('data-cut-id'))) {
          const onMark = e.target.closest && e.target.closest('.cw-mark');
          if (!onMark) {
            selectedId = null;
            renderMarks();
            onSelect(null);
          }
        }
      }
    });

    applyTransform();

    return {
      setPlant(next) {
        plant = next;
        selectedId = null;
        scale = 1;
        tx = 0;
        ty = 0;
        applyTransform();
        renderPlant();
        onSelect(null);
      },
      selectCut(cutId) {
        selectedId = cutId;
        renderMarks();
        const cut = plant && plant.cuts ? plant.cuts.find((c) => c.id === cutId) : null;
        onSelect(cut || null);
      },
      clearSelection() {
        selectedId = null;
        renderMarks();
        onSelect(null);
      },
      resetView() {
        scale = 1;
        tx = 0;
        ty = 0;
        applyTransform();
      },
      setAnatomyVisible(visible) {
        anatomyVisible = !!visible;
        renderAnatomy();
      },
      getAnatomyVisible() {
        return anatomyVisible;
      },
      getSelectedId() {
        return selectedId;
      },
      destroy() {
        host.innerHTML = '';
      },
    };
  }

  global.CrownworkPlant = {
    createPlantView,
    VIEW_W,
    VIEW_H,
  };
})(typeof window !== 'undefined' ? window : globalThis);

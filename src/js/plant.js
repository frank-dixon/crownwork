/**
 * Crownwork — SVG plant viewport with pan/zoom and focusable cut markers.
 */
(function (global) {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const VIEW_W = 400;
  const VIEW_H = 360;

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

  function drawTree(g) {
    // Soil mound
    el('ellipse', { cx: 200, cy: 330, rx: 90, ry: 14, fill: '#1a2230', opacity: '0.9' }, g);
    // Trunk
    el('path', {
      d: 'M190 320 C192 260 194 200 198 120 C199 100 200 80 200 60',
      stroke: '#6B7FD7',
      'stroke-width': '10',
      'stroke-linecap': 'round',
      fill: 'none',
      opacity: '0.85',
    }, g);
    el('path', {
      d: 'M200 60 C200 80 201 100 202 120 C206 200 208 260 210 320',
      stroke: '#5FA8A0',
      'stroke-width': '6',
      'stroke-linecap': 'round',
      fill: 'none',
      opacity: '0.55',
    }, g);
    // Scaffolds
    const limbs = [
      'M198 130 C160 125 130 140 105 165',
      'M202 145 C240 140 270 155 295 175',
      'M199 185 C155 195 130 220 115 250',
      'M201 200 C245 205 275 225 300 255',
      'M200 95 C170 90 150 95 135 110',
      'M200 105 C230 100 255 108 275 125',
    ];
    limbs.forEach((d, i) => {
      el('path', {
        d,
        stroke: i % 2 === 0 ? '#5FA8A0' : '#6B7FD7',
        'stroke-width': String(4.5 - (i % 3) * 0.5),
        'stroke-linecap': 'round',
        fill: 'none',
        opacity: '0.8',
      }, g);
    });
    // Foliage suggestion
    [
      [105, 160, 28],
      [295, 170, 26],
      [115, 245, 22],
      [300, 250, 24],
      [135, 105, 18],
      [275, 120, 20],
      [200, 55, 30],
    ].forEach(([cx, cy, r]) => {
      el('circle', {
        cx, cy, r,
        fill: '#5FA8A0',
        opacity: '0.12',
      }, g);
    });
    // Crossing hint line
    el('path', {
      d: 'M155 175 C175 160 185 175 195 190',
      stroke: '#8B93A3',
      'stroke-width': '2.5',
      'stroke-dasharray': '4 3',
      fill: 'none',
      opacity: '0.5',
    }, g);
    // Sucker
    el('path', {
      d: 'M205 275 C208 255 210 245 208 230',
      stroke: '#E8A87C',
      'stroke-width': '3',
      'stroke-linecap': 'round',
      fill: 'none',
      opacity: '0.7',
    }, g);
  }

  function drawBerry(g) {
    el('ellipse', { cx: 200, cy: 330, rx: 80, ry: 12, fill: '#1a2230', opacity: '0.9' }, g);
    const canes = [
      [160, 320, 130, 80],
      [180, 320, 170, 60],
      [200, 320, 200, 50],
      [220, 320, 240, 70],
      [240, 320, 280, 100],
    ];
    canes.forEach(([x1, y1, x2, y2], i) => {
      el('path', {
        d: `M${x1} ${y1} Q${(x1 + x2) / 2 + (i - 2) * 8} ${(y1 + y2) / 2} ${x2} ${y2}`,
        stroke: i === 0 || i === 4 ? '#6B7FD7' : '#5FA8A0',
        'stroke-width': i === 0 ? '5' : '3.5',
        'stroke-linecap': 'round',
        fill: 'none',
        opacity: i === 0 ? '0.55' : '0.85',
      }, g);
      // side laterals
      el('path', {
        d: `M${x2} ${y2 + 40} L${x2 + (i < 2 ? -25 : 25)} ${y2 + 20}`,
        stroke: '#5FA8A0',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        fill: 'none',
        opacity: '0.65',
      }, g);
    });
    [[130, 80], [170, 60], [200, 50], [240, 70], [280, 100]].forEach(([cx, cy]) => {
      el('circle', { cx, cy, r: 14, fill: '#5FA8A0', opacity: '0.14' }, g);
    });
  }

  function drawVine(g) {
    el('ellipse', { cx: 200, cy: 330, rx: 50, ry: 10, fill: '#1a2230', opacity: '0.9' }, g);
    // trunk
    el('path', {
      d: 'M200 320 L200 200',
      stroke: '#6B7FD7',
      'stroke-width': '8',
      'stroke-linecap': 'round',
      fill: 'none',
    }, g);
    // cordon wire
    el('line', {
      x1: 60, y1: 160, x2: 340, y2: 160,
      stroke: '#243041',
      'stroke-width': '2',
      'stroke-dasharray': '6 4',
    }, g);
    // cordon arms
    el('path', {
      d: 'M200 200 L200 160 M200 160 L80 155 M200 160 L320 155',
      stroke: '#5FA8A0',
      'stroke-width': '5',
      'stroke-linecap': 'round',
      fill: 'none',
    }, g);
    // canes / spurs
    [[100, 155, 95, 100], [140, 156, 145, 110], [180, 158, 175, 105],
     [240, 158, 250, 100], [280, 156, 290, 115], [310, 155, 320, 130]].forEach(([x1, y1, x2, y2], i) => {
      el('path', {
        d: `M${x1} ${y1} L${x2} ${y2}`,
        stroke: i % 2 ? '#6B7FD7' : '#5FA8A0',
        'stroke-width': '2.5',
        'stroke-linecap': 'round',
        fill: 'none',
        opacity: '0.85',
      }, g);
    });
    // trunk sucker
    el('path', {
      d: 'M205 290 L220 250',
      stroke: '#E8A87C',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      fill: 'none',
      opacity: '0.75',
    }, g);
  }

  function drawOther(g) {
    el('ellipse', { cx: 200, cy: 330, rx: 85, ry: 12, fill: '#1a2230', opacity: '0.9' }, g);
    // multi-stem stool
    [[170, 320, 150, 90], [200, 320, 200, 55], [230, 320, 260, 95]].forEach(([x1, y1, x2, y2], i) => {
      el('path', {
        d: `M${x1} ${y1} Q${(x1 + x2) / 2} ${y1 - 80} ${x2} ${y2}`,
        stroke: i === 1 ? '#6B7FD7' : '#5FA8A0',
        'stroke-width': '6',
        'stroke-linecap': 'round',
        fill: 'none',
        opacity: '0.8',
      }, g);
    });
    [[150, 90, 40], [200, 55, 48], [260, 95, 36]].forEach(([cx, cy, r]) => {
      el('circle', { cx, cy, r, fill: '#5FA8A0', opacity: '0.13' }, g);
    });
    // side branches
    el('path', {
      d: 'M175 180 L120 150 M225 170 L290 145 M200 120 L160 100 M200 130 L250 110',
      stroke: '#6B7FD7',
      'stroke-width': '3',
      'stroke-linecap': 'round',
      fill: 'none',
      opacity: '0.7',
    }, g);
  }

  const DIAGRAMS = {
    tree: drawTree,
    berry: drawBerry,
    vine: drawVine,
    other: drawOther,
  };

  const KIND_COLORS = {
    heading: '#6B7FD7',
    thinning: '#5FA8A0',
    renewal: '#7BC4BC',
    sucker: '#E8A87C',
    deadwood: '#8B93A3',
    structural: '#8A9AE8',
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

    function clearMarks() {
      while (marksLayer.firstChild) marksLayer.removeChild(marksLayer.firstChild);
    }

    function renderMarks() {
      clearMarks();
      if (!plant || !plant.cuts) return;
      plant.cuts.forEach((cut, index) => {
        const color = KIND_COLORS[cut.kind] || '#E8A87C';
        const g = el('g', {
          class: 'cw-mark',
          transform: `translate(${cut.x} ${cut.y})`,
        }, marksLayer);

        const hit = el('circle', {
          r: '14',
          fill: 'transparent',
          class: 'cw-mark-hit',
        }, g);

        const ring = el('circle', {
          r: '9',
          fill: color,
          opacity: '0.25',
          class: 'cw-mark-ring',
        }, g);

        const dot = el('circle', {
          r: '5',
          fill: color,
          stroke: '#050608',
          'stroke-width': '1.5',
          class: 'cw-mark-dot',
        }, g);

        // Focusable button-like foreignObject alternative: use <a> or make circle focusable
        const btn = el('circle', {
          r: '11',
          fill: 'transparent',
          stroke: selectedId === cut.id ? '#E6EAF0' : 'transparent',
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
          } catch (_) { /* svg classList ok in modern browsers */ }
        }

        function select() {
          selectedId = cut.id;
          renderMarks();
          onSelect(cut);
          // restore focus to the newly rendered button
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

        // Label tick for first few
        if (index < 10) {
          const label = el('text', {
            x: '14',
            y: '4',
            fill: '#B7C0CE',
            'font-size': '9',
            'font-family': 'Inter, system-ui, sans-serif',
            class: 'cw-mark-label pointer-events-none',
            opacity: '0.85',
          }, g);
          label.textContent = cut.label.split('—')[0].trim();
        }

        void hit;
        void dot;
      });
    }

    function renderPlant() {
      while (plantLayer.firstChild) plantLayer.removeChild(plantLayer.firstChild);
      if (!plant) return;
      const drawer = DIAGRAMS[plant.diagram] || drawTree;
      drawer(plantLayer);
      renderMarks();
      svg.setAttribute('aria-label', `${plant.label} pruning diagram with ${plant.cuts.length} cut markers`);
    }

    // Pan / zoom interactions
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
      if (pointers.size < 2) {
        pinchStartDist = 0;
      }
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
          // background click — deselect only if not on a mark
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

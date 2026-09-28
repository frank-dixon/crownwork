/**
 * Crownwork — mode switcher, Simple/Advanced, cut detail panel, anatomy toggle, sources.
 */
(function () {
  'use strict';

  const Data = window.CrownworkData;
  const Plant = window.CrownworkPlant;

  if (!Data || !Plant) {
    console.error('Crownwork: missing Data or Plant modules');
    return;
  }

  const state = {
    modeId: 'trees',
    plantId: 'apple',
    level: 'simple',
    cut: null,
    anatomyVisible: true,
  };

  const els = {
    modeTabs: document.getElementById('mode-tabs'),
    plantSelect: document.getElementById('plant-select'),
    plantIntro: document.getElementById('plant-intro'),
    plantHabit: document.getElementById('plant-habit'),
    levelToggle: document.getElementById('level-toggle'),
    viewport: document.getElementById('plant-viewport'),
    panel: document.getElementById('cut-panel'),
    panelInner: document.getElementById('cut-panel-inner'),
    panelEmpty: document.getElementById('cut-panel-empty'),
    panelClose: document.getElementById('cut-panel-close'),
    cutTitle: document.getElementById('cut-title'),
    cutKind: document.getElementById('cut-kind'),
    cutHow: document.getElementById('cut-how'),
    cutWhy: document.getElementById('cut-why'),
    cutWhen: document.getElementById('cut-when'),
    cutGood: document.getElementById('cut-good'),
    cutBad: document.getElementById('cut-bad'),
    whenBlock: document.getElementById('when-block'),
    goodbadBlock: document.getElementById('goodbad-block'),
    advancedBlock: document.getElementById('advanced-block'),
    physioBefore: document.getElementById('physio-before'),
    physioAfter: document.getElementById('physio-after'),
    cutSources: document.getElementById('cut-sources'),
    sourcesList: document.getElementById('sources-list'),
    resetView: document.getElementById('reset-view'),
    anatomyToggle: document.getElementById('toggle-anatomy') || document.getElementById('anatomy-toggle'),
  };

  let plantView = null;

  function currentPlant() {
    return Data.getPlant(state.modeId, state.plantId);
  }

  function renderModeTabs() {
    if (!els.modeTabs) return;
    els.modeTabs.innerHTML = '';
    Data.MODE_ORDER.forEach((id) => {
      const mode = Data.MODES[id];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = tabClass(id === state.modeId);
      btn.textContent = mode.label;
      btn.setAttribute('aria-pressed', id === state.modeId ? 'true' : 'false');
      btn.addEventListener('click', () => {
        state.modeId = id;
        state.plantId = mode.plants[0].id;
        state.cut = null;
        syncAll();
      });
      els.modeTabs.appendChild(btn);
    });
  }

  function tabClass(active) {
    return [
      'px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ease-crown',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-bright',
      active
        ? 'bg-sea text-void shadow-sm'
        : 'bg-raised text-soft hover:text-ink hover:bg-line/60 border border-line',
    ].join(' ');
  }

  function renderPlantSelect() {
    if (!els.plantSelect) return;
    const mode = Data.getMode(state.modeId);
    els.plantSelect.innerHTML = '';
    mode.plants.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.lead ? `${p.label} (lead)` : p.label;
      if (p.id === state.plantId) opt.selected = true;
      els.plantSelect.appendChild(opt);
    });
  }

  function renderLevelToggle() {
    if (!els.levelToggle) return;
    els.levelToggle.querySelectorAll('[data-level]').forEach((btn) => {
      const active = btn.getAttribute('data-level') === state.level;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.className = [
        'px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ease-crown',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-bright',
        active ? 'bg-sea text-void' : 'text-soft hover:text-ink',
      ].join(' ');
    });
  }

  function renderIntro() {
    const plant = currentPlant();
    if (els.plantIntro) {
      const parts = [];
      if (plant.intro) parts.push(plant.intro);
      if (plant.speciesNote) parts.push(plant.speciesNote);
      els.plantIntro.textContent = parts.join(' ');
    }
    if (els.plantHabit) {
      if (plant.habit) {
        els.plantHabit.textContent = plant.habit;
        els.plantHabit.classList.remove('hidden');
      } else {
        els.plantHabit.textContent = '';
        els.plantHabit.classList.add('hidden');
      }
    }
  }

  function openPanel(cut) {
    state.cut = cut;
    if (!els.panel) return;
    if (!cut) {
      els.panel.setAttribute('aria-hidden', 'true');
      if (els.panelEmpty) els.panelEmpty.classList.remove('hidden');
      if (els.panelInner) els.panelInner.classList.add('hidden');
      return;
    }
    els.panel.setAttribute('aria-hidden', 'false');
    if (els.panelEmpty) els.panelEmpty.classList.add('hidden');
    if (els.panelInner) {
      els.panelInner.classList.remove('hidden');
      els.panelInner.classList.remove('animate-panel-in');
      void els.panelInner.offsetWidth;
      els.panelInner.classList.add('animate-panel-in');
    }

    if (els.cutTitle) els.cutTitle.textContent = cut.label;
    if (els.cutKind) {
      els.cutKind.textContent = cut.kind;
      els.cutKind.className =
        'inline-block text-xs uppercase tracking-wide2 px-2 py-0.5 rounded bg-void border border-line text-sea';
    }

    const simple = cut.simple || {};
    if (els.cutHow) els.cutHow.textContent = simple.how || '';
    if (els.cutWhy) els.cutWhy.textContent = simple.why || '';
    if (els.cutWhen) els.cutWhen.textContent = simple.when || '';
    if (els.cutGood) els.cutGood.textContent = simple.goodLooksLike || '';
    if (els.cutBad) els.cutBad.textContent = simple.badLooksLike || '';

    if (els.whenBlock) {
      els.whenBlock.classList.toggle('hidden', !simple.when);
    }
    if (els.goodbadBlock) {
      els.goodbadBlock.classList.toggle('hidden', !(simple.goodLooksLike || simple.badLooksLike));
    }

    const showAdv = state.level === 'advanced';
    if (els.advancedBlock) {
      els.advancedBlock.classList.toggle('hidden', !showAdv);
    }
    if (showAdv && cut.advanced) {
      if (els.physioBefore) els.physioBefore.textContent = cut.advanced.before || '';
      if (els.physioAfter) els.physioAfter.textContent = cut.advanced.after || '';
      renderCutSources(Data.citationsForCut(cut));
    } else if (els.cutSources) {
      els.cutSources.innerHTML = '';
    }

    if (els.panelClose) {
      try { els.panelClose.focus(); } catch (_) { /* ignore */ }
    }
  }

  function renderCutSources(cites) {
    if (!els.cutSources) return;
    els.cutSources.innerHTML = '';
    if (!cites.length) return;
    const heading = document.createElement('h4');
    heading.className = 'text-xs uppercase tracking-wide2 text-mute mb-2';
    heading.textContent = 'Sources for this cut';
    els.cutSources.appendChild(heading);
    const ul = document.createElement('ul');
    ul.className = 'space-y-2';
    cites.forEach((c) => {
      const li = document.createElement('li');
      li.className = 'text-sm text-lede border-l-2 border-sea/40 pl-3';
      li.innerHTML = `<span class="text-ink font-medium">${escapeHtml(c.label)}</span>` +
        `<span class="block text-mute text-xs mt-0.5">${escapeHtml(c.note)}</span>`;
      ul.appendChild(li);
    });
    els.cutSources.appendChild(ul);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderGlobalSources() {
    if (!els.sourcesList) return;
    els.sourcesList.innerHTML = '';
    Data.CITATIONS.forEach((c) => {
      const li = document.createElement('li');
      li.className = 'text-sm text-lede';
      li.innerHTML =
        `<span class="text-ink font-medium">${escapeHtml(c.label)}</span>` +
        `<span class="block text-mute text-xs mt-0.5">${escapeHtml(c.note)}</span>`;
      els.sourcesList.appendChild(li);
    });
  }

  function syncPlantView() {
    const plant = currentPlant();
    if (plantView) {
      plantView.setPlant(plant);
      plantView.setAnatomyVisible(state.anatomyVisible);
    }
  }

  function syncAll() {
    renderModeTabs();
    renderPlantSelect();
    renderLevelToggle();
    renderIntro();
    syncPlantView();
    openPanel(null);
  }

  function closePanel() {
    state.cut = null;
    if (plantView) plantView.clearSelection();
    openPanel(null);
    if (els.viewport) {
      const focusable = els.viewport.querySelector('[tabindex="0"]');
      if (focusable) {
        try { focusable.focus(); } catch (_) { /* ignore */ }
      }
    }
  }

  function init() {
    if (!els.viewport) {
      console.error('Crownwork: #plant-viewport missing');
      return;
    }

    plantView = Plant.createPlantView(els.viewport, {
      onSelect(cut) {
        openPanel(cut);
      },
    });

    if (els.plantSelect) {
      els.plantSelect.addEventListener('change', () => {
        state.plantId = els.plantSelect.value;
        state.cut = null;
        renderIntro();
        syncPlantView();
        openPanel(null);
      });
    }

    if (els.levelToggle) {
      els.levelToggle.querySelectorAll('[data-level]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.level = btn.getAttribute('data-level');
          renderLevelToggle();
          if (state.cut) openPanel(state.cut);
        });
      });
    }

    if (els.anatomyToggle) {
      state.anatomyVisible = !!els.anatomyToggle.checked;
      els.anatomyToggle.addEventListener('change', () => {
        state.anatomyVisible = !!els.anatomyToggle.checked;
        if (plantView) plantView.setAnatomyVisible(state.anatomyVisible);
      });
    }

    if (els.panelClose) {
      els.panelClose.addEventListener('click', closePanel);
    }

    if (els.resetView) {
      els.resetView.addEventListener('click', () => {
        if (plantView) plantView.resetView();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.cut) {
        e.preventDefault();
        closePanel();
      }
    });

    renderGlobalSources();
    syncAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

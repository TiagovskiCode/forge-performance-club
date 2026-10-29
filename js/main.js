/* FORGE — UI behaviour: navigation, content rendering, plan selection, form, motion preference.
   Works without GSAP; animations.js layers motion on top. */
(function () {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const D = window.FORGE_DATA;
  const money = (n) => D.currency + n;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ======================================================================
     Image fallbacks — until the generated photographs from
     IMAGE_GENERATION_BRIEF.md exist, each <img data-fallback> shows its
     clearly named placeholder artwork (assets/images/placeholders/).
     ====================================================================== */
  function useFallback(img) {
    if (!img.dataset.fallback || img.dataset.fellBack) return;
    img.dataset.fellBack = '1';
    const pic = img.closest('picture');
    if (pic) $$('source', pic).forEach((s) => s.remove());
    const mobile = img.dataset.fallbackMobile && window.matchMedia('(max-width: 700px)').matches;
    img.src = mobile ? img.dataset.fallbackMobile : img.dataset.fallback;
    img.removeAttribute('srcset');
  }
  $$('img[data-fallback]').forEach((img) => {
    img.addEventListener('error', () => useFallback(img));
    if (img.complete && img.naturalWidth === 0) useFallback(img);
  });

  /* ======================================================================
     Motion preference (system default, user-overridable)
     ====================================================================== */
  const sysReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setMotion(mode, persist) {
    root.dataset.motion = mode;
    $$('[data-motion-toggle]').forEach((b) => {
      b.setAttribute('aria-pressed', String(mode === 'full'));
      $('[data-motion-label]', b).textContent = mode === 'full' ? 'Motion on' : 'Motion reduced';
    });
    if (persist) { try { localStorage.setItem('forge-motion', mode); } catch (e) {} }
    window.dispatchEvent(new CustomEvent('forge:motion', { detail: mode }));
  }
  $$('[data-motion-toggle]').forEach((b) => b.addEventListener('click', () => setMotion(root.dataset.motion === 'full' ? 'reduced' : 'full', true)));

  const toast = $('#motion-toast');
  let storedMotion = null;
  try { storedMotion = localStorage.getItem('forge-motion'); } catch (e) {}
  if (sysReduced && !storedMotion && toast) {
    setTimeout(() => { toast.hidden = false; }, 1200);
    $('[data-motion-enable]').addEventListener('click', () => { setMotion('full', true); toast.hidden = true; });
    $('[data-toast-close]').addEventListener('click', () => { toast.hidden = true; });
  }
  setMotion(root.dataset.motion, false);

  /* ======================================================================
     Content rendering from FORGE_DATA
     ====================================================================== */
  const plansEl = $('#plans');
  const letters = ['A', 'B', 'C'];
  plansEl.innerHTML = D.plans.map((p, i) => `
    <article class="tier${p.featured ? ' tier--feature' : ''}" data-plan="${p.id}">
      <p class="label tier__flag">Tier ${letters[i]}${p.featured ? ' · Group sessions included' : ''}</p>
      <h3>${esc(p.name)}</h3>
      <p class="tier__price"><sup>${D.currency}</sup>${p.price}<small>/ month</small></p>
      <p class="tier__bill">Billed monthly · No joining fee · Cancel any time</p>
      <p class="tier__for"><strong>For:</strong> ${esc(p.for)}</p>
      <ul>${p.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <p class="tier__limits"><strong>Limits:</strong> ${esc(p.limits)}</p>
      <button class="btn btn--sm" type="button" data-select="${p.id}" aria-pressed="false" data-magnetic><span>${esc(p.cta)}</span><i class="btn__arrow" aria-hidden="true"></i></button>
    </article>`).join('');

  $('#compare').insertAdjacentHTML('beforeend',
    `<thead><tr><th scope="col">Included</th>${D.plans.map((p) => `<th scope="col">${esc(p.name.replace('FORGE ', ''))}<br>${money(p.price)}</th>`).join('')}</tr></thead>` +
    `<tbody>${D.compare.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join('')}</tbody>`);

  $('#extras').innerHTML = D.extras.map((e) => `<li><div><strong>${esc(e.name)}</strong><span>${esc(e.detail)}</span></div><span class="price">${money(e.price)}</span></li>`).join('');

  const P = D.policies;
  $('#policies').innerHTML = [['Joining fee', P.joiningFee], ['Billing', P.billing], ['Commitment', P.term], ['Cancellation', P.cancellation], ['Plan changes', P.changes]]
    .map(([t, d]) => `<div><dt>${t}</dt><dd>${esc(d)}</dd></div>`).join('');

  $$('[data-price-from]').forEach((el) => { el.textContent = money(D.plans.find((p) => p.id === el.dataset.priceFrom).price); });
  $$('[data-extra-price]').forEach((el) => { el.textContent = money(D.extras[+el.dataset.extraPrice].price); });

  const planSel = $('#f-plan');
  planSel.innerHTML = '<option value="">Not sure yet</option>' + D.plans.map((p) => `<option value="${p.id}">${esc(p.name)} — ${money(p.price)}/month</option>`).join('');

  /* ======================================================================
     Training services — accessible tabs (click, arrow keys, Home/End).
     Without JS every panel stays visible.
     ====================================================================== */
  const xp = $('[data-xp]');
  if (xp) {
    const tabs = $$('[data-xp-tab]', xp);
    const panels = $$('.xp__panel', xp);
    const imgs = $$('.xp__img', xp);
    const count = $('[data-xp-count]', xp);
    let cur = 0;
    const show = (i, focus) => {
      if (i === cur && !panels[i].hidden && panels.some((p, k) => k !== i && p.hidden)) { if (focus) tabs[i].focus(); return; }
      const from = cur;
      cur = i;
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach((p, k) => { p.hidden = k !== i; });
      imgs.forEach((im, k) => im.classList.toggle('is-active', k === i));
      count.textContent = '0' + (i + 1);
      xp.style.setProperty('--xp', i);
      if (focus) tabs[i].focus();
      window.dispatchEvent(new CustomEvent('forge:xp', { detail: { from, to: i } }));
    };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => show(k));
      t.addEventListener('keydown', (e) => {
        const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (map[e.key]) { e.preventDefault(); show((cur + map[e.key] + tabs.length) % tabs.length, true); }
        if (e.key === 'Home') { e.preventDefault(); show(0, true); }
        if (e.key === 'End') { e.preventDefault(); show(tabs.length - 1, true); }
      });
    });
    xp.classList.add('is-ready');
    show(0);
  }

  /* ======================================================================
     Plan selection (carries into the form)
     ====================================================================== */
  const selectedBar = $('#selected');
  function setPlan(id) {
    const plan = D.plans.find((p) => p.id === id);
    $$('.tier').forEach((t) => {
      const on = t.dataset.plan === id;
      t.classList.toggle('is-selected', on);
      $('[data-select]', t).setAttribute('aria-pressed', String(on));
      $('[data-select] span', t).textContent = on ? 'Selected' : D.plans.find((p) => p.id === t.dataset.plan).cta;
    });
    planSel.value = id || '';
    selectedBar.hidden = !plan;
    // highlight the matching column in the comparison table
    $('#compare').dataset.sel = plan ? String(D.plans.indexOf(plan) + 1) : '';
    if (plan) {
      $('#selected-name').textContent = plan.name;
      $('#selected-price').textContent = money(plan.price) + ' / month';
    }
  }
  plansEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-select]');
    if (!b) return;
    setPlan(b.dataset.select);
    selectedBar.scrollIntoView({ block: 'nearest', behavior: root.dataset.motion === 'full' ? 'smooth' : 'auto' });
  });
  planSel.addEventListener('change', () => setPlan(planSel.value));

  const topicSel = $('#f-topic');
  const msg = $('#f-msg');
  function setTopic(t) {
    topicSel.value = t;
    $('#msg-opt').textContent = t === 'question' ? '*' : '(optional)';
    msg.required = t === 'question';
  }
  topicSel.addEventListener('change', () => setTopic(topicSel.value));
  setTopic('join');

  // links that pre-fill the form: data-plan-link="elite" / data-topic="question"
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-plan-link], [data-topic]');
    if (!a) return;
    if (a.dataset.planLink) { setPlan(a.dataset.planLink); setTopic('join'); }
    if (a.dataset.topic) { setTopic(a.dataset.topic); }
    if (a.getAttribute('href') === '#inquiry') {
      e.preventDefault();
      showForm();
      const target = $('#inquiry-wrap');
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: root.dataset.motion === 'full' ? 'smooth' : 'auto' });
      setTimeout(() => (a.dataset.topic === 'question' ? msg : $('#f-name')).focus({ preventScroll: true }), root.dataset.motion === 'full' ? 700 : 50);
    }
  });

  /* ======================================================================
     Inquiry form
     ====================================================================== */
  const form = $('#inquiry');
  const status = $('#form-status');
  const confirmEl = $('#confirm');

  const validators = {
    name: (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
    phone: (v) => (!v.trim() || /^\+?[\d\s().-]{7,}$/.test(v.trim()) ? '' : 'Please enter a valid phone number, or leave it blank.'),
    message: (v) => (topicSel.value === 'question' && v.trim().length < 5 ? 'Please tell us your question.' : ''),
    consent: (v, el) => (el.checked ? '' : 'Please confirm to continue.')
  };
  function check(el) {
    const fn = validators[el.name];
    if (!fn) return true;
    const err = fn(el.value, el);
    const field = el.closest('.field');
    field.classList.toggle('is-invalid', !!err);
    el.setAttribute('aria-invalid', err ? 'true' : 'false');
    $('[data-err]', field).textContent = err;
    return !err;
  }
  const fields = $$('input, textarea', form);
  fields.forEach((el) => {
    el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') check(el); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') check(el); });
  });

  function showForm() { confirmEl.hidden = true; form.hidden = false; }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const results = fields.map((el) => [el, check(el)]);
    const bad = results.find(([, ok]) => !ok);
    if (bad) {
      status.textContent = 'Please check the highlighted fields.';
      bad[0].focus();
      return;
    }
    status.textContent = '';
    const data = Object.fromEntries(new FormData(form).entries());
    const submitBtn = $('button[type="submit"]', form);

    if (D.formEndpoint) {
      submitBtn.disabled = true;
      status.textContent = 'Sending…';
      try {
        const res = await fetch(D.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error('bad status');
      } catch (err) {
        status.textContent = 'Sorry — something went wrong sending your inquiry. Please try again.';
        submitBtn.disabled = false;
        return;
      }
      submitBtn.disabled = false;
    }

    const plan = D.plans.find((p) => p.id === data.plan);
    const topicText = { join: 'your interest in joining FORGE', question: 'your question', visit: 'your request for an introductory visit' }[data.topic];
    $('#c-name').textContent = data.name.trim().split(/\s+/)[0];
    $('#c-summary').textContent = `We’ve noted ${topicText}` + (plan ? `, with the ${plan.name} plan in mind (${money(plan.price)}/month, illustrative pricing).` : '.');
    form.hidden = true;
    confirmEl.hidden = false;
    confirmEl.focus();
    form.reset();
    setTopic('join');
    setPlan('');
    fields.forEach((el) => { el.removeAttribute('aria-invalid'); el.closest('.field').classList.remove('is-invalid'); });
  });
  $('#confirm-reset').addEventListener('click', () => { showForm(); $('#f-name').focus(); });

  /* ======================================================================
     Navigation
     ====================================================================== */
  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#menu');

  let lastY = window.scrollY, ticking = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-solid', y > 40);
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  const links = $$('[data-link]');
  const targets = links.map((a) => $(a.getAttribute('href')));
  if ('IntersectionObserver' in window) {
    // a narrow band across the middle of the viewport decides what is "current";
    // nested targets (FAQ inside Membership) win because they come later in the list
    const band = { rootMargin: '-45% 0px -50% 0px' };
    const inBand = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? inBand.add(e.target) : inBand.delete(e.target)));
      const current = [...targets].reverse().find((t) => inBand.has(t));
      links.forEach((a, i) => a.classList.toggle('is-active', targets[i] === current));
    }, band);
    targets.forEach((t) => t && io.observe(t));

    // chapter index (desktop rail)
    const chapters = $$('[data-chapter]');
    const chio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        chapters.forEach((a) => a.classList.toggle('is-active', a.dataset.chapter === e.target.id));
        document.body.dataset.chapter = e.target.id;
      });
    }, band);
    chapters.forEach((a) => { const s = document.getElementById(a.dataset.chapter); if (s) chio.observe(s); });
  }

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('is-locked', open);
    menu.toggleAttribute('inert', !open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      $('a', menu).focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-open');
    }
  }
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches && burger.getAttribute('aria-expanded') === 'true') setMenu(false); });

  $('#to-top').addEventListener('click', (e) => {
    e.preventDefault();
    glideToTop();
  });

  // Eased scroll to the top. Independent of CSS scroll-behavior (which is "auto" in
  // reduced-motion mode, and gets cut short by pinned/scrubbed sections), so the
  // button always glides instead of jumping. Any wheel/touch/key input cancels it.
  function glideToTop() {
    const from = window.scrollY;
    if (from < 2) return;
    const dur = Math.min(1600, 500 + from * 0.12);
    const start = performance.now();
    let id = 0;
    const stop = () => {
      cancelAnimationFrame(id);
      root.style.scrollBehavior = '';
      ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((t) => window.removeEventListener(t, stop));
    };
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((t) => window.addEventListener(t, stop, { passive: true }));
    root.style.scrollBehavior = 'auto';
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);            // easeOutQuart
      window.scrollTo(0, from * (1 - eased));
      if (p < 1) id = requestAnimationFrame(step);
      else { root.style.scrollBehavior = ''; stop(); }
    };
    id = requestAnimationFrame(step);
  }

  // Signal for animations.js that the DOM it animates now exists.
  window.__forgeDomReady = true;
  window.dispatchEvent(new Event('forge:dom'));
})();

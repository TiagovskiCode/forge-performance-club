/* ==========================================================================
   FORGE — GSAP motion system
   --------------------------------------------------------------------------
   Motion language
     micro      0.3 s   power2.out      buttons, tabs, links, counters
     editorial  0.9 s   power3.out      headline lines, copy, list items
     wipe       1.2 s   power4.inOut    image masks opening
     cinematic  1.4 s   expo.out        the opening, campaign headline
     drift      slow    sine / linear   image breathing, parallax (scrubbed)
   Rules
     - Images lead: a mask opens, then the picture settles.
     - Headlines move in lines; paragraphs stay quiet.
     - Chapters hand over to each other: the hero recedes under the bone surface,
       the membership panel opens out of the dark, the campaign frame expands.
     - One pin only (campaign, desktop, ~1.5 screens).
     - Start-states are opacity-only and exist only while <html>.anim-pending —
       always released. data-motion="reduced" → opacity fades only.
     - All scroll motion lives in ONE gsap.matchMedia(): mode switches, breakpoint
       changes and resizes revert and rebuild cleanly (no duplicate triggers).
   ========================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  const release = () => root.classList.remove('anim-pending');

  if (!window.gsap || !window.ScrollTrigger) {
    console.warn('[FORGE] GSAP failed to load — showing the static page.');
    root.classList.remove('anim-pending', 'intro-on');
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);           // real time even on throttled frames
  window.__forgeReady = true;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const D = { micro: 0.3, edit: 0.9, wipe: 1.2, cine: 1.4 };
  const E = { micro: 'power2.out', out: 'power3.out', wipe: 'power4.inOut', cine: 'expo.out', soft: 'power1.out' };
  const once = (trigger, start, onEnter) => ScrollTrigger.create({ trigger, start, once: true, onEnter });

  const HERO_PARTS = '[data-hero="line"], .hero__img, [data-hero-media], .hero__shade, .hero__beam, .hero__wordmark, .hero__frame i, .hero__kicker, .hero__meta, .hero__copy, .hero__cta, .hero__scroll, .hero__scroll b, [data-hero-body], .logo__word, .nav__links, .nav__right';
  let mm = null;
  let opening = null;
  let heroSettled = false;

  function splitWords(el) {
    if (el.dataset.split) return $$('.w', el);
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    const words = text.split(/\s+/).map((word, i, arr) => {
      const s = document.createElement('span');
      s.className = 'w';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = word;
      el.appendChild(s);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
      return s;
    });
    el.dataset.split = '1';
    return words;
  }

  /* ==========================================================================
     01 · THE OPENING — curtain → brand details → image mask → headline → copy → CTA
     One timeline, first load only. Never waits for assets; click skips the curtain.
     ========================================================================== */
  function playOpening(full) {
    const tl = gsap.timeline({ onComplete: () => { heroSettled = true; window.dispatchEvent(new Event('forge:hero')); } });
    const curtain = $('#curtain');
    let t = 0;

    if (full && root.classList.contains('intro-on') && curtain) {
      tl.fromTo('.curtain__line', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 0)
        .fromTo('.curtain__mark span', { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: E.cine }, 0.12)
        .to('.curtain__mark span', { yPercent: -110, duration: 0.4, ease: 'power3.in' }, 0.75)
        .to('.curtain__line', { scaleX: 0, transformOrigin: 'right', duration: 0.4, ease: 'power3.in' }, 0.75)
        .to('.curtain__panel--top', { yPercent: -100, duration: 0.9, ease: E.wipe }, 0.95)
        .to('.curtain__panel--bottom', { yPercent: 100, duration: 0.9, ease: E.wipe }, 0.95)
        .add(() => root.classList.remove('intro-on'), 1.85);
      curtain.addEventListener('click', () => { if (tl.time() < 0.95) tl.seek(0.95); }, { once: true });
      t = 0.95;
    } else {
      root.classList.remove('intro-on');
    }

    if (full) {
      tl.fromTo('[data-hero-media]', { clipPath: 'inset(14% 10% 14% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: D.cine + 0.3, ease: E.wipe, clearProps: 'clipPath' }, t)
        .fromTo('.hero__img', { scale: 1.32 }, { scale: 1, duration: 2.6, ease: 'power3.out' }, t)
        .fromTo('.hero__beam', { opacity: 0, xPercent: 20 }, { opacity: 1, xPercent: 0, duration: 2.2, ease: E.soft }, t + 0.3)
        .fromTo('.hero__shade', { opacity: 0 }, { opacity: 1, duration: D.cine, ease: E.soft }, t + 0.2)
        .fromTo('.logo__word, .nav__links, .nav__right', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: D.edit, ease: E.out, stagger: 0.08 }, t + 0.25)
        .fromTo('.hero__frame i', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8, ease: E.out, stagger: 0.06 }, t + 0.4)
        .fromTo('[data-hero="line"]', { yPercent: 112, opacity: 1 }, { yPercent: 0, duration: D.cine, ease: E.cine, stagger: 0.12 }, t + 0.55)
        .fromTo('.hero__wordmark', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 2, ease: E.out }, t + 0.7)
        .fromTo('.hero__kicker, .hero__meta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: D.edit, ease: E.out, stagger: 0.1 }, t + 0.95)
        .fromTo('.hero__copy', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: D.edit, ease: E.out }, t + 1.15)
        .fromTo('.hero__cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: D.edit, ease: E.out }, t + 1.35)
        .fromTo('.hero__scroll', { opacity: 0 }, { opacity: 1, duration: D.edit, ease: E.soft }, t + 1.6);
    } else {
      tl.fromTo('[data-hero="line"]', { opacity: 0 }, { opacity: 1, duration: D.edit, stagger: 0.1, ease: E.soft }, 0)
        .fromTo('[data-hero="fade"], .logo__word, .nav__links, .nav__right', { opacity: 0 }, { opacity: 1, duration: D.edit, stagger: 0.04, ease: E.soft }, 0.2);
    }
    return tl;
  }

  /* ---------- hero after the opening: breathing, depth, hand-off ---------- */
  function heroScroll(full, desktop, fine, cleanups) {
    if (!full) return;
    const drift = gsap.to('.hero__img', { scale: 1.06, xPercent: desktop ? -1.5 : 0, duration: 24, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
    const play = () => { if (heroSettled) drift.play(); };
    window.addEventListener('forge:hero', play);
    cleanups.push(() => window.removeEventListener('forge:hero', play));
    ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? play() : drift.pause()) });
    play();

    gsap.fromTo('.hero__scroll b', { yPercent: -100 }, { yPercent: 260, duration: 1.8, ease: 'power2.inOut', repeat: -1, repeatDelay: 0.4 });

    // hand-off: the picture recedes and darkens while the bone surface rises over it
    const st = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
    gsap.fromTo('[data-hero-media]', { yPercent: 0, opacity: 1 }, { yPercent: desktop ? 14 : 8, opacity: 0.3, ease: 'none', scrollTrigger: st });
    gsap.fromTo('.hero__wordmark', { yPercent: 0 }, { yPercent: desktop ? 40 : 20, ease: 'none', scrollTrigger: st });
    gsap.fromTo('[data-hero-body]', { y: 0, opacity: 1 }, { y: desktop ? -90 : -40, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '25% top', end: '85% top', scrub: true } });

    // pointer depth: three layers at three speeds (fine pointers only)
    if (desktop && fine) {
      const layers = [['.hero__img', -14, -9], ['.hero__beam', 30, 0], ['.hero__wordmark', 40, 14]].map(([sel, x, y]) => ({
        x, y, xTo: gsap.quickTo(sel, 'x', { duration: 1.4, ease: 'power3.out' }), yTo: gsap.quickTo(sel, 'y', { duration: 1.4, ease: 'power3.out' })
      }));
      const hero = $('.hero');
      const move = (e) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        layers.forEach((l) => { l.xTo(nx * l.x); l.yTo(ny * l.y); });
      };
      hero.addEventListener('mousemove', move);
      cleanups.push(() => hero.removeEventListener('mousemove', move));
    }
  }

  /* ==========================================================================
     Shared editorial behaviours
     ========================================================================== */
  function headlines(full) {
    $$('h2').forEach((h) => {
      const lines = $$('[data-line]', h);
      if (!lines.length) return;
      gsap.set(lines, full ? { yPercent: 112, opacity: 1 } : { opacity: 0 });
      once(h, 'top 86%', () => gsap.to(lines, full
        ? { yPercent: 0, duration: D.cine, ease: E.cine, stagger: 0.12 }
        : { opacity: 1, duration: D.edit, ease: E.soft, stagger: 0.08 }));
    });
  }

  function quietFades(full) {
    const fades = $$('[data-fade]');
    gsap.set(fades, full ? { opacity: 0, y: 18 } : { opacity: 0 });
    ScrollTrigger.batch(fades, { start: 'top 90%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: D.edit, ease: E.out, stagger: 0.09 }) });
  }

  function maskIn(fig, start, full, dir = 'up') {
    if (!fig) return;
    const img = $('img', fig);
    if (!full) {
      gsap.set(fig, { opacity: 0 });
      once(fig, start, () => gsap.to(fig, { opacity: 1, duration: D.edit, ease: E.soft }));
      return;
    }
    gsap.set(fig, { clipPath: dir === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)' });
    once(fig, start, () => {
      gsap.timeline()
        .to(fig, { clipPath: 'inset(0% 0% 0% 0%)', duration: D.wipe + 0.2, ease: E.wipe, clearProps: 'clipPath' }, 0)
        .fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0);
    });
  }

  /* ==========================================================================
     02 · PHILOSOPHY
     ========================================================================== */
  function philosophy(full, desktop) {
    maskIn($('.phil__fig'), 'top 62%', full);   // opens only once the visitor commits to the section
    if (!full) return;
    const title = $('[data-words]');
    gsap.fromTo(splitWords(title), { opacity: 0.13 }, { opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: title, start: 'top 80%', end: 'bottom 48%', scrub: 0.4 } });
    gsap.fromTo('.phil__fig img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.phil__fig', start: 'top bottom', end: 'bottom top', scrub: true } });
    if (desktop) gsap.fromTo('.phil__fig', { y: 40 }, { y: -60, ease: 'none', scrollTrigger: { trigger: '.phil', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('[data-band]', { xPercent: 0 }, { xPercent: -33, ease: 'none', scrollTrigger: { trigger: '.phil__band', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
  }

  /* ==========================================================================
     03 · TRAINING — service index: image wipes in, panel content follows
     ========================================================================== */
  function training(full, cleanups) {
    const xp = $('[data-xp]');
    if (!xp) return;
    const tabs = $$('.xp__tab', xp);
    gsap.set(tabs, full ? { opacity: 0, x: -24 } : { opacity: 0 });
    once(xp, 'top 80%', () => gsap.to(tabs, { opacity: 1, x: 0, duration: D.edit, ease: E.out, stagger: 0.08 }));
    maskIn($('.xp__media', xp), 'top 80%', full, 'side');

    const panelBits = (p) => $$('h3, .xp__lead, .xp__list-items li, .xp__meta, .textlink', p);
    const onSwitch = (e) => {
      const { from, to } = e.detail;
      if (from === to) return;
      const img = $$('.xp__img', xp)[to];
      const panel = $$('.xp__panel', xp)[to];
      if (full) {
        gsap.fromTo(img, { clipPath: 'inset(0% 0% 0% 100%)', scale: 1.12 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1, ease: E.wipe, clearProps: 'clipPath,scale' });
        gsap.fromTo(panelBits(panel), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E.out, stagger: 0.05 });
        gsap.fromTo('[data-xp-count]', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: D.micro + 0.1, ease: E.micro });
      } else {
        gsap.fromTo(panelBits(panel), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: E.soft });
      }
    };
    window.addEventListener('forge:xp', onSwitch);
    cleanups.push(() => window.removeEventListener('forge:xp', onSwitch));
  }

  /* ==========================================================================
     04 · MEMBERSHIP — the bone panel opens out of the dark; plans rise; FAQ
     ========================================================================== */
  function membership(full, desktop, cleanups) {
    if (full && desktop) {
      gsap.fromTo('.member', { clipPath: 'inset(7% 4% 0% 4%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: '.member', start: 'top bottom', end: 'top 30%', scrub: true } });
      cleanups.push(() => gsap.set('.member', { clearProps: 'clipPath' }));
    }
    const tiers = $$('.tier');
    gsap.set(tiers, full ? { opacity: 0, y: 50 } : { opacity: 0 });
    once('#plans', 'top 82%', () => gsap.to(tiers, { opacity: 1, y: 0, duration: D.edit + 0.1, ease: E.out, stagger: 0.12 }));
    ['#compare', '#extras', '#policies', '.faq__head', '#faq-list'].forEach((sel) => {
      gsap.set(sel, full ? { opacity: 0, y: 20 } : { opacity: 0 });
      once(sel, 'top 88%', () => gsap.to(sel, { opacity: 1, y: 0, duration: D.edit, ease: E.out }));
    });

    // accordion: height tween (native <details> still works without this)
    if (full) {
      const list = $('#faq-list');
      const close = (qa) => {
        const a = $('.qa__a', qa);
        gsap.to(a, { height: 0, duration: 0.45, ease: 'power3.inOut', onComplete: () => { qa.open = false; gsap.set(a, { clearProps: 'height' }); } });
      };
      const onClick = (e) => {
        const sum = e.target.closest('summary');
        if (!sum || !list.contains(sum)) return;
        e.preventDefault();
        const qa = sum.parentElement;
        if (qa.open) { close(qa); return; }
        $$('.qa[open]', list).forEach((o) => o !== qa && close(o));
        qa.open = true;
        gsap.fromTo($('.qa__a', qa), { height: 0 }, { height: 'auto', duration: 0.55, ease: E.out, clearProps: 'height', onComplete: () => ScrollTrigger.refresh() });
      };
      list.addEventListener('click', onClick);
      cleanups.push(() => list.removeEventListener('click', onClick));
    }
  }

  /* ==========================================================================
     05 · CAMPAIGN — the emotional peak, the only pin
     frame expands → "Show up." → "Do the work." → FORGE YOUR LEGACY.
     ========================================================================== */
  function campaign(full, desktop, cleanups) {
    const camp = $('#campaign');
    const fig = $('[data-campaign-fig]');
    const img = $('img', fig);
    const shade = $('.campaign__shade');
    const lines = $$('[data-camp="line"]');
    const pre = $$('[data-camp="pre"]');
    const cap = $('[data-camp="cap"]');
    const bar = $('.campaign__progress i');

    if (full && desktop) {
      camp.classList.add('is-pinned');
      cleanups.push(() => camp.classList.remove('is-pinned'));
      gsap.set(lines, { yPercent: 112, opacity: 1 });
      gsap.set([cap, shade], { opacity: 0 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: camp, pin: $('.campaign__pin', camp), start: 'top top', end: '+=150%', scrub: 0.5, anticipatePin: 1,
          onUpdate: (s) => gsap.set(bar, { scaleX: s.progress })
        }
      });
      tl.fromTo(fig, { clipPath: 'inset(18% 14% 18% 14%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, 0)
        .fromTo(img, { scale: 1.35 }, { scale: 1.05, duration: 2.8, ease: 'power1.out' }, 0)
        .to(shade, { opacity: 1, duration: 0.5 }, 0.6)
        .fromTo(pre[0], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.9)
        .to(pre[0], { opacity: 0, y: -30, duration: 0.2, ease: 'power2.in' }, 1.3)
        .fromTo(pre[1], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 1.5)
        .to(pre[1], { opacity: 0, y: -30, duration: 0.2, ease: 'power2.in' }, 1.9)
        .to(lines, { yPercent: 0, duration: 0.45, ease: 'power3.out', stagger: 0.14 }, 2.1)
        .to(cap, { opacity: 1, duration: 0.25 }, 2.6)
        .to({}, { duration: 0.3 });
      return;
    }

    // phones / tablets / calm mode: no pin — one masked reveal on entry
    gsap.set(shade, { opacity: 1 });
    gsap.set(lines, full ? { yPercent: 112, opacity: 1 } : { opacity: 0 });
    gsap.set(cap, { opacity: 0 });
    gsap.set(fig, full ? { clipPath: 'inset(10% 6% 10% 6%)' } : { opacity: 0 });
    once(camp, 'top 65%', () => {
      const tl = gsap.timeline();
      if (full) {
        tl.to(fig, { clipPath: 'inset(0% 0% 0% 0%)', duration: D.cine, ease: E.wipe, clearProps: 'clipPath' }, 0)
          .fromTo(img, { scale: 1.2 }, { scale: 1, duration: 2, ease: 'power3.out' }, 0)
          .to(lines, { yPercent: 0, duration: D.cine, ease: E.cine, stagger: 0.12 }, 0.5);
      } else {
        tl.to(fig, { opacity: 1, duration: D.edit, ease: E.soft }, 0).to(lines, { opacity: 1, duration: D.edit, ease: E.soft, stagger: 0.1 }, 0.2);
      }
      tl.to(cap, { opacity: 1, duration: D.edit, ease: E.soft }, '-=0.4');
    });
  }

  /* ==========================================================================
     06 · JOIN & FOOTER
     ========================================================================== */
  function join(full, desktop) {
    gsap.set('.inquiry', full ? { opacity: 0, y: 30 } : { opacity: 0 });
    once('.inquiry', 'top 90%', () => gsap.to('.inquiry', { opacity: 1, y: 0, duration: D.edit, ease: E.out }));
    if (!full) return;
    const letters = $$('.footer__big span');
    gsap.set(letters, { yPercent: 100 });
    once('.footer', 'top 80%', () => gsap.to(letters, { yPercent: 0, duration: D.cine, ease: E.cine, stagger: 0.07 }));
  }

  /* ---------- microinteraction: magnetic primary CTAs (fine pointers, full motion) ---------- */
  function magnetic(cleanups) {
    $$('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      const move = (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - (r.left + r.width / 2)) * 0.22); yTo((e.clientY - (r.top + r.height / 2)) * 0.32); };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      cleanups.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); gsap.set(el, { clearProps: 'x,y' }); });
    });
  }

  /* ==========================================================================
     Build — on load, on motion-mode switch and on breakpoint change
     ========================================================================== */
  function build(mode) {
    const full = mode === 'full';
    if (mm) {
      mm.revert();
      // The scroll tweens recorded the opening's *start* state as their revert state
      // (they were created right after it). Reverting them on resize / zoom / breakpoint
      // change would freeze the hero in that start state, so finish the opening and
      // hand the hero back to plain CSS before rebuilding.
      if (opening) opening.progress(1);
      gsap.set(HERO_PARTS, { clearProps: 'all' });
    }
    if (!opening) opening = playOpening(full);
    mm = gsap.matchMedia();

    mm.add({ desktop: '(min-width: 901px)', mobile: '(max-width: 900px)', fine: '(hover: hover) and (pointer: fine)' }, (ctx) => {
      const { desktop, fine } = ctx.conditions;
      const cleanups = [];
      heroScroll(full, desktop, fine, cleanups);
      headlines(full);
      quietFades(full);
      philosophy(full, desktop);
      training(full, cleanups);
      membership(full, desktop, cleanups);
      campaign(full, desktop, cleanups);
      join(full, desktop);
      if (full && desktop && fine) magnetic(cleanups);
      return () => cleanups.forEach((fn) => fn());
    });

    release();
    ScrollTrigger.refresh();
  }

  /* ---------- measurement upkeep: late images, fonts, hash links ---------- */
  let rt;
  const refreshSoon = () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 150); };
  $$('img').forEach((img) => { if (!img.complete) { img.addEventListener('load', refreshSoon, { once: true }); img.addEventListener('error', refreshSoon, { once: true }); } });
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
    if (location.hash) { const t = $(location.hash); if (t) t.scrollIntoView(); }
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshSoon);

  build(root.dataset.motion || 'full');
  window.addEventListener('forge:motion', (e) => {
    build(e.detail);
  });
})();

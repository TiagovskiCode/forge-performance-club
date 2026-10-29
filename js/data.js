/* ==========================================================================
   FORGE — central content & pricing
   Everything below is ILLUSTRATIVE CONCEPT DATA (fictional business, USD).
   Edit prices, allowances and policies here — the pricing section, plan
   selector, comparison table, extras list and form drop-down all read from it.
   ========================================================================== */
window.FORGE_DATA = {
  currency: '$',

  // Form submission. Leave empty for the front-end demo (nothing is sent).
  // To connect a real service, set e.g. 'https://formspree.io/f/xxxxxxx' —
  // the form will POST JSON there and show the confirmation on success.
  formEndpoint: '',

  policies: {
    joiningFee: 'No joining fee (proposed policy).',
    billing: 'Billed monthly, in advance.',
    term: 'Month-to-month — no minimum commitment (proposed policy).',
    cancellation: 'Cancel any time; it takes effect at the end of the current billing month.',
    changes: 'Upgrade immediately; downgrades apply from the next billing date.'
  },

  plans: [
    {
      id: 'access',
      name: 'FORGE Access',
      price: 49,
      tagline: 'A premium place to train, on your own terms.',
      for: 'Experienced lifters and self-directed members who want the room, the equipment and the freedom to follow their own programme.',
      includes: [
        'Gym access during standard operating hours',
        'Strength and conditioning areas',
        'Independent workouts',
        'Member orientation (one session, 30 min)',
        'Mobility & recovery area, lockers and showers'
      ],
      limits: 'No group or coaching sessions included. Coaching can be added at the extras prices below.',
      cta: 'Choose Access'
    },
    {
      id: 'performance',
      name: 'FORGE Performance',
      price: 79,
      featured: true,
      tagline: 'Structure and support around your training.',
      for: 'Members who want more structure: coached conditioning, a written plan and someone checking your progress.',
      includes: [
        'Everything in FORGE Access',
        '4 group-conditioning sessions per month (45 min each)',
        'Training-plan review every 3 months',
        'Priority booking on selected group sessions',
        'Progress tracking & training guidance'
      ],
      limits: 'Unused group sessions do not roll over. Group sessions are capped by class size.',
      cta: 'Choose Performance'
    },
    {
      id: 'elite',
      name: 'FORGE Elite',
      price: 129,
      tagline: 'Personal coaching built into your membership.',
      for: 'Members who want a personalised plan and regular one-to-one time with a coach.',
      includes: [
        'Everything in FORGE Performance',
        '2 personal-coaching sessions per month (60 min each)',
        'Individual goal-setting consultation (60 min, at start)',
        'Personalised programming review each month',
        'Priority coaching-booking access'
      ],
      limits: 'Not unlimited: 2 coaching sessions per month, no rollover. Extra sessions at the single-session price.',
      cta: 'Choose Elite'
    }
  ],

  // Rows for the comparison table: [label, access, performance, elite]
  compare: [
    ['Gym access (standard hours)', '✓', '✓', '✓'],
    ['Member orientation', '30 min', '30 min', '30 min'],
    ['Recovery area, lockers & showers', '✓', '✓', '✓'],
    ['Group-conditioning sessions', '—', '4 / month', '4 / month'],
    ['Training-plan review', '—', 'Every 3 months', 'Monthly'],
    ['Personal coaching', '—', '—', '2 × 60 min / month'],
    ['Goal-setting consultation', '—', '—', '60 min'],
    ['Priority booking', '—', 'Group sessions', 'Group + coaching'],
    ['Joining fee', '$0', '$0', '$0']
  ],

  extras: [
    { name: 'Personal coaching — single session', detail: '60 minutes, one-to-one', price: 35 },
    { name: 'Personal coaching — 4-session package', detail: '4 × 60 minutes · $30 per session', price: 120 },
    { name: 'Personal coaching — 8-session package', detail: '8 × 60 minutes · $28 per session', price: 224 },
    { name: 'Introductory assessment', detail: '45 minutes · redeemable against your first month', price: 20 }
  ]
};

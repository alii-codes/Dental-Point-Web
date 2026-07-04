// ============ SYMPTOM TRIAGE TOOL ============
const triageData = {
  pain: {
    tag: "Possibly urgent",
    urgent: true,
    title: "Sounds like it could be a cavity or infection.",
    text: "Sharp or throbbing tooth pain is often a sign of decay reaching the nerve, or an infection. Don't wait on this it rarely improves on its own.",
    cta: "Book emergency slot"
  },
  bleeding: {
    tag: "Common, but check it",
    urgent: false,
    title: "Likely early gum inflammation (gingivitis).",
    text: "Bleeding when you brush or floss usually means plaque buildup along the gumline. A professional cleaning within the next couple of weeks usually resolves it.",
    cta: "Book a cleaning"
  },
  broken: {
    tag: "Urgent",
    urgent: true,
    title: "A chipped or broken tooth needs same-day attention.",
    text: "Even painless chips can expose the tooth to bacteria. Save any broken piece if you can, avoid chewing on that side, and come in today if possible.",
    cta: "Book emergency slot"
  },
  sensitivity: {
    tag: "Worth a check",
    urgent: false,
    title: "Could be enamel wear or a small cavity.",
    text: "Cold sensitivity is often from thinning enamel, a receding gumline, or the start of a cavity. A quick exam will pinpoint the cause.",
    cta: "Book a check-up"
  },
  checkup: {
    tag: "Routine",
    urgent: false,
    title: "Great let's keep things that way.",
    text: "A routine cleaning and exam every 6 months catches problems before they start. We'll also do a quick oral cancer screening at no extra cost.",
    cta: "Book a check-up"
  },
  cosmetic: {
    tag: "Cosmetic consult",
    urgent: false,
    title: "Let's talk veneers, whitening, or alignment.",
    text: "We'll do a free 15-minute smile consult to map out realistic options and pricing before you commit to anything.",
    cta: "Book smile consult"
  }
};

const triageOptions = document.getElementById('triageOptions');
if (triageOptions) {
  const result = document.getElementById('triageResult');
  const tagEl = document.getElementById('triageTag');
  const titleEl = document.getElementById('triageTitle');
  const textEl = document.getElementById('triageText');
  const ctaEl = document.getElementById('triageCta');

  triageOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('.triage-opt');
    if (!btn) return;

    triageOptions.querySelectorAll('.triage-opt').forEach(o => o.classList.remove('selected'));
    btn.classList.add('selected');

    const data = triageData[btn.dataset.key];
    tagEl.textContent = data.tag;
    titleEl.textContent = data.title;
    textEl.textContent = data.text;
    ctaEl.textContent = data.cta;
    result.classList.toggle('urgent', data.urgent);
    result.classList.add('show');
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// ============ PRICE ESTIMATOR ============
const priceRanges = {
  cleaning:   { low: 2500,  high: 5000,   note: "Covers scaling, polishing, and a basic exam." },
  filling:    { low: 3000,  high: 8000,   note: "Depends on cavity size and filling material." },
  rootcanal:  { low: 15000, high: 35000,  note: "Varies by tooth location and number of canals." },
  whitening:  { low: 8000,  high: 20000,  note: "In clinic whitening, single session." },
  veneer:     { low: 18000, high: 45000,  note: "Per tooth, porcelain veneer." },
  implant:    { low: 60000, high: 150000, note: "Includes implant post; crown priced separately." },
  invisalign: { low: 180000, high: 350000, note: "Full treatment, depends on case complexity." }
};

const procedureSelect = document.getElementById('procedureSelect');
if (procedureSelect) {
  const rangeEl = document.getElementById('estimateRange');
  const captionEl = document.getElementById('estimateCaption');

  procedureSelect.addEventListener('change', () => {
    const val = procedureSelect.value;
    if (!val) {
      rangeEl.textContent = "PKR — ";
      captionEl.textContent = "Choose a procedure to see pricing.";
      return;
    }
    const p = priceRanges[val];
    rangeEl.textContent = `PKR ${p.low.toLocaleString()} – ${p.high.toLocaleString()}`;
    captionEl.textContent = p.note + " Final quote confirmed at your exam.";
  });
}

// ============ BEFORE/AFTER SLIDER (used on gallery page) ============
document.querySelectorAll('.ba-slider').forEach(slider => {
  const after = slider.querySelector('.after');
  const handle = slider.querySelector('.handle');
  if (!after || !handle) return;

  const setPos = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;
  };

  let dragging = false;
  slider.addEventListener('mousedown', () => dragging = true);
  window.addEventListener('mouseup', () => dragging = false);
  window.addEventListener('mousemove', (e) => { if (dragging) setPos(e.clientX); });
  slider.addEventListener('touchmove', (e) => setPos(e.touches[0].clientX));
  slider.addEventListener('click', (e) => setPos(e.clientX));
});

// ============ GALLERY FILTER (used on gallery page) ============
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  const items = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('visible', show);
      });
    });
  });
}

// ============ INTERACTIVE TOOTH MAP (services page) ============
const toothData = {
  front: {
    tag: "Front teeth (incisors)",
    title: "Chips, gaps, whitening, veneers.",
    text: "Front teeth do the most visible work, so they're where cosmetic concerns show up most chips from biting something hard, staining, or small gaps. Veneers and whitening are the most common fixes.",
    href: "#veneers"
  },
  canine: {
    tag: "Canines",
    title: "Wear, sensitivity, alignment.",
    text: "Canines take heavy pressure when you bite and tear food, so they're prone to enamel wear and sensitivity over time. They're also key anchor points in orthodontic treatment like Invisalign.",
    href: "#invisalign"
  },
  premolar: {
    tag: "Premolars",
    title: "Cavities, fillings, cracked teeth.",
    text: "The grooves on premolars trap food and plaque easily, making them common spots for cavities. A crack here often shows up as sharp pain when chewing.",
    href: "#root-canal"
  },
  molar: {
    tag: "Molars",
    title: "Deep cavities, root canals, extractions.",
    text: "Molars do the heaviest grinding work and are hardest to clean, so decay here tends to go deeper before it's noticed often requiring a root canal or, in later stages, extraction.",
    href: "#root-canal"
  }
};

const toothMapSvg = document.querySelector('.tooth-map-svg');
if (toothMapSvg) {
  const panel = document.getElementById('toothPanel');
  const tagEl = document.getElementById('toothTag');
  const titleEl = document.getElementById('toothTitle');
  const textEl = document.getElementById('toothText');
  const ctaEl = document.getElementById('toothCta');
  const allTeeth = toothMapSvg.querySelectorAll('.tooth');

  toothMapSvg.addEventListener('click', (e) => {
    const tooth = e.target.closest('.tooth');
    if (!tooth) return;

    allTeeth.forEach(t => t.classList.remove('active'));
    // highlight all teeth in the same region for clarity
    const region = tooth.dataset.region;
    allTeeth.forEach(t => { if (t.dataset.region === region) t.classList.add('active'); });

    const data = toothData[region];
    tagEl.textContent = data.tag;
    titleEl.textContent = data.title;
    textEl.textContent = data.text;
    ctaEl.href = data.href;
    ctaEl.style.display = 'inline-flex';
  });
}

// ============ BOOKING FORM (contact page) ============
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  const confirmBox = document.getElementById('bookingConfirm');
  const summaryEl = document.getElementById('confirmSummary');
  const bookAnotherBtn = document.getElementById('bookAnother');

  // --- CallMeBot WhatsApp auto-send config ---
  // 1. Save +34 621 96 43 51 in WhatsApp, message it "I allow callmebot to send me messages"
  // 2. It replies with an API key — paste that number below.
  // 3. Replace CLINIC_WHATSAPP_NUMBER with the doctor's number in international format (no + or spaces).
  const CLINIC_WHATSAPP_NUMBER = "923438867978";   // TODO: replace with real number
  const CALLMEBOT_API_KEY = "YOUR_API_KEY_HERE"; // TODO: replace with real key

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value.trim();

    const waMessage =
      `New appointment request:\n` +
      `Name: ${name || "-"}\n` +
      `Phone: ${phone || "-"}\n` +
      `Service: ${service || "-"}\n` +
      `Date: ${date || "-"}\n` +
      `Time: ${time || "-"}` +
      (notes ? `\nNotes: ${notes}` : "");

    // Fire the WhatsApp message automatically in the background.
    // mode: 'no-cors' because CallMeBot doesn't return CORS headers —
    // we don't need to read the response, just trigger the send.
    if (CALLMEBOT_API_KEY !== "YOUR_API_KEY_HERE") {
      const callMeBotUrl =
        `https://api.callmebot.com/whatsapp.php?phone=${CLINIC_WHATSAPP_NUMBER}` +
        `&text=${encodeURIComponent(waMessage)}&apikey=${CALLMEBOT_API_KEY}`;

      fetch(callMeBotUrl, { mode: 'no-cors' }).catch(() => {
        // Silently ignore — no-cors responses can't be inspected anyway.
        // If this fails, the patient still sees their confirmation below,
        // but the clinic should also check the site's booking log if you add one.
      });
    } else {
      console.warn("CallMeBot API key not set — WhatsApp message was not sent. See main.js.");
    }

    summaryEl.textContent = `Thanks, ${name || "there"} we've noted your request for ${service || "a visit"} on ${date || "your preferred date"} (${time || "a time to be confirmed"}).`;

    bookingForm.style.display = 'none';
    confirmBox.style.display = 'block';
    confirmBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', () => {
      bookingForm.reset();
      bookingForm.style.display = 'block';
      confirmBox.style.display = 'none';
      bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

// ============ MOBILE NAV ============
const navToggleBtn = document.getElementById('navToggleBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggleBtn && mobileMenu) {
  navToggleBtn.addEventListener('click', () => {
    navToggleBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close the menu when a link inside it is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggleBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu if window is resized back to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && mobileMenu.classList.contains('open')) {
      navToggleBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

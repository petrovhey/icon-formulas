const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  siteNav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-slider]').forEach((slider) => {
  const track = slider.querySelector('.product-slider__track');
  const slides = slider.querySelectorAll('img');
  const count = slider.querySelector('.product-slider__count');
  let current = 0;
  const update = (next) => {
    current = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    count.textContent = `${current + 1} / ${slides.length}`;
  };
  slider.querySelector('.slider-control--prev')?.addEventListener('click', () => update(current - 1));
  slider.querySelector('.slider-control--next')?.addEventListener('click', () => update(current + 1));
});

const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const filter = button.dataset.filter;
  productCards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'all' && !card.dataset.category.split(' ').includes(filter)));
}));

const productDetails = {
  zinc: {title: 'Zinc Bisglycinate', summary: '25 mg elemental zinc in a high-purity Albion® TRAACS® chelate.', benefit: 'Supports normal hormone levels, skin, hair, nails, and immune & antioxidant function.', notes: ['120 capsules', 'Chelated bisglycinate form', 'Made and quality tested in the USA']},
  iron: {title: 'Iron Bisglycinate', summary: '36 mg elemental iron in a high-potency Ferrochel® chelate.', benefit: 'Supports normal energy metabolism and contributes to immune function in a form designed to be gentle on the stomach.', notes: ['90 capsules', 'Ferrochel® ferrous bisglycinate', 'Made and quality tested in the USA']},
  k2: {title: 'Vitamin K2 MK-7', summary: '120 mcg of MenaQ7® menaquinone-7.', benefit: 'Promotes bone health, supports cardiovascular health, and helps maintain calcium balance.', notes: ['120 capsules', 'MenaQ7® vitamin K2', 'Use the current label for directions']},
  magnesium200: {title: 'Magnesium Bisglycinate', summary: '200 mg elemental magnesium using Albion® TRAACS® chelate technology.', benefit: 'Supports muscle and nerve function, helps reduce fatigue and tiredness, and promotes energy metabolism.', notes: ['120 capsules', '200 mg elemental magnesium', 'Albion® TRAACS® chelate technology']},
  magnesium225: {title: 'Magnesium Bisglycinate', summary: '225 mg elemental magnesium using Albion® TRAACS® chelate technology.', benefit: 'Supports muscle and nerve function, helps reduce fatigue and tiredness, and promotes energy metabolism.', notes: ['90 capsules', '225 mg elemental magnesium', 'Albion® TRAACS® chelate technology']},
  magtein: {title: 'Magnesium L-Threonate', summary: '2,000 mg patented Magtein® with 144 mg elemental magnesium.', benefit: 'Supports brain health and memory, promotes cognitive function, and is built around a clinically studied magnesium form.', notes: ['90 capsules', 'Magtein® magnesium L-threonate', 'Use the current label for directions']}
};

const productPageSlugs = {zinc: 'zinc-bisglycinate', iron: 'iron-bisglycinate', k2: 'vitamin-k2-mk7', magnesium200: 'magnesium-bisglycinate-200', magnesium225: 'magnesium-bisglycinate-225', magtein: 'magnesium-l-threonate'};

// Reframe the home page around the visitor's first question: "what is this for?"
const homeMain = document.querySelector('#main-content');
const homeProductSection = document.querySelector('.product-section');
if (homeMain && homeProductSection) {
  const homeNav = document.querySelector('.site-nav');
  const shopLink = homeNav?.querySelector('a[href="#products"]');
  const standardLink = homeNav?.querySelector('a[href="#standard"]');
  const scienceLink = homeNav?.querySelector('a[href="#science"]');
  if (shopLink) { shopLink.href = '#finder'; shopLink.firstChild.textContent = 'Find your formula'; }
  if (standardLink) standardLink.firstChild.textContent = 'Our standard';
  if (scienceLink) { scienceLink.href = '#quality'; scienceLink.firstChild.textContent = 'Quality & sourcing'; }

  const heroTitle = document.querySelector('.hero h1');
  const heroLead = document.querySelector('.hero__lead');
  if (heroTitle) heroTitle.innerHTML = 'Support that<br>fits your <em>routine.</em>';
  if (heroLead) heroLead.textContent = 'Focused vitamins and minerals, chosen for a clear purpose — with a named form, a meaningful dose, and a label you can read.';

  const proofItems = document.querySelectorAll('.proof-strip__item');
  const proofCopy = [
    ['Benefits first', 'Start with the support you are looking for'],
    ['Named ingredient forms', 'Know the source behind the mineral'],
    ['Meaningful amounts', 'See the active dose on the front']
  ];
  proofItems.forEach((item, index) => {
    const strong = item.querySelector('strong');
    const detail = item.querySelector('span:last-child');
    if (strong && proofCopy[index]) strong.textContent = proofCopy[index][0];
    if (detail && proofCopy[index]) detail.textContent = proofCopy[index][1];
  });

  const finder = document.createElement('section');
  finder.className = 'formula-finder section-shell';
  finder.id = 'finder';
  finder.innerHTML = '<div class="section-kicker">Start with your goal</div><div class="formula-finder__heading"><h2>Find the formula<br>that fits <em>you.</em></h2><p>Choose the support you are shopping for. We will show you the formulas built around that purpose, then let you inspect the form and dose.</p></div><div class="formula-finder__grid"><button type="button" data-goal="foundation"><span>01</span><strong>Daily foundation</strong><small>Essential mineral support for everyday consistency.</small><b>See foundational formulas ↘</b></button><button type="button" data-goal="energy"><span>02</span><strong>Energy &amp; recovery</strong><small>Iron and magnesium for the demands of the day.</small><b>See energy formulas ↘</b></button><button type="button" data-goal="brain"><span>03</span><strong>Brain &amp; focus</strong><small>A focused magnesium form for cognitive support.</small><b>See brain formula ↘</b></button><button type="button" data-goal="bones"><span>04</span><strong>Bones &amp; balance</strong><small>Forms selected for calcium and bone support.</small><b>See balance formula ↘</b></button></div></section>';
  homeProductSection.insertAdjacentElement('beforebegin', finder);

  const provenance = document.createElement('section');
  provenance.className = 'provenance-section section-shell';
  provenance.id = 'quality';
  provenance.innerHTML = '<div class="provenance-section__intro"><div><div class="section-kicker">From source to bottle</div><h2>Premium is a<br><em>process.</em></h2></div><p>Every formula should answer more than “how many milligrams?” We show the ingredient form, the branded source when relevant, the active amount, and where the product is made — so your decision is based on information, not noise.</p></div><div class="provenance-section__steps"><article><span>Ingredient form</span><strong>Why this form?</strong><p>Bisglycinate, L-Threonate, or MK-7 is named because the form changes the conversation.</p></article><article><span>Branded source</span><strong>Who made it?</strong><p>Magtein®, Ferrochel®, Albion® TRAACS®, and MenaQ7® give the raw material a traceable identity.</p></article><article><span>Active amount</span><strong>What is the dose?</strong><p>Elemental amounts and serving sizes stay visible, so the number means something.</p></article><article><span>Finished bottle</span><strong>What can I verify?</strong><p>Made in the USA in a cGMP- and NSF-certified facility, with the label and facts kept in view.</p></article></div></section>';
  homeProductSection.insertAdjacentElement('beforebegin', provenance);

  finder.querySelectorAll('[data-goal]').forEach((button) => button.addEventListener('click', () => {
    const goal = button.dataset.goal;
    document.querySelectorAll('.filter-button').forEach((filterButton) => {
      filterButton.classList.toggle('is-active', filterButton.dataset.filter === goal);
    });
    document.querySelectorAll('.product-card').forEach((card) => {
      card.classList.toggle('is-hidden', !card.dataset.category.split(' ').includes(goal));
    });
    homeProductSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

document.querySelectorAll('.product-card[data-product]').forEach((card) => {
  const slug = productPageSlugs[card.dataset.product];
  const amazonLink = card.querySelector('.product-card__link');
  if (!slug || !amazonLink) return;
  const detailsLink = document.createElement('a');
  detailsLink.className = 'product-card__link product-card__link--detail';
  detailsLink.href = `products/${slug}.html`;
  detailsLink.textContent = 'Details ↗';
  amazonLink.insertAdjacentElement('afterend', detailsLink);
});

const modal = document.querySelector('#product-detail-modal');
const modalTitle = document.querySelector('#modal-title');
const modalSummary = document.querySelector('#modal-summary');
const modalBenefit = document.querySelector('#modal-benefit');
const modalNotes = document.querySelector('#modal-notes');
let lastFocused;
const closeModal = () => { modal.hidden = true; document.body.classList.remove('modal-open'); lastFocused?.focus(); };
const openModal = (key) => {
  const detail = productDetails[key];
  if (!detail) return;
  lastFocused = document.activeElement;
  modalTitle.textContent = detail.title;
  modalSummary.textContent = detail.summary;
  modalBenefit.textContent = detail.benefit;
  modalNotes.innerHTML = detail.notes.map((note) => `<li>${note}</li>`).join('');
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.detail-modal__close').focus();
};
document.querySelectorAll('.detail-trigger').forEach((button) => button.addEventListener('click', (event) => {
  event.stopPropagation();
  openModal(button.closest('.product-card').dataset.product);
}));
modal?.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
});

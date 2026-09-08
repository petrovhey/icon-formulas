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

// Horizontal screenshot carousels. Touch/trackpad swipe works natively via an
// overflow-x-auto + scroll-snap track; desktop gets prev/next buttons and dots.
// Idempotent: a data-flag prevents double-binding if this runs more than once.

const ACTIVE_DOT = ['bg-accent-400', 'w-5'];
const INACTIVE_DOT = ['bg-fog-500/40', 'w-2'];

function initCarousel(root: HTMLElement): void {
  if (root.dataset.carouselReady === 'true') return;
  root.dataset.carouselReady = 'true';

  const track = root.querySelector<HTMLElement>('[data-track]');
  if (!track) return;
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-dot]'));

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth';

  // Each slide is exactly one track-width wide, so the carousel pages one
  // screenshot at a time regardless of the phone-frame size inside it.
  const currentIndex = (): number =>
    track.clientWidth > 0
      ? Math.round(track.scrollLeft / track.clientWidth)
      : 0;

  const scrollToIndex = (i: number): void => {
    const clamped = Math.max(0, Math.min(i, slides.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior });
  };

  const atStart = (): boolean => track.scrollLeft <= 1;
  const atEnd = (): boolean =>
    track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

  let ticking = false;
  const sync = (): void => {
    ticking = false;
    const idx = currentIndex();
    dots.forEach((dot, i) => {
      const active = i === idx;
      dot.classList.remove(...(active ? INACTIVE_DOT : ACTIVE_DOT));
      dot.classList.add(...(active ? ACTIVE_DOT : INACTIVE_DOT));
    });
    if (prev) prev.disabled = atStart();
    if (next) next.disabled = atEnd();
  };
  const onScroll = (): void => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(sync);
    }
  };

  prev?.addEventListener('click', () => scrollToIndex(currentIndex() - 1));
  next?.addEventListener('click', () => scrollToIndex(currentIndex() + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => scrollToIndex(i)));

  // Arrow-key navigation when the track is focused.
  track.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToIndex(currentIndex() + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToIndex(currentIndex() - 1);
    }
  });

  track.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  sync();
}

export function initCarousels(): void {
  document
    .querySelectorAll<HTMLElement>('[data-carousel]')
    .forEach((el) => initCarousel(el));
}

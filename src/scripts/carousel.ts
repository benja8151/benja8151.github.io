// Transform-based screenshot carousel: a dominant centered slide with dimmed,
// edge-faded peeks of the neighbours, pointer-drag swipe (touch + mouse),
// desktop prev/next buttons, dots and keyboard support. Non-looping: it clamps
// at the first/last slide and disables the arrows there.
//
// Position is controlled via `transform: translateX(...)` on the track (not
// native scroll), so the centered slide + peeks are laid out precisely.

const DIMMED_SLIDE = ['opacity-40', 'scale-[0.92]'];
const ACTIVE_DOT = ['bg-accent-400', 'w-5'];
const INACTIVE_DOT = ['bg-fog-500/40', 'w-2'];
const TRANSITION = 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)';
// Drag distance (fraction of a slide step) needed to advance a slide.
const SWIPE_FRACTION = 0.2;

function initCarousel(root: HTMLElement): void {
  if (root.dataset.carouselReady === 'true') return;
  root.dataset.carouselReady = 'true';

  const viewport = root.querySelector<HTMLElement>('[data-viewport]');
  const track = root.querySelector<HTMLElement>('[data-track]');
  if (!viewport || !track) return;
  const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-dot]'));
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const n = slides.length;
  if (n === 0) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;

  // translateX that centers slide `i` in the viewport.
  const offsetFor = (i: number): number => {
    const slide = slides[i];
    return viewport.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2);
  };

  const setTransform = (x: number, animate: boolean): void => {
    track.style.transition = animate && !prefersReduced ? TRANSITION : 'none';
    track.style.transform = `translateX(${x}px)`;
  };

  const render = (): void => {
    slides.forEach((slide, i) => {
      const active = i === index;
      for (const cls of DIMMED_SLIDE) slide.classList.toggle(cls, !active);
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.remove(...(active ? INACTIVE_DOT : ACTIVE_DOT));
      dot.classList.add(...(active ? ACTIVE_DOT : INACTIVE_DOT));
    });
    if (prev) prev.disabled = index <= 0;
    if (next) next.disabled = index >= n - 1;
  };

  const goTo = (raw: number, animate = true): void => {
    index = Math.max(0, Math.min(raw, n - 1));
    setTransform(offsetFor(index), animate);
    render();
  };

  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  viewport.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  });

  // --- Pointer drag / swipe (unifies touch + mouse via Pointer Events).
  let dragging = false;
  let startX = 0;
  let baseX = 0;
  const step = (): number => {
    const s = slides[0];
    const gap = slides[1] ? slides[1].offsetLeft - (s.offsetLeft + s.offsetWidth) : 0;
    return s.offsetWidth + Math.max(0, gap);
  };

  const onPointerDown = (e: PointerEvent): void => {
    if (e.button != null && e.button !== 0) return;
    dragging = true;
    startX = e.clientX;
    baseX = offsetFor(index);
    setTransform(baseX, false);
    viewport.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent): void => {
    if (!dragging) return;
    setTransform(baseX + (e.clientX - startX), false);
  };
  const onPointerUp = (e: PointerEvent): void => {
    if (!dragging) return;
    dragging = false;
    viewport.releasePointerCapture?.(e.pointerId);
    const delta = e.clientX - startX;
    const moved = Math.round(delta / step());
    let target = index - moved;
    if (moved === 0 && Math.abs(delta) > step() * SWIPE_FRACTION) {
      target = index - Math.sign(delta);
    }
    goTo(target);
  };

  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', onPointerUp);
  viewport.addEventListener('pointercancel', onPointerUp);

  // Keep centered on resize / late layout (images, fonts).
  const recenter = (): void => setTransform(offsetFor(index), false);
  window.addEventListener('resize', recenter, { passive: true });
  window.addEventListener('load', recenter);
  if ('ResizeObserver' in window) new ResizeObserver(recenter).observe(viewport);

  goTo(0, false);
}

export function initCarousels(): void {
  document
    .querySelectorAll<HTMLElement>('[data-carousel]')
    .forEach((el) => initCarousel(el));
}

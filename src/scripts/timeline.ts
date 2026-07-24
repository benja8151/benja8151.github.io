// Scroll-linked experience timeline: reveals each role as it enters view and
// fills a progress rail whose tip is pinned to a fixed viewport line as the
// section scrolls past. NOT scroll-hijacking — normal scrolling drives
// everything. Fully degrades under reduced motion / no IntersectionObserver.
//
// Returns a cleanup function that disconnects observers and removes listeners,
// so the module is safe to re-init (e.g. View Transitions, hot reload).

// Single source of truth for the "active dot" styling so the on/off toggles
// can never drift out of sync.
const ACTIVE_DOT_CLASSES = ['!bg-accent-500', '!border-accent-300'];

// The fill tip (and the active-dot boundary) tracks this fraction of the
// viewport height. 0.5 = vertical center: the indicator stays put on screen
// while the roles scroll through it.
const REFERENCE_FRACTION = 0.5;

// Dot center offset from a timeline item's top: `top-1.5` (6px) + half of
// `h-4` (8px). Used to decide when a role's dot has passed the reference line.
const DOT_CENTER_OFFSET = 14;

export function initTimeline(): () => void {
  const noop = () => {};
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  const items = Array.from(document.querySelectorAll<HTMLElement>('.timeline-item'));
  const timeline = document.getElementById('timeline');
  const fill = document.getElementById('rail-fill');

  const setDotActive = (item: HTMLElement, active: boolean): void => {
    const dot = item.querySelector<HTMLElement>('.timeline-dot');
    if (!dot) return;
    for (const cls of ACTIVE_DOT_CLASSES) dot.classList.toggle(cls, active);
  };

  // Static fallback: show everything, fill the rail, mark every dot as reached.
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    items.forEach((item) => setDotActive(item, true));
    if (fill) fill.style.height = '100%';
    return noop;
  }

  // Reveal each element once as it enters view, then stop observing it.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Scroll-linked rail fill + active dots, computed together from geometry so
  // there is exactly one consistent "current" position (no threshold races).
  let ticking = false;
  const update = (): void => {
    ticking = false;
    if (!timeline || !fill) return;

    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    if (vh <= 0 || rect.height <= 0) {
      fill.style.height = '0px';
      return;
    }

    const referenceY = vh * REFERENCE_FRACTION;
    // Fill from the timeline top down to the reference line. Because the fill's
    // top is the (scrolling) timeline top and its height is exactly
    // (referenceY - rect.top), the fill's bottom edge sits on referenceY for
    // the whole traversal — the indicator never scrolls off screen.
    const filledPx = Math.min(Math.max(referenceY - rect.top, 0), rect.height);
    fill.style.height = `${filledPx}px`;

    // A role's dot is "reached" once its center has passed the reference line.
    for (const item of items) {
      const dotY = item.getBoundingClientRect().top + DOT_CENTER_OFFSET;
      setDotActive(item, dotY <= referenceY);
    }
  };

  const onScroll = (): void => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  return () => {
    revealObserver.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

// Scroll-linked experience timeline: reveals each role as it enters view and
// fills a progress rail as the section scrolls past. NOT scroll-hijacking —
// normal scrolling drives everything. Fully degrades under reduced motion.

export function initTimeline(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Generic reveal for any .reveal element on the page.
  const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    const fill = document.getElementById('rail-fill');
    if (fill) fill.style.height = '100%';
    return;
  }

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

  // Highlight the active timeline dot as roles enter view.
  const items = Array.from(document.querySelectorAll<HTMLElement>('.timeline-item'));
  const activeClasses = ['!bg-accent-500', '!border-accent-300'];
  const dotObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const dot = entry.target.querySelector<HTMLElement>('.timeline-dot');
        if (!dot) continue;
        dot.classList.toggle('!bg-accent-500', entry.isIntersecting);
        dot.classList.toggle('!border-accent-300', entry.isIntersecting);
      }
    },
    { threshold: 0.6 },
  );
  items.forEach((item) => dotObserver.observe(item));
  void activeClasses;

  // Progress rail fill tied to scroll position through the timeline.
  const timeline = document.getElementById('timeline');
  const fill = document.getElementById('rail-fill');
  if (timeline && fill) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const progressed = Math.min(Math.max(vh * 0.5 - rect.top, 0), total);
      const pct = Math.min((progressed / total) * 100, 100);
      fill.style.height = `${pct}%`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }
}

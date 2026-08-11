// Fires a single `scroll-reached-end` Umami event the first time the visitor
// reaches the end of the page (the Contact footer becomes visible). It's a
// no-op when Umami isn't loaded (e.g. local dev, or a Do-Not-Track visitor),
// thanks to optional chaining on `window.umami`.

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

export function initAnalytics(): void {
  const target = document.getElementById('contact');
  if (!target || !('IntersectionObserver' in window)) return;

  let fired = false;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          window.umami?.track('scroll-reached-end');
          observer.disconnect();
        }
      }
    },
    { threshold: 0.25 },
  );

  observer.observe(target);
}

'use client';
import { useEffect } from 'react';

export function ScrollExperience() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.service-card,.plan-card,.market-card,.step');
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

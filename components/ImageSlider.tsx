'use client';
import { useEffect, useState } from 'react';

// Slideshow de imagens com fade e zoom lento (sensação de vídeo). Usado no card Quem Somos.
export function ImageSlider({ images, interval = 5000, label, className = '' }: { images: string[]; interval?: number; label?: string; className?: string }) {
  const [active, setActive] = useState(0);
  const many = images.length > 1;

  useEffect(() => {
    if (!many) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % images.length), interval);
    return () => window.clearInterval(id);
  }, [images.length, interval, many]);

  return (
    <div className={`img-slider ${className}`}>
      <div className="img-slider-stage" aria-hidden="true">
        {images.map((src, i) => (
          <div key={src} className={`img-slide ${i === active ? 'is-active' : ''}`} style={{ backgroundImage: `url('${src}')` }} />
        ))}
      </div>
      {many && (
        <div className="img-slider-dots" role="group" aria-label={label}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`img-slider-dot ${i === active ? 'is-active' : ''}`}
              aria-label={label ? `${label} ${i + 1}` : `${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

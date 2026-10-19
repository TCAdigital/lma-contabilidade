'use client';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="faq-items">
      {items.map(({ q, a }, i) => (
        <div className={`faq-item ${active === i ? 'faq-active' : ''}`} key={q}>
          <button aria-expanded={active === i} aria-controls={`faq-answer-${i}`} onClick={() => setActive(active === i ? null : i)}>
            <span>{q}</span>
            {active === i ? <Minus size={19} /> : <Plus size={19} />}
          </button>
          <div id={`faq-answer-${i}`} className="faq-answer" hidden={active !== i}>
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

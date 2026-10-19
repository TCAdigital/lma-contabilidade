import Image from 'next/image';

// href = null: a logo não vira link (usado nas páginas internas, sem link para a página inicial).
export function Brand({ inverse = false, label, href = '#inicio' }: { inverse?: boolean; label: string; href?: string | null }) {
  const image = <Image src={inverse ? '/lma-logo-light.png' : '/lma-logo.png'} alt="LMA Accounting" width={1094} height={451} priority className="brand-image" />;
  if (!href) return <span className="brand" aria-label={label}>{image}</span>;
  return (
    <a href={href} className="brand" aria-label={label}>
      {image}
    </a>
  );
}

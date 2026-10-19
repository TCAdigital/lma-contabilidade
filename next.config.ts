import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  // Evita que o Next.js use um lockfile fora da pasta do projeto como raiz.
  outputFileTracingRoot: path.join(__dirname),
  // O site está organizado por idioma (/pt, /en, /ar). A raiz leva ao português.
  async redirects() {
    return [{ source: '/', destination: '/pt', permanent: false }];
  },
};

export default nextConfig;

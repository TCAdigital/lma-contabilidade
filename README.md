# LMA Contabilidade — Front-end 2026

Landing page institucional mobile-first, em **Next.js App Router + React + TypeScript**, desenvolvida com base na identidade LMA e inspirada na lógica de apresentação do site Azucon (sem replicar sua marca).

## Executar no VS Code

1. Instale Node.js 20 ou mais recente.
2. Abra esta pasta no VS Code.
3. No terminal, execute:

```bash
npm install
npm run dev
```

4. Abra http://localhost:3000

Para validar a versão de produção:

```bash
npm run build
npm run start
```

## Organização
- `app/[locale]/` — rotas por idioma: `/pt` (padrão, `/` redireciona), `/en` e `/ar`. O layout define `lang` e `dir` (árabe em RTL).
- `lib/i18n/` — textos de cada idioma: `pt.ts` (referência), `en.ts`, `ar.ts`, e `index.ts` com os idiomas e o alternador.
- `components/Home.tsx` — seções da landing page, recebendo o dicionário do idioma.
- `components/Header.tsx`, `FaqList.tsx`, `ScrollExperience.tsx` — partes interativas (cliente).
- `app/globals.css` — toda a identidade visual responsiva.
- `lib/content.ts` — dados que não mudam entre idiomas (contatos, WhatsApp, links e estrutura de serviços e planos). Os textos ficam em `lib/i18n/`.
- `public/` — logomarcas originais enviadas.
- `app/[locale]/layout.tsx` — metadados SEO por idioma, hreflang, Open Graph e JSON-LD.
- `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt` — arquivos auxiliares para rastreamento e descobribilidade.

## Antes de publicar
- **Confirmar escopo dos planos BUSINESS e ELITE**. Os investimentos estão como “Sob consulta” em `lib/content.ts` até a definição comercial.
- **Confirmar CNPJ, nome jurídico, endereços, telefones e presença internacional** antes de acrescentá-los ao schema ou rodapé. O schema identifica a marca como LMA Contabilidade, sem atribuir CNPJ não verificado. O WhatsApp usa o número divulgado no site atual.
- **Verificar as URLs das páginas de serviço**: o layout contém links para o site atual, mas os slugs podem mudar; atualizar para as novas rotas ao migrar.
- **WhatsApp integrado** no widget fixo, nos CTAs de planos e no contato comercial. O formulário ainda aponta para a página de contato do site atual e não simula envio.
- **Validar páginas legais** e migrar o conteúdo das páginas antigas para novas rotas relevantes.
- O FAQ schema é uma descrição estruturada, não garantia de rich result. `llms.txt` é uma convenção emergente, não substitui boas práticas de conteúdo, backlinks, performance e indexação.
- Se o novo site for publicado em outro domínio, mudar `website.domain` em `lib/content.ts` e revisar URL canônica.
- O arquivo de fontes utiliza Google Fonts por CSS. Para hospedagem com maior controle de privacidade/performance, mover para `next/font` antes de publicar.

## SEO implementado
HTML semântico, heading hierárquico, `lang=pt-BR`, metadados de título e descrição, canonical, Open Graph, imagem OG dinâmica, Twitter card, sitemap, robots, dados estruturados de organização/serviço contábil/WebSite/FAQ, conteúdo legível por SSR, links contextuais e FAQ legível por buscadores. Todo o conteúdo crítico está no HTML inicial.

## Responsividade e acessibilidade
Menu mobile acessível, controles com `aria-expanded`, navegação por teclado, skip-link, respeito a `prefers-reduced-motion`, imagens com alt, áreas de toque amplas, responsividade por breakpoints e animações não essenciais.

## Aviso de escopo
Esta é uma **primeira versão de front-end institucional** para aprovação visual. Não inclui back-end, CRM, envio real de formulários, painel administrativo ou páginas internas finais.

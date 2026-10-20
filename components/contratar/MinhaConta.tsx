'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Check, UploadCloud, RefreshCw, LogOut, Pencil } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getFormDict } from '@/lib/i18n/form';
import { type Contratacao, loadContratacao, saveContratacao, clearAuth, planoNome } from '@/lib/contratar';
import { FlowHeader } from './FlowHeader';

type Props = { locale: Locale; loginHref: string; plansHref: string };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="conta-row">
      <span>{label}</span>
      <strong>{value || '—'}</strong>
    </div>
  );
}

export function MinhaConta({ locale, loginHref, plansHref }: Props) {
  const f = getFormDict(locale);
  const [hydrated, setHydrated] = useState(false);
  const [data, setData] = useState<Contratacao | null>(null);
  const [editP, setEditP] = useState(false);
  const [editE, setEditE] = useState(false);

  useEffect(() => {
    setData(loadContratacao());
    setHydrated(true);
  }, []);

  const persist = (next: Contratacao) => {
    setData(next);
    saveContratacao(next);
  };

  const uploadDoc = (i: number, file: File | null) => {
    if (!data) return;
    persist({ ...data, documentos: data.documentos.map((d, j) => (j === i ? { ...d, arquivo: file ? file.name : d.arquivo } : d)) });
  };

  const logout = () => {
    clearAuth();
    window.location.href = loginHref;
  };

  if (!hydrated) {
    return <FlowHeader locale={locale} brandAria={f.brandAria} langLabel={f.langLabel} path="/minha-conta" />;
  }

  if (!data) {
    return (
      <>
        <FlowHeader locale={locale} brandAria={f.brandAria} langLabel={f.langLabel} path="/minha-conta" />
        <main className="flow-main">
          <div className="container flow-empty">
            <h1>{f.conta.title}</h1>
            <p className="flow-sub">{f.conta.empty}</p>
            <a className="button button-orange" href={plansHref}>
              {f.conta.goContratar} <ArrowRight size={18} />
            </a>
          </div>
        </main>
      </>
    );
  }

  const p = data.pessoais;
  const e = data.empresa;

  return (
    <>
      <FlowHeader locale={locale} brandAria={f.brandAria} langLabel={f.langLabel} path="/minha-conta" />
      <main className="flow-main">
        <div className="container conta">
          <div className="conta-head">
            <div>
              <h1>{f.conta.greeting(p.nome || '')}</h1>
              <span className="conta-status">{f.conta.statusLabel}: <b>{f.conta.statusValue}</b></span>
            </div>
            <button type="button" className="button button-outline" onClick={logout}>
              <LogOut size={16} /> {f.conta.logout}
            </button>
          </div>

          {/* Dados pessoais */}
          <section className="conta-card">
            <div className="conta-card-head">
              <h2>{f.conta.secPessoais}</h2>
              {!editP && <button type="button" className="conta-edit" onClick={() => setEditP(true)}><Pencil size={14} /> {f.conta.edit}</button>}
            </div>
            {!editP ? (
              <div className="conta-rows">
                <Row label={f.pessoais.nome.label} value={p.nome} />
                <Row label={f.pessoais.email.label} value={p.email} />
                <Row label={f.pessoais.celular.label} value={p.celular} />
              </div>
            ) : (
              <div className="conta-edit-grid">
                <label className="flow-field"><span className="flow-label">{f.pessoais.nome.label}</span><input className="flow-input" value={p.nome} onChange={(ev) => setData({ ...data, pessoais: { ...p, nome: ev.target.value } })} /></label>
                <label className="flow-field"><span className="flow-label">{f.pessoais.email.label}</span><input className="flow-input" value={p.email} onChange={(ev) => setData({ ...data, pessoais: { ...p, email: ev.target.value } })} /></label>
                <label className="flow-field"><span className="flow-label">{f.pessoais.celular.label}</span><input className="flow-input" value={p.celular} onChange={(ev) => setData({ ...data, pessoais: { ...p, celular: ev.target.value } })} /></label>
                <div className="conta-edit-actions">
                  <button type="button" className="button button-orange" onClick={() => { persist(data); setEditP(false); }}>{f.conta.save}</button>
                  <button type="button" className="button button-outline" onClick={() => { setData(loadContratacao()); setEditP(false); }}>{f.conta.cancel}</button>
                </div>
              </div>
            )}
          </section>

          {/* Dados da empresa */}
          <section className="conta-card">
            <div className="conta-card-head">
              <h2>{f.conta.secEmpresa}</h2>
              {!editE && <button type="button" className="conta-edit" onClick={() => setEditE(true)}><Pencil size={14} /> {f.conta.edit}</button>}
            </div>
            {!editE ? (
              <div className="conta-rows">
                <Row label={f.empresa.atividade.label} value={e.atividade} />
                <Row label={f.empresa.cep.label} value={e.cep} />
                <Row label={f.empresa.logradouro} value={[e.logradouro, e.numero, e.bairro, e.cidade, e.uf].filter(Boolean).join(', ')} />
                <Row label={f.empresa.situacao.label} value={e.situacao} />
              </div>
            ) : (
              <div className="conta-edit-grid">
                <label className="flow-field"><span className="flow-label">{f.empresa.atividade.label}</span>
                  <select className="flow-input" value={e.atividade} onChange={(ev) => setData({ ...data, empresa: { ...e, atividade: ev.target.value } })}>
                    <option value="">{f.empresa.atividade.ph}</option>
                    {f.empresa.atividade.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <label className="flow-field"><span className="flow-label">{f.empresa.cep.label}</span><input className="flow-input" value={e.cep} onChange={(ev) => setData({ ...data, empresa: { ...e, cep: ev.target.value } })} /></label>
                <label className="flow-field"><span className="flow-label">{f.empresa.logradouro}</span><input className="flow-input" value={e.logradouro} onChange={(ev) => setData({ ...data, empresa: { ...e, logradouro: ev.target.value } })} /></label>
                <label className="flow-field"><span className="flow-label">{f.empresa.cidade}</span><input className="flow-input" value={e.cidade} onChange={(ev) => setData({ ...data, empresa: { ...e, cidade: ev.target.value } })} /></label>
                <div className="conta-edit-actions">
                  <button type="button" className="button button-orange" onClick={() => { persist(data); setEditE(false); }}>{f.conta.save}</button>
                  <button type="button" className="button button-outline" onClick={() => { setData(loadContratacao()); setEditE(false); }}>{f.conta.cancel}</button>
                </div>
              </div>
            )}
          </section>

          {/* Documentos */}
          <section className="conta-card">
            <div className="conta-card-head"><h2>{f.conta.secDocumentos}</h2></div>
            <div className="flow-docs">
              {data.documentos.map((doc, i) => (
                <div className={`flow-doc ${doc.arquivo ? 'is-sent' : ''}`} key={doc.nome}>
                  <div className="flow-doc-info">
                    <span className="flow-doc-ic">{doc.arquivo ? <Check size={18} /> : <UploadCloud size={18} />}</span>
                    <div><strong>{doc.nome}</strong><small>{doc.arquivo ? doc.arquivo : f.documentos.formats}</small></div>
                  </div>
                  <div className="flow-doc-action">
                    <span className={`flow-doc-status ${doc.arquivo ? 'ok' : ''}`}>{doc.arquivo ? f.documentos.sent : f.documentos.pending}</span>
                    <label className="flow-doc-btn">
                      {doc.arquivo ? <><RefreshCw size={15} /> {f.documentos.replace}</> : <><UploadCloud size={15} /> {f.documentos.dropTitle}</>}
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(ev) => uploadDoc(i, ev.target.files?.[0] ?? null)} hidden />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Plano */}
          <section className="conta-card">
            <div className="conta-card-head"><h2>{f.conta.secPlano}</h2></div>
            <div className="conta-plan">
              <strong className="elite-title">{planoNome(data.plano)}</strong>
              <span>{f.consulta}</span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

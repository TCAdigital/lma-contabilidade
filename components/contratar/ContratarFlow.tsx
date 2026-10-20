'use client';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, UploadCloud, RefreshCw, User, Building2, FileCheck2, CreditCard, PartyPopper } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getFormDict } from '@/lib/i18n/form';
import { type Contratacao, type Plano, emptyContratacao, loadContratacao, saveContratacao, setAuth, planoNome } from '@/lib/contratar';
import { FlowHeader } from './FlowHeader';

type Props = { locale: Locale; plano: Plano; accountHref: string; plansHref: string };

function Field({ label, value, onChange, type = 'text', ph, error, help }: { label: string; value: string; onChange: (v: string) => void; type?: string; ph?: string; error?: string; help?: string }) {
  return (
    <label className={`flow-field ${error ? 'has-error' : ''}`}>
      <span className="flow-label">{label}</span>
      <input className="flow-input" type={type} value={value} placeholder={ph} onChange={(e) => onChange(e.target.value)} />
      {help && !error && <span className="flow-help">{help}</span>}
      {error && <span className="flow-error">{error}</span>}
    </label>
  );
}

const STEP_ICONS = [User, Building2, FileCheck2, CreditCard];

export function ContratarFlow({ locale, plano, accountHref, plansHref }: Props) {
  const f = getFormDict(locale);
  const [hydrated, setHydrated] = useState(false);
  const [data, setData] = useState<Contratacao>(() => emptyContratacao(plano));
  const [senha2, setSenha2] = useState('');
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});

  const total = 4;
  const docsRequired = f.documentos.required;

  useEffect(() => {
    const existing = loadContratacao();
    if (existing) {
      existing.plano = plano;
      if (existing.documentos.length !== docsRequired.length) {
        existing.documentos = docsRequired.map((nome, i) => ({ nome, arquivo: existing.documentos[i]?.arquivo ?? null }));
      } else {
        existing.documentos = existing.documentos.map((d, i) => ({ nome: docsRequired[i], arquivo: d.arquivo }));
      }
      setData(existing);
    } else {
      setData({ ...emptyContratacao(plano), documentos: docsRequired.map((nome) => ({ nome, arquivo: null })) });
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plano]);

  useEffect(() => {
    if (hydrated) saveContratacao(data);
  }, [data, hydrated]);

  const setPessoais = (patch: Partial<Contratacao['pessoais']>) => setData((d) => ({ ...d, pessoais: { ...d.pessoais, ...patch } }));
  const setEmpresa = (patch: Partial<Contratacao['empresa']>) => setData((d) => ({ ...d, empresa: { ...d.empresa, ...patch } }));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!data.pessoais.nome.trim().includes(' ')) e.nome = f.pessoais.nome.err;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.pessoais.email)) e.email = f.pessoais.email.err;
      if (data.pessoais.celular.trim().length < 8) e.celular = f.pessoais.celular.err;
      if (data.pessoais.senha.length < 6) e.senha = f.pessoais.senha.err;
      if (senha2 !== data.pessoais.senha) e.senha2 = f.pessoais.senha2.err;
    }
    if (step === 1) {
      if (!data.empresa.atividade) e.atividade = f.required;
      if (data.empresa.cep.replace(/\D/g, '').length !== 8) e.cep = f.empresa.cep.err;
      if (!data.empresa.cidade.trim()) e.cidade = f.required;
      if (!data.empresa.situacao) e.situacao = f.required;
    }
    if (step === 3) {
      if (!data.pagamento.metodo) e.metodo = f.required;
    }
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < total - 1) {
      setStep(step + 1);
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setAuth(data.pessoais.email);
      setDone(true);
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const uploadDoc = (i: number, file: File | null) => {
    setData((d) => ({ ...d, documentos: d.documentos.map((doc, j) => (j === i ? { ...doc, arquivo: file ? file.name : doc.arquivo } : doc)) }));
  };

  const panel = useMemo(() => {
    const p = [f.pessoais, f.empresa, f.documentos, f.pagamento][step];
    return { title: p.panelTitle, text: p.panelText };
  }, [step, f]);

  if (done) {
    return (
      <>
        <FlowHeader locale={locale} brandAria={f.brandAria} langLabel={f.langLabel} path="/contratar" />
        <main className="flow-main">
          <div className="container flow-success">
            <span className="flow-success-icon"><PartyPopper size={34} /></span>
            <h1>{f.sucesso.title}</h1>
            <p>{f.sucesso.message}</p>
            <p className="flow-success-next">{f.sucesso.next}</p>
            <a className="button button-orange" href={accountHref}>
              {f.sucesso.account} <ArrowRight size={18} />
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <FlowHeader locale={locale} brandAria={f.brandAria} langLabel={f.langLabel} path="/contratar" />
      <main className="flow-main">
        <div className="container">
          <div className="flow-top">
            <div className="flow-top-head">
              <h1>{f.topTitle}</h1>
              <span className="flow-plan-badge">{f.planLabel}: {planoNome(plano)}</span>
            </div>
            <div className="flow-progress" aria-hidden="true">
              <div className="flow-progress-bar" style={{ width: `${((step + 1) / total) * 100}%` }} />
            </div>
            <div className="flow-steplist">
              {[f.stepNames.pessoais, f.stepNames.empresa, f.stepNames.documentos, f.stepNames.pagamento].map((name, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <span key={name} className={`flow-steplist-item ${i === step ? 'is-current' : ''} ${i < step ? 'is-done' : ''}`}>
                    <span className="flow-step-ic">{i < step ? <Check size={14} /> : <Icon size={14} />}</span>
                    {f.stepOf(i + 1, total)} · {name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flow-grid">
            <div className="flow-form">
              {step === 0 && (
                <>
                  <h2 className="flow-h2">{f.pessoais.title}</h2>
                  <p className="flow-sub">{f.pessoais.subtitle}</p>
                  <Field label={f.pessoais.nome.label} value={data.pessoais.nome} onChange={(v) => setPessoais({ nome: v })} ph={f.pessoais.nome.ph} error={err.nome} />
                  <Field label={f.pessoais.email.label} type="email" value={data.pessoais.email} onChange={(v) => setPessoais({ email: v })} ph={f.pessoais.email.ph} error={err.email} />
                  <Field label={f.pessoais.celular.label} value={data.pessoais.celular} onChange={(v) => setPessoais({ celular: v })} ph={f.pessoais.celular.ph} error={err.celular} />
                  <div className="flow-row">
                    <Field label={f.pessoais.senha.label} type="password" value={data.pessoais.senha} onChange={(v) => setPessoais({ senha: v })} error={err.senha} help={f.pessoais.senha.help} />
                    <Field label={f.pessoais.senha2.label} type="password" value={senha2} onChange={setSenha2} error={err.senha2} />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="flow-h2">{f.empresa.title}</h2>
                  <p className="flow-sub">{f.empresa.subtitle}</p>
                  <label className={`flow-field ${err.atividade ? 'has-error' : ''}`}>
                    <span className="flow-label">{f.empresa.atividade.label}</span>
                    <select className="flow-input" value={data.empresa.atividade} onChange={(e) => setEmpresa({ atividade: e.target.value })}>
                      <option value="">{f.empresa.atividade.ph}</option>
                      {f.empresa.atividade.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {err.atividade && <span className="flow-error">{err.atividade}</span>}
                  </label>
                  <Field label={f.empresa.cep.label} value={data.empresa.cep} onChange={(v) => setEmpresa({ cep: v })} ph={f.empresa.cep.ph} error={err.cep} help={f.empresa.cep.help} />
                  <div className="flow-row flow-row-3">
                    <Field label={f.empresa.logradouro} value={data.empresa.logradouro} onChange={(v) => setEmpresa({ logradouro: v })} />
                    <Field label={f.empresa.numero} value={data.empresa.numero} onChange={(v) => setEmpresa({ numero: v })} />
                    <Field label={f.empresa.complemento} value={data.empresa.complemento} onChange={(v) => setEmpresa({ complemento: v })} />
                  </div>
                  <div className="flow-row flow-row-3">
                    <Field label={f.empresa.bairro} value={data.empresa.bairro} onChange={(v) => setEmpresa({ bairro: v })} />
                    <Field label={f.empresa.cidade} value={data.empresa.cidade} onChange={(v) => setEmpresa({ cidade: v })} error={err.cidade} />
                    <Field label={f.empresa.uf} value={data.empresa.uf} onChange={(v) => setEmpresa({ uf: v })} />
                  </div>
                  <div className={`flow-field ${err.situacao ? 'has-error' : ''}`}>
                    <span className="flow-label">{f.empresa.situacao.label}</span>
                    <div className="flow-radio-list">
                      {f.empresa.situacao.options.map((o) => (
                        <button type="button" key={o} className={`flow-radio ${data.empresa.situacao === o ? 'is-on' : ''}`} onClick={() => setEmpresa({ situacao: o })}>
                          <span className="flow-radio-dot" />
                          {o}
                        </button>
                      ))}
                    </div>
                    {err.situacao && <span className="flow-error">{err.situacao}</span>}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="flow-h2">{f.documentos.title}</h2>
                  <p className="flow-sub">{f.documentos.subtitle}</p>
                  <div className="flow-docs">
                    {data.documentos.map((doc, i) => (
                      <div className={`flow-doc ${doc.arquivo ? 'is-sent' : ''}`} key={doc.nome}>
                        <div className="flow-doc-info">
                          <span className="flow-doc-ic">{doc.arquivo ? <Check size={18} /> : <UploadCloud size={18} />}</span>
                          <div>
                            <strong>{doc.nome}</strong>
                            <small>{doc.arquivo ? doc.arquivo : f.documentos.formats}</small>
                          </div>
                        </div>
                        <div className="flow-doc-action">
                          <span className={`flow-doc-status ${doc.arquivo ? 'ok' : ''}`}>{doc.arquivo ? f.documentos.sent : f.documentos.pending}</span>
                          <label className="flow-doc-btn">
                            {doc.arquivo ? <><RefreshCw size={15} /> {f.documentos.replace}</> : <><UploadCloud size={15} /> {f.documentos.dropTitle}</>}
                            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => uploadDoc(i, e.target.files?.[0] ?? null)} hidden />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="flow-hint">{f.documentos.dropHint}</p>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="flow-h2">{f.pagamento.title}</h2>
                  <p className="flow-sub">{f.pagamento.subtitle}</p>
                  <div className={`flow-field ${err.metodo ? 'has-error' : ''}`}>
                    <span className="flow-label">{f.pagamento.methodLabel}</span>
                    <div className="flow-radio-list">
                      {f.pagamento.methods.map((o) => (
                        <button type="button" key={o} className={`flow-radio ${data.pagamento.metodo === o ? 'is-on' : ''}`} onClick={() => setData((d) => ({ ...d, pagamento: { metodo: o } }))}>
                          <span className="flow-radio-dot" />
                          {o}
                        </button>
                      ))}
                    </div>
                    {err.metodo && <span className="flow-error">{err.metodo}</span>}
                  </div>
                  {data.pagamento.metodo === f.pagamento.methods[0] && (
                    <>
                      <Field label={f.pagamento.card.num} value="" onChange={() => {}} ph="0000 0000 0000 0000" />
                      <Field label={f.pagamento.card.name} value="" onChange={() => {}} />
                      <div className="flow-row">
                        <Field label={f.pagamento.card.exp} value="" onChange={() => {}} ph="MM/AA" />
                        <Field label={f.pagamento.card.cvv} value="" onChange={() => {}} ph="123" />
                      </div>
                    </>
                  )}
                  <p className="flow-note">{f.pagamento.note}</p>
                </>
              )}

              <div className="flow-actions">
                {step > 0 && (
                  <button type="button" className="button button-outline" onClick={back}>
                    <ArrowLeft size={17} /> {f.back}
                  </button>
                )}
                <button type="button" className="button button-orange" onClick={next}>
                  {step === total - 1 ? f.finish : f.next} <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <aside className="flow-panel">
              <div className="flow-panel-badge">{(() => { const Icon = STEP_ICONS[step]; return <Icon size={22} />; })()}</div>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
              <div className="flow-panel-summary">
                <span>{f.planLabel}</span>
                <strong>{planoNome(plano)}</strong>
                <small>{f.consulta}</small>
              </div>
              <div className="flow-panel-deco" aria-hidden="true">L<span>.</span></div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

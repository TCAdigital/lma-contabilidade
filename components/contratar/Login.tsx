'use client';
import { useState } from 'react';
import { ArrowRight, LogIn } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getFormDict } from '@/lib/i18n/form';
import { loadContratacao, setAuth } from '@/lib/contratar';
import { FlowHeader } from './FlowHeader';

export function Login({ locale, accountHref, plansHref }: { locale: Locale; accountHref: string; plansHref: string }) {
  const f = getFormDict(locale);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(false);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const c = loadContratacao();
    if (c && c.pessoais.email.toLowerCase() === email.trim().toLowerCase() && c.pessoais.senha === senha) {
      setAuth(c.pessoais.email);
      window.location.href = accountHref;
    } else {
      setError(true);
    }
  };

  return (
    <>
      <FlowHeader locale={locale} brandAria={f.brandAria} langLabel={f.langLabel} path="/entrar" />
      <main className="flow-main">
        <div className="container flow-login">
          <span className="flow-login-ic"><LogIn size={26} /></span>
          <h1>{f.login.title}</h1>
          <p className="flow-sub">{f.login.subtitle}</p>
          <form onSubmit={submit} className="flow-login-form">
            <label className="flow-field">
              <span className="flow-label">{f.login.email.label}</span>
              <input className="flow-input" type="email" value={email} placeholder={f.login.email.ph} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="flow-field">
              <span className="flow-label">{f.login.senha.label}</span>
              <input className="flow-input" type="password" value={senha} placeholder={f.login.senha.ph} onChange={(e) => setSenha(e.target.value)} />
            </label>
            {error && <span className="flow-error">{f.login.error}</span>}
            <button type="submit" className="button button-orange flow-login-submit">
              {f.login.submit} <ArrowRight size={18} />
            </button>
          </form>
          <p className="flow-login-alt">
            {f.login.noAccount} <a href={plansHref}>{f.login.create}</a>
          </p>
        </div>
      </main>
    </>
  );
}

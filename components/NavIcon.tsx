import { Home, Briefcase, Crown, Route, Users, MessageCircle } from 'lucide-react';

// Um ícone por item do menu, na mesma ordem de lib/i18n/*.ts (nav)
const navIcons = [Home, Briefcase, Crown, Route, Users, MessageCircle];

export function NavIcon({ i, size }: { i: number; size: number }) {
  const Icon = navIcons[i];
  return <Icon size={size} strokeWidth={1.7} className="nav-icon" aria-hidden="true" />;
}

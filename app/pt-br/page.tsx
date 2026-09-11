import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'Sérgio Vinícius | Engenheiro · Builder · Berlim',
  description: 'Portfólio pessoal de Sérgio Vinícius, engenheiro de software com visão de produto baseado em Berlim.',
  alternates: {
    languages: {
      en: '/',
      'pt-BR': '/pt-br/'
    }
  }
};

export default function PortugueseHome() {
  return <Home locale="pt-br" />;
}

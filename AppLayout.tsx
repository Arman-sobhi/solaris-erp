import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from '../components/Sidebar';

interface AppLayoutProps {
  children: ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function AppLayout({ children, activeView, setActiveView }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

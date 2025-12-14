import React, { createContext, useContext, useState } from 'react';

interface TabsContextValue {
  value: string | null;
  setValue: (v: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const Tabs: React.FC<{ defaultValue?: string; className?: string } & React.HTMLAttributes<HTMLDivElement>> = ({ defaultValue, children, className }) => {
  const [value, setValue] = useState<string>(defaultValue || '');
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC = ({ children }) => <div className="flex border-b border-gray-100">{children}</div>;

export const TabsTrigger: React.FC<{ value: string } & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ value, children }) => {
  const ctx = useContext(TabsContext)!;
  const active = ctx.value === value || (!ctx.value && value === 'overview');
  return (
    <button onClick={() => ctx.setValue(value)} className={`px-4 py-2 -mb-px ${active ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}>
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{ value: string } & React.HTMLAttributes<HTMLDivElement>> = ({ value, children, className }) => {
  const ctx = useContext(TabsContext)!;
  if (ctx.value !== value && !(ctx.value === '' && value === 'overview')) return null;
  return <div className={className}>{children}</div>;
};

export default Tabs;

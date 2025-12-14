import React, { createContext, useContext } from 'react';

type SelectContextType = { value?: string; onChange?: (v: string) => void };
const SelectContext = createContext<SelectContextType>({});

export const Select: React.FC<{ value?: string; onValueChange?: (v: string) => void } & React.HTMLAttributes<HTMLDivElement>> = ({ value, onValueChange, children }) => {
  return <SelectContext.Provider value={{ value, onChange: onValueChange }}>{children}</SelectContext.Provider>;
};

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => (
  <div className={`border border-gray-200 rounded-md px-3 py-2 ${className || ''}`}>{children}</div>
);

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const ctx = useContext(SelectContext);
  return <div>{ctx.value && ctx.value !== 'all' ? ctx.value : placeholder}</div>;
};

export const SelectContent: React.FC = ({ children }) => (
  <div className="mt-2 bg-white border border-gray-100 rounded-md shadow-sm">{children}</div>
);

export const SelectItem: React.FC<{ value: string } & React.HTMLAttributes<HTMLDivElement>> = ({ value, children, ...rest }) => {
  const ctx = useContext(SelectContext);
  return (
    <div onClick={() => ctx.onChange?.(value)} className="px-3 py-2 hover:bg-gray-50" {...rest}>
      {children}
    </div>
  );
};

export default Select;

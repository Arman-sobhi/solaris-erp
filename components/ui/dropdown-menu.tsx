import React from 'react';

export const DropdownMenu: React.FC = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

export const DropdownMenuTrigger: React.FC<{ asChild?: boolean } & React.HTMLAttributes<HTMLButtonElement>> = ({ asChild, children }) => {
  if (asChild) return <>{children}</>;
  return <button className="px-2 py-1">{children}</button>;
};

export const DropdownMenuContent: React.FC<{ align?: 'start' | 'end' } & React.HTMLAttributes<HTMLDivElement>> = ({ children, align }) => {
  const alignClass = align === 'end' ? 'right-0' : 'left-0';
  return <div className={`absolute mt-2 min-w-[180px] bg-white border border-gray-100 rounded-md shadow-md ${alignClass}`}>{children}</div>;
};

export const DropdownMenuItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <div className={`px-3 py-2 text-sm hover:bg-gray-50 ${className || ''}`} {...rest}>{children}</div>
);

export const DropdownMenuLabel: React.FC = ({ children }) => <div className="px-3 py-2 text-xs text-gray-400 uppercase">{children}</div>;
export const DropdownMenuSeparator: React.FC = () => <div className="border-t border-gray-100 my-1" />;

export default DropdownMenu;

import React from 'react';
import { cn } from './utils';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ className, children, ...rest }) => (
  <div className={cn('overflow-x-auto', className || '')}>
    <table className="w-full" {...rest}>
      {children}
    </table>
  </div>
);

export const TableHeader: React.FC = ({ children }) => <thead className="bg-white">{children}</thead>;
export const TableBody: React.FC = ({ children }) => <tbody>{children}</tbody>;
export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className, ...rest }) => (
  <tr className={className} {...rest}>{children}</tr>
);
export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...rest }) => (
  <th className={cn('text-left py-3 px-4 text-gray-600', className || '')} {...rest}>{children}</th>
);
export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...rest }) => (
  <td className={cn('py-4 px-4', className || '')} {...rest}>{children}</td>
);

export default Table;

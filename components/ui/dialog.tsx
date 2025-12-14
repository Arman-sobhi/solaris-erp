import React from 'react';

export const Dialog: React.FC<{ open?: boolean; onOpenChange?: (open: boolean) => void } & React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div>{children}</div>;
};

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const DialogHeader: React.FC = ({ children }) => <div className="mb-4">{children}</div>;
export const DialogTitle: React.FC = ({ children }) => <h3 className="text-lg font-medium">{children}</h3>;
export const DialogDescription: React.FC = ({ children }) => <p className="text-sm text-gray-500">{children}</p>;
export const DialogFooter: React.FC = ({ children }) => <div className="flex gap-2 justify-end mt-4">{children}</div>;

export default Dialog;

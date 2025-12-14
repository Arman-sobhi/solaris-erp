import React from 'react';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default', className, ...rest }) => {
  const color =
    variant === 'success' ? 'bg-green-100 text-green-700' :
    variant === 'warning' ? 'bg-orange-100 text-orange-700' :
    variant === 'danger' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700';

  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${color} ${className || ''}`} {...rest}>
      {status}
    </span>
  );
};

export default StatusBadge;

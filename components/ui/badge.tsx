import React from 'react';
import { cn } from './utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, ...rest }) => (
  <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800', className || '')} {...rest}>
    {children}
  </span>
);

export default Badge;

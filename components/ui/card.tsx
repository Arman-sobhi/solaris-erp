import React from 'react';
import { cn } from './utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, children, ...rest }) => {
  return (
    <div className={cn('bg-white rounded-lg border border-gray-100 shadow-sm', className || '')} {...rest}>
      {children}
    </div>
  );
};

export default Card;

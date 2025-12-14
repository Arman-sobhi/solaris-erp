import React from 'react';
import { cn } from './utils';

type Variant = 'default' | 'ghost' | 'outline';
type Size = 'sm' | 'default' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'default', className, children, ...rest }) => {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const variants: Record<Variant, string> = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    ghost: 'bg-transparent hover:bg-gray-100',
    outline: 'bg-transparent border border-gray-200 hover:bg-gray-50',
  };
  const sizes: Record<Size, string> = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 text-sm',
    icon: 'h-8 w-8 p-0',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className || '')} {...rest}>
      {children}
    </button>
  );
};

export default Button;

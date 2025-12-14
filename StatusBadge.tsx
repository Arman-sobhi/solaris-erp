import { Badge } from '../components/ui/badge';
import { cn } from '../components/ui/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const getVariantStyles = () => {
    // If variant is explicitly provided, use it
    if (variant) {
      const variantMap = {
        success: 'bg-green-100 text-green-700 border-green-200',
        warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        error: 'bg-red-100 text-red-700 border-red-200',
        info: 'bg-blue-100 text-blue-700 border-blue-200',
        default: 'bg-gray-100 text-gray-700 border-gray-200',
      };
      return variantMap[variant];
    }

    // Auto-detect based on status text
    const statusLower = status.toLowerCase();
    
    if (
      statusLower.includes('active') ||
      statusLower.includes('completed') ||
      statusLower.includes('paid') ||
      statusLower.includes('passed') ||
      statusLower.includes('delivered') ||
      statusLower.includes('operational') ||
      statusLower.includes('approved') ||
      statusLower.includes('won') ||
      statusLower.includes('valid')
    ) {
      return 'bg-green-100 text-green-700 border-green-200';
    }
    
    if (
      statusLower.includes('pending') ||
      statusLower.includes('processing') ||
      statusLower.includes('in-progress') ||
      statusLower.includes('contacted') ||
      statusLower.includes('qualified') ||
      statusLower.includes('expiring')
    ) {
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
    
    if (
      statusLower.includes('failed') ||
      statusLower.includes('cancelled') ||
      statusLower.includes('overdue') ||
      statusLower.includes('error') ||
      statusLower.includes('inactive') ||
      statusLower.includes('lost') ||
      statusLower.includes('critical') ||
      statusLower.includes('expired')
    ) {
      return 'bg-red-100 text-red-700 border-red-200';
    }
    
    if (
      statusLower.includes('draft') ||
      statusLower.includes('idle') ||
      statusLower.includes('on-hold') ||
      statusLower.includes('maintenance')
    ) {
      return 'bg-gray-100 text-gray-700 border-gray-200';
    }
    
    if (
      statusLower.includes('shipped') ||
      statusLower.includes('sent') ||
      statusLower.includes('planning') ||
      statusLower.includes('new')
    ) {
      return 'bg-blue-100 text-blue-700 border-blue-200';
    }

    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <Badge
      variant="outline"
      className={cn('capitalize', getVariantStyles())}
    >
      {status.replace(/-/g, ' ')}
    </Badge>
  );
}

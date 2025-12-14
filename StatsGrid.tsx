import { Card } from './components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4 | 5;
}

export function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4`}>
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <p className="text-sm text-gray-600">{stat.label}</p>
          <div className="flex items-center justify-between mt-1">
            <p className={`text-2xl ${stat.color || ''}`}>
              {stat.value}
            </p>
            {stat.icon && (
              <stat.icon className={`w-5 h-5 ${stat.color || 'text-gray-400'}`} />
            )}
          </div>
          {stat.trend && (
            <p className={`text-sm mt-1 ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend.isPositive ? '+' : ''}{stat.trend.value}% from last period
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}

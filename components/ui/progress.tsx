import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // percent
}

export const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-green-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default Progress;

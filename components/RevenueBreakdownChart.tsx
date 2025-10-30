import React, { useMemo } from 'react';
import { RevenueBreakdown } from '../types';

interface RevenueBreakdownChartProps {
  data: RevenueBreakdown[];
}

const RevenueBreakdownChart: React.FC<RevenueBreakdownChartProps> = ({ data }) => {
  const years = ['y1', 'y2', 'y3'] as const;
  const yearLabels = { y1: 'Year 1', y2: 'Year 2', y3: 'Year 3' };
  
  // Stable color mapping for streams to ensure consistent colors
  const streamColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    const availableColors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500',
      'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    data.forEach((item, index) => {
      map[item.stream] = availableColors[index % availableColors.length];
    });
    return map;
  }, [data]); // Recalculate if data array changes

  return (
    <div className="flex flex-col space-y-8 p-4" aria-label="Revenue Breakdown Chart for Years 1, 2, and 3">
      {years.map((yearKey) => (
        <div key={yearKey} className="border-b pb-4 last:border-b-0">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">{yearLabels[yearKey]} Revenue Allocation</h4>
          <div className="flex flex-col space-y-2">
            {data.map((item, index) => {
              const percentage = item[yearKey];
              const barColor = streamColorMap[item.stream]; // Use mapped color
              return (
                <div key={`${yearKey}-${index}`} className="flex items-center space-x-2">
                  <div className="w-1/4 min-w-[100px] text-sm text-gray-700 font-medium">{item.stream}</div>
                  <div 
                    className="flex-1 bg-gray-200 rounded-full h-6 relative" 
                    role="progressbar" 
                    aria-valuenow={percentage} 
                    aria-valuemin={0} 
                    aria-valuemax={100} 
                    aria-label={`${item.stream} ${yearLabels[yearKey]} revenue: ${percentage}%`}
                  >
                    <div
                      className={`${barColor} h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold transition-all duration-500 ease-out`}
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 0 && `${percentage}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueBreakdownChart;
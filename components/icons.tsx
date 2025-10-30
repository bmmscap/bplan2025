
import React from 'react';

type IconProps = { className?: string };

const Icon: React.FC<{ children: React.ReactNode } & IconProps> = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const ChevronRight: React.FC<IconProps> = ({ className }) => <Icon className={className}><polyline points="9 18 15 12 9 6" /></Icon>;
export const ChevronDown: React.FC<IconProps> = ({ className }) => <Icon className={className}><polyline points="6 9 12 15 18 9" /></Icon>;
export const Target: React.FC<IconProps> = ({ className }) => <Icon className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>;
export const DollarSign: React.FC<IconProps> = ({ className }) => <Icon className={className}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Icon>;
export const Users: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6" /><path d="M23 11h-6" /></Icon>;
export const TrendingUp: React.FC<IconProps> = ({ className }) => <Icon className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></Icon>;
export const Lightbulb: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M15.09 16.05a2 2 0 0 1-2.09-2.05h0a2 2 0 0 1 2.09-2.05 2 2 0 0 1 2.09 2.05" /><path d="M12 2a7 7 0 0 0-7 7c0 3.04 1.63 5.5 4 6.57V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4.43c2.37-1.07 4-3.53 4-6.57a7 7 0 0 0-7-7z" /></Icon>;
export const Shield: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Icon>;
export const CheckCircle: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></Icon>;
export const AlertCircle: React.FC<IconProps> = ({ className }) => <Icon className={className}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Icon>;
export const Calendar: React.FC<IconProps> = ({ className }) => <Icon className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>;
export const BarChart3: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></Icon>;
export const Zap: React.FC<IconProps> = ({ className }) => <Icon className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Icon>;
export const Edit3: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></Icon>;
export const Save: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></Icon>;
export const Plus: React.FC<IconProps> = ({ className }) => <Icon className={className}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;
export const Trash2: React.FC<IconProps> = ({ className }) => <Icon className={className}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></Icon>;
export const Download: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Icon>;
export const Upload: React.FC<IconProps> = ({ className }) => <Icon className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></Icon>;

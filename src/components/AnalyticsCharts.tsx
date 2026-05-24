import React from 'react';
import { Activity, BarChart, Clock } from 'lucide-react';
import './AnalyticsCharts.css';

const AnalyticsCharts: React.FC = () => {
  // Weekly threat count per category
  // DDoS (brand blue #3D81E3), SQL Injection (cyan #06b6d4), Intrusion Attempts (amber #f59e0b)
  const ddosData = [10, 18, 12, 6, 22, 14, 8];
  const sqliData = [5, 8, 6, 3, 10, 6, 4];
  const intrusionData = [2, 3, 2, 1, 4, 2, 1];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Dimensions for SVG line chart
  const width = 460;
  const height = 150;
  const paddingX = 40;
  const paddingY = 20;

  const getCoordinates = (data: number[]) => {
    const stepX = (width - paddingX * 2) / (data.length - 1);
    const maxY = 30; // Max Y scale
    return data.map((val, idx) => {
      const x = paddingX + idx * stepX;
      const y = height - paddingY - (val / maxY) * (height - paddingY * 2);
      return { x, y, val };
    });
  };

  const ddosCoords = getCoordinates(ddosData);
  const sqliCoords = getCoordinates(sqliData);
  const intrusionCoords = getCoordinates(intrusionData);

  const getPointsPath = (coords: { x: number; y: number }[]) => {
    return coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  };

  // Pie chart calculation
  // Circumference for r=40 is 2 * pi * 40 = 251.327
  const r = 40;
  const cx = 75;
  const cy = 75;
  const circumference = 2 * Math.PI * r;

  const categories = [
    { name: 'Denial-of-Service (DDoS)', count: 48, percentage: 65, color: '#3D81E3', strokeColor: '#3D81E3' },
    { name: 'SQL Injection Signature', count: 18, percentage: 24, color: '#06b6d4', strokeColor: '#06b6d4' },
    { name: 'Intrusion Signatures', count: 8, percentage: 11, color: '#f59e0b', strokeColor: '#f59e0b' }
  ];

  // Slices: length and offsets
  const ddosLength = circumference * 0.65;
  const sqliLength = circumference * 0.24;
  const intrusionLength = circumference * 0.11;

  const ddosOffset = 0;
  const sqliOffset = -ddosLength;
  const intrusionOffset = -(ddosLength + sqliLength);

  return (
    <div className="soc-analytics-container select-none">
      
      {/* Chart 1: Threat Frequency Line Chart */}
      <div className="soc-chart-card">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand" />
            <span className="text-xs font-bold text-white tracking-wider uppercase">Weekly Threat Incident Trends</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">AVG: 17.2 Alerts / Day</span>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="relative w-full flex justify-center py-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
            {/* Grid Lines */}
            {[0, 10, 20, 30].map((gridVal, i) => {
              const y = height - paddingY - (gridVal / 30) * (height - paddingY * 2);
              return (
                <g key={i} className="opacity-10">
                  <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#ffffff" strokeWidth="1" strokeDasharray="3,3" />
                  <text x={paddingX - 10} y={y + 3} fill="#ffffff" fontSize="8" textAnchor="end" fontFamily="monospace">{gridVal}</text>
                </g>
              );
            })}

            {/* X-Axis labels */}
            {days.map((day, idx) => {
              const stepX = (width - paddingX * 2) / (days.length - 1);
              const x = paddingX + idx * stepX;
              return (
                <text key={idx} x={x} y={height - 2} fill="#64748b" fontSize="9" textAnchor="middle" fontWeight="600" fontFamily="monospace">
                  {day}
                </text>
              );
            })}

            {/* DDoS Line */}
            <path d={getPointsPath(ddosCoords)} fill="none" stroke="#3D81E3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300" />
            
            {/* SQL Injection Line */}
            <path d={getPointsPath(sqliCoords)} fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300" />
            
            {/* Intrusion Line */}
            <path d={getPointsPath(intrusionCoords)} fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300" />

            {/* Circles and interactive Tooltips for DDoS */}
            {ddosCoords.map((c, i) => (
              <g key={`ddos-${i}`} className="group/dot cursor-pointer">
                <circle cx={c.x} cy={c.y} r="4" fill="#3D81E3" stroke="#020617" strokeWidth="1.5" className="hover:r-6 transition-all" />
                <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect x={c.x - 30} y={c.y - 24} width="60" height="16" rx="4" fill="#0f172a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x={c.x} y={c.y - 13} fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">DDoS: {c.val}</text>
                </g>
              </g>
            ))}

            {/* Circles and interactive Tooltips for SQLi */}
            {sqliCoords.map((c, i) => (
              <g key={`sqli-${i}`} className="group/dot cursor-pointer">
                <circle cx={c.x} cy={c.y} r="4" fill="#06b6d4" stroke="#020617" strokeWidth="1.5" className="hover:r-6 transition-all" />
                <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect x={c.x - 30} y={c.y - 24} width="60" height="16" rx="4" fill="#0f172a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x={c.x} y={c.y - 13} fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">SQLi: {c.val}</text>
                </g>
              </g>
            ))}

            {/* Circles and interactive Tooltips for Intrusion */}
            {intrusionCoords.map((c, i) => (
              <g key={`intrusion-${i}`} className="group/dot cursor-pointer">
                <circle cx={c.x} cy={c.y} r="4" fill="#f59e0b" stroke="#020617" strokeWidth="1.5" className="hover:r-6 transition-all" />
                <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect x={c.x - 35} y={c.y - 24} width="70" height="16" rx="4" fill="#0f172a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x={c.x} y={c.y - 13} fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Intrude: {c.val}</text>
                </g>
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-[10px] font-semibold tracking-wider uppercase text-slate-400 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D81E3]" />
            DDoS Attacks
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
            SQL Injection
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            Intrusion Attempts
          </div>
        </div>
      </div>

      {/* Chart 2: Threat Distribution Pie/Donut Chart */}
      <div className="soc-chart-card">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold text-white tracking-wider uppercase">Threat Category Distribution</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Total: 74 Active Alerts</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-2 h-full">
          {/* Donut Chart SVG */}
          <div className="relative w-[150px] h-[150px] shrink-0">
            <svg width="150" height="150" className="transform -rotate-90">
              {/* Back circle */}
              <circle cx={cx} cy={cy} r={r} fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="16" />

              {/* DDoS slice (65%) */}
              <circle 
                cx={cx} 
                cy={cy} 
                r={r} 
                fill="transparent" 
                stroke="#3D81E3" 
                strokeWidth="16" 
                strokeDasharray={`${ddosLength} ${circumference}`} 
                strokeDashoffset={ddosOffset}
                className="transition-all duration-300 hover:stroke-[20px] cursor-pointer"
              />

              {/* SQL Injection slice (24%) */}
              <circle 
                cx={cx} 
                cy={cy} 
                r={r} 
                fill="transparent" 
                stroke="#06b6d4" 
                strokeWidth="16" 
                strokeDasharray={`${sqliLength} ${circumference}`} 
                strokeDashoffset={sqliOffset}
                className="transition-all duration-300 hover:stroke-[20px] cursor-pointer"
              />

              {/* Intrusion Attempts slice (11%) */}
              <circle 
                cx={cx} 
                cy={cy} 
                r={r} 
                fill="transparent" 
                stroke="#f59e0b" 
                strokeWidth="16" 
                strokeDasharray={`${intrusionLength} ${circumference}`} 
                strokeDashoffset={intrusionOffset}
                className="transition-all duration-300 hover:stroke-[20px] cursor-pointer"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <span className="text-xl font-bold text-white font-mono">74</span>
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">Incidents</span>
            </div>
          </div>

          {/* Table list of categories */}
          <div className="flex flex-col gap-3 justify-center flex-1 w-full">
            {categories.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <div className="flex-1 flex justify-between text-xs font-semibold">
                  <span className="text-slate-300 truncate max-w-[120px]">{c.name}</span>
                  <span className="text-slate-500 font-mono ml-2 shrink-0">{c.count} ({c.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsCharts;

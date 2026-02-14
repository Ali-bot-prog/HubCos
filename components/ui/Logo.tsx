import { Factory } from 'lucide-react';

export default function Logo({ className = "", showText = true, title = "HubCos" }: { className?: string, showText?: boolean, title?: string }) {
  // Simple logic to split title for styling if it's "HubCos" or just show it
  // If user changes it to "MySite", we want to show "MySite"
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-lg overflow-hidden group shrink-0">
         {/* Stylized Hyperbolic Tower SVG */}
         <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6 text-secondary z-10"
          >
            <path d="M4 20h16" />
            <path d="M6 20c0-6 2-10 6-10s6 4 6 10" />
            <path d="M8 2c0 0 1 3 4 3s4-3 4-3" />
            <path d="M12 5v5" />
          </svg>
          <div className="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/20 transition-colors" />
      </div>
      {showText && (
        <div className="flex flex-col -gap-1">
            <span className="text-2xl font-black tracking-tighter leading-none uppercase">
                {title}
            </span>
            <span className="text-[0.6rem] font-bold text-gray-400 tracking-[0.2em] uppercase leading-none text-right">
                Endüstriyel
            </span>
        </div>
      )}
    </div>
  );
}

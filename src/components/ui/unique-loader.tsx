"use client";

export function UniqueLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-white"></div>
        <div className="absolute inset-2 h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-white/40" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-8 w-8 text-[#4169E1] animate-pulse drop-shadow-[0_0_10px_rgba(65,105,225,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

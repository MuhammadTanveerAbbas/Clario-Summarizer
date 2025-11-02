"use client";

export function MinimalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
        </div>
        <p className="text-sm text-white/60">Loading...</p>
      </div>
    </div>
  );
}

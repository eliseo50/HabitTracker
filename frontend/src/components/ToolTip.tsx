export function ToolTip({ text }: { text: string }) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none opacity-0 group-hover/marker:opacity-100 transition-opacity duration-200 z-10">
      <div className="relative bg-slate-900/90 text-white text-[11px] font-bold px-2 py-1 rounded-md shadow-xl border border-white/10 whitespace-nowrap">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-900/90" />
      </div>
    </div>
  );
}

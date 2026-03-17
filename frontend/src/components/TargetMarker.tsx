import { ToolTip } from "./ToolTip";

export function TargetMarker({
  percentage,
  label,
}: {
  percentage: number;
  label: string;
}) {
  return (
    <div
      className="group/marker absolute top-0 bottom-0 w-[5px] bg-white border-l border-r border-slate-600"
      style={{ left: `calc(${percentage}% - 6px)` }}
    >
      <ToolTip text={label} />
    </div>
  );
}

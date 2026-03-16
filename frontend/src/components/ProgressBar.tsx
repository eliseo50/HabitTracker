import { useMemo } from "react";
import { TargetMarker } from "./TargetMarker";

interface MultiTargetProgressBarProps {
  value: number;
  max?: number;
  targets?: number[];
  colors?: string[];
}

export function ProgressBar({
  value,
  max = 100,
  targets = [25, 50, 75, 100],
  colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-emerald-500",
    "bg-blue-500",
  ],
}: MultiTargetProgressBarProps) {
  const sortedTargets = useMemo(
    () =>
      [...targets]
        .sort((a, b) => a - b)
        .filter((target) => target <= max && target > 0),
    [targets, max],
  );

  const stateIndex = useMemo(() => {
    return getTargetIndex(value, sortedTargets);
  }, [value, sortedTargets]);

  const currentColor = useMemo(() => {
    return getColor(stateIndex, colors);
  }, [stateIndex, colors]);

  const percentage = useMemo(() => {
    return getPercentage(value, max);
  }, [value, max]);

  const targetPercentages = useMemo(
    () => sortedTargets.map((target) => getPercentage(target, max)),
    [sortedTargets, max],
  );
  return (
    <div className="w-full mt-4">
      <div className="relative h-2 w-full bg-slate-100 rounded-full">
        <div
          className={`h-full transition-all duration-500 ease-out ${currentColor} rounded-full`}
          style={{ width: `${percentage}%` }}
        />

        {targetPercentages.map((targetPercentage, index) => {
          return (
            <TargetMarker
              key={targetPercentage}
              percentage={targetPercentage}
              label={targets[index].toFixed(0)}
            />
          );
        })}
      </div>
    </div>
  );
}

const getPercentage = (value: number, max: number) => {
  const rawPercentage = (value / max) * 100;
  return Math.min(Math.max(rawPercentage, 0), 100);
};

const getColor = (stateIndex: number, colors: string[]) => {
  const indexIsInColors = stateIndex >= colors.length - 1;
  return indexIsInColors ? colors[colors.length - 1] : colors[stateIndex];
};

const getTargetIndex = (value: number, targets: number[]) => {
  return targets.filter((target) => value >= target).length;
};

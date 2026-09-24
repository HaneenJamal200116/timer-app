import {
  ProgressBar,
  type ProgressBarProps,
} from "react-aria-components/ProgressBar";
import { cn } from "@/lib/utils";

interface ProgressCircleProps extends Omit<ProgressBarProps, "className"> {
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
  isMoving: boolean;
}

const ProgressCircle = ({
  className,
  ref,
  isMoving,
  ...props
}: ProgressCircleProps) => {
  const c = "50%";
  const r = "calc(50% - 2px)";
  const moving = "/moving.gif";
  const idle = "/idle.png";

  return (
    <ProgressBar {...props} ref={ref} aria-label="circle">
      {({ percentage, isIndeterminate }) => {
        const pct = isIndeterminate ? 0 : (percentage ?? 0);
        const angle = (pct / 100) * 360 - 90;
        return (
          <svg
            className={cn("progress-circle size-4 shrink-0", className)}
            viewBox="0 0 24 24"
            fill="none"
            data-slot=""
          >
            <circle
              cx={c}
              cy={c}
              r={r}
              strokeWidth={2}
              stroke="#0c0c0c"
              strokeOpacity={0.2}
            />
            {!isIndeterminate ? (
              <circle
                cx={c}
                cy={c}
                r={r}
                strokeWidth={2}
                stroke="#44e0fb"
                pathLength={100}
                strokeDasharray="100 200"
                strokeDashoffset={100 - pct}
                strokeLinecap="round"
                transform="rotate(-90)"
                className="origin-center"
              />
            ) : (
              <circle
                cx={c}
                cy={c}
                r={r}
                strokeWidth={3}
                stroke="62b1b3"
                pathLength={100}
                strokeDasharray="100 200"
                strokeDashoffset={100 - 30}
                strokeLinecap="round"
                className="origin-center animate-[spin_1s_cubic-bezier(0.4,0,0.2,1)_infinite]"
              />
            )}
            {!isIndeterminate && (
              <g transform={`rotate(${angle + 90} 12 12)`}>
                <image
                  href={isMoving ? moving : idle}
                  x={10}
                  width={5}
                  height={5}
                />
              </g>
            )}
          </svg>
        );
      }}
    </ProgressBar>
  );
};

export type { ProgressCircleProps };
export { ProgressCircle };

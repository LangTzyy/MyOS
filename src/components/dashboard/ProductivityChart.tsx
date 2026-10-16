import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { productivity } from "../../data/projects";
import { cn } from "../../lib/cn";

export default function ProductivityChart() {
  const [range, setRange] = useState("7D");
  const data = productivity[range].map(([name, completed, created]) => ({
    name,
    completed,
    created,
  }));
  return (
    <div>
      <div className="mb-3 flex gap-1" role="tablist">
        {Object.keys(productivity).map((r) => (
          <button
            key={r}
            role="tab"
            aria-selected={range === r}
            onClick={() => setRange(r)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs",
              range === r ? "bg-elevated text-fg" : "text-muted hover:text-fg",
            )}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="h-52">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ left: -24, right: 4, top: 4 }}>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818CF8" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#818CF8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#27272A" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#71717A", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: "#18181B",
                border: "1px solid #27272A",
                borderRadius: 8,
                fontSize: 12,
              }}
              cursor={{ stroke: "#27272A" }}
            />
            <Area
              type="monotone"
              dataKey="created"
              stroke="#71717A"
              strokeWidth={1.5}
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#818CF8"
              strokeWidth={2}
              fill="url(#g)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-accent" />
          Completed
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-muted" />
          Created
        </span>
      </div>
    </div>
  );
}

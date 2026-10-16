import PageHeader from "../components/ui/PageHeader";
import { events } from "../data/misc";
import { cn } from "../lib/cn";

export default function Calendar() {
  const cells = [
    ...Array(3).fill(0),
    ...Array.from({ length: 31 }, (_, i) => i + 1),
  ]; // Oct 2026 starts Thursday (Mon-first)
  return (
    <div>
      <PageHeader
        title="Calendar"
        sub="October 2026 — tasks, deadlines and milestones."
      />
      <div className="overflow-x-auto">
        <div className="min-w-[640px] overflow-hidden rounded-xl border border-line bg-surface">
          <div className="grid grid-cols-7 border-b border-line text-xs text-muted">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="px-3 py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((d, i) => (
              <div
                key={i}
                className="min-h-24 border-b border-r border-line p-2 text-xs"
              >
                {d > 0 && (
                  <>
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full",
                        d === 8 ? "bg-accent text-bg" : "text-sub",
                      )}
                    >
                      {d}
                    </span>
                    {events[d]?.map((e) => (
                      <div
                        key={e}
                        className="mt-1 truncate rounded bg-accent/10 px-1.5 py-0.5 text-accent"
                      >
                        {e}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

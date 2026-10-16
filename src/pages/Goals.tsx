import { Check, Circle } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store/StoreContext";
import FormModal from "../components/ui/FormModal";
import PageHeader, { Bar, Tag } from "../components/ui/PageHeader";

export default function Goals() {
  const { goals, addGoal } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader
        title="Goals"
        sub="Build systems, not just habits."
        action="New Goal"
        onAction={() => setOpen(true)}
      />
      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="New Goal"
        submitLabel="Create goal"
        fields={[
          { name: "title", label: "Goal", required: true },
          {
            name: "cat",
            label: "Category",
            type: "select",
            options: [
              "Academic",
              "Career",
              "Personal",
              "Programming",
              "Health",
              "Finance",
            ].map((c) => [c, c] as [string, string]),
          },
          {
            name: "target",
            label: "Target",
            placeholder: "What does success look like?",
          },
          { name: "deadline", label: "Deadline", placeholder: "December 2026" },
        ]}
        onSubmit={(v) =>
          addGoal({
            title: v.title,
            cat: v.cat,
            target: v.target || "—",
            deadline: v.deadline || "—",
          })
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {goals.map((g) => (
          <div
            key={g.id}
            className="rounded-xl border border-line bg-surface p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{g.title}</h2>
              <Tag>{g.cat}</Tag>
            </div>
            <div className="my-4">
              <div className="mb-1.5 text-right text-xs tabular-nums text-muted">
                {g.progress}%
              </div>
              <Bar v={g.progress} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-muted">Current</div>
                {g.current}
              </div>
              <div>
                <div className="text-muted">Target</div>
                {g.target}
              </div>
              <div>
                <div className="text-muted">Deadline</div>
                {g.deadline}
              </div>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
              {g.ms.map(([m, d]) => (
                <li
                  key={m}
                  className={`flex items-center gap-2 text-sm ${d ? "text-muted" : ""}`}
                >
                  {d ? (
                    <Check size={14} className="text-accent" />
                  ) : (
                    <Circle size={14} />
                  )}
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

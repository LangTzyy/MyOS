import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Search } from "lucide-react";
import { useStore } from "../store/StoreContext";
import FormModal from "../components/ui/FormModal";
import PageHeader, { Tag } from "../components/ui/PageHeader";
import { cn } from "../lib/cn";

const TODAY = "2026-10-08",
  tabs = ["All", "Today", "Upcoming", "Completed", "Overdue"];
export default function Tasks() {
  const { tasks: items, toggleTask: toggle, addTask, projects } = useStore(),
    [open, setOpen] = useState(false),
    [tab, setTab] = useState("All"),
    [q, setQ] = useState(""),
    [view, setView] = useState("List");
  const f = items.filter(
    (t) =>
      t.title.toLowerCase().includes(q.toLowerCase()) &&
      (tab === "All" ||
        (tab === "Completed"
          ? t.status === "completed"
          : t.status !== "completed" &&
            (tab === "Today"
              ? t.dueDate === TODAY
              : tab === "Upcoming"
                ? t.dueDate > TODAY
                : t.dueDate < TODAY))),
  );
  const row = (t: (typeof items)[0]) => (
    <div key={t.id} className="flex items-center gap-3 py-3">
      <button
        role="checkbox"
        aria-checked={t.status === "completed"}
        aria-label="Complete"
        onClick={() => toggle(t.id)}
        className={cn(
          "grid h-[18px] w-[18px] place-items-center rounded-md border",
          t.status === "completed"
            ? "border-accent bg-accent text-bg"
            : "border-muted/60",
        )}
      >
        {t.status === "completed" && <Check size={12} strokeWidth={3} />}
      </button>
      <Link to={`/tasks/${t.id}`} className="min-w-0 flex-1">
        <div
          className={cn(
            "truncate text-sm",
            t.status === "completed" && "text-muted line-through",
          )}
        >
          {t.title}
        </div>
        <div className="text-xs capitalize text-muted">
          {t.priority} · {t.category} · Due {t.dueLabel}
        </div>
      </Link>
    </div>
  );
  return (
    <div>
      <PageHeader
        title="Tasks"
        sub="Manage everything you need to get done."
        action="New Task"
        onAction={() => setOpen(true)}
      />
      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="New Task"
        submitLabel="Create task"
        fields={[
          {
            name: "title",
            label: "Title",
            required: true,
            placeholder: "What needs to be done?",
          },
          { name: "description", label: "Description", type: "textarea" },
          {
            name: "priority",
            label: "Priority",
            type: "select",
            value: "medium",
            options: [
              ["low", "Low"],
              ["medium", "Medium"],
              ["high", "High"],
            ],
          },
          {
            name: "dueDate",
            label: "Due date",
            type: "date",
            value: new Date().toISOString().slice(0, 10),
          },
          {
            name: "projectId",
            label: "Project",
            type: "select",
            options: [
              ["", "None (Personal)"],
              ...projects.map((p) => [p.id, p.name] as [string, string]),
            ],
          },
        ]}
        onSubmit={(v) =>
          addTask({
            title: v.title,
            description: v.description,
            priority: v.priority as "low",
            dueDate: v.dueDate,
            projectId: v.projectId || undefined,
            category:
              projects.find((p) => p.id === v.projectId)?.name ?? "Personal",
          })
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((x) => (
            <button
              key={x}
              onClick={() => setTab(x)}
              className={cn(
                "rounded-md px-2.5 py-1 text-sm",
                tab === x ? "bg-elevated text-fg" : "text-muted hover:text-fg",
              )}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label className="flex h-8 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-sm">
            <Search size={14} className="text-muted" />
            <input
              aria-label="Search tasks"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-28 bg-transparent outline-none placeholder:text-muted"
            />
          </label>
          <div className="flex rounded-lg border border-line p-0.5">
            {["List", "Board"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs",
                  view === v ? "bg-elevated" : "text-muted",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
      {f.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-12 text-center text-sm text-muted">
          No tasks here yet.
        </div>
      ) : view === "List" ? (
        <div className="divide-y divide-line rounded-xl border border-line bg-surface px-5">
          {f.map(row)}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["TODO", "todo"],
            ["IN PROGRESS", "in-progress"],
            ["DONE", "completed"],
          ].map(([l, s]) => (
            <div
              key={s}
              className="rounded-xl border border-line bg-surface p-3"
            >
              <div className="mb-2 px-1 text-xs text-muted">{l}</div>
              <div className="space-y-2">
                {f
                  .filter((t) => t.status === s)
                  .map((t) => (
                    <Link
                      key={t.id}
                      to={`/tasks/${t.id}`}
                      className="block rounded-lg border border-line bg-elevated p-3 text-sm hover:border-muted/50"
                    >
                      {t.title}
                      <div className="mt-1.5">
                        <Tag>{t.category}</Tag>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

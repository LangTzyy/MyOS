import { Link, useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useStore } from "../store/StoreContext";
import PageHeader, { Tag } from "../components/ui/PageHeader";

export default function TaskDetail() {
  const { tasks } = useStore();
  const t = tasks.find((x) => x.id === useParams().id);
  if (!t)
    return (
      <div className="py-20 text-center text-sm text-muted">
        Task not found.{" "}
        <Link to="/tasks" className="text-accent">
          Back to tasks
        </Link>
      </div>
    );
  const meta = [
    ["Status", t.status],
    ["Priority", t.priority],
    ["Due", t.dueLabel],
    ["Project", t.category],
  ];
  return (
    <div className="max-w-3xl">
      <PageHeader
        title={t.title}
        sub={t.description ?? "No description yet."}
      />
      <div className="mb-6 flex gap-2">
        {["Edit", "Complete", "Delete"].map((b) => (
          <button
            key={b}
            className="h-8 rounded-lg border border-line px-3 text-sm hover:bg-elevated"
          >
            {b}
          </button>
        ))}
      </div>
      <dl className="grid grid-cols-2 gap-4 rounded-xl border border-line bg-surface p-5 sm:grid-cols-4">
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-muted">{k}</dt>
            <dd className="mt-1 text-sm capitalize">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex gap-1.5">
        {t.tags.map((x) => (
          <Tag key={x}>#{x}</Tag>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-accent/25 bg-accent/5 p-5">
        <div className="flex items-center gap-2 text-sm text-accent">
          <Sparkles size={14} />
          Need help with this task?
        </div>
        <Link
          to="/assistant"
          className="mt-2 inline-block text-sm hover:text-accent"
        >
          Ask MYOS AI →
        </Link>
      </div>
    </div>
  );
}

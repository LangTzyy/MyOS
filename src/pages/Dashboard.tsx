import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  Sparkles,
  Target,
} from "lucide-react";
import { useStore } from "../store/StoreContext";
import { deadlines } from "../data/projects";
import Section from "../components/ui/Section";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import { cn } from "../lib/cn";

const dot = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-muted",
} as const;

export default function Dashboard() {
  const { tasks, projects, toggleTask } = useStore();
  const seed = tasks.slice(0, 6);
  const done = Object.fromEntries(
    tasks.map((t) => [t.id, t.status === "completed"]),
  );
  const completed = tasks.filter((t) => t.status === "completed").length;
  const metrics = [
    { label: "Today's Tasks", value: seed.length, icon: ListTodo },
    { label: "Completed", value: completed, icon: CheckCircle2 },
    { label: "Active Projects", value: projects.length, icon: FolderKanban },
    { label: "Goals Progress", value: "68%", icon: Target },
  ];
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Good evening, Gilang.
        </h1>
        <p className="mt-1 text-sub">What are we working on today?</p>
      </header>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            className="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-muted/40"
          >
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs">{m.label}</span>
              <m.icon size={15} />
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
              {m.value}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <Section title="Today's Focus" className="lg:col-span-3">
          <ul className="-my-1 divide-y divide-line">
            {seed.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <button
                  role="checkbox"
                  aria-checked={done[t.id]}
                  aria-label={`Complete ${t.title}`}
                  onClick={() => toggleTask(t.id)}
                  className={cn(
                    "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border transition-colors",
                    done[t.id]
                      ? "border-accent bg-accent text-bg"
                      : "border-muted/60 hover:border-fg",
                  )}
                >
                  {done[t.id] && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.12 }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </motion.span>
                  )}
                </button>
                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      "truncate text-sm transition-colors",
                      done[t.id] && "text-muted line-through",
                    )}
                  >
                    {t.title}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">
                    {t.category} · {t.dueLabel}
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs capitalize text-sub">
                  <i
                    className={cn("h-1.5 w-1.5 rounded-full", dot[t.priority])}
                  />
                  {t.priority}
                </span>
              </li>
            ))}
          </ul>
        </Section>
        <div className="space-y-6 lg:col-span-2">
          <Section title="Upcoming">
            <ul className="space-y-3">
              {deadlines.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{d.title}</span>
                  <span className="text-xs text-muted">{d.label}</span>
                </li>
              ))}
            </ul>
          </Section>
          <div className="rounded-xl border border-accent/25 bg-accent/5 p-5">
            <div className="flex items-center gap-2 text-xs font-medium text-accent">
              <Sparkles size={14} />
              AI Insight
            </div>
            <p className="mt-2 text-sm leading-relaxed text-sub">
              You have 3 high-priority tasks due this week. Consider finishing
              the Metodologi Penelitian task first.
            </p>
            <Link
              to="/assistant"
              className="mt-3 inline-flex items-center gap-1 text-sm text-fg hover:text-accent"
            >
              Ask MYOS AI <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <Section title="Productivity Overview" className="lg:col-span-3">
          <ProductivityChart />
        </Section>
        <Section
          title="Active Projects"
          className="lg:col-span-2"
          action={
            <Link to="/projects" className="text-xs text-muted hover:text-fg">
              View all
            </Link>
          }
        >
          <ul className="space-y-4">
            {projects.slice(0, 3).map((p) => (
              <li key={p.id}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="tabular-nums text-muted">{p.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-elevated">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${p.progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

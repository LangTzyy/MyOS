import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import FormModal from "../components/ui/FormModal";
import PageHeader, { Bar, Tag } from "../components/ui/PageHeader";

export function Projects() {
  const { projects, addProject } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader
        title="Projects"
        sub="Your current projects."
        action="New Project"
        onAction={() => setOpen(true)}
      />
      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="New Project"
        submitLabel="Create project"
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "description", label: "Description", type: "textarea" },
          {
            name: "stack",
            label: "Tech stack (comma separated)",
            placeholder: "React, Laravel",
          },
        ]}
        onSubmit={(v) =>
          addProject({
            name: v.name,
            description: v.description,
            stack: v.stack
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean),
          })
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-muted/50"
          >
            <div className="flex justify-between">
              <h2 className="font-medium">{p.name}</h2>
              <span className="text-sm tabular-nums text-muted">
                {p.progress}%
              </span>
            </div>
            <p className="mb-4 mt-1 text-sm text-sub">{p.description}</p>
            <Bar v={p.progress} />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export function ProjectDetail() {
  const { projects, tasks } = useStore();
  const p = projects.find((x) => x.id === useParams().id);
  if (!p)
    return (
      <div className="py-20 text-center text-sm text-muted">
        Project not found.
      </div>
    );
  const ts = tasks.filter((t) => t.projectId === p.id);
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title={p.name} sub={p.description} />
      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="capitalize">{p.status}</span>
          <span>{p.progress}%</span>
        </div>
        <Bar v={p.progress} />
      </div>
      <section>
        <h2 className="mb-2 text-sm font-medium">Tasks</h2>
        <div className="divide-y divide-line rounded-xl border border-line bg-surface px-5">
          {ts.length ? (
            ts.map((t) => (
              <div key={t.id} className="py-3 text-sm">
                {t.title}
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-sm text-muted">
              No tasks yet.
            </div>
          )}
        </div>
      </section>
      <button className="h-8 rounded-lg border border-line px-3 text-sm hover:bg-elevated">
        Analyze Project
      </button>
    </div>
  );
}

import { useState } from "react";
import { Pin, Search, Sparkles } from "lucide-react";
import { useStore } from "../store/StoreContext";
import FormModal from "../components/ui/FormModal";
import PageHeader, { Tag } from "../components/ui/PageHeader";
import { cn } from "../lib/cn";

const cats = [
  "All",
  "Ideas",
  "Research",
  "Programming",
  "TA",
  "HIMAPRO",
  "Personal",
];
export default function Notes() {
  const { notes, addNote } = useStore(),
    [open, setOpen] = useState(false),
    [cat, setCat] = useState("All"),
    [q, setQ] = useState("");
  const f = notes.filter(
    (n) =>
      (cat === "All" || n.cat === cat) &&
      (n.title + n.body).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <PageHeader
        title="Notes"
        sub="Capture ideas, research and everything in between."
        action="New Note"
        onAction={() => setOpen(true)}
      />
      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title="New Note"
        submitLabel="Create note"
        fields={[
          { name: "title", label: "Title", required: true },
          { name: "body", label: "Content", type: "textarea" },
          {
            name: "cat",
            label: "Category",
            type: "select",
            options: cats.slice(1).map((c) => [c, c] as [string, string]),
          },
          {
            name: "tags",
            label: "Tags (comma separated)",
            placeholder: "laravel, ideas",
          },
        ]}
        onSubmit={(v) =>
          addNote({
            title: v.title,
            body: v.body,
            cat: v.cat,
            tags: v.tags
              .split(",")
              .map((x) => x.trim().replace(/^#/, ""))
              .filter(Boolean),
          })
        }
      />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex gap-1 overflow-x-auto">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-md px-2.5 py-1 text-sm",
                cat === c ? "bg-elevated" : "text-muted hover:text-fg",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="ml-auto flex h-8 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-sm">
          <Search size={14} className="text-muted" />
          <input
            aria-label="Search notes"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes"
            className="bg-transparent outline-none placeholder:text-muted"
          />
        </label>
      </div>
      {f.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-12 text-center text-sm text-muted">
          No notes found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.map((n) => (
            <article
              key={n.id}
              className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-muted/50"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{n.title}</h2>
                {n.pinned && <Pin size={13} className="text-accent" />}
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-sub">{n.body}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {n.tags.map((t) => (
                  <Tag key={t}>#{t}</Tag>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                Updated {n.updated}
                <button className="flex items-center gap-1 text-accent opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100">
                  <Sparkles size={12} />
                  Summarize
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

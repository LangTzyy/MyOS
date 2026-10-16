import { Search } from "lucide-react";
import { useStore } from "../store/StoreContext";
import PageHeader from "../components/ui/PageHeader";

export default function Knowledge() {
  const { notes } = useStore();
  const stats = [
    ["Documents", 24],
    ["Notes", notes.length],
    ["Topics", 11],
    ["Bookmarks", 37],
  ];
  return (
    <div>
      <PageHeader
        title="Knowledge Base"
        sub="Everything you know, organized."
      />
      <label className="flex h-11 items-center gap-3 rounded-xl border border-line bg-surface px-4">
        <Search size={16} className="text-muted" />
        <input
          aria-label="Search knowledge"
          placeholder="Search your knowledge…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </label>
      <div className="my-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-line bg-surface p-4">
            <div className="text-xs text-muted">{l}</div>
            <div className="mt-2 text-2xl font-semibold tabular-nums">{v}</div>
          </div>
        ))}
      </div>
      <h2 className="mb-2 text-sm font-medium">Recent additions</h2>
      <div className="divide-y divide-line rounded-xl border border-line bg-surface px-5">
        {notes.map((n) => (
          <div key={n.id} className="flex justify-between py-3 text-sm">
            <span>{n.title}</span>
            <span className="text-xs text-muted">
              {n.cat} · {n.updated}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

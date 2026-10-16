import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, Search, Sparkles } from "lucide-react";

const crumbsOf = (p: string) => {
  const s = p.split("/").filter(Boolean);
  return s.length
    ? s.map((x) => x[0].toUpperCase() + x.slice(1))
    : ["Dashboard"];
};

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const crumbs = crumbsOf(useLocation().pathname);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-bg/80 px-4 backdrop-blur md:px-6">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="rounded-md p-2 text-sub hover:bg-elevated md:hidden"
      >
        <Menu size={18} />
      </button>
      <nav
        aria-label="Breadcrumb"
        className="hidden text-sm text-muted sm:block"
      >
        <span>MYOS</span>
        {crumbs.map((c, i) => (
          <span key={i}>
            {" "}
            <span className="text-line">/</span>{" "}
            <span className={i === crumbs.length - 1 ? "text-fg" : ""}>
              {c}
            </span>
          </span>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <button
          aria-label="Search"
          className="flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors hover:border-muted/50 sm:w-60"
        >
          <Search size={15} />
          <span className="hidden flex-1 text-left sm:block">Search…</span>
          <kbd className="hidden rounded border border-line px-1.5 text-[10px] sm:block">
            ⌘K
          </kbd>
        </button>
        <button
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-sub hover:bg-elevated hover:text-fg"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
        <Link
          to="/assistant"
          aria-label="Ask MYOS AI"
          className="rounded-lg p-2 text-accent hover:bg-elevated"
        >
          <Sparkles size={17} />
        </Link>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-elevated text-xs font-medium">
          G
        </div>
      </div>
    </header>
  );
}

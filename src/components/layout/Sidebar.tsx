import { NavLink } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "../../lib/cn";
import { mainNav, secondaryNav } from "../../routes/nav";
import Logo from "./Logo";

function Item({
  to,
  label,
  icon: Icon,
  collapsed,
  onClick,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  collapsed: boolean;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      aria-label={label}
      className={({ isActive }) =>
        cn(
          "group relative flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm transition-colors",
          isActive
            ? "bg-elevated text-fg"
            : "text-sub hover:bg-elevated/60 hover:text-fg",
          collapsed && "justify-center",
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute -left-3 h-4 w-0.5 rounded-full bg-accent" />
          )}
          <Icon
            size={17}
            strokeWidth={1.75}
            className={isActive ? "text-accent" : ""}
          />
          {!collapsed && <span>{label}</span>}
          {collapsed && (
            <span
              role="tooltip"
              className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md border border-line bg-elevated px-2 py-1 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
            >
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

interface Props {
  collapsed: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
  mobile?: boolean;
}
export default function Sidebar({
  collapsed,
  onToggle,
  onNavigate,
  mobile,
}: Props) {
  const c = collapsed && !mobile;
  return (
    <aside className="flex h-full flex-col border-r border-line bg-surface px-3 py-4">
      <div
        className={cn(
          "mb-6 flex items-center px-1",
          c ? "justify-center" : "justify-between",
        )}
      >
        <Logo compact={c} />
      </div>
      <nav className="flex flex-1 flex-col gap-0.5" aria-label="Main">
        {mainNav.map((n) => (
          <Item key={n.to} {...n} collapsed={c} onClick={onNavigate} />
        ))}
        <div className="my-3 border-t border-line" />
        {secondaryNav.map((n) => (
          <Item key={n.to} {...n} collapsed={c} onClick={onNavigate} />
        ))}
      </nav>
      <div
        className={cn(
          "mt-3 flex items-center gap-3 border-t border-line pt-3",
          c && "justify-center",
        )}
      >
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-elevated text-xs font-medium">
          G
        </div>
        {!c && (
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm">Gilang</div>
            <div className="truncate text-xs text-muted">Personal</div>
          </div>
        )}
        {!mobile && onToggle && !c && (
          <button
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="rounded-md p-1.5 text-muted hover:bg-elevated hover:text-fg"
          >
            <PanelLeftClose size={16} />
          </button>
        )}
      </div>
      {!mobile && onToggle && c && (
        <button
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="mx-auto mt-2 rounded-md p-1.5 text-muted hover:bg-elevated hover:text-fg"
        >
          <PanelLeftOpen size={16} />
        </button>
      )}
    </aside>
  );
}

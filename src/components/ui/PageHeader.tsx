export default function PageHeader({ title, sub, action, onAction }: { title: string; sub: string; action?: string; onAction?: () => void }) {
  return (<header className="mb-6 flex items-end justify-between gap-4"><div><h1 className="text-2xl font-semibold tracking-tight">{title}</h1><p className="mt-1 text-sm text-sub">{sub}</p></div>
    {action && <button onClick={onAction} className="h-9 shrink-0 rounded-lg bg-fg px-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90">+ {action}</button>}</header>);
}
export const Bar = ({ v }: { v: number }) => (<div className="h-1.5 overflow-hidden rounded-full bg-elevated"><div className="h-full rounded-full bg-accent" style={{ width: `${v}%` }} /></div>);
export const Tag = ({ children }: { children: React.ReactNode }) => (<span className="rounded-md bg-elevated px-1.5 py-0.5 text-[11px] text-sub">{children}</span>);

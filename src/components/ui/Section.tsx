export default function Section({ title, action, children, className = "" }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (<section className={`rounded-xl border border-line bg-surface ${className}`}><div className="flex items-center justify-between px-5 pt-4"><h2 className="text-sm font-medium">{title}</h2>{action}</div><div className="p-5 pt-3">{children}</div></section>);
}

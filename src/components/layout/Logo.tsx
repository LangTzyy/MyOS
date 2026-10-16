export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <rect width="28" height="28" rx="8" className="fill-fg" />
        <path
          d="M7 20V8l7 7 7-7v12"
          className="stroke-bg"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {!compact && (
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">MYOS</div>
          <div className="text-[11px] text-muted">My Operating System</div>
        </div>
      )}
    </div>
  );
}

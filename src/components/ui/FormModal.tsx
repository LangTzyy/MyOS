import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export interface Field { name: string; label: string; type?: "text" | "textarea" | "select" | "date"; options?: [string, string][]; required?: boolean; placeholder?: string; value?: string }
interface Props { open: boolean; onClose: () => void; title: string; fields: Field[]; submitLabel: string; onSubmit: (v: Record<string, string>) => void }
const cls = "w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-muted";

export default function FormModal({ open, onClose, title, fields, submitLabel, onSubmit }: Props) {
  const init = () => Object.fromEntries(fields.map((f) => [f.name, f.value ?? (f.type === "select" ? f.options![0][0] : "")]));
  const [v, setV] = useState<Record<string, string>>(init);
  useEffect(() => { if (open) setV(init()); }, [open]);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  const set = (k: string, val: string) => setV((x) => ({ ...x, [k]: val }));
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div className="absolute inset-0 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.form onSubmit={(e) => { e.preventDefault(); onSubmit(v); onClose(); }}
            className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-line bg-surface p-5 shadow-2xl sm:rounded-2xl"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: 0.16 }}>
            <div className="mb-4 flex items-center justify-between"><h2 className="font-medium">{title}</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-muted hover:bg-elevated hover:text-fg"><X size={16} /></button></div>
            <div className="space-y-4">
              {fields.map((f, i) => (
                <label key={f.name} className="block text-sm"><span className="mb-1.5 block text-xs text-sub">{f.label}{f.required && " *"}</span>
                  {f.type === "textarea" ? <textarea rows={3} className={cls} required={f.required} placeholder={f.placeholder} value={v[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
                  : f.type === "select" ? <select className={cls} value={v[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>{f.options!.map(([val, l]) => <option key={val} value={val}>{l}</option>)}</select>
                  : <input autoFocus={i === 0} type={f.type ?? "text"} className={cls} required={f.required} placeholder={f.placeholder} value={v[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />}
                </label>))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="h-9 rounded-lg border border-line px-3.5 text-sm hover:bg-elevated">Cancel</button>
              <button type="submit" className="h-9 rounded-lg bg-fg px-3.5 text-sm font-medium text-bg hover:opacity-90">{submitLabel}</button>
            </div>
          </motion.form>
        </div>)}
    </AnimatePresence>
  );
}

import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import { cn } from "../lib/cn";

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-4 py-3 text-sm">
    <span>{label}</span>
    {children}
  </div>
);
const Sec = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-xl border border-line bg-surface px-5 pb-2 pt-4">
    <h2 className="text-sm font-medium">{title}</h2>
    <div className="divide-y divide-line">{children}</div>
  </section>
);
const Toggle = ({
  on,
  set,
  label,
}: {
  on: boolean;
  set: (v: boolean) => void;
  label: string;
}) => (
  <button
    role="switch"
    aria-checked={on}
    aria-label={label}
    onClick={() => set(!on)}
    className={cn(
      "h-5 w-9 rounded-full p-0.5 transition-colors",
      on ? "bg-accent" : "bg-elevated",
    )}
  >
    <span
      className={cn(
        "block h-4 w-4 rounded-full bg-fg transition-transform",
        on && "translate-x-4",
      )}
    />
  </button>
);
const Input = ({ v }: { v: string }) => (
  <input
    defaultValue={v}
    className="h-8 w-48 rounded-lg border border-line bg-bg px-2.5 text-sm"
  />
);
export default function Settings() {
  const [theme, setTheme] = useState("dark"),
    [n, setN] = useState({ t: true, d: true, p: false });
  const apply = (t: string) => {
    setTheme(t);
    document.documentElement.classList.toggle("light", t === "light");
    document.documentElement.classList.toggle("dark", t !== "light");
  };
  return (
    <div className="max-w-2xl space-y-4">
      <PageHeader title="Settings" sub="Manage your account and preferences." />
      <Sec title="General">
        <Row label="Name">
          <Input v="Gilang" />
        </Row>
        <Row label="Email">
          <Input v="gilang@example.com" />
        </Row>
        <Row label="Timezone">
          <Input v="Asia/Jakarta (WIB)" />
        </Row>
        <Row label="Language">
          <Input v="English" />
        </Row>
      </Sec>
      <Sec title="Appearance">
        <Row label="Theme">
          <div className="flex rounded-lg border border-line p-0.5">
            {["dark", "light"].map((t) => (
              <button
                key={t}
                onClick={() => apply(t)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs capitalize",
                  theme === t ? "bg-elevated" : "text-muted",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </Row>
      </Sec>
      <Sec title="Notifications">
        <Row label="Task reminders">
          <Toggle
            label="Task reminders"
            on={n.t}
            set={(v) => setN({ ...n, t: v })}
          />
        </Row>
        <Row label="Deadline reminders">
          <Toggle
            label="Deadline reminders"
            on={n.d}
            set={(v) => setN({ ...n, d: v })}
          />
        </Row>
        <Row label="Project updates">
          <Toggle
            label="Project updates"
            on={n.p}
            set={(v) => setN({ ...n, p: v })}
          />
        </Row>
      </Sec>
      <Sec title="AI">
        <Row label="Personality">
          <Input v="Concise & direct" />
        </Row>
        <Row label="Default model">
          <Input v="MYOS AI (placeholder)" />
        </Row>
      </Sec>
      <Sec title="Data">
        <Row label="Export data">
          <button className="h-8 rounded-lg border border-line px-3 text-xs hover:bg-elevated">
            Export
          </button>
        </Row>
        <Row label="Import data">
          <button className="h-8 rounded-lg border border-line px-3 text-xs hover:bg-elevated">
            Import
          </button>
        </Row>
      </Sec>
    </div>
  );
}

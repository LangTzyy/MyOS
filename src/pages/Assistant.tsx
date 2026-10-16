import { useEffect, useRef, useState } from "react";
import { Copy, RefreshCw, Send, Sparkles, Trash2 } from "lucide-react";
import { chat } from "../data/misc";

const prompts = [
  "What should I work on today?",
  "Summarize my tasks.",
  "What deadlines are coming?",
  "Help me plan this week.",
  "Find my notes about Laravel.",
  "Review my current projects.",
];
export default function Assistant() {
  const [msgs, setMsgs] = useState(chat),
    [v, setV] = useState(""),
    [typing, setTyping] = useState(false),
    end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);
  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setV("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          role: "ai",
          text: "This is a demo response. Once connected to the Laravel API, I'll answer using your tasks, projects and notes.",
        },
      ]);
      setTyping(false);
    }, 1100);
  };
  return (
    <div className="flex h-[calc(100dvh-8.5rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <Sparkles size={18} className="text-accent" />
            MYOS AI
          </h1>
          <p className="text-sm text-sub">Your personal operating assistant</p>
        </div>
        <button
          onClick={() => setMsgs([])}
          aria-label="Clear conversation"
          className="rounded-lg p-2 text-muted hover:bg-elevated hover:text-fg"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-line bg-surface p-4">
        {msgs.length === 0 && (
          <div className="grid h-full place-items-center">
            <div className="grid max-w-md gap-2 sm:grid-cols-2">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="rounded-lg border border-line p-3 text-left text-sm text-sub hover:bg-elevated hover:text-fg"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "flex justify-end" : "flex"}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-elevated" : ""}`}
            >
              {m.text}
              {m.role === "ai" && (
                <div className="mt-2 flex gap-2 text-muted">
                  <button
                    aria-label="Copy"
                    onClick={() => navigator.clipboard?.writeText(m.text)}
                  >
                    <Copy size={13} />
                  </button>
                  <button
                    aria-label="Regenerate"
                    onClick={() => send("Regenerate")}
                  >
                    <RefreshCw size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-1 px-4" aria-label="Typing">
            {[0, 1, 2].map((i) => (
              <i
                key={i}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        )}
        <div ref={end} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(v);
        }}
        className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-surface p-2 focus-within:border-muted/60"
      >
        <input
          aria-label="Message"
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder="Ask anything…"
          className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted"
        />
        <button
          aria-label="Send"
          className="grid h-8 w-8 place-items-center rounded-lg bg-fg text-bg"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}

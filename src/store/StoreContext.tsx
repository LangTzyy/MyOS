import { createContext, useContext, useEffect, useState } from "react";
import { tasks as t0 } from "../data/tasks";
import { projects as p0 } from "../data/projects";
import { goals as g0, notes as n0 } from "../data/misc";
import type { Project, Task } from "../types";

type Goal = (typeof g0)[number];
type Note = (typeof n0)[number];
interface S {
  tasks: Task[];
  projects: Project[];
  goals: Goal[];
  notes: Note[];
}
interface Api extends S {
  addTask: (t: {
    title: string;
    description?: string;
    priority: Task["priority"];
    dueDate: string;
    projectId?: string;
    category: string;
  }) => void;
  toggleTask: (id: string) => void;
  addProject: (p: {
    name: string;
    description: string;
    stack: string[];
  }) => void;
  addGoal: (g: {
    title: string;
    cat: string;
    target: string;
    deadline: string;
  }) => void;
  addNote: (n: {
    title: string;
    body: string;
    cat: string;
    tags: string[];
  }) => void;
}
const KEY = "myos:data:v1";
const Ctx = createContext<Api>(null!);
const uid = () => Math.random().toString(36).slice(2, 9);
const fmt = (d: string) =>
  d
    ? new Date(d).toLocaleDateString("en", { month: "short", day: "numeric" })
    : "No date";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<S>(() => {
    try {
      const r = localStorage.getItem(KEY);
      if (r) return JSON.parse(r);
    } catch {
      /* ignore */
    }
    return { tasks: t0, projects: p0, goals: g0, notes: n0 };
  });
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);
  const api: Api = {
    ...s,
    addTask: (t) =>
      setS((x) => ({
        ...x,
        tasks: [
          {
            ...t,
            id: uid(),
            status: "todo",
            dueLabel: fmt(t.dueDate),
            tags: [],
          },
          ...x.tasks,
        ],
      })),
    toggleTask: (id) =>
      setS((x) => ({
        ...x,
        tasks: x.tasks.map((t) =>
          t.id === id
            ? { ...t, status: t.status === "completed" ? "todo" : "completed" }
            : t,
        ),
      })),
    addProject: (p) =>
      setS((x) => ({
        ...x,
        projects: [
          { ...p, id: uid(), progress: 0, status: "active" },
          ...x.projects,
        ],
      })),
    addGoal: (g) =>
      setS((x) => ({
        ...x,
        goals: [
          {
            ...g,
            id: uid(),
            progress: 0,
            current: "Not started",
            ms: [["Define first milestone", 0]],
          },
          ...x.goals,
        ],
      })),
    addNote: (n) =>
      setS((x) => ({
        ...x,
        notes: [
          { ...n, id: uid(), pinned: false, updated: "Just now" },
          ...x.notes,
        ],
      })),
  };
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
export const useStore = () => useContext(Ctx);

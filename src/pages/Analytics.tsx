import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import PageHeader from "../components/ui/PageHeader";
import { productivity, projects } from "../data/projects";
import { goals } from "../data/misc";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import { Bar as Pb } from "../components/ui/PageHeader";

const S = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-xl border border-line bg-surface p-5">
    <h2 className="mb-3 text-sm font-medium">{title}</h2>
    {children}
  </section>
);
export default function Analytics() {
  const stats = [
    ["Tasks completed", "34"],
    ["Projects completed", "1"],
    ["Goals progress", "68%"],
    ["Focus time", "21h"],
  ];
  const week = productivity["7D"].map(([name, completed]) => ({
    name,
    completed,
  }));
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" sub="Productivity overview." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-line bg-surface p-4">
            <div className="text-xs text-muted">{l}</div>
            <div className="mt-2 text-2xl font-semibold">{v}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <S title="Weekly productivity">
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={week} margin={{ left: -24 }}>
                <CartesianGrid vertical={false} stroke="#27272A" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#71717A", fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "#18181B" }}
                  contentStyle={{
                    background: "#18181B",
                    border: "1px solid #27272A",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="completed" fill="#818CF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </S>
        <S title="Task completion">
          <ProductivityChart />
        </S>
        <S title="Project progress">
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="text-muted">{p.progress}%</span>
                </div>
                <Pb v={p.progress} />
              </div>
            ))}
          </div>
        </S>
        <S title="Goal progress">
          <div className="space-y-4">
            {goals.map((g) => (
              <div key={g.id}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span>{g.title}</span>
                  <span className="text-muted">{g.progress}%</span>
                </div>
                <Pb v={g.progress} />
              </div>
            ))}
          </div>
        </S>
      </div>
    </div>
  );
}

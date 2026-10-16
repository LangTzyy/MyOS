import type { Project, Deadline } from "../types";
export const projects: Project[] = [
  {
    id: "p1",
    name: "SmartMeal",
    description: "AI-powered meal planner",
    progress: 80,
    status: "active",
    stack: ["Frontend", "AI", "Firebase", "Three.js"],
  },
  {
    id: "p2",
    name: "SAKTI Website",
    description: "HIMAPRO organization website",
    progress: 70,
    status: "active",
    stack: ["Next.js", "Laravel"],
  },
  {
    id: "p3",
    name: "TA",
    description: "Thesis research & report",
    progress: 40,
    status: "active",
    stack: ["Research"],
  },
  {
    id: "p4",
    name: "MYOS",
    description: "Personal operating system",
    progress: 10,
    status: "active",
    stack: ["React", "Laravel"],
  },
];
export const deadlines: Deadline[] = [
  { id: "d1", title: "Metodologi Penelitian", label: "Tomorrow" },
  { id: "d2", title: "Project Documentation", label: "Oct 12" },
  { id: "d3", title: "TA Proposal", label: "Oct 15" },
];
export const productivity = {
  "7D": [
    ["Mon", 3, 5],
    ["Tue", 5, 6],
    ["Wed", 4, 4],
    ["Thu", 7, 8],
    ["Fri", 6, 5],
    ["Sat", 2, 3],
    ["Sun", 4, 4],
  ],
  "30D": [
    ["W1", 18, 22],
    ["W2", 24, 26],
    ["W3", 21, 20],
    ["W4", 29, 31],
  ],
  "3M": [
    ["Jul", 62, 70],
    ["Aug", 78, 84],
    ["Sep", 91, 95],
  ],
} as Record<string, (string | number)[][]>;

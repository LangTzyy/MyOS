export const goals = [
  {
    id: "g1",
    title: "Improve Laravel Skills",
    cat: "Programming",
    progress: 70,
    current: "Intermediate",
    target: "Advanced",
    deadline: "December 2026",
    ms: [
      ["Laravel Fundamentals", 1],
      ["REST API", 1],
      ["Authentication", 0],
      ["Deployment", 0],
      ["Build Production App", 0],
    ],
  },
  {
    id: "g2",
    title: "Finish TA Proposal",
    cat: "Academic",
    progress: 40,
    current: "Topic search",
    target: "Proposal approved",
    deadline: "October 2026",
    ms: [
      ["Choose topic", 1],
      ["Literature review", 0],
      ["Draft proposal", 0],
    ],
  },
  {
    id: "g3",
    title: "Lead HIMAPRO 2026/2027",
    cat: "Career",
    progress: 25,
    current: "Preparing",
    target: "Programs running",
    deadline: "June 2027",
    ms: [
      ["LDK", 0],
      ["Program kerja", 0],
    ],
  },
] as {
  id: string;
  title: string;
  cat: string;
  progress: number;
  current: string;
  target: string;
  deadline: string;
  ms: [string, number][];
}[];
export const notes = [
  {
    id: "n1",
    title: "CNN Research",
    body: "Notes about CNN architecture, dataset preparation and transfer learning.",
    tags: ["cnn", "research", "ta"],
    cat: "Research",
    pinned: true,
    updated: "2 hours ago",
  },
  {
    id: "n2",
    title: "Laravel Auth Flow",
    body: "Sanctum vs Passport, token handling for the MYOS API.",
    tags: ["laravel", "myos"],
    cat: "Programming",
    pinned: true,
    updated: "Yesterday",
  },
  {
    id: "n3",
    title: "HIMAPRO Program Ideas",
    body: "Workshop series, bazar booth ideas, mentoring program.",
    tags: ["himapro"],
    cat: "HIMAPRO",
    pinned: false,
    updated: "3 days ago",
  },
  {
    id: "n4",
    title: "Portfolio Redesign",
    body: "Hero section, case study layout, performance budget.",
    tags: ["portfolio"],
    cat: "Personal",
    pinned: false,
    updated: "Last week",
  },
];
export const events = {
  8: ["Review Laravel project"],
  9: ["Metodologi Penelitian"],
  12: ["Project Documentation"],
  15: ["TA Proposal", "Goal: Laravel Auth"],
  22: ["SmartMeal milestone"],
} as Record<number, string[]>;
export const chat = [
  { role: "user", text: "What should I work on tonight?" },
  {
    role: "ai",
    text: "You have 3 important tasks. Start with Metodologi Penelitian (high priority, due tomorrow), then review the Laravel project.",
  },
];

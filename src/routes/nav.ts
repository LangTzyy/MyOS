import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Target,
  StickyNote,
  BookOpen,
  CalendarDays,
  Sparkles,
  BarChart3,
  Settings,
} from "lucide-react";
export const mainNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/notes", label: "Notes", icon: StickyNote },
  { to: "/knowledge", label: "Knowledge", icon: BookOpen },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];
export const secondaryNav = [
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
];

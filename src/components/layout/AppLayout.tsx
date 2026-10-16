import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("myos:sidebar") === "1",
  );
  const [drawer, setDrawer] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    localStorage.setItem("myos:sidebar", collapsed ? "1" : "0");
  }, [collapsed]);
  useEffect(() => {
    setDrawer(false);
  }, [pathname]);
  return (
    <div className="flex h-dvh">
      <div
        className={`hidden shrink-0 transition-[width] duration-200 md:block ${collapsed ? "w-[68px]" : "w-60"} max-lg:!w-[68px]`}
      >
        <div className="hidden h-full lg:block">
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
          />
        </div>
        <div className="h-full lg:hidden">
          <Sidebar collapsed />
        </div>
      </div>
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              key="bd"
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.div
              key="dr"
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.18 }}
            >
              <Sidebar
                collapsed={false}
                mobile
                onNavigate={() => setDrawer(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Topbar onMenu={() => setDrawer(true)} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { GlobalSearch } from "@/components/common/GlobalSearch";

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Ignorar layout para página de login (auth)
  if (location.pathname === "/auth") {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[var(--color-neon-blue)]/30 dark">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] text-white overflow-hidden font-sans antialiased selection:bg-[var(--color-neon-blue)]/30 dark">
      {/* Background Ambients Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-neon-purple)]/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-neon-blue)]/10 blur-[120px] pointer-events-none z-0" />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 relative scroll-smooth focus:outline-none touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}


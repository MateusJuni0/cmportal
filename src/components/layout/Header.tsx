import { Bell, Menu } from "lucide-react";
import { DeployButton } from "@/components/common/DeployButton";
import { GlobalSearch } from "@/components/common/GlobalSearch";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 z-30 sticky top-0">
      {/* Mobile Toggle & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Center - Global Search (Premium) */}
      <div className="flex-1 flex justify-center px-4">
        <GlobalSearch />
      </div>
      
      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        <button className="hidden sm:block p-2 relative text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
        </button>
        <div className="hidden sm:block h-6 w-[1px] bg-white/10 mx-2" />
        <DeployButton />
        <div className="flex items-center gap-3 ml-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-[1px]">
             <div className="w-full h-full bg-[#1A1A1A] rounded-full border border-black/50" />
          </div>
        </div>
      </div>
    </header>
  );
}


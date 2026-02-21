import { Bell, Menu } from "lucide-react";
import { DeployButton } from "../common/DeployButton";
import { GlobalSearch } from "../common/GlobalSearch";

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
        <div className="flex items-center gap-3 ml-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-rose-500 p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
             <div className="w-full h-full bg-[#0A0A0A] rounded-full border border-black/50 flex items-center justify-center overflow-hidden">
                <img src="https://github.com/MateusJuni0.png" alt="Mateus" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}


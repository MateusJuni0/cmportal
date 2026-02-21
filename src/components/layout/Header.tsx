import { Bell, Search } from "lucide-react";
import { DeployButton } from "@/components/common/DeployButton";
import { GlobalSearch } from "@/components/common/GlobalSearch";

export function Header() {
  return (
    <header className="h-16 border-b border-[#2A2A2A] bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <GlobalSearch />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 relative text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
        </button>
        <div className="h-6 w-[1px] bg-white/10 mx-2" />
        <DeployButton />
        <div className="flex items-center gap-3 ml-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
             <div className="w-full h-full bg-[#1A1A1A] rounded-full border border-black/50" />
          </div>
        </div>
      </div>
    </header>
  );
}

import { Bell, Search } from "lucide-react";
import { DeployButton } from "@/components/common/DeployButton";

export function Header() {
  return (
    <header className="h-16 border-b border-[#2A2A2A] bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-8 z-20 sticky top-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] rounded-lg border border-white/5 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Buscar (⌘K)</span>
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 relative text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-neon-red)] shadow-[0_0_8px_var(--color-neon-red)]" />
        </button>
        <div className="h-6 w-[1px] bg-white/10 mx-2" />
        <DeployButton />
        <div className="flex items-center gap-3 ml-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] p-[2px]">
             <div className="w-full h-full bg-[#1A1A1A] rounded-full border border-black/50" />
          </div>
        </div>
      </div>
    </header>
  );
}

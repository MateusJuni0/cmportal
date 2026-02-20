import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";
import { NeumorphismButton } from "@/components/common/NeumorphismButton";
import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] p-4 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-neon-purple)]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-neon-blue)]/10 blur-[120px] pointer-events-none z-0" />

      <GlassmorphismCard className="w-full max-w-md flex flex-col items-center gap-8 relative z-10 p-10">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-[var(--color-neon-blue)] drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Sovereign Sales Engine</h1>
            <p className="text-sm text-zinc-400">Entre na sua conta para acessar o sistema.</p>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="w-full space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">E-mail Corporativo</label>
            <input 
              type="email" 
              required
              placeholder="admin@sovereign.com" 
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors shadow-inner placeholder:text-zinc-600"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Senha</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors shadow-inner placeholder:text-zinc-600"
            />
          </div>

          <NeumorphismButton type="submit" className="w-full mt-8">
            Entrar no Sistema
          </NeumorphismButton>
        </form>
      </GlassmorphismCard>
    </div>
  );
}

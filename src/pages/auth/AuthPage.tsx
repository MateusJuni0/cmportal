import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";
import { NeumorphismButton } from "@/components/common/NeumorphismButton";
import { Bot, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      toast.success("Acesso autorizado. Bem-vindo ao Sovereign OS.");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(`Falha na autenticação: ${error.message}`);
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sovereign.com" 
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors shadow-inner placeholder:text-zinc-600"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Senha</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors shadow-inner placeholder:text-zinc-600"
            />
          </div>

          <NeumorphismButton 
            type="submit" 
            className="w-full mt-8"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Autenticando...
              </div>
            ) : "Entrar no Sistema"}
          </NeumorphismButton>

          <div className="w-full flex items-center gap-4 my-4">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Ou acesse via</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <button 
            type="button"
            onClick={() => window.location.href = '/api/oauth/login'} 
            className="w-full py-3 bg-[#24292e] hover:bg-[#2f363d] text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-3 border border-white/5 shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            CMTecnologia Git Login
          </button>
        </form>
      </GlassmorphismCard>
    </div>
  );
}

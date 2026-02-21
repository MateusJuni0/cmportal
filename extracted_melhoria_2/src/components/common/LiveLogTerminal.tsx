import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Play, Pause, AlertCircle, CheckCircle2, Info, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

type LogLevel = "info" | "success" | "warning" | "error" | "agent-thought";

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  agentName: string;
  message: string;
}

const MOCK_LOGS: Omit<LogEntry, "id" | "timestamp">[] = [
  { level: "info", agentName: "System", message: "Inicializando Sovereign Sales Engine v2.0..." },
  { level: "success", agentName: "System", message: "Conexão com banco de dados estabelecida." },
  { level: "info", agentName: "Alpha", message: "Iniciando rotina matinal de prospecção." },
  { level: "agent-thought", agentName: "Alpha", message: "Analisando 50 perfis do LinkedIn da lista 'SaaS Founders'..." },
  { level: "warning", agentName: "Alpha", message: "API do LinkedIn rate limit atingido. Aguardando 60s." },
  { level: "success", agentName: "Bravo", message: "Email follow-up enviado para cliente@empresa.com" },
  { level: "agent-thought", agentName: "Bravo", message: "Lead abriu o email anterior 3 vezes. Aumentando score de intenção para 85/100." },
  { level: "info", agentName: "Alpha", message: "Retomando análise de perfis." },
  { level: "success", agentName: "Alpha", message: "Conexão solicitada com CEO da TechCorp." },
  { level: "error", agentName: "System", message: "Falha ao sincronizar com CRM HubSpot. Tentando novamente..." },
  { level: "success", agentName: "System", message: "Sincronização CRM restabelecida com sucesso." },
];

export function LiveLogTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const logIndexRef = useRef(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const mockLog = MOCK_LOGS[logIndexRef.current % MOCK_LOGS.length];
      
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour12: false }) + '.' + new Date().getMilliseconds().toString().padStart(3, '0'),
        ...mockLog
      };

      setLogs((prev) => [...prev.slice(-100), newLog]); // Keep only last 100 logs
      logIndexRef.current += 1;
    }, Math.random() * 2000 + 500); // Random delay between 0.5s and 2.5s

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (bottomRef.current && !isPaused) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isPaused]);

  const getLogColor = (level: LogLevel) => {
    switch (level) {
      case "info": return "text-blue-400";
      case "success": return "text-green-400 dark:text-[var(--color-neon-green)]";
      case "warning": return "text-yellow-400";
      case "error": return "text-red-400 dark:text-red-500";
      case "agent-thought": return "text-purple-400 dark:text-[var(--color-neon-purple)] italic";
      default: return "text-slate-300";
    }
  };

  const getLogIcon = (level: LogLevel) => {
    switch (level) {
      case "info": return <Info className="w-3.5 h-3.5" />;
      case "success": return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "warning": return <AlertCircle className="w-3.5 h-3.5" />;
      case "error": return <AlertCircle className="w-3.5 h-3.5" />;
      case "agent-thought": return <ChevronRight className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-[#0d1117] font-mono">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
        <div className="flex items-center gap-3">
          <TerminalIcon className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-200 tracking-wider">SOVEREIGN_LIVE_LOGS</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", !isPaused ? "bg-green-400" : "hidden")}></span>
              <span className={cn("relative inline-flex rounded-full h-2 w-2", !isPaused ? "bg-green-500" : "bg-slate-500")}></span>
            </span>
            <span className="text-xs text-slate-400 uppercase">{isPaused ? "Pausado" : "Gravando"}</span>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs md:text-sm">
        {logs.length === 0 ? (
          <div className="text-slate-500 animate-pulse">Aguardando eventos do sistema...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 group hover:bg-white/5 p-1 rounded transition-colors">
              <span className="text-slate-500 whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity">
                [{log.timestamp}]
              </span>
              <div className="flex items-center gap-1.5 whitespace-nowrap w-24">
                <span className={cn(getLogColor(log.level))}>{getLogIcon(log.level)}</span>
                <span className={cn(
                  "font-bold",
                  log.agentName === "System" ? "text-slate-300" : "text-brand-400"
                )}>
                  {log.agentName}
                </span>
              </div>
              <span className="text-slate-500 shrink-0">::</span>
              <span className={cn("flex-1 break-words", getLogColor(log.level))}>
                {log.message}
              </span>
            </div>
          ))
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}

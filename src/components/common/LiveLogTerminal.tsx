import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogEntry } from '../../types';
import { cn } from '../../utils/cn';

interface LiveLogTerminalProps {
  logs: LogEntry[];
  className?: string;
}

export function LiveLogTerminal({ logs, className }: LiveLogTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return 'text-cyan-400';
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      case 'debug':
        return 'text-violet-400';
      default:
        return 'text-slate-400';
    }
  };

  const getLevelBg = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return 'bg-cyan-400/5 border-cyan-400/10';
      case 'success':
        return 'bg-green-400/5 border-green-400/10';
      case 'warning':
        return 'bg-yellow-400/5 border-yellow-400/10';
      case 'error':
        return 'bg-red-400/5 border-red-400/10';
      case 'debug':
        return 'bg-violet-400/5 border-violet-400/10';
      default:
        return 'bg-slate-400/5 border-slate-400/10';
    }
  };

  return (
    <div className={cn('relative overflow-hidden flex flex-col', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
          </div>
          <span className="ml-3 text-[10px] uppercase tracking-widest font-bold text-slate-400">
            Neural Intelligence Stream
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            {logs.length} Operations
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-[10px] text-slate-400 font-bold">LIVE SYNC</span>
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="w-3 h-3 bg-black border-white/10 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-black/20 p-4 font-mono text-xs scrollbar-thin scrollbar-thumb-white/5"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                'mb-2 p-2 rounded border transition-all duration-300 hover:bg-white/5',
                getLevelBg(log.level)
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-start gap-3">
                  <span className="text-[10px] text-slate-600 shrink-0 pt-0.5">
                    {new Date(log.timestamp).toLocaleTimeString('pt-PT')}
                  </span>
                  {log.agent && (
                    <span className="text-[10px] font-bold text-violet-400/80 shrink-0 pt-0.5 px-1.5 py-0 rounded bg-violet-400/5 border border-violet-400/10">
                      {log.agent.toUpperCase()}
                    </span>
                  )}
                  <span className={cn('uppercase text-[10px] font-black shrink-0 pt-0.5', getLevelColor(log.level))}>
                    {log.level}
                  </span>
                  <span className="text-slate-300 leading-relaxed break-words flex-1">{log.message}</span>
                </div>
                {log.data && (
                  <pre className="mt-2 p-2 rounded bg-black/40 border border-white/5 text-[10px] text-slate-500 overflow-x-auto">
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {logs.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-600">
            <p className="text-xs tracking-widest animate-pulse font-bold">AWAITING NEURAL SIGNALS...</p>
          </div>
        )}
      </div>
    </div>
  );
}

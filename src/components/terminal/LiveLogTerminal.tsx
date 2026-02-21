import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogEntry } from '@/types';
import { cn } from '@/utils/cn';

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
        return 'bg-cyan-400/10 border-cyan-400/20';
      case 'success':
        return 'bg-green-400/10 border-green-400/20';
      case 'warning':
        return 'bg-yellow-400/10 border-yellow-400/20';
      case 'error':
        return 'bg-red-400/10 border-red-400/20';
      case 'debug':
        return 'bg-violet-400/10 border-violet-400/20';
      default:
        return 'bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-3 text-sm font-medium text-slate-300">
            Agent Activity Terminal
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">
            {logs.length} entries
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-slate-400">Auto-scroll</span>
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="w-4 h-4 rounded"
            />
          </label>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 font-mono text-sm"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className={cn(
                'mb-2 p-3 rounded-lg border',
                getLevelBg(log.level)
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-xs text-slate-500 shrink-0 pt-0.5">
                  {log.timestamp.toLocaleTimeString('pt-BR')}{' '}
                  {log.timestamp.toLocaleDateString('pt-BR')}
                </span>
                {log.agent && (
                  <span className="text-xs font-mono text-violet-400 shrink-0 pt-0.5">
                    [{log.agent}]
                  </span>
                )}
                <span className={cn('uppercase text-xs font-bold shrink-0 pt-0.5', getLevelColor(log.level))}>
                  {log.level}
                </span>
                <span className="text-slate-300 flex-1">{log.message}</span>
                {log.data && (
                  <pre className="text-xs text-slate-500 mt-1 w-full overflow-x-auto">
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {logs.length === 0 && (
          <div className="text-center text-slate-600 py-12">
            <p className="text-sm">Waiting for agent activity...</p>
          </div>
        )}
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
    </div>
  );
}
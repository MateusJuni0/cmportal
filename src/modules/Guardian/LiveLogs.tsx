import React, { useState, useEffect } from 'react';
import { Terminal, Bot, Activity, Filter, Pause, Play, Download } from 'lucide-react';

const LogEntry = ({ type, agent, message, time }: any) => (
  <div className="flex gap-4 p-2 font-mono text-xs hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-[#00ffc8]">
    <span className="text-gray-500 min-w-[60px]">{time}</span>
    <span className={`font-bold min-w-[80px] ${
      agent === 'NERO' ? 'text-red-400' :
      agent === 'DANTE' ? 'text-[#00ffc8]' :
      agent === 'ALFA' ? 'text-blue-400' :
      'text-yellow-400'
    }`}>[{agent}]</span>
    <span className={`flex-1 ${
      type === 'ERROR' ? 'text-red-500' :
      type === 'WARN' ? 'text-yellow-500' :
      type === 'SUCCESS' ? 'text-green-500' :
      'text-gray-300'
    }`}>{message}</span>
  </div>
);

export const LiveLogs: React.FC = () => {
  const [logs, setLogs] = useState([
    { time: '21:30:05', agent: 'NERO', type: 'INFO', message: 'Scanning LinkedIn profiles for keyword "Luxury Estate"...' },
    { time: '21:30:08', agent: 'NERO', type: 'SUCCESS', message: 'Found 12 qualified leads in Lisbon area.' },
    { time: '21:30:12', agent: 'ALFA', type: 'INFO', message: 'Monitoring Zaask for "Web Design" requests...' },
    { time: '21:30:15', agent: 'DANTE', type: 'INFO', message: 'Orchestrating task delegation to VPS cluster.' },
    { time: '21:30:22', agent: 'LUCIO', type: 'WARN', message: 'API Latency spike detected on Gemini Flash (1500ms).' },
    { time: '21:30:25', agent: 'DANTE', type: 'SUCCESS', message: 'Switched context to backup model. Continuing execution.' },
  ]);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const newLog = {
        time: new Date().toLocaleTimeString('pt-PT'),
        agent: ['NERO', 'DANTE', 'ALFA', 'LUCIO'][Math.floor(Math.random() * 4)],
        type: ['INFO', 'SUCCESS', 'WARN'][Math.floor(Math.random() * 3)],
        message: `System heartbeat check: Active session ID ${Math.random().toString(36).substring(7)}`
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-[#020205] p-6 text-white font-mono flex flex-col h-screen">
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#00ffc8]" />
          <h2 className="text-xl font-bold tracking-tight">System <span className="text-[#00ffc8]">Live Logs</span></h2>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors ${isPaused ? 'text-yellow-400' : 'text-green-400'}`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-gray-400">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-gray-400">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Terminal Window */}
      <div className="flex-1 bg-[#0a0a0c] rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-[#1a1a1c] px-4 py-2 flex items-center gap-2 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="text-xs text-gray-500 ml-2">root@vps-ner-01:~</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {logs.map((log, i) => (
            <LogEntry key={i} {...log} />
          ))}
          <div className="animate-pulse text-[#00ffc8] mt-2">_</div>
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-green-500" />
          <span>Stream: Active</span>
        </div>
        <div>Buffer: 50/1000 lines</div>
        <div>Latency: 45ms</div>
      </div>
    </div>
  );
};

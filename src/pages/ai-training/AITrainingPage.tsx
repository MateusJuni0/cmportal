import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Link as LinkIcon, FileText, Database, CheckCircle, Loader2, Sparkles, X } from "lucide-react";
import { cn } from "@/utils/cn";

type ProcessingStatus = "idle" | "uploading" | "processing" | "success" | "error";

interface TrainingFile {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "url";
}

export function AiTraining() {
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState<TrainingFile[]>([]);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFile(e.dataTransfer.files[0].name, "pdf");
    }
  };

  const addFile = (name: string, type: "pdf" | "url") => {
    const newFile: TrainingFile = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      size: type === "pdf" ? "2.4 MB" : "Link Externo",
      type
    };
    setFiles([...files, newFile]);
  };

  const handleAddUrl = () => {
    if (!url.trim()) return;
    addFile(url, "url");
    setUrl("");
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleProcess = () => {
    if (files.length === 0) return;
    setStatus("uploading");
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setStatus("success");
      } else if (currentProgress > 40 && status !== "processing") {
         setStatus("processing");
      }
      setProgress(Math.floor(currentProgress));
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">AI Training Ground</h1>
        <p className="text-slate-500 dark:text-zinc-400">
          Enriqueça o cérebro dos seus agentes. Faça upload de PDFs, planilhas ou links para treinar o conhecimento específico sobre o seu negócio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="glass-card p-8 border-dashed border-2 border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors flex flex-col items-center justify-center text-center gap-4 group cursor-pointer bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => {
            if (e.target.files && e.target.files[0]) addFile(e.target.files[0].name, "pdf");
          }} />
          <div className="w-16 h-16 bg-indigo-50 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <UploadCloud className="w-8 h-8 text-indigo-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 text-slate-900 dark:text-white">Upload de Arquivos</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Arraste e solte PDFs ou clique para selecionar</p>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-center gap-4 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 dark:bg-zinc-800/50 rounded-lg">
              <LinkIcon className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Adicionar Links</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400">Website, FAQ ou documentação online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://sua-empresa.com/sobre"
              className="flex-1 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button 
              onClick={handleAddUrl}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 flex flex-col gap-6 flex-1 min-h-[300px] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
            <Database className="w-5 h-5 text-slate-400" />
            Base de Conhecimento ({files.length})
          </h2>
          
          <button
            onClick={handleProcess}
            disabled={files.length === 0 || status === "uploading" || status === "processing"}
            className="relative overflow-hidden group rounded-xl bg-indigo-600 px-6 py-2.5 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-indigo-500/20"
          >
            {status === "uploading" || status === "processing" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {status === "idle" ? "Processar e Treinar IA" : 
             status === "uploading" ? "Enviando..." : 
             status === "processing" ? "Treinando Modelos..." : 
             "Treinamento Concluído"}
          </button>
        </div>

        <AnimatePresence>
          {(status === "uploading" || status === "processing" || status === "success") && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-slate-200 dark:border-white/5"
            >
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className={cn(
                  status === "success" ? "text-emerald-600" : "text-indigo-600"
                )}>
                  {status === "uploading" ? "Enviando dados para o vetor..." :
                   status === "processing" ? "Gerando embeddings e indexando..." :
                   "Base de conhecimento atualizada com sucesso!"}
                </span>
                <span className="text-slate-500">{progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    status === "success" ? "bg-emerald-500" : "bg-indigo-500"
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {files.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-slate-400 dark:text-zinc-600 space-y-2">
              <Database className="w-12 h-12 opacity-20" />
              <p>Nenhum dado fornecido ainda.</p>
            </div>
          ) : (
            files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-white/5 hover:border-indigo-200 transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={cn(
                    "p-2 rounded-lg",
                    file.type === "pdf" ? "bg-rose-50 text-rose-500" : "bg-indigo-50 text-indigo-500"
                  )}>
                    {file.type === "pdf" ? <FileText className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                  </div>
                  <div className="truncate">
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-[10px] text-slate-500">{file.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(file.id)}
                  disabled={status === "uploading" || status === "processing"}
                  className="p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

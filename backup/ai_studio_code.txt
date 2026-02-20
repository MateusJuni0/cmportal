sovereign-sales-engine/
├── public/
│   ├── models/                # Ficheiros .glb/.gltf (ex: core-chip.glb)
│   └── textures/              # Texturas para os materiais 3D
├── src/
│   ├── assets/                # Imagens, SVGs, fontes locais
│   ├── components/            # UI Genérica baseada em Atomic Design
│   │   ├── atoms/             # Botões Neumórficos, Badges de Status, Inputs
│   │   ├── molecules/         # Cards Glassmorphism, Widgets de Métricas
│   │   ├── organisms/         # Sidebars, Navbars, Tabelas de Leads
│   │   └── templates/         # Layouts base (ex: DashboardLayout, AuthLayout)
│   ├── modules/               # Domínios de Negócio (A Mágica Acontece Aqui)
│   │   ├── VisualTrust/       # Componentes 3D, Hero Imersivo, Galerias
│   │   ├── HunterCore/        # Agente Nero: Dashboards, Scoring, Prospecção
│   │   ├── IntentSniper/      # Agente Alfa: Monitorização, Webhooks, Mensagens
│   │   ├── Agents/            # Gestão de VPS, Configurações de IA, Geração de Imagem
│   │   └── Guardian/          # Autenticação, Supabase, Logs do Sistema
│   ├── hooks/                 # Hooks customizados (ex: useGSAP, useSupabase)
│   ├── store/                 # Gestão de estado global (Zustand recomendado)
│   ├── styles/                # Tailwind global, utilitários CSS para Glassmorphism
│   ├── utils/                 # Funções auxiliares, formatadores, cálculos de ROI
│   ├── App.tsx                # Roteamento base (React Router)
│   └── main.tsx               # Entry point (Vite)
├── tailwind.config.js         # Tokens de Design "CM Premium"
├── tsconfig.json
└── package.json
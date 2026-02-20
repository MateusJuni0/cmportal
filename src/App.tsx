import { Hero3D } from './modules/VisualTrust/Hero3D'
import { NeroDashboard } from './modules/HunterCore/NeroDashboard'

function App() {
  return (
    <main className="bg-cm-dark min-h-screen">
      <Hero3D />
      <div className="py-20 border-t border-white/5">
        <NeroDashboard />
      </div>
    </main>
  )
}

export default App

import { useState, useEffect, useRef } from 'react'
import LearnPage from './components/LearnPage'
import SimulatorPage from './components/SimulatorPage'
import ParticlesCanvas from './components/ParticlesCanvas'

export default function App() {
  const [page, setPage] = useState('learn') // 'learn' | 'sim'

  return (
    <>
      <ParticlesCanvas />
      {page === 'learn' && <LearnPage onGoSim={() => setPage('sim')} />}
      {page === 'sim'   && <SimulatorPage onGoLearn={() => setPage('learn')} />}
    </>
  )
}

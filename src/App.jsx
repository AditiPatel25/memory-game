import { useState } from 'react'
import './App.css'
import { Trophy, Frown } from 'lucide-react'

function App() {


  return (
    <>
      <nav className='header'>
        <h1 className='header-text'>Memory Game</h1>
        <h3>Click every Pokémon once — but watch out, they shuffle after each pick! Repeat a Pokémon and it's game over <Frown size={18} /></h3>
        <div className='scoreboard'>
          <p className='scoreboard-text'>Current Score: 12</p>
          <div className='divider'></div>
            <p className='scoreboard-text'>Best Score <Trophy size={16} /> : 4 </p>
        </div>
      </nav>
      <section className='main-section'>

      </section>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import './App.css'
import { Trophy, Frown } from 'lucide-react'
import Card from './components/Card.jsx'

const characters =
  ['Charmander', 'Vulpix', 'Magby', 'Entei',
    'Raboot', 'Ponyta', 'Ninetales', 'Charmeleon',
    'Quilava', 'Magmortar', 'Darumaka', 'Braixen']

function App() {
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const results = await Promise.all(characters.map(name => fetch('https://pokeapi.co/api/v2/pokemon/' + name)));
      const jsonResults = await Promise.all(results.map(result => result.json()));
      const finalInfo = jsonResults.map(character => ({ name: character.name, image: character.sprites.other['official-artwork'].front_default }))
      setCardInfo(finalInfo)
    }
    fetchPokemon()
  }, []);

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
        {cardInfo.map(character => (
          <Card key={character.name} character={character} />
        ))}
      </section>
    </>
  )
}

export default App

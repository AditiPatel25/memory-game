import { useState, useEffect } from 'react'
import './App.css'
import { Trophy, Frown } from 'lucide-react'
import Card from './components/Card.jsx'

const characters =
  ['Charmander', 'Vulpix', 'Magby', 'Entei',
    'Raboot', 'Ponyta', 'Ninetales', 'Charmeleon',
    'Quilava', 'Magmortar', 'Darumaka', 'Braixen']


function App() {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());

  useEffect(() => {
    const fetchPokemon = async () => {
      const results = await Promise.all(characters.map(name => fetch('https://pokeapi.co/api/v2/pokemon/' + name)));
      const jsonResults = await Promise.all(results.map(result => result.json()));
      const finalInfo = jsonResults.map(character => ({ name: character.name, image: character.sprites.other['official-artwork'].front_default }))
      setCards(finalInfo)
    }
    fetchPokemon()
  }, []);

  function shuffleCards() {
    let cardsCopy = [...cards];
    for (let i = cardsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
    }
    setCards(cardsCopy)
  }

  function updateScore(name) {
    console.log('clicked:', name)
    console.log('has name:', clickedCards.has(name))
    if (clickedCards.has(name)) {
      setClickedCards(new Set());
      setCurrentScore(0);
      if (currentScore > bestScore) {
        setBestScore(currentScore)
      }
    } else {
      setClickedCards(new Set([...clickedCards, name]))
      setCurrentScore(currentScore + 1)
      if (clickedCards.size + 1 === characters.length) {
        setBestScore(currentScore + 1)
        setCurrentScore(0)
      }
      shuffleCards()
    }
  }

  return (
    <>
      <nav className='header'>
        <h1 className='header-text'>Memory Game</h1>
        <h3>Click every Pokémon once — but watch out, they shuffle after each pick! Repeat a Pokémon and it's game over <Frown size={18} /></h3>
        <div className='scoreboard'>
          <p className='scoreboard-text'>Current Score: {currentScore}</p>
          <div className='divider'></div>
          <p className='scoreboard-text'>Best Score <Trophy size={16} /> : {bestScore} </p>
        </div>
      </nav>
      <section className='main-section'>
        {cards.map(character => (
          <Card key={character.name} character={character} updateScore={updateScore} />
        ))}
      </section>
    </>
  )
}

export default App

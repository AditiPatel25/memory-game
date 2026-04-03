import { useState, useEffect } from 'react'
import './App.css'
import { Trophy, Frown } from 'lucide-react'
import Card from './components/Card.jsx'
import confetti from 'canvas-confetti'

const characters =
  ['Charmander', 'Vulpix', 'Magby', 'Entei',
    'Raboot', 'Ponyta', 'Ninetales', 'Charmeleon',
    'Quilava', 'Magmortar', 'Darumaka', 'Braixen']


function App() {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [showPopup, setShowPopup] = useState(null);

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

  function handleCardClick(name) {
    if (clickedCards.has(name)) {
      setClickedCards(new Set());
      setCurrentScore(0);
      setShowPopup("lose")
      if (currentScore > bestScore) {
        setBestScore(currentScore)
      }

    } else {
      setClickedCards(new Set([...clickedCards, name]))
      setCurrentScore(currentScore + 1)
      if (clickedCards.size + 1 === characters.length) {
        setShowPopup("win");
        confetti();
        setClickedCards(new Set());
        setBestScore(currentScore + 1);
        setCurrentScore(0);
      }
      shuffleCards();
    }
  }

  function closePopup() {
    setShowPopup(null)
  }

  return (
    <>
      <nav className='header'>
        <div className='left-header'>
          <h1 className='header-text'>Memory Game</h1>
          <h3>Click every Pokémon once — but watch out, they shuffle after each pick! Repeat a Pokémon and it's game over <Frown size={18} /></h3>
        </div>
        <div className='scoreboard'>
          <h3 className='scoreboard-text'>Current Score: {currentScore}</h3>
          <h3 className='scoreboard-text'>Best Score <Trophy size={16} /> : {bestScore} </h3>
        </div>
      </nav>
      <section className='main-section'>
        {cards.map(character => (
          <Card key={character.name} character={character} handleCardClick={handleCardClick} />
        ))}
      </section>
      {showPopup &&
        <div className='overlay'>
          <div className='popup'>
            <h2>{showPopup === 'win' ? 'You won! 🎉' : 'Oh no! You lost 😔'}</h2>
            <p>{showPopup === 'win' ? 'You caught them all!' : 'Better luck next time!'}</p>
            <button className='close-popup' onClick={closePopup}>Close</button>
          </div>
        </div>}
    </>
  )
}

export default App

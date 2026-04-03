import '../styles/card.css'
import { useState } from 'react'


function Card({ character, handleCardClick }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <>
            <button key={character.name} className='card-container' onClick={() => handleCardClick(character.name)}>
                <img className={isLoaded ? 'loaded' : ''} onLoad={() => setIsLoaded(true)} src={character.image} alt="Portrait of" />
                <h2 className='character-name'>{character.name}</h2>
            </button>
        </>
    )
}

export default Card;
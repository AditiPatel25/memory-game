import '../styles/card.css'


function Card({ character, updateScore }) {
    return (
        <>
            <button key={character.name} className='card-container' onClick={() => updateScore(character.name)}>
                <img className='character-image' src={character.image} alt="Portrait of" />
                <h2 className='character-name'>{character.name}</h2>
            </button>
        </>
    )
}

export default Card;
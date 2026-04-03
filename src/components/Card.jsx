import '../styles/card.css'


function Card({ character }) {
    return (
        <>
            <button key={character.name} className='card-container'>
                <img className='character-image' src={character.image} alt="Portrait of" />
                <h2 className='character-name'>{character.name}</h2>
            </button>
        </>
    )
}

export default Card;
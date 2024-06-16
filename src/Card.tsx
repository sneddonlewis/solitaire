import React, { useState } from 'react'
import { Suit, Face } from './types'

interface CardProps {
  suit: Suit
  face: Face
  isFlipped: boolean
  onClick: () => void
  style: React.CSSProperties
}

const Card: React.FC<CardProps> = ({ suit, face, isFlipped, onClick, style }) => {
  const isRed = suit === Suit.DIAMONDS || suit === Suit.HEARTS

  return (
    <div style={{ ...styles.cardContainer, ...style }} onClick={onClick}>
      <div style={{ 
        ...styles.card,
        ...styles.front(isRed),
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        <div>
          <p>{ face }&nbsp;{ suit }</p>
        </div>
      </div>
      <div style={{
        ...styles.card,
        ...styles.back,
        transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)'
      }}>
      </div>
    </div>
  )
}

export const CardDeck: React.FC = () => {
  type CardDetails = {
    suit: Suit,
    face: Face,
  }
  const initialDeck = [
    { suit: Suit.HEARTS, face: Face.ACE },
    { suit: Suit.SPADES, face: Face.KING },
  ]

  const [deck, setDeck] = useState(initialDeck)
  const [flippedCards, setFlippedCards] = useState<CardDetails[]>([])

  const handleFlip = (index: number) => {
    const flippedCard = deck[index]
    setDeck(deck.filter((_, i) => i !== index))
    setFlippedCards([...flippedCards, flippedCard])
  }

  return (
    <div style={styles.deckContainer}>
      <div style={styles.unflippedStack}>
        {deck.map((card, index) => (
          <Card
            key={index}
            suit={card.suit}
            face={card.face}
            isFlipped={false}
            onClick={() => handleFlip(index)}
            style={{ 
              transition: 'transform 1s, left 1s, top 1s',
              position: 'absolute',
              left: `${index * 10}px`,
              top: `${index * 10}px`,
            }}
          />
        ))}
      </div>
      <div style={styles.flippedStack}>
        {flippedCards.map((card, index) => (
          <Card
            key={index + deck.length}
            suit={card.suit}
            face={card.face}
            isFlipped={true}
            onClick={() => {}}
            style={{ 
              transition: 'transform 1s, left 1s, top 1s',
              position: 'absolute',
              left: `120px`,
              top: `${index * 10}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  cardContainer: {
    perspective: '1000px',
    width: '100px',
    height: '175px',
    position: 'relative' as 'relative',
    margin: '5px',
  } as React.CSSProperties,
  card: {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    position: 'absolute' as 'absolute',
    backfaceVisibility: 'hidden' as 'hidden',
    transition: 'transform 0.6s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  front: (isRed: boolean): React.CSSProperties => ({
    backgroundColor: 'white',
    color: isRed ? 'red' : 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '5px',
  }),
  back: {
    backgroundColor: 'blue',
    color: 'white',
    transform: 'rotateY(180deg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  deckContainer: {
    position: 'relative',
    width: '250px',
    height: '200px',
  } as React.CSSProperties,
  unflippedStack: {
    position: 'absolute',
    left: '0px',
  } as React.CSSProperties,
  flippedStack: {
    position: 'absolute',
    left: '120px',
  } as React.CSSProperties,
}

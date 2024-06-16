import react from 'react'
import { Suit, Face } from './types'

interface CardProps {
  suit: Suit,
  face: Face,
}

export const Card: React.FC<CardProps> = ({ suit, face }) => {
  return (
    <div style={styles(suit === Suit.DIAMONDS || suit === Suit.HEARTS)}>
      <p>{ suit }</p>
      <p>{ face }</p>
    </div>
  )
}

const styles = (isRed: boolean): React.CSSProperties => ({
  backgroundColor: 'white',
  width: '100px',
  height: '175px',
  borderRadius: '5px',
  color: isRed ? 'red' : 'black',
})

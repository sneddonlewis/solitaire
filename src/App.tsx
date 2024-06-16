import { Card } from './Card'
import { Face, Suit } from './types'

export const App = () => (
  <>
    <Card suit={ Suit.CLUBS } face={ Face.KING }/>
    <Card suit={ Suit.DIAMONDS } face={ Face.ACE }/>
  </>
)

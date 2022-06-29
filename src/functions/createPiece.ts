import Bomb from '../classes/bomb.js'
import Block from '../classes/block.js'
import Long from '../classes/long.js'
import { throwBomb, bombsAvailable, longInPlay, pieces, colorsInPlay, blockImages } from '../engine.js'
import { setThrowBomb, setBombsAvailable, setLongInPlay } from '../engine.js'

export default function createPiece() {
  if (throwBomb) {
    setThrowBomb(false)
    setBombsAvailable(bombsAvailable - 1)
    return new Bomb()
  }
  else {
    let rand = Math.random()

    /**
     * Only one longInPlay is allowed to be in play,
     * having more would create many issues..
     */

    // Is there a longInPlay?
    for (const p of pieces) {

      if (p.type === "long") {
        setLongInPlay(true)
        break
      }
      else {
        setLongInPlay(false)
      }
    }

    // Get random color from colors in play
    let randomColor = colorsInPlay[Math.floor(Math.random() * (colorsInPlay.length))]

    // IMPORTANT: make sure the function ALWAYS returns a piece
    if (rand < 0.15 && !longInPlay) {
      return new Long()
    }
    else if (rand < 0.25) {
      return new Block('crystal', blockImages)
    }
    else {
      return new Block(randomColor, blockImages)
    }
  }

}
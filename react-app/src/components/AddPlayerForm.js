import React,{ useState, } from 'react'
import {useHistory} from "react-router-dom"
import { addPlayer } from '../services/gameApi'

export default function AddPlayerForm({ otherPlayer, setPlayer1, currentGame, setPlayer2, setCurrentPlayer }) {
  const [player, setPlayer] = useState('')
  const [gameId, setGameId] = useState('')
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    const submitForm = async () => {
      console.log(gameId, player)
      await addPlayer(gameId, player)
    }
    submitForm()
    setPlayer2(otherPlayer)
    setCurrentPlayer(player)
    return history.push(`/game/${gameId}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='player2'>Player 2 Username</label>
      <input type='text' name='player2' value={player}
        onChange={e => setPlayer(e.target.value)} />
      <label htmlFor='gameId'>Game ID</label>
      <input type='text' name='gameId' value={gameId} onChange={e => setGameId(e.target.value)} />
      <input type='submit' name='Submit Player' />
    </form>

  )
}

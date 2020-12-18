import React, { useState } from 'react'
import { addPlayer } from '../services/gameApi'

export default function AddPlayerForm({ currentGame, setPlayer2 }) {
  const [player, setPlayer] = useState('')
  const [gameId, setGameId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitForm = async () => {
      await addPlayer(gameId, player)
    }
    submitForm()
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

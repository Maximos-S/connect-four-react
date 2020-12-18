import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar'
import GameBoard from './components/GameBoard'
import NewGameForm from './components/NewGameForm'
import AddPlayerForm from './components/AddPlayerForm'

function App() {
  const [currentGame, setCurrentGame] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  function setCurrentGameAndPlayer(game, player) {
    localStorage.setItem(`currentPlayer[${game}]`, player);
    setCurrentGame(game);
    setCurrentPlayer(player);
  }


	return (
		<BrowserRouter>
			<NavBar  />
			<Route path='/' exact={true}>
        <h3>Welcome to Connect-4 TV</h3>
        {currentGame ? <Redirect to={`/game/${currentGame}`} /> : <NewGameForm setCurrentGameAndPlayer={setCurrentGameAndPlayer} setPlayer1={setPlayer1} />}
			</Route>
      <Route path='/game/:gameId' exact={true}>
        <GameBoard setCurrentPlayer={setCurrentPlayer} currentPlayer={currentPlayer} player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2} />
      </Route>
      <Route path="/join-game">
        <AddPlayerForm currentGame={currentGame} otherPlayer={player1} setPlayer2={setPlayer2} setPlayer1={setPlayer1} setCurrentPlayer={setCurrentPlayer}/>
      </Route>
		</BrowserRouter>
	)
}

export default App

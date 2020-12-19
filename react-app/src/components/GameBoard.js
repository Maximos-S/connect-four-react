import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGame, makeMove } from "../services/gameApi";
import "./GameBoard.css";

function GameBoard(props) {
  const [grid, setGrid] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);
  const { gameId } = useParams();

  const checkForWinner = async (oldGrid) => {
    let grid = oldGrid;
    //row check
    for(let i = 0; i < grid.length; i++) {
      res = [grid[1][i], grid[2][i], grid[3][i]]
      if (res.every((e) => e === grid[0][i])) {
        return true;
      }
    }
    //column check
    for(let i = 0; i < grid.length; i++) {
      let res = grid[i].pop();
      if (grid[i].every((e) => e === grid[i][0])) {
        return true;
      }
      grid[i].push(res)
      let res2 = grid[i].shift()
      if (grid[i].every((e) => e === grid[i][0])) {
        return true;
      }
      grid.unshift(res2)
    }
    //diagonal check
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[2][2] === grid[3][3]) return true;
    if (grid[0][1] === grid[1][2] && grid[1][2] === grid[2][3] && grid[2][3] === grid[3][4]) return true;
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[2][2] === grid[3][3]) return true;
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[2][2] === grid[3][3]) return true;
  }


  useEffect(function () {
    if (localStorage.getItem(`currentPlayer[${gameId}]`)) {
      props.setCurrentPlayer(localStorage.getItem(`currentPlayer[${gameId}]`));
    }
  }, []);

  // update game board
  useEffect(
    function () {
      async function getGameUpdates() {
        let { game } = await getGame(gameId);
        setGrid(game.board);
        checkForWinner(grid)
        props.setPlayer1(game.player1);
        props.setPlayer2(game.player2);
      }
      const intervalHandler = setInterval(() => getGameUpdates(), 1000);

      return () => clearInterval(intervalHandler);
    },
    [props, gameId]
  );

  function buildRow(row_id) {
    return grid.map((col, col_id) => (
      <div key={`${row_id}${col_id}`} data-row={row_id} data-column={col_id}>
        {col[row_id]}
      </div>
    ));
  }


  function otherPlayer() {
    if (!props.currentPlayer) return "";
    if (props.player1 === props.currentPlayer) {
      if (props.player2) {
        return props.player2;
      } else {
        return "Awaiting Opponent";
      }
    } else {
      return props.player1;
    }
  }

  function move(e) {
    console.log(e.target.dataset.column);
    makeMove(gameId, props.currentPlayer, e.target.dataset.column);
  }



  return (
    <>
      <h3>Play The Game {gameId}</h3>
      <b>You: {props.currentPlayer}</b> |<b>Opponent: {otherPlayer()}</b>
      <div className="game-board" onClick={move}>
        {[0, 1, 2, 3, 4].map((i) => buildRow(i)).reverse()}
      </div>
    </>
  );


}

export default GameBoard;

import { useState } from "react";
import "./App.css";
import { GameState, Player } from "./types";
import { deriveGame, deriveStats } from "./utils";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Menu from "./components/Menu";

export default function App() {
	const [state, setState] = useState<GameState>({
		currentGameMoves: [], // * All the players move for the active game
		history: {
			currentRoundGames: [],
			allGames: [],
		},
	});

	const game = deriveGame(state);
	const stats = deriveStats(state);

	const resetGame = (isNewRound: boolean) => {
		setState((prev) => {
			const stateClone = structuredClone(prev);

			const { status, moves } = game;

			if (status.isComplete) {
				stateClone.history.currentRoundGames.push({
					moves,
					status,
				});
			}

			stateClone.currentGameMoves = [];

			if (isNewRound) {
				stateClone.history.allGames.push(
					...stateClone.history.currentRoundGames
				);
				stateClone.history.currentRoundGames = [];
			}

			return stateClone;
		});
	};

	const handlePlayerMove = (squareId: number, player: Player) => {
		setState((prev) => {
			const stateClone = structuredClone(prev);

			stateClone.currentGameMoves.push({
				squareId,
				player,
			});

			return stateClone;
		});
	};

	return (
		<>
			<main>
				<div className='grid'>
					<div className={`turn ${game.currentPlayer.colorClass}`}>
						<i className={`fa-solid ${game.currentPlayer.iconClass}`}></i>
						<p>{`${game.currentPlayer.name} you're up!`}</p>
					</div>

					<Menu onAction={(action) => resetGame(action === "new-round")} />

					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
						const existingMove = game.moves.find((move) => {
							return move.squareId === squareId;
						});

						return (
							<div
								key={squareId}
								className='square shadow'
								onClick={() => {
									if (existingMove) return;

									handlePlayerMove(squareId, game.currentPlayer);
								}}
							>
								{existingMove && (
									<i
										className={`fa-solid ${existingMove.player.iconClass} ${existingMove.player.colorClass}`}
									></i>
								)}
							</div>
						);
					})}

					<div
						className='score shadow'
						style={{ backgroundColor: "var(--turquoise)" }}
					>
						<p>Player 1</p>
						<span>{stats.playerWithStats[0].wins} wins</span>
					</div>
					<div
						className='score shadow'
						style={{ backgroundColor: "var(--light-gray)" }}
					>
						<p>Ties</p>
						<span>{stats.ties}</span>
					</div>
					<div
						className='score shadow'
						style={{ backgroundColor: "var(--yellow)" }}
					>
						<p>Player 2</p>
						<span>{stats.playerWithStats[1].wins} Wins</span>
					</div>
				</div>
			</main>
			<Footer />
			{game.status.isComplete && (
				<Modal
					onClickHandler={() => resetGame(false)}
					message={
						game.status.winner ? `${game.status.winner.name} wins` : "Tie!"
					}
				/>
			)}
		</>
	);
}

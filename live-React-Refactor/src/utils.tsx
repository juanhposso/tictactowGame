import { Player, GameState } from "./types";

export const players: Player[] = [
	{
		id: 1,
		name: "Player 1",
		iconClass: "fa-x",
		colorClass: "turquoise",
	},
	{
		id: 2,
		name: "Player 2",
		iconClass: "fa-o",
		colorClass: "yellow",
	},
];

export const deriveGame = (state: GameState) => {
	const currentPlayer = players[state.currentGameMoves.length % 2]; // 0 default

	const winningPatterns = [
		[1, 2, 3],
		[1, 5, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 5, 7],
		[3, 6, 9],
		[4, 5, 6],
		[7, 8, 9],
	];

	let winner = null;

	for (const player of players) {
		const selectedSquaredIds = state.currentGameMoves
			.filter((move) => move.player.id === player.id)
			.map((move) => move.squareId);

		for (const patter of winningPatterns) {
			if (patter.every((v) => selectedSquaredIds.includes(v))) {
				winner = player;
			}
		}
	}

	return {
		moves: state.currentGameMoves,
		currentPlayer,
		status: {
			isComplete: winner != null || state.currentGameMoves.length === 9,
			winner,
		},
	};
};

export const deriveStats = (state: GameState) => {
	return {
		playerWithStats: players.map((player) => {
			const wins = state.history.currentRoundGames.filter(
				(game) => game.status.winner?.id === player.id
			).length; //return a number

			return {
				...player,
				wins,
			};
		}),

		ties: state.history.currentRoundGames.filter(
			(game) => game.status.winner === null
		).length,
	};
};

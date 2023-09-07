const initialValue = {
	currentGameMoves: [],
	history: {
		currentRoundGames: [],
		allGames: [],
	},
};

export default class Store {
	#state = initialValue;

	constructor(players) {
		this.players = players;
	}

	get stats() {
		const state = this.#getState();
		console.log(state);

		return {
			playerWithStats: this.players.map((player) => {
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
	}

	get game() {
		const state = this.#getState(); // default {move: {}}

		const currentPlayer = this.players[state.currentGameMoves.length % 2]; // 0 default

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

		for (const player of this.players) {
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
	}

	playerMove(squareId) {
		const stateClone = structuredClone(this.#getState()); // clone the state

		// edit the stateClone by adding the squareId and the currentPlayer
		stateClone.currentGameMoves.push({
			squareId,
			player: this.game.currentPlayer,
		});

		this.#saveState(stateClone);
	}

	reset() {
		const stateClone = structuredClone(this.#getState());

		const { status, moves } = this.game;

		if (status.isComplete) {
			stateClone.history.currentRoundGames.push({
				moves,
				status,
			});
		}

		stateClone.currentGameMoves = [];

		this.#saveState(stateClone);
	}

	newRound() {
		this.reset();

		const stateClone = structuredClone(this.#getState());

		stateClone.history.allGames.push(...stateClone.history.currentRoundGames);
		stateClone.history.currentRoundGames = [];

		this.#saveState(stateClone);
	}

	#getState() {
		return this.#state;
	}

	#saveState(stateOrFn) {
		const previousState = this.#getState();

		let newState;

		switch (typeof stateOrFn) {
			case "function":
				newState = stateOrFn(previousState);
				break;
			case "object":
				newState = stateOrFn;
				break;
			default:
				throw new Error("invalid argument passed to saveState");
		}

		this.#state = newState;
	}
}

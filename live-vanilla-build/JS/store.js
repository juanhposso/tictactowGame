const initialValue = {
	moves: [],
};

export default class Store {
	#state = initialValue;

	constructor(players) {
		this.players = players;
	}

	get game() {
		const state = this.#getState(); // default {move: {}}

		const currentPlayer = this.players[state.moves.length % 2]; // 0 default

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
			const selectedSquaredIds = state.moves
				.filter((move) => move.player.id === player.id)
				.map((move) => move.squareId);

			for (const patter of winningPatterns) {
				if (patter.every((v) => selectedSquaredIds.includes(v))) {
					winner = player;
				}
			}
		}

		return {
			moves: state.moves,
			currentPlayer,
			status: {
				isComplete: winner != null || state.moves.length === 9,
				winner,
			},
		};
	}

	playerMove(squareId) {
		const state = this.#getState(); // bring #state it is equal to initialValue

		const stateClone = structuredClone(state); // clone the state

		// edit the stateClone by adding the squareId and the currentPlayer
		stateClone.moves.push({
			squareId,
			player: this.game.currentPlayer,
		});

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

const initialValue = {
	moves: [],
};

export default class Store {
	#state = initialValue;

	constructor(players) {
		this.players = players;
	}

	get game() {
		const state = this.#getState();

		const currentPlayer = this.players[state.moves.length % 2];

		//console.log(currentPlayer);

		return {
			currentPlayer,
		};
	}

	playerMove(squareId) {
		const state = this.#getState();

		const stateClone = structuredClone(state);

		state.moves.push({
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

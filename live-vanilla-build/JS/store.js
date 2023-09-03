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

		return {
			moves: state.moves,
			currentPlayer,
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

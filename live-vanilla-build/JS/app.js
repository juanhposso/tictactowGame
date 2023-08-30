import View from "./view.js";

/* const App = {
	//All of our selected HTML elements
	$: {
		menu: document.querySelector('[data-id="menu"]'),
		menuItems: document.querySelector('[data-id="menu-items"]'),
		resetBtn: document.querySelector('[data-id="reset-btn"]'),
		newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
		squares: document.querySelectorAll('[data-id="square"]'),
		modal: document.querySelector('[data-id="modal"]'),
		modalText: document.querySelector('[data-id="modal-text"]'),
		modalBtn: document.querySelector('[data-id="modal-btn"]'),
		turn: document.querySelector('[data-id="turn"]'),
	},

	state: {
		moves: [],
	},

	gameSetStatus(moves) {
		const p1Moves = moves
			.filter((move) => move.playerID === 1)
			.map((move) => +move.squareID);
		const p2Moves = moves
			.filter((move) => move.playerID === 2)
			.map((move) => +move.squareID);

		//* Detect if there is a winner or tie LOGIC
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

		winningPatterns.forEach((patter) => {
			//console.log({ patter, p1Moves, p2Moves });
			const p1Wins = patter.every((v) => p1Moves.includes(v));
			const p2Wins = patter.every((v) => p2Moves.includes(v));

			if (p1Wins) winner = 1;
			if (p2Wins) winner = 2;
		});

		return {
			status: moves.length === 9 || winner != null ? "Complete" : "in-progress",
			winner,
		};
	},

	init() {
		App.registerEventListeners();
	},

	registerEventListeners() {
		App.$.menu.addEventListener("click", (event) => {
			App.$.menuItems.classList.toggle("hidden");
		});

		App.$.resetBtn.addEventListener("click", (event) => {
			console.log("Reset the game");
		});

		App.$.newRoundBtn.addEventListener("click", (event) => {
			console.log("Add a new round");
		});

		App.$.modalBtn.addEventListener("click", (event) => {
			App.state.moves = [];
			App.$.modal.classList.add("hidden");

			App.$.squares.forEach((square) => {
				while (square.firstChild) {
					square.removeChild(square.firstChild);
				}
			});
		});

		App.$.squares.forEach((square) => {
			square.addEventListener("click", (event) => {
				//* Check if the square is already check with "X" or "O"
				const hasMove = (squareID) => {
					const existingMove = App.state.moves.find(
						(move) => move.squareID === squareID
					);

					return existingMove !== undefined;
				};

				if (hasMove(+square.id)) {
					return;
				}

				//* Set up the current player
				const lastMove = App.state.moves.at(-1);
				const getOppositePlayer = (playerID) => (playerID === 1 ? 2 : 1);
				const currentPlayer =
					App.state.moves.length === 0
						? 1
						: getOppositePlayer(lastMove.playerID); // 1

				const nextPlayer = getOppositePlayer(currentPlayer); // 2

				//* Create the nodeElement
				const squareIcon = document.createElement("i");
				const turnIcon = document.createElement("i");
				const turnLabel = document.createElement("p");
				turnLabel.innerHTML = `Player ${nextPlayer}, you are up!`;

				//* Check what the current player is to place in the square "X" or "O"
				if (currentPlayer === 1) {
					squareIcon.classList.add("fa-solid", "fa-x", "yellow");
					turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
					turnLabel.classList = "turquoise";
				} else {
					squareIcon.classList.add("fa-solid", "fa-o", "turquoise");
					turnIcon.classList.add("fa-solid", "fa-x", "yellow");
					turnLabel.classList = "yellow";
				}

				App.$.turn.replaceChildren(turnIcon, turnLabel);

				App.state.moves = [
					...App.state.moves,
					{ squareID: +square.id, playerID: currentPlayer },
				];

				//* ADD in the square the "X" or "O"
				square.replaceChildren(squareIcon);

				const game = App.gameSetStatus(App.state.moves);

				if (game.status === "Complete") {
					App.$.modal.classList.remove("hidden");
					if (game.winner) {
						App.$.modalText.innerHTML = `Winner is ${game.winner}`;
					} else {
						App.$.modalText.innerHTML = `Tie Game`;
					}
				}
			});
		});
	},
}; */

function init() {
	const view = new View();

	view.bindGameResetEvent((event) => {
		console.log(`clicking the ResetEvent:`);
		console.log(event);
	});

	view.bindNewRoundEvent((event) => {
		console.log(`clicking the RoundEvent:`);
		console.log(event);
	});

	view.bindPLayerMoveEvent((event) => {
		console.log(`clicking the SquareEvent: `);
		console.log(event);
	});
}

window.addEventListener("load", init);
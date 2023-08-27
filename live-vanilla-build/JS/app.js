const App = {
	//All of our selected HTML elements
	$: {
		menu: document.querySelector('[data-id="menu"]'),
		menuItems: document.querySelector('[data-id="menu-items"]'),
		resetBtn: document.querySelector('[data-id="reset-btn"]'),
		newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
		squares: document.querySelectorAll('[data-id="square"]'),
	},

	state: {
		moves: [],
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
					console.log("estoy aqui");
					return;
				}

				//* Set up the current player
				const lastMove = App.state.moves.at(-1);
				//console.log(lastMove);
				const getOppositePlayer = (playerID) => (playerID === 1 ? 2 : 1);
				const currentPlayer =
					App.state.moves.length === 0
						? 1
						: getOppositePlayer(lastMove.playerID);

				//* Create the nodeElement
				const icon = document.createElement("i");

				//* Check what the current player is to place in the square "X" or "O"
				if (currentPlayer === 1) {
					icon.classList.add("fa-solid", "fa-x", "yellow");
				} else {
					icon.classList.add("fa-solid", "fa-o", "turquoise");
				}

				//* ADD in the square the "X" or "O"
				square.replaceChildren(icon);

				App.state.moves.push({ squareID: +square.id, playerID: currentPlayer });

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
			});
		});
	},
};

window.addEventListener("load", App.init);

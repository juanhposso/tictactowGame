import "./Modal.css";

type Props = {
	message: string;
	player: number;
};

export default function Modal({ message, player }: Props) {
	return (
		<div className='modal'>
			<div className='modal-contents'>
				<p>{`${player} wins ${message}`}</p>
				<button>Play again</button>
			</div>
		</div>
	);
}

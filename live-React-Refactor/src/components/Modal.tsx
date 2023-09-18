import "./css/Modal.css";

type Props = {
	message: string;
	onClickHandler(): void;
};

export default function Modal({ message, onClickHandler }: Props) {
	return (
		<div className='modal'>
			<div className='modal-contents'>
				<p>{`${message} wins!`}</p>
				<button onClick={onClickHandler}>Play again</button>
			</div>
		</div>
	);
}

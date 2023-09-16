import { useState } from "react";
import "./css/Menu.css";

interface Props {
	onAction(action: "reset" | "new-round"): void;
}

export default function Menu({ onAction }: Props) {
	const [openMenu, setOpenMenu] = useState(true);

	return (
		<div className='menu' data-id='menu'>
			<button className='menu-btn' onClick={() => setOpenMenu((prev) => !prev)}>
				Actions
				{openMenu ? (
					<i className='fa-solid fa-chevron-down'></i>
				) : (
					<i className='fa-solid fa-chevron-up'></i>
				)}
			</button>

			<div className={`items border ${openMenu ? "hidden" : ""}`}>
				<button onClick={() => onAction("reset")}>Reset</button>
				<button onClick={() => onAction("new-round")}>New Round</button>
			</div>
		</div>
	);
}

import React from "react";
import "./ToDoList.css";

function ToDoList({ item, onChange, onClick }) {

	return (
		<li className="li-task">
			<label>
				<input
					type="checkbox"
					checked={item.completed}
					onChange={() => onChange()}
				/>
				{item.title}
			</label>

			{item.checked && (
				<button className="cancel-btn" onClick={() => onClick()}>
					cancel
				</button>
			)}
		</li>
	);
}


export default ToDoList;

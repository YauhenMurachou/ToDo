import React from "react";
import "./ToDoList.css";





function ToDoList({ item, onChange, onClickDelete, onClickEdit }) {

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
			{!item.completed && (
				<button className="edit-btn" onClick={() => onClickEdit()}>
					edit
				</button>
			)}
			{item.completed && (
				<button className="cancel-btn" onClick={() => onClickDelete()}>
					cancel
				</button>
			)}

		</li>
	);
}

export default ToDoList;

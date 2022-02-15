import React from "react";
import "./ToDoList.css";

import EditTask from "../EditTask/editTask";

function ToDoList({ id, item, isCorrect, correctId, textForm, onChange, onClickDelete, onClickEdit, correctTask, handleSubmit }) {

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

			{isCorrect && !item.completed && correctId === id && (
				<EditTask
				
				correctTask={(e) => correctTask(item.id, e)}
					// onClick={() => closeCorrectTask()}
					// onChange={handleChange}
					// onSubmit={handleTaskSubmit}
					value={textForm.correctText}
					handleSubmit={handleSubmit}
					// formName='correctText'
					// nameInput='correctText'
					// nameButton='correctButton'
					// errorMessage={errorMessage.correctText}
				/>)}
		</li>
	);
}

export default ToDoList;

import React from "react";
import "./editTask.css";


function EditTask({ correctTask, value, handleSubmit }) {

	return (
		<div>
			<form
				onSubmit={handleSubmit}
			/>

			<label className='correct-label' htmlFor='new-todo'>
				Correct task:
			</label>

			<input
				className='correct-input'
				type='text'
				value={value}
				onChange={correctTask}
			/>

			<input
				className='correct-complete-btn'
				type='submit'
				onClick={handleSubmit}
				value='close'
			/>

		</div>
	);
}

export default EditTask;

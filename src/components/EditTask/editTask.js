import React from "react";
import "./editTask.css";


function EditTask({correctTask, value, handleSubmit}) {
	
	return (
		<div>
			<form
				// className='correct-wrapper-form'
				onSubmit={handleSubmit}
				// name={formName}
			/>

				<label className='correct-label' htmlFor='new-todo'>
					Correct task:
				</label>

				<input
					className='correct-input'
					type='text'
					// id='new-todo'
					value={value}
					onChange={correctTask}
					
					// name={nameInput}
				/>

				<input
					className='correct-complete-btn'
					type='submit'
					onClick={handleSubmit}

					// name={nameButton}
					value='close'
				/>

		</div>
	);
}

export default EditTask;

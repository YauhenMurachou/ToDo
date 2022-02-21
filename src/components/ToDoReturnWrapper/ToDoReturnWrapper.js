import React from 'react';

import './ToDoReturnWrapper.css';

function ToDoReturnWrapper({ handleSubmitSearch, inputSearchEl, handleChangeSearch, searchText, changeTask, sortTop,
	handleSubmit, inputAddEl, handleChange, text, items, inputWarning }) {

	return (

		<div className='todo-wrapper'>
			<h3 className='todo-title'>Список дел</h3>

			<form onSubmit={handleSubmitSearch} className='todo-form'>
				<div className='form-wrapper'>
					<input
						id='find-todo'
						className='addSearch-input'
						placeholder='Найти задачу'
						ref={inputSearchEl}
						onChange={handleChangeSearch}
						value={searchText}
					/>
					<br />
					<button className='addSearch-btn'>
						Поиск
					</button>
				</div>
			</form>

			{changeTask()}

			<button
				onClick={() => sortTop()}
				className='sort-btn'>
				Сортировать задачи по возрастанию
			</button>

			<form onSubmit={handleSubmit}>
				<div className='form-wrapper'>
					<label className='label-ToDo' htmlFor='new-todo'>
						Что нужно сделать?
					</label>
					<input
						id='new-todo'
						ref={inputAddEl}
						onChange={handleChange}
						value={text}
					/>
					<br />
					<button className='add-btn'>
						Добавить #{items.length + 1}
					</button>
				</div>
			</form>
			<div className='inputWarning'>
				{inputWarning}
			</div>
		</div>
	);
}

export default ToDoReturnWrapper;

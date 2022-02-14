import React, { useEffect, useRef } from 'react';


import { useDispatch, useSelector } from "react-redux";
import { setNewItems, setSearchItems, setText, setSearchText, setInputWarning } from '../../redux/actions/toDoAppActions';
import ToDoList from '../ToDoList/ToDoList';
import './ToDoApp.css'
import EditTask from "../EditTask/editTask";

export const Context = React.createContext();

function ToDoApp() {

	const dispatch = useDispatch();
	const toDoAppState = useSelector(state => state.toDoAppReducer);
	let { items, searchItems, text, searchText, inputWarning } = toDoAppState;

	const inputAddEl = useRef(null);
	const inputSearchEl = useRef(null);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((result) => dispatch(setNewItems(result.slice(0, 10))))
	}, []
	);

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		if (searchText === '') {
			dispatch(setSearchItems([]))

		} else {
			const itemsCopy = [...items];
			const searchItemsCopy = itemsCopy.filter(item => item.title.includes(searchText));
			dispatch(setSearchItems(searchItemsCopy));
		}
	}


	const handleChangeSearch = (e) => {
		console.log('handleChangeSearch', e.target.value)
		dispatch(setSearchText(e.target.value));
	}

	const handleChange = (e) => {
		console.log('handleChange',)
		dispatch(setText(e.target.value));
	}

	const removeTask = (id) => {
		console.log('why dont')
		let newItems = items.slice();
		const delId = newItems.findIndex((n) => n.id === id);
		newItems.splice(delId, 1);
		dispatch(setNewItems(newItems));
	}
	const editTask = () => {
		console.log('edit task');
		<EditTask/>
	}

	const handleCheckbox = (id) => {
		let newItems = items.slice();
		const delId = newItems.findIndex((n) => n.id === id);
		newItems[delId].completed = !newItems[delId].completed;
		dispatch(setNewItems(newItems));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		let copyText = text.replace(/\s/g, '');
		let copyItems = items.slice();
		if (copyItems.some(item => item.title.replace(/\s/g, '') === copyText)) {
			warningHiddenUnique()
			return
		} else if ((text.length < 4) || (searchItems && searchItems.length !== 0) || (text.length === 0)) {
			warningHiddenShort()
			return
		} else {
			const newItem = {
				title: text,
				id: Date.now(),
				completed: false
			};
			dispatch(setNewItems(items.concat(newItem)));
			dispatch(setText(''));
			dispatch(setInputWarning(''))
		}
	}

	const warningHiddenShort = () => {
		return dispatch(setInputWarning("Длина задачи должна быть не менее 4-х символов!"))
	}

	const warningHiddenUnique = () => {
		return dispatch(setInputWarning("Внимание! Такая задача уже создана!"))
	}

	const changeTask = () => {

		let renderItems = [];
		if (searchItems === null) {
			renderItems = items;
			return renderTasks(renderItems);
		}
		if (searchItems && searchItems.length > 0) {

			renderItems = searchItems;
			return renderTasks(renderItems);

		} else if (searchItems && searchItems.length === 0 && searchText === '') {

			renderItems = items;
			return renderTasks(renderItems);

		} else if (searchItems && searchItems.length === 0 && searchText !== '') {

			return <span> Tasks not found </span>;
		}
	}


	const renderTasks = (arr) => {
		return (
			<ul>
				{arr.map((item) => (
					<ToDoList
						key={item.id}
						item={item}
						onClickDelete={() => removeTask(item.id)}
						onClickEdit={() => editTask(item.id)}
						onChange={() => handleCheckbox(item.id)}
					/>
				))}
			</ul>
		);
	}

	const sortTop = () => {
		let copyItemsSort = items.slice();
		dispatch(setText(''));
		dispatch(setNewItems(copyItemsSort.sort((a, b) => a.title.length - b.title.length)));

		if (items) {
			console.log(copyItemsSort);
		}
	}

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

export default ToDoApp;

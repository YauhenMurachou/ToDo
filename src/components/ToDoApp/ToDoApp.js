import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setNewItems, setSearchItems, setText, setSearchText, setInputWarning } from '../../redux/actions/toDoAppActions';
import ToDoList from '../ToDoList/ToDoList';
import ToDoReturnWrapper from '../ToDoReturnWrapper/ToDoReturnWrapper';

import './ToDoApp.css';

export const Context = React.createContext();

function ToDoApp() {

	const [isCorrect, setIsCorrect] = useState(false);
	const [textForm, setTextForm] = useState({
		text: '',
		correctText: ''
	});

	const [correctId, setCorrectId] = useState(0);
	const dispatch = useDispatch();
	const toDoAppState = useSelector(state => state.toDoAppReducer);
	let { items, searchItems, text, searchText, inputWarning } = toDoAppState;

	const inputAddEl = useRef(null);
	const inputSearchEl = useRef(null);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((result) => dispatch(setNewItems(result.slice(0, 10))))
	}, []);

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
		dispatch(setSearchText(e.target.value));
	}

	const handleChange = (e) => {
		dispatch(setText(e.target.value));
	}

	const removeTask = (id) => {
		let newItems = items.slice();
		const delId = newItems.findIndex((n) => n.id === id);
		newItems.splice(delId, 1);
		dispatch(setNewItems(newItems));
	}

	const showEditTask = (id) => {
		let newItems = items.slice();
		const editId = newItems.find((n) => n.id === id);
		const textFormCopy = { ...textForm };
		textFormCopy.correctText = editId.title;
		setTextForm(textFormCopy);
		setCorrectId(editId.id);
		if (isCorrect === false) {
			setIsCorrect(!isCorrect);
		}
	}

	const correctTask = (id, e) => {
		let newItems = items.slice();
		const editItem = newItems.find((n) => n.id === correctId);
		const textFormCopy = { ...textForm };
		editItem.title = e.target.value;
		textFormCopy.correctText = e.target.value;
		setTextForm(textFormCopy);
	}

	// const closeCorrectTask = () => {
	// 	setIsCorrect(!isCorrect);
	// 	setErrorMessage({})
	// }

	const handleCheckbox = (id) => {
		let newItems = items.slice();
		const delId = newItems.findIndex((n) => n.id === id);
		newItems[delId].completed = !newItems[delId].completed;
		dispatch(setNewItems(newItems));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isCorrect === true) {
			setIsCorrect(!isCorrect);
		}

		let copyText = text.replace(/\s/g, '');
		let copyItems = items.slice();
		if (copyItems.some(item => item.title.replace(/\s/g, '') === copyText)) {
			warningHiddenUnique()
			return
		} else if ((text.length < 4) || (searchItems && searchItems.length !== 0) || (text.length === 0)) {
			warningHiddenShort()
			return
		}
		// else if (isCorrect === true) {
		// 	console.log('handleSubmit---222')
		// 	if (isCorrect === true) {
		// 		setIsCorrect(!isCorrect);
		// 	}
		// }

		else {
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
						id={item.id}
						item={item}
						isCorrect={isCorrect}
						correctId={correctId}
						textForm={textForm}
						onClickDelete={() => removeTask(item.id)}
						onClickEdit={() => showEditTask(item.id)}
						onChange={() => handleCheckbox(item.id)}
						correctTask={(item, e) => correctTask(item.id, e)}
						handleSubmit={(e) => handleSubmit(e)}
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
		<ToDoReturnWrapper
			handleSubmitSearch={handleSubmitSearch}
			inputSearchEl={inputSearchEl}
			handleChangeSearch={handleChangeSearch}
			searchText={searchText}
			changeTask={changeTask}
			sortTop={sortTop}
			handleSubmit={handleSubmit}
			inputAddEl={inputAddEl}
			handleChange={handleChange}
			text={text}
			items={items}
			inputWarning={inputWarning}
		/>
	);
}

export default ToDoApp;

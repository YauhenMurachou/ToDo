import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import './App.css';

import ToDoApp from "../ToDoApp/ToDoApp";

class App extends React.Component {
	render() {
		return <ToDoApp />;
	}
}

export default App;

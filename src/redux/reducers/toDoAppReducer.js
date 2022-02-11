const initialState = {
	items: [],
	searchItems: null,
	text: '',
	searchText: '',
	inputWarning: '',
}

export const toDoAppReducer = (state = initialState, action) => {
	let { items, searchItems } = state;
	const { payload } = action;


	switch (action.type) {
		case 'SET_NEW_ITEMS':
			return { ...state, items: payload };
			break;

		case 'SET_SEARCH_ITEMS':
			return { ...state, searchItems: payload };
			break;

		case 'SET_TEXT':
			return { ...state, text: payload };
			break;

		case 'SET_SEARCH_TEXT':
			return { ...state, searchText: payload };
			break;

		case 'SET_INPUT_WARNING':
			return { ...state, inputWarning: payload };
			break;


		default:
			return { ...state }
	}
}
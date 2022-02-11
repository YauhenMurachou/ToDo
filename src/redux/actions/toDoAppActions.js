export const setNewItems = data => {
	return {
		type: 'SET_NEW_ITEMS',
		payload: data
	}
}

export const setSearchItems = data => {
	return {
		type: 'SET_SEARCH_ITEMS',
		payload: data
	}
}

export const setText = data => {
	return {
		type: 'SET_TEXT',
		payload: data
	}
}

export const setSearchText = data => {
	return {
		type: 'SET_SEARCH_TEXT',
		payload: data
	}
}


export const setInputWarning = data => {
	return {
		type: 'SET_INPUT_WARNING',
		payload: data
	}
}
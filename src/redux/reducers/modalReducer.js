import { CLOSE_MODAL, OPEN_MODAL } from 'redux/constants/modalConst'

const initialState = {
	isOpen: false,
	title: '',
	Content: () => null,
}

export default function modalReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case OPEN_MODAL: {
			const { title, Component } = payload
			newState.isOpen = true
			newState.title = title
			newState.Content = () => Component
			return newState
		}
		case CLOSE_MODAL: {
			newState.isOpen = false
			return newState
		}
		default:
			return state
	}
}

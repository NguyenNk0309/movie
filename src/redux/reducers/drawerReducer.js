import { CLOSE_DRAWER, OPEN_DRAWER } from 'redux/constants/drawerConst'

const initialState = {
	isOpen: false,
	Content: () => null,
}

export default function drawerReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case OPEN_DRAWER: {
			newState.isOpen = true
			newState.Content = () => payload
			return newState
		}
		case CLOSE_DRAWER: {
			newState.isOpen = false
			return newState
		}
		default:
			return state
	}
}

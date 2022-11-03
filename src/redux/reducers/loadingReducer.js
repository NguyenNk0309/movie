import { HIDE_LOADING, SHOW_LOADING, TOGGLE_LOADING } from 'redux/constants/loadingConst'

const initialState = {
	isLoading: false,
}

export default function loadingReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case SHOW_LOADING: {
			newState.isLoading = true
			return newState
		}
		case HIDE_LOADING: {
			newState.isLoading = false
			return newState
		}
		case TOGGLE_LOADING: {
			newState.isLoading = !newState.isLoading
			return newState
		}
		default:
			return state
	}
}

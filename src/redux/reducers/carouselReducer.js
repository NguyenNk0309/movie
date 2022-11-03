import { GET_CAROUSEL } from 'redux/constants/carouselConst'

const initialState = {
	carousel: [],
}

export default function carouselReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_CAROUSEL:
			newState.carousel = payload
			return newState

		default:
			return state
	}
}

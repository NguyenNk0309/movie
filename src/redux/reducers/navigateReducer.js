import { ASSIGN_NAVIGATE } from 'redux/constants/navigateConst'

const initialState = {
	navigate: () => null,
}

export default function navigateReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case ASSIGN_NAVIGATE: {
			newState.navigate = payload
			return newState
		}

		default:
			return state
	}
}

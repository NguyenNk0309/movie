import { GET_MOVIES, GET_MOVIE_DETAIL } from 'redux/constants/moviesConst'

const initialState = {
	movies: [],
	movieDetail: {},
}

export default function moviesReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_MOVIES:
			newState.movies = payload
			return newState
		case GET_MOVIE_DETAIL:
			newState.movieDetail = payload
			return newState
		default:
			return state
	}
}

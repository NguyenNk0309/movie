import { GET_MOVIES, GET_MOVIE_DETAIL } from 'redux/constants/moviesConst'
import movieServices from 'services/movieServices'

export function actionGetMovies(payload = '') {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await movieServices.getMovies(payload)
			if (status === 200) {
				dispatch({ type: GET_MOVIES, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionGetMovieDetail(payload) {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await movieServices.getMovieDetail(payload)
			if (status === 200) {
				dispatch({ type: GET_MOVIE_DETAIL, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionThemPhim(payload) {
	return async (dispatch, getState) => {
		try {
			const { status } = await movieServices.themPhim(payload)
			if (status === 200) {
				alert('Thêm phim thành công !')
			}
		} catch (error) {
			alert('Thêm phim thất bại !')
		}
	}
}

export function actionCapNhatPhim(payload) {
	return async (dispatch, getState) => {
		try {
			const { navigate } = getState().navigateReducer
			const { status } = await movieServices.capNhatPhim(payload)
			if (status === 200) {
				alert('Cập nhật phim thành công !')
				navigate('/admin/films')
			}
		} catch (error) {
			alert('Cập nhật phim thất bại !')
		}
	}
}

export function actionXoaPhim(payload) {
	return async (dispatch, getState) => {
		try {
			const { status } = await movieServices.xoaPhim(payload)
			if (status === 200) {
				alert('Xóa phim thành công !')
				dispatch(actionGetMovies())
			}
		} catch (error) {
			alert('Xóa phim thất bại !')
		}
	}
}

import { GET_CAROUSEL } from 'redux/constants/carouselConst'
import movieServices from 'services/movieServices'

export function actionGetCarousel() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await movieServices.getCarousel()
			if (status === 200) {
				dispatch({ type: GET_CAROUSEL, payload: data.content })
			}
		} catch (error) {}
	}
}

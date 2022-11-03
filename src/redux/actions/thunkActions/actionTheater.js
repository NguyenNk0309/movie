import {
	LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG,
	LAY_THONG_TIN_HE_THONG_RAP,
	LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP,
	LAY_THONG_TIN_LICH_CHIEU_PHIM,
} from 'redux/constants/theaterConst'
import theaterServices from 'services/theaterServices'

export function actionLayThongTinLichChieuHeThongRap() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await theaterServices.layThongTinLichChieuHeThongRap()
			if (status === 200) {
				dispatch({ type: LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionLayThongTinHeThongRap() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await theaterServices.layThongTinHeThongRap()
			if (status === 200) {
				dispatch({ type: LAY_THONG_TIN_HE_THONG_RAP, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionLayThongTinLichChieuPhim(payload) {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await theaterServices.layThongTinLichChieuPhim(payload)
			if (status === 200) {
				dispatch({ type: LAY_THONG_TIN_LICH_CHIEU_PHIM, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionlayThongTinCumRapTheoHeThong(payload) {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await theaterServices.layThongTinCumRapTheoHeThong(payload)
			if (status === 200) {
				dispatch({ type: LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG, payload: data.content })
			}
		} catch (error) {}
	}
}

import { DAT_VE, LAY_CHI_TIET_PHONG_VE } from 'redux/constants/ticketConst'
import bookTicketServices from 'services/bookTicketServices'

export function actionLayDanhSachPhongVe(payload) {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await bookTicketServices.layDanhSachPhongVe(payload)
			if (status === 200) {
				dispatch({ type: LAY_CHI_TIET_PHONG_VE, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionDatVe(payload) {
	return async (dispatch, getState) => {
		try {
			const { status } = await bookTicketServices.datVe(payload)
			if (status === 200) {
				dispatch(actionLayDanhSachPhongVe(payload.maLichChieu))
			}
		} catch (error) {}
	}
}

export function actionDatGhe(ghe, maLichChieu) {
	return async (dispatch, getState) => {
		await dispatch({ type: DAT_VE, payload: ghe })
	}
}

export function actionTaoLichChieu(payload) {
	return async (dispatch, getState) => {
		try {
			const { status } = await bookTicketServices.taoLichChieu(payload)
			if (status === 200) {
				alert('Tạo Lịch Chiếu Thành Công')
				const { navigate } = getState().navigateReducer
				navigate(-1)
			}
		} catch (error) {
			alert('Tạo Lịch Chiếu Thất Bại')
		}
	}
}

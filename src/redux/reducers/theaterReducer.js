import {
	LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG,
	LAY_THONG_TIN_HE_THONG_RAP,
	LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP,
	LAY_THONG_TIN_LICH_CHIEU_PHIM,
} from 'redux/constants/theaterConst'

const initialState = {
	heThongRapChieu: [],
	thongTinRap: [],
	layThongTinLichChieuPhim: {},
	thongTinCumRapTheoHeThong: [],
}

export default function theaterReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP:
			newState.heThongRapChieu = payload
			return newState
		case LAY_THONG_TIN_HE_THONG_RAP:
			newState.thongTinRap = payload
			return newState
		case LAY_THONG_TIN_LICH_CHIEU_PHIM:
			newState.layThongTinLichChieuPhim = payload
			return newState
		case LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG:
			newState.thongTinCumRapTheoHeThong = payload
			return newState
		default:
			return state
	}
}

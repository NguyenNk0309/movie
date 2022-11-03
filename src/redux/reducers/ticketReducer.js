import { DAT_VE, LAY_CHI_TIET_PHONG_VE } from 'redux/constants/ticketConst'

const initialState = {
	chiTietPhongVe: {},
	danhSachGheDangDat: [],
	mangGheKhachDat: [],
}

export default function ticketReducer(state = initialState, { type, payload }) {
	switch (type) {
		case LAY_CHI_TIET_PHONG_VE:
			state.chiTietPhongVe = payload
			const danhSachGheCapNhat = []
			return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
		case DAT_VE: {
			const danhSachGheCapNhat = [...state.danhSachGheDangDat]
			let index = danhSachGheCapNhat.findIndex((gheDD) => gheDD.maGhe === payload.maGhe)
			if (index !== -1) {
				danhSachGheCapNhat.splice(index, 1)
			} else {
				danhSachGheCapNhat.push(payload)
			}
			return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
		}
		default:
			return state
	}
}

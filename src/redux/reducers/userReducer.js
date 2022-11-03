import {
	LIST_NGUOI_DUNG,
	LOAI_NGUOI_DUNG,
	SIGN_OUT,
	THONG_TIN_TAI_KHOAN,
	USER_INFO,
} from 'redux/constants/userConst'
import { USER } from 'utils/constants/user'

const userInfo = localStorage.getItem(USER) ? JSON.parse(localStorage.getItem(USER)) : {}

const initialState = {
	userInfo,
	thongTinTaiKhoan: {},
	listNguoiDung: [],
	loaiNguoiDung: [],
}

export default function userReducer(state = initialState, { type, payload }) {
	switch (type) {
		case USER_INFO:
			state.userInfo = payload
			return { ...state }
		case THONG_TIN_TAI_KHOAN: {
			state.thongTinTaiKhoan = payload
			return { ...state }
		}
		case SIGN_OUT: {
			return { ...state, userInfo: {} }
		}
		case LIST_NGUOI_DUNG: {
			state.listNguoiDung = payload
			return { ...state, listNguoiDung: [...state.listNguoiDung] }
		}
		case LOAI_NGUOI_DUNG: {
			state.loaiNguoiDung = payload
			return { ...state, loaiNguoiDung: [...state.loaiNguoiDung] }
		}
		default:
			return state
	}
}

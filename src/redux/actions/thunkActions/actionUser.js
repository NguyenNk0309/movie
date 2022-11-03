import {
	LIST_NGUOI_DUNG,
	LOAI_NGUOI_DUNG,
	THONG_TIN_TAI_KHOAN,
	USER_INFO,
} from 'redux/constants/userConst'
import userServices from 'services/userServices'
import { ACCESS_TOKEN, USER } from 'utils/constants/user'

export function actionDangNhap(payload) {
	return async (dispatch, getState) => {
		try {
			const { navigate } = getState().navigateReducer
			const { status, data } = await userServices.dangNhap(payload)
			if (status === 200) {
				localStorage.setItem(ACCESS_TOKEN, data.content.accessToken)
				localStorage.setItem(USER, JSON.stringify(data.content))
				await dispatch({ type: USER_INFO, payload: data.content })
				navigate('/home')
			}
		} catch (error) {
			alert('Tài khoản hoặc mật khẩu không chính xác')
		}
	}
}

export function actionDangKy(payload) {
	return async (dispatch, getState) => {
		try {
			const { navigate } = getState().navigateReducer
			const { status } = await userServices.dangKy(payload)
			if (status === 200) {
				navigate('/sign-in')
			}
		} catch (error) {
			alert('Đăng kí không thành công')
		}
	}
}

export function actionThongTinTaiKhoan() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await userServices.thongTinTaiKhoan()
			if (status === 200) {
				dispatch({ type: THONG_TIN_TAI_KHOAN, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionCapNhatThongTinNguoiDung(payload) {
	return async (dispatch, getState) => {
		try {
			const { status } = await userServices.capNhatThongTinNguoiDung(payload)
			if (status === 200) {
				alert('Cập nhật thành công')
			}
		} catch (error) {
			alert('Cập nhật không thành công')
		}
	}
}

export function actionDanhSachNguoiDung(payload) {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await userServices.danhSachNguoiDung(payload)
			if (status === 200) {
				dispatch({ type: LIST_NGUOI_DUNG, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionXoaNguoiDung(payload) {
	return async (dispatch, getState) => {
		try {
			const { status } = await userServices.xoaNguoiDung(payload)
			if (status === 200) {
				alert('Xóa người dùng thành công')
				dispatch(actionDanhSachNguoiDung(''))
			}
		} catch (error) {
			alert(error.response.data.content)
		}
	}
}

export function actionLayLoaiNguoiDung() {
	return async (dispatch, getState) => {
		try {
			const { status, data } = await userServices.layDanhSachLoaiNguoiDung()
			if (status === 200) {
				dispatch({ type: LOAI_NGUOI_DUNG, payload: data.content })
			}
		} catch (error) {}
	}
}

export function actionThemNguoiDung(payload) {
	return async (dispatch, getState) => {
		try {
			const { status } = await userServices.themNguoiDung(payload)
			if (status === 200) {
				alert('Thêm người dùng thành công')
				const { navigate } = getState().navigateReducer
				navigate('/admin/users')
			}
		} catch (error) {
			alert('Thêm người dùng không thành công')
		}
	}
}

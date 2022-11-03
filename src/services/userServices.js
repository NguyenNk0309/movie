import axios from 'axios'

import { LINK_API } from 'utils/constants/linkApi'
import { ACCESS_TOKEN, GROUP_ID } from 'utils/constants/user'

const userServices = {
	dangNhap(data) {
		return axios({
			url: `${LINK_API}/QuanLyNguoiDung/DangNhap`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	dangKy(data) {
		return axios({
			url: `${LINK_API}/QuanLyNguoiDung/DangKy`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	thongTinTaiKhoan() {
		return axios({
			url: `${LINK_API}/QuanLyNguoiDung/ThongTinTaiKhoan`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	capNhatThongTinNguoiDung(data) {
		return axios({
			url: `${LINK_API}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	danhSachNguoiDung(key = '') {
		return axios({
			url: `${LINK_API}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&${
				key === '' ? '' : `tuKhoa=${key}`
			}`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	xoaNguoiDung(data) {
		return axios({
			url: `${LINK_API}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${data}`,
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	layDanhSachLoaiNguoiDung() {
		return axios({
			url: `${LINK_API}/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	themNguoiDung(data) {
		return axios({
			url: `${LINK_API}/QuanLyNguoiDung/ThemNguoiDung`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
}

export default userServices

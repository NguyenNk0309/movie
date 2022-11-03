import axios from 'axios'

import { LINK_API } from 'utils/constants/linkApi'
import { ACCESS_TOKEN, GROUP_ID } from 'utils/constants/user'

const movieServices = {
	getCarousel() {
		return axios({
			url: `${LINK_API}/QuanLyPhim/LayDanhSachBanner`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	getMovies(data) {
		return axios({
			url:
				data === ''
					? `${LINK_API}/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`
					: `${LINK_API}/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${data}`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	getMovieDetail(id) {
		return axios({
			url: `${LINK_API}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	themPhim(data) {
		return axios({
			url: `${LINK_API}/QuanLyPhim/ThemPhimUploadHinh`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	capNhatPhim(data) {
		return axios({
			url: `${LINK_API}/QuanLyPhim/CapNhatPhimUpload`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	xoaPhim(id) {
		return axios({
			url: `${LINK_API}/QuanLyPhim/XoaPhim?MaPhim=${id}`,
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
}

export default movieServices

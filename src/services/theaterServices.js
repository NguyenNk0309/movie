import axios from 'axios'

import { LINK_API } from 'utils/constants/linkApi'
import { ACCESS_TOKEN, GROUP_ID } from 'utils/constants/user'

const theaterServices = {
	layThongTinLichChieuHeThongRap() {
		return axios({
			url: `${LINK_API}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	layThongTinHeThongRap() {
		return axios({
			url: `${LINK_API}/QuanLyRap/LayThongTinHeThongRap`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	layThongTinLichChieuPhim(id) {
		return axios({
			url: `${LINK_API}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	layThongTinCumRapTheoHeThong(id) {
		return axios({
			url: `${LINK_API}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
}

export default theaterServices

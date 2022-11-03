import axios from 'axios'

import { LINK_API } from 'utils/constants/linkApi'
import { ACCESS_TOKEN } from 'utils/constants/user'

const bookTicketServices = {
	layDanhSachPhongVe(id) {
		return axios({
			url: `${LINK_API}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
	datVe(data) {
		return axios({
			url: `${LINK_API}/QuanLyDatVe/DatVe`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},

	taoLichChieu(data) {
		return axios({
			url: `${LINK_API}/QuanLyDatVe/TaoLichChieu`,
			method: 'POST',
			data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
			},
		})
	},
}

export default bookTicketServices

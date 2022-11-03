import { Cascader, DatePicker, Form, InputNumber } from 'antd'
import { useFormik } from 'formik'
import moment from 'moment/moment'
import React, { useEffect } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import {
	actionlayThongTinCumRapTheoHeThong,
	actionLayThongTinHeThongRap,
} from 'redux/actions/thunkActions/actionTheater'
import { actionTaoLichChieu } from 'redux/actions/thunkActions/actionTicket'

const ShowTime = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { thongTinRap, thongTinCumRapTheoHeThong } = useSelector((state) => state.theaterReducer)

	const formik = useFormik({
		initialValues: {
			maPhim: parseInt(id),
			ngayChieuGioChieu: '',
			maRap: '',
			giaVe: 75000,
		},
		onSubmit(values) {
			dispatch(actionTaoLichChieu(values))
		},
	})

	useEffect(() => {
		dispatch(actionLayThongTinHeThongRap())
	}, [])

	const optionsThongTinRap = thongTinRap.map((rap) => {
		return { label: rap.tenHeThongRap, value: rap.maHeThongRap }
	})

	const optionsThongTinCumRap = thongTinCumRapTheoHeThong.map((cumRap) => {
		return { label: cumRap.tenCumRap, value: cumRap.maCumRap }
	})

	function handleChangeHeThongRap([value, ...rest]) {
		dispatch(actionlayThongTinCumRapTheoHeThong(value))
	}

	function handleChangeCumRap([value, ...rest]) {
		formik.setFieldValue('maRap', value)
	}

	function handleDatePickerOk(value) {
		const time = moment(value).format('DD/MM/yyyy hh:mm:ss')
		formik.setFieldValue('ngayChieuGioChieu', time)
	}

	function handleNumberChange(value) {
		formik.setFieldValue('giaVe', value)
	}

	return (
		<div>
			<div className='pb-12 flex items-center gap-4'>
				<NavLink
					to='/admin/films'
					className='hover:text-white cursor-pointer flex items-center justify-center text-2xl font-semibold text-white bg-violet-500 p-2 rounded-full'>
					<AiOutlineArrowLeft />
				</NavLink>
				<h1 className='text-3xl font-semibold text-violet-500'>Lịch Chiếu</h1>
			</div>

			<Form
				onSubmitCapture={formik.handleSubmit}
				labelCol={{
					span: 5,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout='horizontal'>
				<Form.Item label='Hệ thống rạp'>
					<Cascader
						options={optionsThongTinRap}
						onChange={handleChangeHeThongRap}
						placeholder='Please select'
					/>
				</Form.Item>

				<Form.Item label='Cụm rạp'>
					<Cascader
						options={optionsThongTinCumRap}
						onChange={handleChangeCumRap}
						placeholder='Please select'
					/>
				</Form.Item>

				<Form.Item label='Ngày chiếu giờ chiếu'>
					<DatePicker showTime onOk={handleDatePickerOk} />
				</Form.Item>

				<Form.Item label='Giá vé'>
					<InputNumber
						defaultValue={75000}
						onChange={handleNumberChange}
						min={75000}
						max={150000}
					/>
				</Form.Item>

				<Form.Item label='Submit'>
					<button
						className='text-white font-semibold bg-blue-500 px-2 py-1 text-lg rounded-md'
						type='submit'>
						Submit
					</button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ShowTime

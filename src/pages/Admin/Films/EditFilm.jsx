import { DatePicker, Form, Input, InputNumber, Switch } from 'antd'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { actionCapNhatPhim, actionGetMovieDetail } from 'redux/actions/thunkActions/actionMovies'
import { GROUP_ID } from 'utils/constants/user'
const EditFilm = () => {
	const { id } = useParams()

	const dispatch = useDispatch()
	const { movieDetail } = useSelector((state) => state.moviesReducer)

	useEffect(() => {
		dispatch(actionGetMovieDetail(id))
	}, [])

	const [imgSrc, setImgSrc] = useState('')

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			maPhim: movieDetail.maPhim,
			tenPhim: movieDetail.tenPhim,
			trailer: movieDetail.trailer,
			moTa: movieDetail.moTa,
			ngayKhoiChieu: movieDetail.ngayKhoiChieu,
			dangChieu: movieDetail.dangChieu,
			sapChieu: movieDetail.dangChieu,
			hot: movieDetail.hot,
			danhGia: movieDetail.danhGia,
			hinhAnh: null,
			maNhom: GROUP_ID,
		},
		onSubmit(values) {
			values.ngayKhoiChieu = moment(values.ngayKhoiChieu).format('DD/MM/YYYY')

			let formData = new FormData()
			for (let key in values) {
				if (key === 'hinhAnh') {
					if (values.hinhAnh !== null) {
						formData.append('File', values.hinhAnh, values.hinhAnh.name)
					}
				} else {
					formData.append(key, values[key])
				}
			}
			dispatch(actionCapNhatPhim(formData))
		},
	})

	function handleChangeDatePicker(value) {
		const ngayKhoiChieu = moment(value)
		formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
	}

	function handleChangeSwitch(name) {
		return (value) => formik.setFieldValue(name, value)
	}

	async function handleChangeFile(e) {
		let file = e.target.files[0]
		if (
			file.type === 'image/jpeg' ||
			file.type === 'image/jpg' ||
			file.type === 'image/gif' ||
			file.type === 'image/png'
		) {
			await formik.setFieldValue('hinhAnh', file)

			let reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = (e) => {
				setImgSrc(e.target.result)
			}
		}
	}

	return (
		<div>
			<div className='pb-12 flex items-center gap-4'>
				<NavLink
					to='/admin/films'
					className='hover:text-white cursor-pointer flex items-center justify-center text-2xl font-semibold text-white bg-violet-500 p-2 rounded-full'>
					<AiOutlineArrowLeft />
				</NavLink>
				<h1 className='text-3xl font-semibold text-violet-500'>Chỉnh Sửa Phim</h1>
			</div>

			<Form
				onSubmitCapture={formik.handleSubmit}
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout='horizontal'>
				<Form.Item label='Tên Phim'>
					<Input
						value={formik.values.tenPhim}
						name='tenPhim'
						onChange={formik.handleChange}
					/>
				</Form.Item>
				<Form.Item label='Trailer'>
					<Input
						value={formik.values.trailer}
						name='trailer'
						onChange={formik.handleChange}
					/>
				</Form.Item>
				<Form.Item label='Mô tả'>
					<Input value={formik.values.moTa} name='moTa' onChange={formik.handleChange} />
				</Form.Item>
				<Form.Item label='Ngày khởi chiếu'>
					<DatePicker
						allowClear={false}
						value={moment(formik.values.ngayKhoiChieu)}
						placeholder='Chọn Ngày'
						format={'DD/MM/YYYY'}
						onChange={handleChangeDatePicker}
					/>
				</Form.Item>
				<Form.Item label='Đang chiếu' valuePropName='checked'>
					<Switch
						className='bg-slate-300'
						name='dangChieu'
						checked={formik.values.dangChieu}
						onChange={handleChangeSwitch('dangChieu')}
					/>
				</Form.Item>
				<Form.Item label='Sắp chiếu' valuePropName='checked'>
					<Switch
						className='bg-slate-300'
						name='sapChieu'
						checked={formik.values.sapChieu}
						onChange={handleChangeSwitch('sapChieu')}
					/>
				</Form.Item>
				<Form.Item label='Hot' valuePropName='checked'>
					<Switch
						className='bg-slate-300'
						name='hot'
						checked={formik.values.hot}
						onChange={handleChangeSwitch('hot')}
					/>
				</Form.Item>
				<Form.Item label='Đánh giá'>
					<InputNumber
						min={0}
						max={10}
						value={formik.values.danhGia}
						onChange={(value) => formik.setFieldValue('danhGia', value)}
					/>
				</Form.Item>
				<Form.Item label='Hình ảnh'>
					<input type='file' name='hinhAnh' onChange={handleChangeFile} />
					<img
						className='mt-6 w-[200px] h-[200px]'
						src={imgSrc === '' ? movieDetail.hinhAnh : imgSrc}
						alt=''
						accept='.jpg, .jpeg, .png'
					/>
				</Form.Item>
				<Form.Item label='Submit'>
					<button
						type='submit'
						className='text-white font-semibold bg-blue-500 px-2 py-1 text-lg rounded-md'>
						Submit
					</button>
				</Form.Item>
			</Form>
		</div>
	)
}
export default EditFilm

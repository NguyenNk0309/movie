import { Form, Input, Tabs } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import {
	actionCapNhatThongTinNguoiDung,
	actionThongTinTaiKhoan,
} from 'redux/actions/thunkActions/actionUser'
import { GROUP_ID, USER } from 'utils/constants/user'
import moment from 'moment'

const Profile = () => {
	const dispatch = useDispatch()
	const { thongTinTaiKhoan } = useSelector((state) => state.userReducer)

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: thongTinTaiKhoan.taiKhoan,
			matKhau: thongTinTaiKhoan.matKhau,
			email: thongTinTaiKhoan.email,
			soDt: thongTinTaiKhoan.soDT,
			maNhom: GROUP_ID,
			maLoaiNguoiDung: JSON.parse(localStorage.getItem(USER)).maLoaiNguoiDung,
			hoTen: thongTinTaiKhoan.hoTen,
		},
		validationSchema: Yup.object({
			taiKhoan: Yup.string()
				.required('Account is required')
				.min(5, 'Account must have min 5 characters'),
			email: Yup.string().email('Invalid email address').required('Email is required'),
			matKhau: Yup.string()
				.required('Password is required')
				.min(6, 'Password must have min 6 characters'),
			hoTen: Yup.string()
				.required('Name is required')
				.min(3, 'Name must have min 3 characters')
				.max(18, 'Name must have max 18 characters'),
			soDt: Yup.string()
				.required('Phone number is required')
				.length(10, 'Phone number must have 10 numbers')
				.matches(
					/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
					'Phone number is invalid'
				),
		}),
		onSubmit: (values) => {
			dispatch(actionCapNhatThongTinNguoiDung(values))
		},
	})

	useEffect(() => {
		dispatch(actionThongTinTaiKhoan())
	}, [])

	return (
		<div className='py-4'>
			<div className='pb-12 flex items-center justify-center gap-4'>
				<NavLink
					to='home'
					className='hover:text-white cursor-pointer flex items-center justify-center text-2xl font-semibold text-white bg-violet-500 p-2 rounded-full'>
					<AiOutlineArrowLeft />
				</NavLink>
				<h1 className='text-3xl font-semibold text-violet-500'>Thông Tin Tài Khoản</h1>
			</div>

			<div className='px-12'>
				<Tabs
					defaultActiveKey='1'
					items={[
						{
							label: <h1>Thông Tin Cá Nhân</h1>,
							key: '1',
							children: (
								<div>
									<Form
										onSubmitCapture={formik.handleSubmit}
										labelCol={{
											span: 8,
										}}
										wrapperCol={{
											span: 16,
										}}
										initialValues={{
											remember: true,
										}}>
										<div className='flex gap-4'>
											<div className='w-6/12'>
												<Form.Item label='Email'>
													<Input
														onChange={formik.handleChange}
														value={formik.values.email}
														name='email'
													/>
													{formik.touched.email && formik.errors.email ? (
														<span className='text-red-500'>
															{formik.errors.email}
														</span>
													) : null}
												</Form.Item>
												<Form.Item label='Họ Tên'>
													<Input
														onChange={formik.handleChange}
														value={formik.values.hoTen}
														name='hoTen'
													/>
													{formik.touched.hoTen && formik.errors.hoTen ? (
														<span className='text-red-500'>
															{formik.errors.hoTen}
														</span>
													) : null}
												</Form.Item>
												<Form.Item label='Số Điện Thoại'>
													<Input
														onChange={formik.handleChange}
														value={formik.values.soDt}
														name='soDt'
													/>
													{formik.touched.soDt && formik.errors.soDt ? (
														<span className='text-red-500'>
															{formik.errors.soDt}
														</span>
													) : null}
												</Form.Item>
											</div>
											<div className='w-6/12'>
												<Form.Item label='Tài Khoản'>
													<Input
														onChange={formik.handleChange}
														value={formik.values.taiKhoan}
														name='taiKhoan'
													/>
													{formik.touched.taiKhoan &&
													formik.errors.taiKhoan ? (
														<span className='text-red-500'>
															{formik.errors.taiKhoan}
														</span>
													) : null}
												</Form.Item>
												<Form.Item label='Mật Khẩu'>
													<Input
														onChange={formik.handleChange}
														value={formik.values.matKhau}
														name='matKhau'
													/>
													{formik.touched.matKhau &&
													formik.errors.matKhau ? (
														<span className='text-red-500'>
															{formik.errors.matKhau}
														</span>
													) : null}
												</Form.Item>
											</div>
										</div>
										<button
											type='submit'
											className='float-right bg-violet-500 text-white font-semibold px-2 py-1 rounded-md text-lg'>
											Submit
										</button>
									</Form>
								</div>
							),
						},
						{
							label: <h1>Lịch Sử Đặt Vé</h1>,
							key: '2',
							children: (
								<div className='overflow-y-auto h-[400px] w-full'>
									{thongTinTaiKhoan.thongTinDatVe &&
										thongTinTaiKhoan.thongTinDatVe?.map((item, index) => (
											<div
												key={index}
												className='flex gap-4 border-y py-4 w-full'>
												<div className='w-[50px] h-[80px]'>
													<img
														className='h-full w-full'
														src={item.hinhAnh}
														alt=''
													/>
												</div>
												<div>
													<h1 className='text-lg font-semibold'>
														{item.tenPhim}
													</h1>
													<h3>
														Ngày Dặt Vé: {` `}
														{moment(item.ngayDat).format('DD/MM/YYYY')}
													</h3>
													<h1 className='font-semibold  w-[500px] flex flex-wrap'>
														Danh Sách Ghế:
														{item.danhSachGhe.map((ghe, index) => (
															<span
																key={index}
																className='text-violet-500 mx-1'>
																{ghe.tenGhe}
															</span>
														))}
													</h1>
												</div>
											</div>
										))}
								</div>
							),
						},
					]}
				/>
			</div>
		</div>
	)
}

export default Profile

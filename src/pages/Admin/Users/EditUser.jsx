import { Form, Input, Select } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { NavLink, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { GROUP_ID } from 'utils/constants/user'
import { useDispatch, useSelector } from 'react-redux'
import {
	actionCapNhatThongTinNguoiDung,
	actionDanhSachNguoiDung,
	actionLayLoaiNguoiDung,
} from 'redux/actions/thunkActions/actionUser'

const EditUser = () => {
	const { taiKhoan } = useParams()

	const dispatch = useDispatch()
	const { loaiNguoiDung } = useSelector((state) => state.userReducer)
	const { listNguoiDung } = useSelector((state) => state.userReducer)

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: listNguoiDung[0]?.taiKhoan,
			matKhau: listNguoiDung[0]?.matKhau,
			email: listNguoiDung[0]?.email,
			soDt: listNguoiDung[0]?.soDt,
			maNhom: GROUP_ID,
			maLoaiNguoiDung: listNguoiDung[0]?.maLoaiNguoiDung,
			hoTen: listNguoiDung[0]?.hoTen,
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
		dispatch(actionLayLoaiNguoiDung())
		dispatch(actionDanhSachNguoiDung(taiKhoan))
	}, [])

	return (
		<div>
			<div className='pb-12 flex items-center gap-4'>
				<NavLink
					to='/admin/users'
					className='hover:text-white cursor-pointer flex items-center justify-center text-2xl font-semibold text-white bg-violet-500 p-2 rounded-full'>
					<AiOutlineArrowLeft />
				</NavLink>
				<h1 className='text-3xl font-semibold text-violet-500'>Ch???nh S???a Ng?????i D??ng</h1>
			</div>

			<Form
				onSubmitCapture={formik.handleSubmit}
				name='basic'
				labelCol={{
					span: 6,
				}}
				wrapperCol={{
					span: 18,
				}}>
				<div className='flex gap-4'>
					<div className='w-6/12'>
						<Form.Item label='T??i Kho???n'>
							<Input
								disabled
								onChange={formik.handleChange}
								value={formik.values.taiKhoan}
								name='taiKhoan'
							/>
							{formik.touched.taiKhoan && formik.errors.taiKhoan ? (
								<span className='text-red-500'>{formik.errors.taiKhoan}</span>
							) : null}
						</Form.Item>

						<Form.Item label='M???t Kh???u'>
							<Input
								onChange={formik.handleChange}
								value={formik.values.matKhau}
								name='matKhau'
							/>
							{formik.touched.matKhau && formik.errors.matKhau ? (
								<span className='text-red-500'>{formik.errors.matKhau}</span>
							) : null}
						</Form.Item>

						<Form.Item label='H??? T??n'>
							<Input
								onChange={formik.handleChange}
								value={formik.values.hoTen}
								name='hoTen'
							/>
							{formik.touched.hoTen && formik.errors.hoTen ? (
								<span className='text-red-500'>{formik.errors.hoTen}</span>
							) : null}
						</Form.Item>
					</div>
					<div className='w-6/12'>
						<Form.Item label='Email'>
							<Input
								disabled
								onChange={formik.handleChange}
								value={formik.values.email}
								name='email'
							/>
							{formik.touched.email && formik.errors.email ? (
								<span className='text-red-500'>{formik.errors.email}</span>
							) : null}
						</Form.Item>

						<Form.Item label='SDT'>
							<Input
								onChange={formik.handleChange}
								value={formik.values.soDt}
								name='soDt'
							/>
							{formik.touched.soDt && formik.errors.soDt ? (
								<span className='text-red-500'>{formik.errors.soDt}</span>
							) : null}
						</Form.Item>

						<Form.Item label='Ng?????i D??ng'>
							<Select
								onChange={(value) => {
									formik.setFieldValue('maLoaiNguoiDung', value)
								}}
								value={formik.values.maLoaiNguoiDung}>
								{loaiNguoiDung.map((item, index) => (
									<Select.Option key={index} value={item.maLoaiNguoiDung}>
										{item.tenLoai}
									</Select.Option>
								))}
							</Select>
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
	)
}

export default EditUser

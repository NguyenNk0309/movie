import { Table } from 'antd'
import Search from 'antd/lib/input/Search'
import React, { useEffect } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { actionDanhSachNguoiDung, actionXoaNguoiDung } from 'redux/actions/thunkActions/actionUser'

const Users = () => {
	const dispatch = useDispatch()
	const { listNguoiDung } = useSelector((state) => state.userReducer)

	const navigate = useNavigate()

	useEffect(() => {
		dispatch(actionDanhSachNguoiDung(''))
	}, [])

	const columns = [
		{
			title: 'STT',
			render(text, record, index) {
				return <span>{index + 1}</span>
			},
		},
		{
			title: 'Tài Khoản',
			render(text, record) {
				return <span>{record.taiKhoan}</span>
			},
		},
		{
			title: 'Mật Khẩu',
			render(text, record) {
				return <span>{record.matKhau}</span>
			},
		},
		{
			title: 'Họ Tên',
			render(text, record) {
				return <span>{record.hoTen}</span>
			},
		},
		{
			title: 'Email',
			render(text, record) {
				return <span>{record.email}</span>
			},
		},
		{
			title: 'SDT',
			render(text, record) {
				return <span>{record.soDt}</span>
			},
		},
		{
			title: 'Xóa / Sửa',
			render(text, record) {
				return (
					<div className='flex gap-4 justify-center'>
						<span
							onClick={() => {
								if (window.confirm('Bạn muốn xóa người dùng này ?') === true) {
									dispatch(actionXoaNguoiDung(record.taiKhoan))
								}
							}}
							className='text-red-500 cursor-pointer text-2xl'>
							<AiFillDelete />
						</span>
						<span
							onClick={() => navigate(`edit-user/${record.taiKhoan}`)}
							className='text-blue-500 cursor-pointer text-2xl'>
							<AiFillEdit />
						</span>
					</div>
				)
			},
		},
	]

	const onSearch = (value) => dispatch(actionDanhSachNguoiDung(value))

	return (
		<div className='flex flex-col'>
			<h1 className='text-3xl font-semibold pb-12 text-violet-500'>Quản Lý Người Dùng</h1>
			<div className='flex justify-center pb-4'>
				<button className=' bg-violet-500 hover:bg-violet-400 transition-all rounded-md text-lg font-semibold px-2 py-1 text-white'>
					<NavLink to='add-user' className='hover:text-white'>
						+ Thêm Người Dùng
					</NavLink>
				</button>
			</div>

			<div className='w-11/12 pb-4 self-center'>
				<Search
					allowClear
					placeholder='input search text'
					size='large'
					onSearch={onSearch}
				/>
			</div>
			<div className='self-center w-11/12 '>
				<Table
					rowKey={(record) => {
						return record.taiKhoan
					}}
					pagination={{ defaultPageSize: 5 }}
					bordered
					columns={columns}
					dataSource={listNguoiDung}
				/>
				;
			</div>
		</div>
	)
}

export default Users

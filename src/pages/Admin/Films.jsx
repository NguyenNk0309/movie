import { Table } from 'antd'
import Search from 'antd/lib/input/Search'
import React, { useEffect } from 'react'
import { AiFillCalendar, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { actionGetMovies, actionXoaPhim } from 'redux/actions/thunkActions/actionMovies'

const Films = () => {
	const dispatch = useDispatch()
	const { movies } = useSelector((state) => state.moviesReducer)

	const navigate = useNavigate()

	useEffect(() => {
		dispatch(actionGetMovies())
	}, [])

	const columns = [
		{
			title: 'Mã Phim',
			dataIndex: 'maPhim',
		},
		{
			title: 'Hình Ảnh',
			render(text, film) {
				return (
					<div className='w-[50px] h-[50px]'>
						<img className='h-full w-full' src={film.hinhAnh} alt='' />
					</div>
				)
			},
		},
		{
			title: 'Tên Phim',
			dataIndex: 'tenPhim',
		},
		{
			title: 'Mô tả',
			render(text, record) {
				return <p>{record.moTa.length ? record.moTa.substr(0, 50) + '...' : record.moTa}</p>
			},
		},
		{
			title: 'Xóa / Sửa / Lịch Chiếu',
			render(text, record) {
				return (
					<div className='flex gap-4 justify-center'>
						<span
							onClick={() => {
								if (window.confirm('Bạn muốn xóa phim này ?') === true) {
									dispatch(actionXoaPhim(record.maPhim))
								}
							}}
							className='text-red-500 cursor-pointer text-2xl'>
							<AiFillDelete />
						</span>
						<span
							onClick={() => navigate(`edit-film/${record.maPhim}`)}
							className='text-blue-500 cursor-pointer text-2xl'>
							<AiFillEdit />
						</span>
						<span
							onClick={() => navigate(`show-time/${record.maPhim}`)}
							className='text-violet-500 cursor-pointer text-2xl'>
							<AiFillCalendar />
						</span>
					</div>
				)
			},
		},
	]

	const onSearch = (value) => dispatch(actionGetMovies(value))

	return (
		<div className='flex flex-col'>
			<h1 className='text-3xl font-semibold pb-12 text-violet-500'>Quản Lý Phim</h1>
			<div className='flex justify-center pb-4'>
				<button className=' bg-violet-500 hover:bg-violet-400 transition-all rounded-md text-lg font-semibold px-2 py-1 text-white'>
					<NavLink to='add-film' className='hover:text-white'>
						+ Thêm Phim
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
						return record.maPhim
					}}
					pagination={{ defaultPageSize: 5 }}
					bordered
					columns={columns}
					dataSource={movies}
				/>
				;
			</div>
		</div>
	)
}

export default Films

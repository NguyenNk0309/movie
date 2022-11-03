import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { Tabs } from 'antd'
import { actionDatVe, actionLayDanhSachPhongVe } from 'redux/actions/thunkActions/actionTicket'
import { actionThongTinTaiKhoan } from 'redux/actions/thunkActions/actionUser'
import moment from 'moment'
import { AiFillHome } from 'react-icons/ai'

const CheckoutTemplate = ({ changeTab }) => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { chiTietPhongVe, danhSachGheDangDat } = useSelector((state) => state.ticketReducer)
	const { userInfo } = useSelector((state) => state.userReducer)

	useEffect(() => {
		dispatch(actionLayDanhSachPhongVe(id))
	}, [])

	const { thongTinPhim } = chiTietPhongVe

	return (
		<div className='w-full min-h-screen flex flex-wrap'>
			<div className='w-full h-screen md:w-7/12 p-4'>
				<Outlet />
			</div>
			<div className='w-full h-screen md:w-5/12 p-4'>
				<div className='h-full flex flex-col justify-between'>
					<div>
						<div className='border-b  px-4 py-2'>
							<h1 className='text-green-500 text-4xl font-semibold text-center'>
								{danhSachGheDangDat.reduce((init, ghe) => init + ghe.giaVe, 0)}đ
							</h1>
						</div>
						<div className='border-b px-4 py-2'>
							<h1 className='text-2xl mb-2 font-semibold'>Tên phim: {thongTinPhim?.tenPhim}</h1>
							<h3 className='text-lg mb-2 font-semibold'>
								Địa điểm: {thongTinPhim?.tenCumRap} - {thongTinPhim?.tenRap}
							</h3>
							<h3 className='text-lg mb-2 font-semibold'>
								Thời gian: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}
							</h3>
						</div>
						<div className='border-b px-4 py-2'>
							<div className='flex items-center justify-between'>
								<div className='w-full overflow-x-auto flex items-center gap-2'>
									<h1 className='text-red-500 font-semibold text-lg'>Ghế:</h1>
									{danhSachGheDangDat.map((ghe, index) => (
										<h1 key={index} className='text-green-500 font-semibold text-lg'>
											{ghe.stt}
										</h1>
									))}
								</div>
							</div>
						</div>
						<div className='border-b px-4 py-2'>
							<h1 className='text-black font-semibold text-lg'>Email</h1>
							<p className='text-lg'>{userInfo?.email}</p>
						</div>
						<div className='border-b px-4 py-2'>
							<h1 className='text-black font-semibold text-lg'>Ghi chú</h1>
							<div className='flex flex-col gap-3'>
								<div className='flex items-center gap-4'>
									<div className='w-[35px] h-[35px] bg-[rgb(123,122,122)]'></div>
									<h1 className='font-semibold'>Ghế thường</h1>
								</div>
								<div className='flex items-center gap-4'>
									<div className='w-[35px] h-[35px] bg-[rgb(228,74,8)]'></div>
									<h1 className='font-semibold'>Ghế vip</h1>
								</div>
								<div className='flex items-center gap-4'>
									<div className='w-[35px] h-[35px] bg-[rgb(232,76,76)]'></div>
									<h1 className='font-semibold'>Ghế đã đặt</h1>
								</div>
								<div className='flex items-center gap-4'>
									<div className='w-[35px] h-[35px] bg-[rgb(18,176,18)]'></div>
									<h1 className='font-semibold'>Ghế đang đặt</h1>
								</div>
							</div>
						</div>
					</div>
					<button
						disabled={danhSachGheDangDat.length <= 0 ? true : false}
						onClick={() => {
							const thongTinDatVe = {
								maLichChieu: id,
								danhSachVe: danhSachGheDangDat,
							}

							dispatch(actionDatVe(thongTinDatVe))
							alert('Đặt vé thành công')
							changeTab()
						}}
						className={`${
							danhSachGheDangDat.length <= 0 ? 'opacity-80' : 'opacity-100'
						} cursor-pointer bg-green-500 py-2 rounded-md font-semibold text-2xl text-white text-center`}>
						Đặt Vé
					</button>
				</div>
			</div>
		</div>
	)
}

const Tab = () => {
	const dispatch = useDispatch()
	const { thongTinTaiKhoan } = useSelector((state) => state.userReducer)

	const [tab, setTab] = useState('1')

	useEffect(() => {
		dispatch(actionThongTinTaiKhoan())
	}, [tab])

	useEffect(() => {
		window.scrollTo(0, 0)
	})

	const changeTab = () => setTab('2')

	return (
		<div className='px-2'>
			<Tabs
				tabBarExtraContent={
					<NavLink className='text-blue-500 hover:text-blue-500 text-2xl' to='/home'>
						<AiFillHome />
					</NavLink>
				}
				activeKey={tab}
				onChange={(tab) => setTab(tab)}>
				<Tabs.TabPane tab='01 CHỌN GHẾ THANH TOÁN' key='1'>
					<CheckoutTemplate changeTab={changeTab} />
				</Tabs.TabPane>
				<Tabs.TabPane tab='02 KẾT QUẢ DẶT VÉ' key='2'>
					<section className='text-gray-600 body-font'>
						<div className='container px-5 mx-auto'>
							<div className='flex flex-col text-center w-full mb-20'>
								<h1 className='sm:text-3xl text-violet-500 text-2xl font-medium title-font mb-4 '>
									Lịch sử đặt vé
								</h1>
								<button>
									<NavLink
										className='hover:text-white text-xl text-white bg-violet-500 px-2 py-1 rounded-md'
										to='/home'>
										Về trang chủ
									</NavLink>
								</button>
							</div>
							<div className='flex flex-wrap -m-2'>
								{thongTinTaiKhoan?.thongTinDatVe &&
									thongTinTaiKhoan?.thongTinDatVe.map((item, index) => (
										<div key={index} className='p-2 lg:w-1/3 md:w-1/2 w-full'>
											<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
												<img
													alt='team'
													className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
													src={item.hinhAnh}
												/>
												<div className='flex-grow'>
													<h2 className='text-gray-900 title-font font-medium'>
														{item.tenPhim}
													</h2>
													<p className='text-gray-500'>
														{moment(item.ngayDat).format('hh:mm A - dd-mm-yyyy')}
													</p>
													<p className='text-gray-500'>
														Ghế:{' '}
														{item.danhSachGhe.map((ghe, index) => (
															<span
																className='text-violet-500 font-semibold'
																key={index}>{`[${ghe.tenGhe}] `}</span>
														))}
													</p>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</section>
				</Tabs.TabPane>
			</Tabs>
		</div>
	)
}

export default Tab

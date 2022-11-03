import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import 'assets/css/circle.css'
import { Rate, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetMovieDetail } from 'redux/actions/thunkActions/actionMovies'
import moment from 'moment'
import { actionLayThongTinLichChieuPhim } from 'redux/actions/thunkActions/actionTheater'

const Detail = () => {
	const { id } = useParams()

	const dispatch = useDispatch()
	const { movieDetail } = useSelector((state) => state.moviesReducer)
	const { layThongTinLichChieuPhim } = useSelector((state) => state.theaterReducer)

	useEffect(() => {
		dispatch(actionGetMovieDetail(id))
		dispatch(actionLayThongTinLichChieuPhim(id))
	}, [])

	return (
		<div
			style={{
				backgroundImage: `url(${movieDetail.hinhAnh})`,
			}}
			className={`bg-no-repeat bg-cover min-h-screen`}>
			<CustomCard
				style={{ minHeight: '100vh' }}
				effectColor='#C780FF' // required
				color='#14AEFF' // default color is white
				blur={10} // default blur value is 10px
				borderRadius={0} // default border radius value is 10px
			>
				<div className='mt-[100px]'>
					<div className='flex flex-col md:flex-row items-center md:items-start gap-20 mb-20'>
						<div className='w-full md:w-6/12 flex flex-col items-center gap-4'>
							<h1 className='text-center text-5xl text-white font-semibold'>{movieDetail.tenPhim}</h1>
							<p className='text-white'>
								Ngày chiếu:{' '}
								<span className='underline'>
									{moment(movieDetail.ngayKhoiChieu).format('DD.MM.YYYY')}
								</span>
							</p>
							<div className='w-[300px] h-[400px] border-4 border-slate-500 shadow-md rounded-md'>
								<img className='w-full h-full' src={movieDetail.hinhAnh} alt='' />
							</div>
							<p className='text-white text-lg text-center'>{movieDetail.moTa}</p>
						</div>
						<div className='w-full md:w-6/12 h-fit flex flex-col items-center gap-4'>
							<h1 className='text-center text-5xl text-white font-semibold'>Đánh Giá</h1>
							<div className={`c100 p${movieDetail.danhGia * 10} big`}>
								<span>{isNaN(movieDetail.danhGia) ? '' : movieDetail.danhGia * 10}</span>
								<div className='slice'>
									<div className='bar' />
									<div className='fill' />
								</div>
							</div>
							<Rate
								style={{
									fontSize: 36,
								}}
								allowHalf
								value={movieDetail.danhGia / 2}
							/>
						</div>
					</div>
					<h1 className='text-center text-5xl text-white font-semibold mb-4'>Lịch Chiếu</h1>
					{JSON.stringify(layThongTinLichChieuPhim.heThongRapChieu) !== '[]' ? (
						<>
							<div className='w-full bg-white px-4 pb-4'>
								<Tabs
									tabPosition='top'
									items={
										layThongTinLichChieuPhim.heThongRapChieu !== undefined
											? layThongTinLichChieuPhim.heThongRapChieu.map((item, index) => {
													return {
														label: (
															<div className='flex flex-col items-center gap-3'>
																<div className='p-0 w-[30px] h-[30px]'>
																	<img
																		className='w-full h-full'
																		src={item.logo}
																		alt=''
																	/>
																</div>
																<h3>{item.tenHeThongRap}</h3>
															</div>
														),
														key: index,
														children: (
															<div className='h-[200px] flex flex-col gap-4 overflow-y-auto'>
																{item.cumRapChieu.map((item, index) => (
																	<div key={index} className='py-2 border-b'>
																		<div className='flex gap-4'>
																			<div className='p-0 w-[50px] h-[50px]'>
																				<img
																					className='w-full h-full'
																					src={item.hinhAnh}
																					alt=''
																				/>
																			</div>
																			<div className='flex flex-col justify-around'>
																				<h2 className='font-semibold'>
																					{item.tenCumRap}
																				</h2>
																				<p>{item.diaChi}</p>
																			</div>
																		</div>
																		<div className='grid grid-cols-4  md:grid-cols-8 mt-4 gap-4'>
																			{item.lichChieuPhim.map((item, index) => (
																				<NavLink
																					to={`/checkout/${item.maLichChieu}`}
																					className='bg-violet-500 rounded-md p-1 text-center hover:text-black'
																					key={index}>
																					{moment(
																						item.ngayChieuGioChieu
																					).format('HH:MM A')}
																				</NavLink>
																			))}
																		</div>
																	</div>
																))}
															</div>
														),
													}
											  })
											: null
									}
								/>
							</div>
						</>
					) : (
						<h3 className='text-center text-white text-lg font-semibold'>Hiện chưa có lịch chiếu</h3>
					)}
				</div>
			</CustomCard>
		</div>
	)
}

export default Detail

import { List, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayCircleOutlined } from '@ant-design/icons'
import { FcPrevious, FcNext } from 'react-icons/fc'
import moment from 'moment'

import { CarouselBase, IFrame } from 'components'
import { actionGetMovies } from 'redux/actions/thunkActions/actionMovies'
import 'assets/css/flipCard.css'
import { actionLayThongTinLichChieuHeThongRap } from 'redux/actions/thunkActions/actionTheater'
import { actionOpenModal } from 'redux/actions/standardActions/actionModal'
import { NavLink } from 'react-router-dom'

const Home = () => {
	const dispatch = useDispatch()
	const { movies } = useSelector((state) => state.moviesReducer)
	const { heThongRapChieu } = useSelector((state) => state.theaterReducer)

	const [comingMovies, setComingMovies] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		dispatch(actionGetMovies())
		dispatch(actionLayThongTinLichChieuHeThongRap())
	}, [])

	return (
		<div className='w-full'>
			<div className='pb-4'>
				<CarouselBase />
			</div>

			<div className='pb-4 px-12'>
				<div className='flex items-center gap-4'>
					<button
						onClick={() => {
							setCurrentPage(1)
							setComingMovies(true)
						}}
						className={`px-2 py-1 border-2 border-violet-500 ${
							comingMovies ? 'bg-violet-500 text-white' : 'bg-white text-violet-500'
						} font-semibold rounded-md`}>
						Coming soon
					</button>
					<button
						onClick={() => {
							setCurrentPage(1)
							setComingMovies(false)
						}}
						className={`px-2 py-1 border-2 border-violet-500 ${
							!comingMovies ? 'bg-violet-500 text-white' : 'bg-white text-violet-500'
						} font-semibold rounded-md`}>
						Now Showing
					</button>
				</div>

				<div className='pt-4'>
					<List
						grid={{
							gutter: 16,
							xs: 1,
							sm: 2,
							md: 3,
							lg: 4,
							xl: 4,
							xxl: 4,
						}}
						pagination={{
							current: currentPage,
							onChange(page, pageSize) {
								setCurrentPage(page)
							},
							pageSize: 8,
							itemRender(page, type) {
								if (type === 'prev') {
									return (
										<div className='w-full h-full flex items-center justify-center'>
											<FcPrevious className='font-semibold text-lg' />
										</div>
									)
								}
								if (type === 'next') {
									return (
										<div className='w-full h-full flex items-center justify-center'>
											<FcNext className='font-semibold text-lg' />
										</div>
									)
								}
								if (type === 'page') {
									return (
										<div
											className={`${
												this.active ? 'bg-blue-400' : 'bg-violet-400'
											} font-semibold`}>
											{page}
										</div>
									)
								}
							},
						}}
						dataSource={movies && movies.filter((movie) => movie.sapChieu === comingMovies)}
						renderItem={(item) => (
							<List.Item>
								<div>
									<div
										onClick={() => {
											dispatch(actionOpenModal('Trailer', <IFrame src={item.trailer} />))
										}}
										className='flip-card'>
										<div className='flip-card-inner'>
											<div className='flip-card-front'>
												<img className='h-full w-full' src={item.hinhAnh} alt='Avatar' />
											</div>
											<div className='flip-card-back relative bg-[rgba(0,0,0,.9)]'>
												<div className='absolute top-0 left-0 w-full h-full'>
													<img className='h-full w-full' src={item.hinhAnh} alt='Avatar' />
												</div>
												<div className='w-full h-full absolute flex justify-center items-center bg-[rgba(0,0,0,.5)]'>
													<div>
														<div className='rounded-full cursor-pointer'>
															<PlayCircleOutlined style={{ fontSize: '50px' }} />
														</div>
														<div className='text-2xl mt-2 font-bold'>{item.tenPhim}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<NavLink
										to={`/detail/${item.maPhim}`}
										className='block hover:text-black bg-violet-500 text-center cursor-pointer py-2  my-2 text-success-50 font-bold'>
										Watch Now
									</NavLink>
								</div>
							</List.Item>
						)}
					/>
				</div>
			</div>

			<div className='pb-8 px-12'>
				<div className='hidden lg:block'>
					<Tabs
						style={{
							height: '500px',
						}}
						tabPosition='left'
						items={heThongRapChieu.map((item, index) => {
							return {
								label: (
									<div className='p-0 w-[30px] h-[30px]'>
										<img className='w-full h-full' src={item.logo} alt='' />
									</div>
								),
								key: index,
								children: (
									<Tabs
										style={{
											height: '500px',
										}}
										tabPosition='left'
										items={item?.lstCumRap.map((item, index) => {
											return {
												label: (
													<div className='flex items-start gap-3'>
														<div className='p-0 w-[30px] h-[30px]'>
															<img className='w-full h-full' src={item.hinhAnh} alt='' />
														</div>
														<div className='flex flex-col items-start'>
															<h3>{item.tenCumRap}</h3>
															<span className='text-blue-500'>Xem chi tiết</span>
														</div>
													</div>
												),
												key: index,
												children: (
													<div className='h-[500px] overflow-y-auto'>
														{item?.danhSachPhim.map((phim, index) => (
															<div className='p-2 border-b' key={index}>
																<div className='flex items-start gap-4'>
																	<div className='w-[100px] h-[100px]'>
																		<img
																			className='w-full h-full'
																			src={phim.hinhAnh}
																			alt=''
																		/>
																	</div>
																	<div>
																		<h3 className='text-lg font-semibold'>
																			{phim.tenPhim}
																		</h3>
																		<span>{item.diaChi}</span>
																	</div>
																</div>
																<div className='grid grid-cols-6 gap-4 pt-3'>
																	{phim?.lstLichChieuTheoPhim
																		.slice(0, 6)
																		.map((lichChieu, index) => (
																			<NavLink
																				to={`/checkout/${lichChieu.maLichChieu}`}
																				className='px-2 py-1 bg-violet-400 rounded-md flex items-center justify-center hover:text-black'
																				key={index}>
																				<span className='font-semibold'>
																					{moment(lichChieu.ngayChieu).format(
																						'hh:mm A'
																					)}
																				</span>
																			</NavLink>
																		))}
																</div>
															</div>
														))}
													</div>
												),
											}
										})}
									/>
								),
							}
						})}
					/>
				</div>

				<div className='block lg:hidden'>
					<Tabs
						items={heThongRapChieu.map((item, index) => {
							return {
								label: (
									<div className='p-0 w-[30px] h-[30px]'>
										<img className='w-full h-full' src={item.logo} alt='' />
									</div>
								),
								key: index,
								children: (
									<Tabs
										items={item?.lstCumRap.map((item, index) => {
											return {
												label: (
													<div className='flex items-start gap-3'>
														<div className='p-0 w-[30px] h-[30px]'>
															<img className='w-full h-full' src={item.hinhAnh} alt='' />
														</div>
														<div className='flex flex-col items-start'>
															<h3>{item.tenCumRap}</h3>
															<span className='text-blue-500'>Xem chi tiết</span>
														</div>
													</div>
												),
												key: index,
												children: (
													<div className='h-[500px] overflow-y-auto'>
														{item?.danhSachPhim.map((phim, index) => (
															<div className='p-2 border-b' key={index}>
																<div className='flex items-start gap-4'>
																	<div className='w-[100px] h-[100px]'>
																		<img
																			className='w-full h-full'
																			src={phim.hinhAnh}
																			alt=''
																		/>
																	</div>
																	<div>
																		<h3 className='text-lg font-semibold'>
																			{phim.tenPhim}
																		</h3>
																		<span>{item.diaChi}</span>
																	</div>
																</div>
																<div className='grid grid-cols-6 gap-4 pt-3'>
																	{phim?.lstLichChieuTheoPhim
																		.slice(0, 6)
																		.map((lichChieu, index) => (
																			<NavLink
																				to={`/checkout/${lichChieu.maLichChieu}`}
																				className='hover:text-black px-2 py-1 bg-violet-400 rounded-md flex items-center justify-center'
																				key={index}>
																				<span className='font-semibold'>
																					{moment(lichChieu.ngayChieu).format(
																						'hh:mm A'
																					)}
																				</span>
																			</NavLink>
																		))}
																</div>
															</div>
														))}
													</div>
												),
											}
										})}
									/>
								),
							}
						})}
					/>
				</div>
			</div>
		</div>
	)
}

export default Home

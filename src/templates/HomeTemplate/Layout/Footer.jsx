import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { actionLayThongTinHeThongRap } from 'redux/actions/thunkActions/actionTheater'

const Footer = () => {
	const dispatch = useDispatch()
	const { thongTinRap } = useSelector((state) => state.theaterReducer)

	useEffect(() => {
		dispatch(actionLayThongTinHeThongRap())
	}, [])

	return (
		<footer className='py-4 px-12 bg-gray-800 text-gray-50'>
			<div className='space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50'>
				<div className='grid grid-cols-12'>
					<div className='pb-6 col-span-full md:pb-0 md:col-span-6'>
						<NavLink to='home' className='flex items-center justify-center space-x-3 md:justify-start'>
							<div className='flex items-center justify-center w-12 h-12 rounded-full '>
								<img className='w-full h-full' src='./NK-icon.png' alt='' />
							</div>
							<span className='text-violet-300 hover:text-blue-300 text-2xl font-semibold'>
								My Movies
							</span>
						</NavLink>
					</div>
					<div className='col-span-full md:col-span-6'>
						<ul className='flex items-center justify-center md:justify-end gap-8'>
							{thongTinRap.map((rap, index) => (
								<li key={index}>
									<div className='w-[40px] h-[40px]'>
										<img className='w-full h-full' src={rap.logo} alt='' />
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='pt-4 flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6'>
					<span>©2022 All rights reserved</span>
					<span>Privacy policy</span>
					<span>Terms of service</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer

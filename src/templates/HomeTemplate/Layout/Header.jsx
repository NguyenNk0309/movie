import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { actionCloseDrawer, actionOpenDrawer } from 'redux/actions/standardActions/actionDrawer'
import { SIGN_OUT } from 'redux/constants/userConst'
import { ACCESS_TOKEN, USER } from 'utils/constants/user'

const Header = () => {
	const dispatch = useDispatch()
	const { userInfo } = useSelector((state) => state.userReducer)

	function MobileHeader() {
		return (
			<ul className='flex flex-col gap-4 text-center'>
				<li onClick={() => dispatch(actionCloseDrawer())}>
					<NavLink
						className={({ isActive }) =>
							`${
								isActive ? '' : ''
							} font-semibold text-violet-600 text-xl hover:text-blue-500`
						}
						to='home'>
						Home
					</NavLink>
				</li>
				<li onClick={() => dispatch(actionCloseDrawer())}>
					<NavLink
						className={({ isActive }) =>
							`${
								isActive ? '' : ''
							} font-semibold text-violet-600 text-xl hover:text-blue-500`
						}
						to='contact'>
						Contact
					</NavLink>
				</li>
				<li onClick={() => dispatch(actionCloseDrawer())}>
					<NavLink
						className={({ isActive }) =>
							`${
								isActive ? '' : ''
							} font-semibold text-violet-600 text-xl hover:text-blue-500`
						}
						to='news'>
						News
					</NavLink>
				</li>
				<li
					onClick={() => dispatch(actionCloseDrawer())}
					className='flex items-center justify-center gap-12 mt-12'>
					<NavLink
						className={({ isActive }) =>
							`${
								isActive ? '' : ''
							} font-semibold text-violet-600 text-xl hover:text-blue-500`
						}
						to='sign-in'>
						Sign in
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							`${
								isActive ? '' : ''
							} font-semibold text-violet-600 text-xl hover:text-blue-500`
						}
						to='sign-up'>
						Sign up
					</NavLink>
				</li>
			</ul>
		)
	}

	return (
		<header className='fixed top-0 left-0 w-full z-10 py-4 px-12 bg-opacity-70 bg-black'>
			<div className='hidden md:flex justify-between items-center'>
				<NavLink to='home' className='flex items-center gap-4'>
					<div className='w-[40px] h-[40px]'>
						<img className='w-full h-full' src='./NK-icon.png' alt='' />
					</div>
					<h2 className='text-violet-300 text-lg font-semibold'>My Movies</h2>
				</NavLink>
				<ul className='items-stretch space-x-3 flex gap-8'>
					<li className='flex'>
						<NavLink
							to='home'
							className={({ isActive }) =>
								`${
									isActive ? 'border-b-2 border-violet-300' : ''
								} flex items-center px-2 pb-2 text-lg text-violet-300 hover:text-blue-300 hover:border-blue-300`
							}>
							Home
						</NavLink>
					</li>
					<li className='flex'>
						<NavLink
							to='contact'
							className={({ isActive }) =>
								`${
									isActive ? 'border-b-2 border-violet-300' : ''
								} flex items-center px-2 pb-2 text-lg text-violet-300 hover:text-blue-300 hover:border-blue-300`
							}>
							Contact
						</NavLink>
					</li>
					<li className='flex'>
						<NavLink
							to='news'
							className={({ isActive }) =>
								`${
									isActive ? 'border-b-2 border-violet-300' : ''
								} flex items-center px-2 pb-2 text-lg text-violet-300 hover:text-blue-300 hover:border-blue-300`
							}>
							News
						</NavLink>
					</li>
				</ul>
				<>
					{localStorage.getItem(USER) ? (
						<div className='items-center flex gap-4'>
							<NavLink to='admin' className='w-[40px] h-[40px] rounded-full'>
								<img
									className='w-full h-full rounded-full '
									src={`https://ui-avatars.com/api/?name=${userInfo.hoTen}`}
									alt=''
								/>
							</NavLink>
							<h1
								onClick={() => {
									localStorage.removeItem(USER)
									localStorage.removeItem(ACCESS_TOKEN)
									dispatch({ type: SIGN_OUT })
								}}
								className='cursor-pointer text-violet-300 text-lg font-semibold'>
								Đăng Xuất
							</h1>
						</div>
					) : (
						<div className='items-center flex'>
							<NavLink
								to='/sign-in'
								className='hover:text-violet-300 px-6 py-2 font-semibold rounded text-violet-300'>
								Sign in
							</NavLink>
							<NavLink
								to='/sign-up'
								className='hover:text-black px-6 py-2 font-semibold rounded bg-violet-300 text-gray-900'>
								Sign up
							</NavLink>
						</div>
					)}
				</>
			</div>

			<div className='flex md:hidden justify-between items-center'>
				<NavLink to='/home' className='flex items-center gap-4'>
					<div className='w-[40px] h-[40px]'>
						<img className='w-full h-full' src='./NK-icon.png' alt='' />
					</div>
					<h2 className='text-violet-300 text-lg font-semibold'>My Movies</h2>
				</NavLink>
				<button
					onClick={() => {
						dispatch(actionOpenDrawer(<MobileHeader />))
					}}
					className='relative'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						className='w-6 h-6 text-gray-100'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h16M4 18h16'></path>
					</svg>
				</button>
			</div>
		</header>
	)
}

export default Header

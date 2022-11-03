import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const AdminTemplate = () => {
	const { userInfo } = useSelector((state) => state.userReducer)

	return (
		<div className='relative flex items-start min-h-screen'>
			<div className='absolute bg-slate-300 w-2/12 h-screen flex flex-col items-center py-4 px-2'>
				<div className='flex items-center gap-4 mb-10 cursor-pointer'>
					<div className='w-[50px] h-[50px] border-2 border-black rounded-full'>
						<img
							className='w-full h-full rounded-full'
							src={`https://ui-avatars.com/api/?name=${userInfo.hoTen}`}
							alt=''
						/>
					</div>
				</div>

				<div className='flex flex-col items-center gap-4'>
					<NavLink
						to='/admin/profile'
						className={({ isActive }) =>
							`${
								isActive ? 'font-semibold text-blue-500' : 'text-black'
							} hover:text-blue-500 flex items-center gap-4 hover:no-underline text-lg`
						}>
						<span>My Profile</span>
					</NavLink>

					<NavLink
						to='/admin/users'
						className={({ isActive }) =>
							`${
								isActive ? 'font-semibold text-blue-500' : 'text-black'
							} hover:text-blue-500 flex items-center gap-4 hover:no-underline text-lg`
						}>
						<span>Users</span>
					</NavLink>

					<NavLink
						to='/admin/films'
						className={({ isActive }) =>
							`${
								isActive ? 'font-semibold text-blue-500' : 'text-black'
							} hover:text-blue-500 flex items-center gap-4 hover:no-underline text-lg`
						}>
						<span>Films</span>
					</NavLink>

					<NavLink
						to='/home'
						className={({ isActive }) =>
							`${
								isActive ? '' : ''
							} font-semibold hover:text-black flex items-center gap-4 hover:no-underline text-lg`
						}>
						<span> {'<<'}Back to home</span>
					</NavLink>
				</div>
			</div>
			<div className='absolute overflow-y-auto right-0 h-screen w-10/12 p-4'>
				<Outlet />
			</div>
		</div>
	)
}

export default AdminTemplate

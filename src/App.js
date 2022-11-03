import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { DrawerBase, Loading, ModalBase, ProtectedRoute } from 'components'
import { ASSIGN_NAVIGATE } from 'redux/constants/navigateConst'
import { Contact, Detail, Home, News, NotFound } from 'pages'
import { CheckoutTemplate, HomeTemplate, UserTemplate } from 'templates'
import { USER } from 'utils/constants/user'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import Checkout from 'pages/Checkout'
import AdminTemplate from 'templates/AdminTemplate/AdminTemplate'
import Users from 'pages/Admin/Users/Users'
import Films from 'pages/Admin/Films'
import ShowTime from 'pages/Admin/ShowTime'
import NewFilms from 'pages/Admin/Films/NewFilms'
import EditFilm from 'pages/Admin/Films/EditFilm'
import Profile from 'pages/Profile'
import EditUser from 'pages/Admin/Users/EditUser'
import NewUser from 'pages/Admin/Users/NewUser'

const App = () => {
	const dispatch = useDispatch()
	const { isLoading } = useSelector((state) => state.loadingReducer)

	const navigate = useNavigate()

	useEffect(() => {
		dispatch({ type: ASSIGN_NAVIGATE, payload: navigate })
	}, [])

	const admin =
		localStorage.getItem(USER) &&
		JSON.parse(localStorage.getItem(USER)).maLoaiNguoiDung === 'QuanTri'

	return (
		<div id='App' className='w-full min-h-screen overflow-hidden'>
			<AnimatePresence>{isLoading && <Loading />}</AnimatePresence>
			<DrawerBase />
			<ModalBase />

			<Routes>
				<Route element={<HomeTemplate />}>
					<Route path='home' element={<Home />} />
					<Route path='detail/:id' element={<Detail />} />
					<Route path='contact' element={<Contact />} />
					<Route path='news' element={<News />} />
				</Route>
				<Route element={<UserTemplate />}>
					<Route path='sign-in' element={<SignIn />} />
					<Route path='sign-up' element={<SignUp />} />
				</Route>

				<Route
					element={
						<ProtectedRoute
							condition={localStorage.getItem(USER)}
							navigate='/sign-in'
						/>
					}>
					<Route element={<CheckoutTemplate />}>
						<Route path='checkout/:id' element={<Checkout />} />
					</Route>
					<Route path='/profile' element={<Profile />} />
				</Route>

				<Route element={<ProtectedRoute condition={admin} navigate='/profile' />}>
					<Route element={<AdminTemplate />}>
						<Route path='admin/users' element={<Users />} />
						<Route path='admin/users/edit-user/:taiKhoan' element={<EditUser />} />
						<Route path='admin/users/add-user' element={<NewUser />} />

						<Route path='admin/films' element={<Films />} />
						<Route path='admin/films/add-film' element={<NewFilms />} />
						<Route path='admin/films/edit-film/:id' element={<EditFilm />} />
						<Route path='admin/films/show-time/:id' element={<ShowTime />} />

						<Route path='admin/profile' element={<Profile />} />
						<Route path='admin' element={<Navigate to='/admin/profile' />} />
					</Route>
				</Route>
				<Route path='' element={<Navigate to='home' />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App

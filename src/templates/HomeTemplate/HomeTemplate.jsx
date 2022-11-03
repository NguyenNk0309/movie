import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Layout/Footer'
import Header from './Layout/Header'

const HomeTemplate = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	})

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default HomeTemplate

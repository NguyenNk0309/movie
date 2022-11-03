import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ condition, navigate }) => {
	return condition ? <Outlet /> : <Navigate to={navigate} />
}

export default ProtectedRoute

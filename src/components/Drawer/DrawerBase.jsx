import React from 'react'
import { Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { actionCloseDrawer } from 'redux/actions/standardActions/actionDrawer'

const DrawerBase = () => {
	const dispatch = useDispatch()
	const { isOpen, Content } = useSelector((state) => state.drawerReducer)

	function handleClose() {
		dispatch(actionCloseDrawer())
	}

	return (
		<>
			<Drawer width='40%' placement='right' onClose={handleClose} open={isOpen}>
				<Content />
			</Drawer>
		</>
	)
}

export default DrawerBase

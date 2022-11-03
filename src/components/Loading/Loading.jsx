import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className='z-[1000000] fixed top-0 left-0 bg-white w-screen h-screen flex items-center justify-center'>
			<img src='./Loading.gif' alt='' />
		</motion.div>
	)
}

export default Loading

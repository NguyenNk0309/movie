import { Carousel } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actionGetCarousel } from 'redux/actions/thunkActions/actionGetCarousel'

const CarouselBase = () => {
	const dispatch = useDispatch()
	const { carousel } = useSelector((state) => state.carouselReducer)

	useEffect(() => {
		dispatch(actionGetCarousel())
	}, [])

	return (
		<div className='w-full'>
			<Carousel autoplay>
				{carousel.map((item, index) => (
					<div key={index} className='w-full h-[600px]'>
						<img className='w-full h-full' src={item?.hinhAnh} alt='' />
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default CarouselBase

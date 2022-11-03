import React, { useRef } from 'react'

const IFrame = ({ src }) => {
	const iframeRef = useRef()

	return (
		<div className='w-full'>
			<iframe
				ref={iframeRef}
				className='w-full h-[500px]'
				src={`https://www.youtube.com/embed/nW948Va-l10`}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				title='Embedded youtube'
			/>
		</div>
	)
}

export default IFrame

import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actionDatGhe, actionLayDanhSachPhongVe } from 'redux/actions/thunkActions/actionTicket'
import 'assets/css/seats.css'

const Checkout = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { chiTietPhongVe, danhSachGheDangDat, mangGheKhachDat } = useSelector((state) => state.ticketReducer)

	useEffect(() => {
		dispatch(actionLayDanhSachPhongVe(id))
	}, [])

	const { danhSachGhe } = chiTietPhongVe

	function renderGhe() {
		return danhSachGhe?.map((ghe, index) => {
			let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : ''
			let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : ''
			let classGheDD = ''
			let indexGheDD = danhSachGheDangDat.findIndex((gheDD) => gheDD.maGhe === ghe.maGhe)
			if (indexGheDD !== -1) {
				classGheDD = 'gheDangDat'
			}
			let classGheKD = ''
			let indexGheKD = mangGheKhachDat.findIndex((gheKD) => gheKD.maGhe === ghe.maGhe)
			if (indexGheKD !== -1) {
				classGheKD = 'gheKhachDat'
			}
			return (
				<Fragment key={index}>
					<button
						onClick={() => {
							dispatch(actionDatGhe(ghe, id))
						}}
						key={index}
						disabled={ghe.daDat || classGheKD !== ''}
						className={`ghe ${classGheKD} ${classGheVip} ${classGheDD} ${classGheDaDat}`}>
						{ghe.daDat ? 'X' : ghe.stt}
					</button>
					{(index + 1) % 16 === 0 ? <br /> : null}
				</Fragment>
			)
		})
	}

	return (
		<div className='w-full h-full overflow-auto'>
			<div className='w-full py-2 mb-14 bg-slate-400 text-white text-xl font-semibold text-center'>Màn Hình</div>
			<div className='flex justify-center items-center'>
				<div>{renderGhe()}</div>
			</div>
		</div>
	)
}

export default Checkout

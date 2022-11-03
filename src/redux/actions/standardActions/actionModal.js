import { CLOSE_MODAL, OPEN_MODAL } from 'redux/constants/modalConst'

export function actionOpenModal(title, Component) {
	return {
		type: OPEN_MODAL,
		payload: { title, Component },
	}
}

export function actionCloseModal() {
	return {
		type: CLOSE_MODAL,
	}
}

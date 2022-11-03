import { CLOSE_DRAWER, OPEN_DRAWER } from 'redux/constants/drawerConst'

export function actionOpenDrawer(Component) {
	return {
		type: OPEN_DRAWER,
		payload: Component,
	}
}

export function actionCloseDrawer() {
	return {
		type: CLOSE_DRAWER,
	}
}

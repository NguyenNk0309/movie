import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

import loadingReducer from './reducers/loadingReducer'
import carouselReducer from './reducers/carouselReducer'
import drawerReducer from './reducers/drawerReducer'
import navigateReducer from './reducers/navigateReducer'
import moviesReducer from './reducers/moviesReducer'
import modalReducer from './reducers/modalReducer'
import theaterReducer from './reducers/theaterReducer'
import userReducer from './reducers/userReducer'
import ticketReducer from './reducers/ticketReducer'

const rootReducer = combineReducers({
	loadingReducer,
	drawerReducer,
	modalReducer,
	navigateReducer,
	carouselReducer,
	moviesReducer,
	theaterReducer,
	userReducer,
	ticketReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

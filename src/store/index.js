import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from 'react-app/store/combinedReducers'
import { connectRoutes } from 'redux-first-router'
import baseRoutes from 'react-app/routes/base'

export default function configureStore(initialState = {}) {
	let store
	const {
		reducer: routerReducer,
		middleware: routerMiddleware,
		enhancer: routerEnhancer,
		thunk: routerThunk,
		initialDispatch: routerInitialDispatch,
	} = connectRoutes(baseRoutes)

	const sagaMiddleWare = createSagaMiddleware()

	const middleware = [sagaMiddleWare, routerMiddleware]

	const enhancers = [routerEnhancer, applyMiddleware(...middleware)]

	const composeEnhancers =
		process.env.NODE_ENV !== 'production' &&
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			: compose

	store = createStore(
		createReducer({
			location: routerReducer,
		}),
		initialState,
		composeEnhancers(...enhancers)
	)
	store.routerThunk = routerThunk
	store.runSaga = sagaMiddleWare.run

	routerInitialDispatch()

	return { store }
}

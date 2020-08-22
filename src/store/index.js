import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from 'react-app/store/combinedReducers'
import getSagaInjectors from 'react-app/store/injectSagaHelper'

import { connectRoutes } from 'redux-first-router'
import baseRoutes from 'react-app/routes/base'
import AppSaga from 'react-app/modules/App/saga'

import { DAEMON } from './constants'

const noOpSagaInjectors = () => ({
	injectSaga: () => {},
	ejectSaga: () => {},
})

export default function configureStore(initialState = {}) {
	let store
	const {
		reducer: routerReducer,
		middleware: routerMiddleware,
		enhancer: routerEnhancer,
		thunk: routerThunk,
		initialDispatch: routerInitialDispatch,
	} = connectRoutes(baseRoutes, {
		extra: {
			getStore() {
				return store
			},
			getSagaInjectors() {
				if (!store) return noOpSagaInjectors()

				return getSagaInjectors(store)
			},
		},
	})

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
	store.injectedSagas = {
		app: { task: store.runSaga(AppSaga), mode: DAEMON },
	}

	routerInitialDispatch()

	return { store }
}

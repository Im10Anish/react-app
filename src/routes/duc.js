import Duck from 'extensible-duck'
import { NOT_FOUND } from 'redux-first-router'

const routePageInterceptor = action => {
	switch (action.type) {
		case NOT_FOUND:
			return 'Error'

		default:
			return false
	}
}

export const MainRouteDuc = new Duck({
	namespace: '@route',
	store: 'global',
	types: ['APP', 'APP$ACTION'],
	initialState: 'Error',
	reducer: (state, action, duck) => {
		const interceptedRoutes = routePageInterceptor(action)

		if (interceptedRoutes) return interceptedRoutes

		let matchFromType = ''

		action &&
			action.type.indexOf('@routes') > -1 &&
			duck.options.type.some(val => {
				const actionType = action.type.split('@route/global/')[1]

				if (actionType === val) {
					matchFromType = val.split('$')[0]

					return true
				}
				return false
			})
		return matchFromType || state
	},
	selectors: {
		page: state => state.page,
	},
	creators: duck => ({
		switchPage: (actionType, payload, query, customMeta) => ({
			type: actionType,
			payload,
			customMeta,
			...(query ? { meta: { query } } : {}),
		}),
	}),
})

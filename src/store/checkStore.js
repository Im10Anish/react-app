import conformsTo from 'lodash/conformsTo'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'

export default function checkstore(store) {
	const shape = {
		dispatch: isFunction,
		subscribe: isFunction,
		getState: isFunction,
		replaceReducer: isFunction,
		runSaga: isFunction,
		injectedReducers: isObject,
		injectedSagas: isObject,
	}
	conformsTo(store, shape)
}

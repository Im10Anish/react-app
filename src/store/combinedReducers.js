import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

import { AppDuc } from 'react-app/modules/App/duc'

export default function createReducer(injectedReducers) {
	return combineReducers({
		app: reduceReducers(AppDuc.reducer),
		...injectedReducers,
	})
}

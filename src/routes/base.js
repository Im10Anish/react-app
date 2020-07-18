import { MainRouteDuc } from './duc'
import AppThunk from './thunks/appThunk'

const appRegex = 'send|receive'

export default {
	[MainRouteDuc.types.APP]: {
		path: '/',
		thunk: AppThunk,
	},
	[MainRouteDuc.types.APP$ACTION]: {
		path: `/:action(${appRegex})`,
		thunk: AppThunk,
	},
}

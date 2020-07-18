import { MainRouteDuc } from './duc'
import AppThunk from './thunks/appThunk'

export default {
	[MainRouteDuc.types.APP]: {
		path: '/',
		thunk: AppThunk,
	},
}

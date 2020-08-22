import { AppDuc } from 'react-app/modules/App/duc'
import { MainRouteDuc } from 'react-app/routes/duc'
import { getIn } from 'timm'
import saga from 'react-app/modules/App/saga'

const mockData = {
	name: 'React',
}
export default async (dispatch, getState, { action, extra }) => {
	const { type } = action

	const currentLocationFromAction = getIn(action, [
		'meta',
		'location',
		'current',
	])
	extra.getSagaInjectors().injectSaga('app', { saga })
	const isMainComponent = MainRouteDuc.types.APP === type
	const isSubComponent = MainRouteDuc.types.APP$ACTION === type

	const state = getState()
	const locationState = currentLocationFromAction || state.location
	const { payload } = locationState

	let activeModule = ''
	if (isMainComponent) {
		activeModule = 'main'
	} else if (isSubComponent) {
		activeModule = payload.action
		if (payload.action === 'receive') {
			dispatch(AppDuc.creators.receiveData(mockData))
		}
	}
	dispatch(AppDuc.creators.setActiveModule(activeModule))
}

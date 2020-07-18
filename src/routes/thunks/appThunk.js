import { AppDuc } from 'react-app/modules/App/duc'

export default async (dispatch, { action }) => {
	const activeModule = 'app'
	dispatch(AppDuc.creators.setActiveModule(activeModule))
}

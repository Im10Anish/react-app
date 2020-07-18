import Duck from 'extensible-duck'
import { setIn, getIn } from 'timm'
const initialState = {
	activeModule: '',
}

export const AppDuc = new Duck({
	namespace: 'App',
	store: 'global',
	types: ['SET_ACTIVE_MODULE'],
	initialState,
	reducer: (state, action, duck) => {
		switch (action.type) {
			case duck.types.SET_ACTIVE_MODULE: {
				return setIn(state, ['activeModule'], action.module)
			}

			default:
				return state
		}
	},
	selectors: {
		activeModule: state =>
			getIn(state, ['partner', 'activeModule']) || 'Error',
	},
	creators: duck => ({
		setActiveModule: module => ({
			type: duck.types.SET_ACTIVE_MODULE,
			module,
		}),
	}),
})

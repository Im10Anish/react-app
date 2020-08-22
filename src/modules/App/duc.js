import Duck from 'extensible-duck'
import { setIn, getIn } from 'timm'
const initialState = {
	activeModule: '',
	data: {},
}

export const AppDuc = new Duck({
	namespace: 'App',
	store: 'global',
	types: ['SET_ACTIVE_MODULE', 'RECEIVE_DATA', 'SEND_DATA'],
	initialState,
	reducer: (state, action, duck) => {
		switch (action.type) {
			case duck.types.SET_ACTIVE_MODULE: {
				return setIn(state, ['activeModule'], action.module)
			}

			case duck.types.RECEIVE_DATA: {
				return setIn(state, ['data'], action.data)
			}

			default:
				return state
		}
	},
	selectors: {
		activeModule: state => getIn(state, ['app', 'activeModule']) || 'Error',
		fetchMockData: state => getIn(state, ['app', 'data']) || {},
	},
	creators: duck => ({
		setActiveModule: module => ({
			type: duck.types.SET_ACTIVE_MODULE,
			module,
		}),
		receiveData: data => ({
			type: duck.types.RECEIVE_DATA,
			data,
		}),
		sendData: data => ({
			type: duck.types.SEND_DATA,
			data,
		}),
	}),
})

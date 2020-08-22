import invariant from 'invariant'
import conformsTo from 'lodash/conformsTo'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import { getIn } from 'timm'
import checkStore from './checkStore'

import { RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT } from './constants'

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT]
const checkKey = key =>
	invariant(
		typeof key === 'string' && !!key,
		'(app/utils...) injectSaga: Expected `key` to be a non empty string'
	)

const checkDescriptor = descriptor => {
	const shape = {
		saga: isFunction,
		mode: mode => isString(mode) && allowedModes.includes(mode),
	}
	invariant(
		conformsTo(descriptor, shape),
		'(app/utils...) injectSaga: Expected a valid saga descriptor'
	)
}
export function injectSagaFactory(store, isValid) {
	return function injectSaga(key, descriptor = {}, args) {
		if (!isValid) checkStore(store)

		const newDescriptor = {
			...descriptor,
			mode: descriptor.mode || RESTART_ON_REMOUNT,
		}

		const { saga, mode } = newDescriptor
		checkKey(key)
		checkDescriptor(newDescriptor)
		let hasSaga = Reflect.has(store.injectedSagas, key)

		if (process.env.NODE_ENV !== 'production') {
			const oldDescriptor = store.injectedSagas[key]
			if (hasSaga && oldDescriptor.saga !== saga) {
				oldDescriptor.task.cancel()
				hasSaga = false
			}
		}

		if (
			!hasSaga ||
			(hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
		) {
			const task = getIn(store, ['injectedSagas', key, 'task'])
			const isSagaRunnig = task && task.isRunning()
			if (!isSagaRunnig) {
				store.injectedSagas[key] = {
					...newDescriptor,
					task: store.runSaga(saga, args),
				}
			}
		}
	}
}

export default function getInjectors(store) {
	checkStore(store)

	return {
		injectSaga: injectSagaFactory(store, true),
	}
}

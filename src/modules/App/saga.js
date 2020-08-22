import { all, takeLatest } from 'redux-saga/effects'
import LogHelper from 'react-app/utils/logger'
import { AppDuc } from './duc'

const logger = LogHelper('client: app')

function* sendData(action) {
	try {
		const { data } = action
		yield logger.log(data)
	} catch (err) {
		logger.log(err)
	}
}
export default function* AppSaga() {
	try {
		yield all([takeLatest(AppDuc.creators.sendData().type, sendData)])
	} catch (err) {
		logger.log(err)
	}
}

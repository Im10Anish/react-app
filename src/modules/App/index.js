import React from 'react'
import { useSelector } from 'react-redux'
import Error from 'react-app/modules/App/components/Error'
import SendData from 'react-app/modules/App/components/SendData'
import ReceiveData from 'react-app/modules/App/components/ReceiveData'
import HomePage from 'react-app/modules/App/components/HomePage'

import { AppDuc } from './duc'

const modulesMap = {
	main: HomePage,
	send: SendData,
	receive: ReceiveData,
}
const App = () => {
	const activeModule = useSelector(AppDuc.selectors.activeModule)
	console.log('+++activeModule+++', activeModule)
	const Component = modulesMap[activeModule] || Error
	return <Component />
}

export default App

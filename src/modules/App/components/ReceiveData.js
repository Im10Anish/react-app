import React from 'react'
import { useSelector } from 'react-redux'
import { AppDuc } from '../duc'

const ReceiveData = () => {
	const data = useSelector(AppDuc.selectors.fetchMockData)
	return <div>{`Hi ${data.name}`}</div>
}

export default ReceiveData

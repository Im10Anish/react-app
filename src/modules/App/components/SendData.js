import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDuc } from '../duc'

const SendData = () => {
	const [value, setValue] = useState('')
	const disptach = useDispatch()
	return (
		<div>
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button onClick={() => disptach(AppDuc.creators.sendData(value))}>
				Send
			</button>
		</div>
	)
}

export default SendData

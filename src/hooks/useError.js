import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useError = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [ErrorTitle, setErrorTitle] = useState('')
	const [ErrorBody, setErrorBody] = useState('')
	useEffect(() => {
		const locationState = location.state
		if (locationState !== null) {
			setErrorTitle(locationState.title || '')
			setErrorBody(locationState.body || '')
		} else {
			navigate('/')
		}
	}, [])
	return [ErrorTitle, ErrorBody]
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '@config/config'
const AuntifactionPageCallback = () => {
	const navigate = useNavigate()
	useEffect(() => {
		const authorizationCode = new URLSearchParams(window.location.search).get(
			'code'
		)

		const fetch = async authorizationCode => {
			axios.interceptors.response.use(
				response => response,
				error => {
					console.error('Axios Error:', error)
					return Promise.reject(error)
				}
			)
			console.log(config.serverUrl)
			const response = await axios.get(`${config.serverUrl}/api/data`, {
				params: {
					authorizationCode: authorizationCode,
					redirectUrl: `${config.clientUrl}/auntification`,
				},
			})
			navigate('/menu', {
				state: response.data,
			})
		}
		if (authorizationCode) {
			fetch(authorizationCode)
		} else {
			navigate('/error')
		}
	}, [navigate])
	return <div></div>
}

export default AuntifactionPageCallback

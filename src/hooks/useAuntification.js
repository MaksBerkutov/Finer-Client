import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserData } from '@util/Auntification.js'

export const useAuntification = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [ListServers, setListServers] = useState(undefined)
	const [User, setUser] = useState(undefined)
	const authenticateUser = userData => {
		localStorage.setItem('userData', JSON.stringify(userData))
	}
	
	useEffect(() => {
		const locationState = location.state
		const storedUserData = getUserData()
		if (locationState !== null && locationState?.User) {
			setListServers(locationState.Servers || [])
			setUser(locationState.User || undefined)
			authenticateUser({
				User: locationState.User,
				Servers: locationState.Servers,
			})
		} else if (storedUserData !== null) {
			setListServers(storedUserData.Servers)
			setUser(storedUserData.User)
		} else {
			navigate('/')
		}
	}, [])

	return [ListServers, User]
}

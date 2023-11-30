export const getUserData = () => {
	const storedUserData = localStorage.getItem('userData')
	if (storedUserData !== undefined)
		return storedUserData ? JSON.parse(storedUserData) : null
}
export const isUserAuthenticated = () => {
	return getUserData()?.User !== undefined
}
export const saveIdServer = id => {
	localStorage.setItem('idfiner', JSON.stringify({ id: id }))
}
export const getIdServer = () => {
	return JSON.parse(localStorage.getItem('idfiner'))?.id
}
export const unAuntification = () => {
	localStorage.removeItem('userData')
	localStorage.removeItem('idfiner')
}

export const getUserData = () => {
	const storedUserData = localStorage.getItem('userData')
	if (storedUserData !== undefined)
		return storedUserData ? JSON.parse(storedUserData) : null
}
export const isUserAuthenticated = () => {
	return getUserData()?.User !== undefined
}
export const unAuntification = () => {
	localStorage.removeItem('userData')
}

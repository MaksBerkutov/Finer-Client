import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const usePlaylist = (socket, idServer, idUser, setLoading) => {
	const [playedStatus, setStatus] = useState(true)
	const [playlist, setPlaylist] = useState([])
	const [currentPlayed, setCurrentPlayed] = useState(-1)
	const navigate = useNavigate()
	useEffect(() => {
		setLoading(true)
		socket?.connect()
		console.log('Mount')
		const fetchData = async () => {
			try {
				if (idServer === -1) {
					navigate('/error', {
						state: {
							title: 'Ошибка',
							body: 'Вы скорее не выбрали сервер по которому хотите получить информацию пожалуйста выберите интересующий вас сервер.',
						},
					})
				}

				console.log('connectMe', socket)

				socket?.emit(
					'connectMe',
					{ idServer: idServer, idUser: idUser },
					callback => {
						console.log(callback)
						if (callback) {
							socket?.emit('getAllInfo', { id: idServer })
						} else
							navigate('/error', {
								state: {
									title: 'Ошибка',
									body: 'Вы уже подключенны.',
								},
							})
					}
				)
				socket?.on('updatePlayed', status => {
					setStatus(status)
				})
				socket?.on('remove', ({ deleteId }) => {
					if (deleteId === -1) return
					const remove = songs => {
						const updatedSongs = [...songs]

						if (deleteId !== -1) {
							updatedSongs.splice(deleteId, 1)
						}

						return updatedSongs
					}
					setPlaylist(prevInfo => remove(prevInfo))
					setLoading(false)
				})
				socket?.on('newCurrentPlayed', ({ newId }) => {
					setCurrentPlayed(newId)
					setLoading(false)
				})
				socket?.on('add', ({ song }) => {
					setPlaylist(prevInfo => [...prevInfo, song])
					setLoading(false)
				})

				socket?.on('updatePlaylist', ({ song }) => {
					if (song === undefined) return

					setPlaylist(song)
					socket?.emit('getCurrentStatus', { id: idServer }, callback => {
						setStatus(callback)
					})
					socket?.emit('getCurrentPlayed', { id: idServer }, callback => {
						setCurrentPlayed(callback)
						setLoading(false)
					})
				})
			} catch (error) {
				console.log('Error fetching data:', error)
			}
		}

		fetchData()

		return () => {
			console.log('unMount')

			socket?.off('updatePlaylist')
			socket?.off('updatePlayed')
			socket?.off('remove')
			socket?.off('newCurrentPlayed')
			socket?.off('add')
			socket?.disconnect()
		}
	}, [])
	return [playedStatus, playlist, currentPlayed]
}

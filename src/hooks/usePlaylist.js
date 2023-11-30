import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const usePlaylist = (socket, idServer, idUser, setLoading) => {
	const [playedStatus, setStatus] = useState(true)
	const [playlist, setPlaylist] = useState([])
	const [currentPlayed, setCurrentPlayed] = useState(-1)
	const navigate = useNavigate()
	useEffect(() => {
		setLoading(true)
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
				socket?.connect()

				socket.emit(
					'connectMe',
					{ idServer: idServer, idUser: idUser },
					callback => {
						if (true) socket?.emit('getAllInfo', { id: idServer })
					}
				)

				socket?.on('updatePlayed', status => {
					setStatus(status)
				})

				socket?.on('updatePlaylist', ({ action, song }) => {
					if (song === undefined) return

					if (action === 'allItems') {
						socket?.emit('getCurrentStatus', { id: idServer }, callback => {
							setStatus(callback)
						})
						setPlaylist(song)

						socket?.emit('getCurrentPlayed', { id: idServer }, callback => {
							setCurrentPlayed(callback)
						})
					} else if (action === 'newCurrentPlayed') {
						setCurrentPlayed(song)
					} else if (action === 'add') {
						setPlaylist(prevInfo => [...prevInfo, song])
						setLoading(false)
					} else if (action === 'remove') {
						const remove = songs => {
							const updatedSongs = [...songs]

							if (song !== -1) {
								updatedSongs.splice(song, 1)
							}

							return updatedSongs
						}
						setPlaylist(prevInfo => remove(prevInfo))
						setLoading(false)
					}
				})
			} catch (error) {
				console.log('Error fetching data:', error)
			}
		}

		fetchData()
		setLoading(false)
		return () => {
			socket?.off('updatePlaylist')
			socket?.off('updatePlayed')
			socket?.disconnect()
		}
	}, [])
	return [playedStatus, playlist, currentPlayed]
}

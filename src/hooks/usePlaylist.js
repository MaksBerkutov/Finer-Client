import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const usePlaylist = (socket, idServer, idUser) => {
	const [playedStatus, setStatus] = useState(true)
	const [plalistInfo, setPlalistInfo] = useState({
		songs: [],
		currentPlayed: -1,
	})
	const navigate = useNavigate()
	useEffect(() => {
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

				socket.emit(
					'connectMe',
					{ idServer: idServer, idUser: idUser },
					callback => {}
				)

				socket?.on('updatePlayed', status => {
					setStatus(status)
				})

				socket?.emit('getAllInfo', { id: idServer })
				socket?.on('updatePlaylist', ({ action, song }) => {
					if (song === undefined) return

					if (action === 'allItems') {
						socket?.emit('getCurrentStatus', { id: idServer }, callback => {
							setStatus(callback)
						})
						setPlalistInfo(prevInfo => ({
							...prevInfo,
							songs: song,
						}))
						console.log('set new playlist', song)

						socket?.emit('getCurrentPlayed', { id: idServer }, callback => {
							setPlalistInfo(prevInfo => ({
								...prevInfo,
								currentPlayed: callback,
							}))
						})
					} else if (action === 'newCurrentPlayed') {
						setPlalistInfo(prevInfo => ({
							...prevInfo,
							currentPlayed: song,
						}))
					} else if (action === 'add') {
						setPlalistInfo(prevInfo => ({
							...prevInfo,
							songs: [...prevInfo.songs, song],
						}))
					} else if (action === 'remove') {
						const remove = songs => {
							const updatedSongs = [...songs]

							if (song !== -1) {
								updatedSongs.splice(song, 1)
							}

							return updatedSongs
						}
						setPlalistInfo(prevInfo => ({
							...prevInfo,
							songs: remove(prevInfo.songs),
						}))
					}
				})
			} catch (error) {
				console.log('Error fetching data:', error)
			}
		}

		fetchData()
		return () => {
			socket?.off('updatePlaylist')
			socket?.off('updatePlayed')
			socket?.close()
		}
	}, [])
	return [playedStatus, plalistInfo]
}

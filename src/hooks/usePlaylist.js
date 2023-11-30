import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MusicServerAPI from '../API/MusicServerAPI'

export const usePlaylist = (socket, idServer, idUser, setLoading) => {
	const [playedStatus, setStatus] = useState(true)
	const [playlist, setPlaylist] = useState([])
	const [currentPlayed, setCurrentPlayed] = useState(-1)
	const navigate = useNavigate()
	const removeItem = item => {
		const remove = songs => {
			const updatedSongs = [...songs]

			if (item !== -1) {
				updatedSongs.splice(item, 1)
			}

			return updatedSongs
		}
		setPlaylist(prevInfo => remove(prevInfo))
	}

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

				const status = await MusicServerAPI.GetCurrentStatus(idServer)
				status !== null && setStatus(status)

				const all_playlist = await MusicServerAPI.GetAllSong(idServer)
				console.log(all_playlist)
				all_playlist !== null && setPlaylist(all_playlist)

				const current_played = await MusicServerAPI.GetCurrentPlayed(idServer)
				all_playlist !== null && setCurrentPlayed(current_played)

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
				socket?.on('newCurrentPlayed', ({ playedId }) => {
					setCurrentPlayed(playedId)
				})
				socket?.on('add', ({ item }) => {
					setPlaylist(prevInfo => [...prevInfo, item])
				})
				socket?.on('remove', ({ song }) => {
					removeItem(song)
				})
			} catch (error) {
				console.log('Error fetching data:', error)
			}
		}

		fetchData()
		setLoading(false)
		return () => {
			socket?.off('newCurrentPlayed')
			socket?.off('updatePlayed')
			socket?.off('add')
			socket?.off('remove')
			socket?.disconnect()
		}
	}, [])

	const play = async item => {
		setLoading(true)
		await MusicServerAPI.SetPlayItem(idServer, item)
		setLoading(false)
	}
	const next = async () => {
		setLoading(true)
		await MusicServerAPI.GoNextSong(idServer)
		setLoading(false)
	}
	const changePlayeStatus = async () => {
		setLoading(true)
		const resultStatus = await MusicServerAPI.ChangeMusicStatus(
			idServer,
			!playedStatus
		)
		console.log(playedStatus)
		resultStatus !== null && setStatus(resultStatus)
		console.log(resultStatus)
		setLoading(false)
	}
	const prev = async () => {
		setLoading(true)
		await MusicServerAPI.GoPrevSong(idServer)
		setLoading(false)
	}
	const remove = async item => {
		setLoading(true)
		const resultId = await MusicServerAPI.DeletePlayedItem(idServer, item)

		resultId !== null && removeItem(resultId)
		setLoading(false)
	}
	return [
		playedStatus,
		playlist,
		currentPlayed,
		play,
		remove,
		next,
		prev,
		changePlayeStatus,
	]
}

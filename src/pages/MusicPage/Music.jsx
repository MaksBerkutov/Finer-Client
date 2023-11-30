import classes from './Music.module.css'
import React, { useState } from 'react'
import PlayedList from './PlayedList/PlayedList'
import { Routes, useLocation } from 'react-router-dom'

import MusicPlayer from './MusicPlayer/MusicPlayer'
import io from 'socket.io-client'
import { usePlaylist } from '@hook/usePlaylist'
import config from '@config/config'
import Loader from '@component/Loader/Loader'

const socket = io(config.serverSocketUrl)
function Music() {
	const location = useLocation()
	const [loading, setLoading] = useState(true)

	const idServer = location.state.idServer || undefined
	const idUser = location.state.idUser || undefined
	const [playedStatus, playlist, currentPlayed] = usePlaylist(
		socket,
		idServer,
		idUser,
		setLoading
	)

	const play = item => {
		setLoading(true)
		socket?.emit('setPlayItem', { id: idServer, item: item })
	}
	const remove = item => {
		setLoading(true)
		socket?.emit('deltetePlayItem', { id: idServer, item: item })
	}
	const handlerImport = obj => {
		socket?.emit('importedPlaylist', { id: idServer, obj: obj })
	}
	const finded = playlist.find(x => x.id === currentPlayed)
	const text = finded === undefined ? '' : finded.title

	return (
		<div className={classes.container}>
			<div className={classes.info}>
				{text === '' ? (
					<h1>Не чего не играет =)</h1>
				) : (
					<div>
						<h1>{text}</h1>
						<p>Песню установил: {finded.сustomer}</p>
						<p>Сылка на песню: {finded.url}</p>
					</div>
				)}
				<MusicPlayer
					playedStatus={playedStatus}
					id={idServer}
					text={text}
					socket={socket}
				/>
			</div>
			{playlist.length === 0 ? (
				<h1>Нет аудио для проигрыванния</h1>
			) : (
				<PlayedList
					remove={remove}
					play={play}
					onImport={handlerImport}
					currentPlayed={currentPlayed}
					items={playlist}
				/>
			)}
			<Loader isLoading={loading} />
		</div>
	)
}

export default Music

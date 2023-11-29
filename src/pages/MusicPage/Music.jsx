import classes from './Music.module.css'
import React from 'react'
import PlayedList from './PlayedList/PlayedList'
import { Routes, useLocation } from 'react-router-dom'

import MusicPlayer from './MusicPlayer/MusicPlayer'
import io from 'socket.io-client'
import { usePlaylist } from '@hook/usePlaylist'
import config from '@config/config'
const socket = io(config.serverSocketUrl)
function Music() {
	const location = useLocation()

	const idServer = location.state.idServer || undefined
	const idUser = location.state.idUser || undefined
	const [playedStatus, plalistInfo] = usePlaylist(socket, idServer, idUser)

	const play = item => {
		console.log(item)
		socket?.emit('setPlayItem', { id: idServer, item: item })
	}
	const remove = item => {
		socket?.emit('deltetePlayItem', { id: idServer, item: item })
	}
	const handlerImport = obj => {
		socket?.emit('importedPlaylist', { id: idServer, obj: obj })
	}
	const finded = plalistInfo.songs.find(x => x.id === plalistInfo.currentPlayed)
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
			{plalistInfo.songs.length === 0 ? (
				<h1>Нет аудио для проигрыванния</h1>
			) : (
				<PlayedList
					remove={remove}
					play={play}
					onImport={handlerImport}
					currentPlayed={plalistInfo.currentPlayed}
					items={plalistInfo.songs}
				/>
			)}
		</div>
	)
}

export default Music

import React from 'react'
import classes from './MusicPlayer.module.css'

const MusicPlayer = ({ socket, text, id, playedStatus }) => {

	const changePlayedStatuc = () => {
		socket.emit('changeMusicStatus', { id: id, newStatus: !playedStatus })
	}
	const goNextSongs = () => {
		socket.emit('goNextSongs', id)
	}
	const goPrevSongs = () => {
		socket.emit('goPrevSongs', id)
	}

	return (
		<div className={classes.player}>
			{text === '' ? (
				<p></p>
			) : (
				<div className={classes.songTitle}>Now Playing: {text}</div>
			)}

			<div className={classes.controls}>
				<button onClick={() => goPrevSongs()}>Previous</button>
				<button onClick={() => changePlayedStatuc()}>
					{playedStatus ? 'Pause' : 'Resume'}
				</button>
				<button onClick={() => goNextSongs()}>Next</button>
			</div>
		</div>
	)
}

export default MusicPlayer

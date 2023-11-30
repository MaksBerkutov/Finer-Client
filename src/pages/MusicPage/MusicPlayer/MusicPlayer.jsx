import React from 'react'
import classes from './MusicPlayer.module.css'

const MusicPlayer = ({
	text,
	id,
	playedStatus,
	next,
	prev,
	changePlayeStatus,
}) => {
	return (
		<div className={classes.player}>
			{text === '' ? (
				<p></p>
			) : (
				<div className={classes.songTitle}>Now Playing: {text}</div>
			)}

			<div className={classes.controls}>
				<button onClick={() => prev()}>Previous</button>
				<button onClick={() => changePlayeStatus()}>
					{playedStatus ? 'Pause' : 'Resume'}
				</button>
				<button onClick={() => next()}>Next</button>
			</div>
		</div>
	)
}

export default MusicPlayer

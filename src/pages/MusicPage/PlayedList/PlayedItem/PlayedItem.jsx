import React from 'react'
import classes from './PlaylistItem.module.css'
import YouTube from '@image/YouTube.svg'
import SoundCloud from '@image/SoundCloud.svg'
import Spotify from '@image/Spotify.png'
const PlayedItem = ({ remove, play, currentPlayed, playlistItem, index }) => {
	const logos = {
		YouTube: YouTube,
		SoundCloud: SoundCloud,
		Spotify: Spotify,
	}
	const logo = logos[playlistItem.provider]
	return (
		<div className={classes.container}>
			<div className={classes.items}>
				<li
					className={
						currentPlayed === index
							? classes.playListItemActive
							: classes.playListItem
					}
				>
					<>
						<div className='d-flex flex-colum'>
							<img src={logo} alt='Provider Logo' />
							<h1 className={classes.UrlLink}>{playlistItem.title}</h1>
						</div>
						<p className={classes.UrlLink}>{playlistItem.url}</p>
						<>
							<button onClick={() => remove(playlistItem.id)}>Delete</button>
							<button onClick={() => play(playlistItem.id)}>Play</button>
						</>
					</>
				</li>
			</div>

			<div
				className={classes.backgoundMain}
				style={{
					backgroundImage: `url(${logo})`,
				}}
			/>
		</div>
	)
}

export default PlayedItem

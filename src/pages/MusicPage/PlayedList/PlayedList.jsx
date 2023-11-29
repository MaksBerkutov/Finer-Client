import React from 'react'
import classes from './PlayeList.module.css'
import PlayedItem from './PlayedItem/PlayedItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PlayedList = ({ currentPlayed, items, remove, play, onImport }) => {
	const exportPlaylist = () => {
		const jsonData = JSON.stringify(items)

		const blob = new Blob([jsonData], { type: 'application/json' })
		const url = URL.createObjectURL(blob)

		const a = document.createElement('a')
		a.href = url
		a.download = 'Playlist.json'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}
	const handleFileChange = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()

			reader.onload = event => {
				try {
					const fileContent = event.target.result
					const parsedData = JSON.parse(fileContent)
					onImport(parsedData)
				} catch (error) {
					console.error('Error parsing JSON:', error)
				}
			}

			reader.readAsText(file)
		}
	}
	console.log(items)
	return (
		<div className={classes.playlistContainer}>
			<ul className={classes.playlist}>
				<TransitionGroup>
					{items.map(item => (
						<CSSTransition key={item.id} timeout={500} classNames='post'>
							<PlayedItem
								index={item.id}
								playlistItem={item}
								currentPlayed={currentPlayed}
								remove={remove}
								play={play}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</ul>
			<div>
				<button onClick={() => exportPlaylist()}>Export Playlist</button>
				<button onClick={() => document.getElementById('fileInput').click()}>
					Import Playlist
				</button>
				<input
					id='fileInput'
					type='file'
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
			</div>
		</div>
	)
}

export default PlayedList

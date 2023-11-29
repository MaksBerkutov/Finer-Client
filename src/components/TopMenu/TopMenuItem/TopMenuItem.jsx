import React from 'react'
import { Link } from 'react-router-dom'

const TopMenuItem = ({ item }) => {
	const { to, state, callback, text } = item

	return (
		<li className='nav-item'>
			<Link
				className='nav-link'
				to={to !== undefined ? to : null}
				state={state !== undefined ? state : null}
				onClick={callback !== undefined ? callback : null}
			>
				{text}
			</Link>
		</li>
	)
}

export default TopMenuItem

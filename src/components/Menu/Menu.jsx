import { useEffect, useState } from 'react'

import { Nav } from 'react-bootstrap'
import MenuItem from './MenuItem/MenuItem'
import { getIdServer, saveIdServer } from '@util/Auntification.js'

const Menu = ({ items, onItemClick }) => {
	const [selectedItem, setSelectedItem] = useState(null)

	const handleItemClick = item => {
		if (item === selectedItem) item = null
		setSelectedItem(item)
		onItemClick(item)
		saveIdServer(item)
	}

	useEffect(() => {
		const savedItem = getIdServer()
		savedItem !== undefined && handleItemClick(savedItem)
	}, [])
	return (
		<Nav
			className='justify-content-center  '
			style={{
				backgroundColor: '#23272A',
				padding: '3px',
			}}
		>
			{items.map(item => (
				<MenuItem
					key={item.id}
					item={item}
					onClick={() => handleItemClick(item)}
					isSelected={selectedItem && selectedItem.id === item.id}
				/>
			))}
		</Nav>
	)
}

export default Menu

import { useState } from 'react'

import { Nav } from 'react-bootstrap'
import MenuItem from './MenuItem/MenuItem'

const Menu = ({ items, onItemClick }) => {
	const [selectedItem, setSelectedItem] = useState(null)

	const handleItemClick = item => {
		setSelectedItem(item)
		onItemClick(item)
	}

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

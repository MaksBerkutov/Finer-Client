import React from 'react'
import { Nav } from 'react-bootstrap'

const MenuItem = ({ item, onClick, isSelected }) => {
	return (
		<Nav.Item>
			<Nav.Link
				onClick={onClick}
				active={isSelected}
				style={{
					cursor: 'pointer',
					backgroundColor: isSelected ? '#7289DA' : 'transparent',
					color: '#fff',
					borderRadius:'15px',
					marginRight:'2px'
				}}
			>
				{item.name}
			</Nav.Link>
		</Nav.Item>
	)
}

export default MenuItem

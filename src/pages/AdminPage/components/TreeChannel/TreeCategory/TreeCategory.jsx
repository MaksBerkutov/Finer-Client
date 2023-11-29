import React from 'react'
import TreeItem from '../TreeItem/TreeItem'

const TreeCategory = ({ category, id, callback, className, classNameItem }) => {
	return (
		<li className={`list-group-item ${className}`}>
			<h1>{category.name}</h1>
			<ul className='list-group'>
				{category.channels.map(element => (
					<TreeItem
						item={element}
						SubmitTextCallback={callback}
						className={classNameItem}
					/>
				))}
			</ul>
		</li>
	)
}

export default TreeCategory

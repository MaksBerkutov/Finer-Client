import React from 'react'
import TreeCategory from './TreeCategory/TreeCategory'
import TreeItem from './TreeItem/TreeItem'
import classes from './TreeChannel.module.css'


const TreeChannel = ({ nodeChats, id, callback }) => {
	if (nodeChats === null) return <div></div>
	const mapArray = Array.from(nodeChats.categorys)
	return (
		<ul className='list-group'>
			{mapArray.map(([key, value]) => (
				<TreeCategory
					category={value}
					id={key}
					callback={callback}
					className={classes.category}
					classNameItem={classes.categoryItem}
				/>
			))}

			{nodeChats.otherChats.map(element => (
				<TreeItem
					item={element}
					SubmitTextCallback={callback}
					className={classes.list}
				/>
			))}
		</ul>
	)
}

export default TreeChannel

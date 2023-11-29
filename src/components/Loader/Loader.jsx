import React from 'react'
import classes from './Loader.module.css'

const Loader = ({ isLoading }) => {
	return (
		<>
			{isLoading && (
				<div className={classes.loaderOverlay}>
					<div className={classes.loaderSpinner}></div>
				</div>
			)}
		</>
	)
}

export default Loader

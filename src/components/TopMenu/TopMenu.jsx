import React from 'react'
import classes from './TopMenu.module.css'
import TopMenuItem from './TopMenuItem/TopMenuItem'

const TopMenu = ({
	LogoItem,
	NavigationItemCenter,
	RightItemMenu,
	LastItemMenu,
}) => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container '>
				{LogoItem !== undefined && <>{LogoItem}</>}

				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						{NavigationItemCenter?.map(Element => (
							<TopMenuItem item={Element} />
						))}
					</ul>
					<div className={classes.rightMenu}>
						<div className='d-flex flex-row justify-content-center align-items-center'>
							<ul className='navbar-nav'>
								{RightItemMenu?.map(Element => (
									<TopMenuItem item={Element} />
								))}
							</ul>

							<div className={classes.avatarContainer}>
								{LastItemMenu !== undefined && <>{LastItemMenu}</>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default TopMenu

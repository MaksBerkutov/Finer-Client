import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import classes from './TopMenu.module.css'
import TopMenuItem from './TopMenuItem/TopMenuItem'

const TopMenu = ({
	LogoItem,
	NavigationItemCenter,
	RightItemMenu,
	LastItemMenu,
}) => {
	return (
		<Navbar expand='lg' variant='dark' bg='dark'>
			<div className='container'>
				{LogoItem !== undefined && <>{LogoItem}</>}

				<Navbar.Toggle aria-controls='navbarNav' />

				<Navbar.Collapse id='navbarNav'>
					<Nav className='mr-auto'>
						{NavigationItemCenter?.map((Element, index) => (
							<TopMenuItem key={index} item={Element} />
						))}
					</Nav>

					<div className={classes.rightMenu}>
						<div className='d-flex flex-row justify-content-center align-items-center'>
							<Nav>
								{RightItemMenu?.map((Element, index) => (
									<TopMenuItem key={index} item={Element} />
								))}
							</Nav>

							<div className={classes.avatarContainer}>
								{LastItemMenu !== undefined && <>{LastItemMenu}</>}
							</div>
						</div>
					</div>
				</Navbar.Collapse>
			</div>
		</Navbar>
	)
}

export default TopMenu

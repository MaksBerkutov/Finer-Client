import { useState } from 'react'
import { useNavigate, Outlet, Link } from 'react-router-dom'
import classes from './MainPage.module.css'
import TopMenu from '@component/TopMenu/TopMenu'
import logo from '@image/logo.png'
import Menu from '@component/Menu/Menu'
import { useAuntification } from '@hook/useAuntification'
import MenuCenter from './ItemMenuCenter.js'
import { unAuntification } from '@util/Auntification.js'

const MainPage = () => {
	const [selectedId, setId] = useState(-1)
	const navigate = useNavigate()
	const [ListServers, User] = useAuntification()

	const handleItemClick = selectedItem => {
		setId(selectedItem.id)
	}

	const ItemMenuCenter = MenuCenter(ListServers, User, selectedId)
	const LogoItem = (
		<Link className='navbar-brand' to='/'>
			<img src={logo} className={classes.logo} alt='site logo'></img>
			Finer
		</Link>
	)
	const ItemMenuLastItem = [
		{
			text: 'Logout',
			to: '/',
			callback: e => {
				e.preventDefault()
				unAuntification()
				navigate('/')
			},
		},
	]
	const PATH_TO_IMG = `https://cdn.discordapp.com/avatars/${User?.id}/${User?.avatar}.png`
	const LastItemMenu = (
		<Link
			className='nav-link'
			state={{ User: User, Servers: ListServers }}
			to='/menu/me'
		>
			<img src={PATH_TO_IMG} alt='user avatar' className={classes.avatar} />
		</Link>
	)
	return (
		<div className={classes.container}>
			{User !== undefined && (
				<>
					<TopMenu
						NavigationItemCenter={ItemMenuCenter}
						LogoItem={LogoItem}
						RightItemMenu={ItemMenuLastItem}
						LastItemMenu={LastItemMenu}
					/>
					<Menu
						items={ListServers.filter(server => server.botMember)}
						onItemClick={handleItemClick}
					/>
				</>
			)}
			<Outlet />
		</div>
	)
}

export default MainPage

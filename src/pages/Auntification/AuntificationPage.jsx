import React, { useEffect } from 'react'
import classes from './AuntifactionPage.module.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import logo from '@image/Discord-Logo.svg'
import { isUserAuthenticated } from '@util/Auntification.js'
import config from '@config/config'

const AuntificationPage = () => {
	const navigate = useNavigate()

	const handlerlogin = () => {
		const clientId = config.discord_client_id
		const redirect = `${config.clientUrl}/auntification`
		window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=identify%20guilds`
	}
	useEffect(() => {
		if (isUserAuthenticated()) navigate('/menu')
	}, [])
	return (
		<div className={classes.containerMain}>
			<div>
				<div className='text-center mb-5'>
					<img src={logo} alt='App logo' />
					<h2 style={{ color: '#7289da' }}>Добро пожаловать!</h2>
					<p style={{ color: '#99aab5' }}>Авторизуйтесь, чтобы продолжить.</p>
				</div>
				<Button
					variant='primary'
					size='lg'
					block
					style={{ backgroundColor: '#7289da', borderColor: '#7289da' }}
					onClick={handlerlogin}
				>
					Войти через Discord
				</Button>
			</div>
		</div>
	)
}

export default AuntificationPage

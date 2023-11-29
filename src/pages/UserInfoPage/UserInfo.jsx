import React from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CardServers from './CardServers'
import classes from './UserInfo.module.css'

const UserInfo = () => {
	const location = useLocation()
	const user = location.state.User || {}
	const servers = location.state.Servers || {}
	console.log(servers)
	//
	return (
		<Container className='mt-4 text-light'>
			<Row className='justify-content-center'>
				<Col md={6}>
					<Card className={classes.userItem}>
						<Card.Img
							variant='top'
							src={
								user?.avatar !== null
									? ` https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`
									: `https://via.placeholder.com/150/${
											user.accent_color || '7289DA'
									  }/FFFFFF?text=Avatar`
							}
						/>
						<Card.Body>
							<Card.Title>{user.username}</Card.Title>
							<Card.Text>
								<strong>ID:</strong> {user.id}
							</Card.Text>
							<Card.Text>
								<strong>Discriminator:</strong> {user.discriminator}
							</Card.Text>
							<Card.Text>
								<strong>Locale:</strong> {user.locale}
							</Card.Text>
							{/* Добавьте другие свойства пользователя по необходимости */}
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col md={12}>
					<h4>Сервера</h4>
					<div className='d-flex flex-wrap justify-content-between'>
						{servers.map(server => (
							<CardServers className={classes.item} server={server} />
						))}
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default UserInfo

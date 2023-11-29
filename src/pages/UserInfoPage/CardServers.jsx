import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { unAuntification } from '@util/Auntification'

const CardServers = ({ server, className }) => {
	const handlerAddBots = e => {
		unAuntification()
		const clientId = '1174699836294053968'
		window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot&guild_id=${server.id}`
	}
	return (
		<Card key={server.id} className={`mb-3  ${className}`}>
			<Card.Img
				variant='top'
				src={
					server?.icon !== null
						? ` https://cdn.discordapp.com/icons/${server?.id}/${server?.icon}.png`
						: `https://via.placeholder.com/150/${
								server.icon || 'CCCCCC'
						  }/FFFFFF?text=Server`
				}
			/>
			<Card.Body>
				<Card.Title>{server.name}</Card.Title>

				<Card.Text>{server.owner && <strong>Owner</strong>}</Card.Text>
				<Card.Text>{server.admin && <strong>Admin</strong>}</Card.Text>
				{server.botMember ? (
					<Card.Text>
						<strong>Бот добавлен</strong>
					</Card.Text>
				) : server.admin ? (
					<button
						onClick={handlerAddBots}
						variant='primary'
						className='mx-auto d-block'
					>
						Добавить бота
					</button>
				) : (
					<Card.Text>
						<strong>Бот не добавлен</strong>
					</Card.Text>
				)}
				{/* Добавьте другие свойства сервера по необходимости */}
			</Card.Body>
		</Card>
	)
}

export default CardServers

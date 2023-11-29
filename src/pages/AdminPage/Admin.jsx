import { useEffect, useState } from 'react'
import TreeChannel from './components/TreeChannel/TreeChannel'
import { Routes, useNavigate, useLocation } from 'react-router-dom'
import classes from './Admin.module.css'
import io from 'socket.io-client'
import config from '@config/config'
const socket = io(config.serverSocketUrl)

const Admin = () => {
	const [AllChats, setAllChats] = useState(null)
	const location = useLocation({})
	const idServer = location.state.idServer || undefined
	const idUser = location.state.idUser || undefined
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (idServer === -1) {
					navigate('/error', {
						state: {
							title: 'Ошибка',
							body: 'Вы скорее не выбрали сервер по которому хотите получить информацию пожалуйста выберите интересующий вас сервер.',
						},
					})
				}
				socket?.connect()
				socket?.emit(
					'connectMe',
					{ idServer: idServer, idUser: idUser },
					callback => {
						console.log(callback)
					}
				)
				socket?.emit('GetAllChannelFromServer', { id: idServer }, results => {
					console.log('RESULT', results)
					if (results !== null)
						results.categorys = new Map(JSON.parse(results.categorys))
					setAllChats(results)
				})
			} catch (error) {
				console.log('Error fetching data:', error)
			}
		}

		fetchData()
		return () => {
			socket?.off('connectMe')
			socket?.off('GetAllChannelFromServer')
			socket?.off('sendToChat')
			socket?.disconnect()
		}
	}, [])

	const SubmitItemHandler = ({ name, type, id, item }) => {
		console.log(socket)
		console.log(type, '\n', id, '\n', item)
		if (type === 'text') socket.emit('sendToChat', { id: id, text: item })
	}

	return (
		<div className={classes.container}>
			<TreeChannel nodeChats={AllChats} callback={SubmitItemHandler} />
		</div>
	)
}

export default Admin

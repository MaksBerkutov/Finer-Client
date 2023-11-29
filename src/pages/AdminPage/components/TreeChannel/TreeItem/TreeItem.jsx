import SendChatForm from '@component/Form/SendChatForm'
import ModalWindows from '@component/UI/ModalMindow/ModalWindow'
import { useState } from 'react'

const TreeItem = ({ item, SubmitTextCallback, className}) => {
	const [visibleModal, setVisibleModal] = useState(false)

	let icon = ''
	switch (item.type) {
		case 'text':
			icon = '📝'
			break
		case 'voice':
			icon = '🔈'
			break
		default:
			icon = '🛑'
			break
	}
	const ClickCallback = () => {
		if (item.type === 'text') {
			setVisibleModal(true)
		}
	}
	const ChatFormHandler = text => {
		setVisibleModal(false)
		SubmitTextCallback({ ...item, item: text })
	}
	const title = `Отправить в ${item.name}`
	return (
		<li className={`list-group-item ${className}`}>
			<div>
				<p onClick={() => ClickCallback(item)}>
					{item.name} {icon}
				</p>
			</div>
			<ModalWindows
				title={title}
				visible={visibleModal}
				setVisible={setVisibleModal}
			>
				<SendChatForm onSubmitText={ChatFormHandler} />
			</ModalWindows>
		</li>
	)
}

export default TreeItem

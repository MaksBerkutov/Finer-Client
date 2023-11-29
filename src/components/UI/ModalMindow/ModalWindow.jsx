import React from 'react'
import cl from './ModalWindows.module.css'
import { Button, Modal } from 'react-bootstrap'

const ModalWindows = ({ children, visible, setVisible, title }) => {
	const rootClasses = [cl.myModal]

	if (visible) {
		rootClasses.push(cl.active)
	}
	const close = () => {
		setVisible(false)
	}
	return (
		<Modal show={visible} onHide={close}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={close}>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalWindows

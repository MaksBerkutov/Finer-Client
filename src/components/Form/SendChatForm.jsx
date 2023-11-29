import { useState } from 'react'

const SendChatForm = ({ onSubmitText, text }) => {
	const [inputValue, setInputValue] = useState('')

	const handleInputChange = e => {
		e.preventDefault()
		setInputValue(e.target.value)
	}

	const handleButtonClick = e => {
		e.preventDefault()

		onSubmitText(inputValue)
	}
	return (
		<form>
			<div className='container mt-5'>
				<h2 className='mb-4'>{text}</h2>
				<div className='mb-3'>
					<input
						type='text'
						className='form-control'
						placeholder='Введите текст'
						value={inputValue}
						onChange={handleInputChange}
					/>
				</div>
				<button className='btn btn-success' onClick={handleButtonClick}>
					Отправить
				</button>
			</div>
		</form>
	)
}

export default SendChatForm

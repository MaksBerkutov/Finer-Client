import classes from './ErrorPage.module.css'
import { useNavigate } from 'react-router-dom'
import { useError } from '../../hooks/useError'

const ErrorPage = () => {
	const navigate = useNavigate()
	const [ErrorTitle, ErrorBody] = useError()
	return (
		<div class='container mt-5'>
			<div class={classes.errorPanel}>
				<div class={classes.errorHeader}>
					<h4>{ErrorTitle}</h4>
				</div>
				<div class={classes.errorBody}>
					<p>{ErrorBody}</p>
					<button onClick={() => navigate('/')}>Oke</button>
				</div>
			</div>
		</div>
	)
}

export default ErrorPage

import classes from './ErrorPage.module.css'
import { useNavigate } from 'react-router-dom'
import { useError } from '../../hooks/useError'

const ErrorPage = () => {
	const navigate = useNavigate()
	const [ErrorTitle, ErrorBody] = useError()
	return (
		<div className='container d-flex align-items-center justify-content-center'>
			<div className={` ${classes.errorPanel}`} style={{ maxWidth: '400px' }}>
				<div className={classes.errorHeader}>
					<h4>{ErrorTitle}</h4>
				</div>
				<div className={classes.errorBody}>
					<p>{ErrorBody}</p>
					<button className='btn btn-primary' onClick={() => navigate('/')}>
						Хорошо
					</button>
				</div>
			</div>
		</div>
	)
}

export default ErrorPage

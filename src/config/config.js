import devConfig from './config.dev'
import prodConfig from './config.prod'

const config =
	process.env.REACT_APP_ENV === 'production' ? prodConfig : devConfig

export default config

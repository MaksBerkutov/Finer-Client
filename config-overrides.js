const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
	alias({
		'@component': 'src/components',
		'@image': 'src/image',
		'@page': 'src/pages',
		'@hook': 'src/hooks',
		'@util': 'src/utils',
		'@config': 'src/config',
	})(config)

	return config
}

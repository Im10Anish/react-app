export default (loggerName = 'client') => {
	const logger = require('logdown')(loggerName, { markdown: false })
	if (process.env.NODE_ENV === 'development' || process.env.NODE_DEBUG) {
		logger.state.isEnabled = true
	}

	return logger
}

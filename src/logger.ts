import { configure, Configuration } from 'log4js';

const SERVICE_NAME = 'elofun_game_services';

const loggerConfig: Configuration = {
	appenders: {
		console: { type: 'stdout' },
	},
	categories: {}
};

if ('LOGSTASH_HOST' in process.env) {
	console.log('Enabling logstash ...');
	loggerConfig.appenders.logstash = {
		type: '@log4js-node/logstashudp',
		host: process.env.LOGSTASH_HOST,
		port: +(process.env.LOGSTASH_PORT ?? 5044),
	}
}

loggerConfig.categories.default = { appenders: Object.keys(loggerConfig.appenders), level: process.env.LOGGER_LEVEL ?? 'debug' };

const logger = configure(loggerConfig).getLogger(SERVICE_NAME);

global.console.debug = (message?: unknown, ...optionalParams: unknown[]): void => {
	return logger.debug(message, ...optionalParams);
}

global.console.error = (message?: unknown, ...optionalParams: unknown[]): void => {
	return logger.error(message, ...optionalParams);
}

global.console.info = (message?: unknown, ...optionalParams: unknown[]): void => {
	return logger.info(message, ...optionalParams);
}

global.console.trace = (message?: unknown, ...optionalParams: unknown[]): void => {
	return logger.trace(message, ...optionalParams);
}

global.console.warn = (message?: unknown, ...optionalParams: unknown[]): void => {
	return logger.warn(message, ...optionalParams);
}

global.console.log = (message?: unknown, ...optionalParams: unknown[]): void => {
	return logger.debug(message, ...optionalParams);
}

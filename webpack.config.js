const { fromJS } = require('immutable');
const env = process.env.NODE_ENV || 'dev';

module.exports = () => {
	const config = fromJS(Object.assign({}, require('./config/common.webpack.config.js')(__dirname)));
	const envConfig = fromJS(Object.assign({}, require(`./config/${env}.webpack.config.js`)(__dirname)));

	return config.mergeDeep(envConfig).toJS();
};
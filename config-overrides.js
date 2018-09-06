const { rewireWorkboxInject, defaultInjectConfig } = require('react-app-rewire-workbox')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')
const glob = require('glob-all')
const PATHS = {
	src: path.join(__dirname, 'src')
}

module.exports = function override(config, env) {
	if (env === 'production') {
		console.log('Production build - Adding Workbox for PWAs')
		console.log("Directory", glob.sync([
			path.join(__dirname, './src/**/*.js')
		]))
		  // Extend the default injection config with required swSrc
		config.plugins.push(
			new ExtractTextPlugin({
				filename: 'static/css/[name].[contenthash:8].css',
    			allChunks: true,
		    }),
			new PurgecssPlugin({
				paths: glob.sync([
					path.join(__dirname, './src/**/*.js')
				])
			})
		)
	  	const workboxConfig = {
			...defaultInjectConfig,
			swSrc: path.join(__dirname, 'src', 'sw.js'),
			importWorkboxFrom: 'local' // Add this propertie
		}

		config = rewireWorkboxInject(workboxConfig)(config, env)
	}
	
	return config
}
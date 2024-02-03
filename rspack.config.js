const rspack = require('@rspack/core');
const refreshPlugin = require('@rspack/plugin-react-refresh');
const isDev = process.env.NODE_ENV === 'development';
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	context: __dirname,
	entry: {
		main: './client/index.js'
	},
	output: {
		path: 'public'
	},
	resolve: {
		extensions: ['...', '.ts', '.tsx', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: 'asset'
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: 'builtin:swc-loader',
						options: {
							sourceMap: true,
							jsc: {
								parser: {
									syntax: 'typescript',
									tsx: true
								},
								transform: {
									react: {
										runtime: 'automatic',
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: {
								targets: [
									'chrome >= 87',
									'edge >= 88',
									'firefox >= 78',
									'safari >= 14'
								]
							}
						}
					}
				]
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: 'sass-loader',
						options: {
							// ...
						}
					}
				],
				type: 'css/auto' 
			}
		]
	},
	plugins: [
		new rspack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new rspack.ProgressPlugin({}),
		new rspack.HtmlRspackPlugin({
			template: './client/index.html',
			publicPath: '/public'
		}),
		isDev ? new refreshPlugin() : null
	].filter(Boolean)
};

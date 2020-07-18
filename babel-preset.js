const path = require('path')
let babelPreset = require('babel-preset-react-app')({
	flow: true,
	typescript: false,
})

babelPreset = { ...babelPreset }

babelPreset.plugins.push.apply(babelPreset.plugins, [
	[
		'module-resolver',
		{
			alias: {
				'react-app': path.resolve(__dirname, 'src'),
			},
		},
	],
])
babelPreset.sourceType = 'unambiguous'

babelPreset.env = {
	...babelPreset.env,
	test: {
		plugins: ['require-context-hook'],
	},
}
module.exports = babelPreset

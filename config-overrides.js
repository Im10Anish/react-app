const {
	override,
	disableChunk,
	removeModuleScopePlugin,
} = require('customize-cra')
const { setIn, getIn } = require('timm')
const path = require('path')

module.exports = override(disableChunk(), removeModuleScopePlugin(), config => {
	let rules = getIn(config.module.rules, [2, 'oneOf'])
	rules = rules.map(rule => {
		if (
			rule.test &&
			rule.test.toString() === /\.(js|mjs|jsx|ts|tsx)$/.toString()
		) {
			const overrideRule = { ...rule }
			delete overrideRule.options.presets
			delete overrideRule.options.plugins
			overrideRule.options.extends = path.resolve(
				__dirname,
				'./babel-preset.js'
			)
			return overrideRule
		}
		if (rule.test && rule.test.toString() === /\.(js|mjs)$/.toString()) {
			const overrideRule = { ...rule }
			delete overrideRule.options.presets
			overrideRule.options.extends = path.resolve(
				__dirname,
				'./babel-preset.js'
			)
			return overrideRule
		}

		config.module.strictThisContextOnImports = true
		return rule
	})
	config.module.rules = setIn(config.module.rules, [2, 'oneOf'], rules)

	return config
})

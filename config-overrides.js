const {
    override,
    disableChunk,
    removeModuleScopePlugin,
} = require('customize-cra')

module.exports = override(disableChunk(), removeModuleScopePlugin())

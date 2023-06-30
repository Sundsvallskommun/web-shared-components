const preset = require('./preset');
const plugin = require('./plugin');

module.exports = {
  default: plugin,
  plugin: plugin,
  preset: preset,
};

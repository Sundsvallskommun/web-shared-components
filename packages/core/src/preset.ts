const preset = function (options = { tailwindForms: true, plugin: { colors: [], cssBase: true } }) {
  return {
    plugins: [...(options.tailwindForms ? [require('@tailwindcss/forms')] : []), require('./plugin')(options.plugin)],
  };
};
export default preset;

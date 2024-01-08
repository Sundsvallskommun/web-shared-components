import tailwindForms from '@tailwindcss/forms';
import plugin from './plugin';

const preset = function (options = { tailwindForms: true, plugin: { colors: [], cssBase: true } }) {
  return {
    plugins: [...(options.tailwindForms ? [tailwindForms()] : []), plugin(options.plugin)],
  };
};
export default preset;

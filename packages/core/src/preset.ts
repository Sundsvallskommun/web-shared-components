import tailwindForms from '@tailwindcss/forms';
import tailwindContainerQueries from '@tailwindcss/container-queries';
import plugin from './plugin';

const preset = function (
  options = { tailwindForms: true, tailwindContainers: true, plugin: { colors: [], cssBase: true } }
) {
  return {
    plugins: [
      ...(options.tailwindForms ? [tailwindForms()] : []),
      ...(options.tailwindContainers ? [tailwindContainerQueries] : []),
      plugin(options.plugin),
    ],
  };
};
export default preset;

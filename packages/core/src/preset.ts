import tailwindForms from '@tailwindcss/forms';
import tailwindContainerQueries from '@tailwindcss/container-queries';
import plugin from './plugin';
import { DataAttributes } from './data-plugin';
import { AriaAttributes } from './aria-plugin';

const preset = function (
  options = {
    tailwindForms: true,
    tailwindContainers: true,
    dataAttributes: true,
    ariaAttributes: true,
    plugin: { colors: [], cssBase: true },
  }
) {
  return {
    plugins: [
      ...(options.tailwindForms ? [tailwindForms()] : []),
      ...(options.tailwindContainers ? [tailwindContainerQueries] : []),
      ...(options.dataAttributes ? [DataAttributes] : []),
      ...(options.ariaAttributes ? [AriaAttributes] : []),
      plugin(options.plugin),
    ],
  };
};
export default preset;

import tailwindForms from '@tailwindcss/forms';
import tailwindContainerQueries from '@tailwindcss/container-queries';
import plugin from './plugin';
import { type PluginOptions, pluginDefaults } from './plugin';
import { DataAttributes } from './data-plugin';
import { AriaAttributes } from './aria-plugin';

interface PresetOptions {
  tailwindForms?: boolean;
  tailwindContainers?: boolean;
  dataAttributes?: boolean;
  ariaAttributes?: boolean;
  plugin?: PluginOptions;
}

const preset = function (_options?: PresetOptions) {
  const defaults: PresetOptions = {
    tailwindForms: true,
    tailwindContainers: true,
    dataAttributes: true,
    ariaAttributes: true,
  };

  const options = {
    ...defaults,
    ..._options,
    plugin: { ...pluginDefaults, ...(_options?.plugin || {}) },
  };

  return {
    plugins: [
      ...(options.tailwindForms ? [tailwindForms()] : []),
      ...(options.tailwindContainers ? [tailwindContainerQueries] : []),
      ...(options.dataAttributes ? [DataAttributes] : []),
      ...(options.ariaAttributes ? [AriaAttributes] : []),
      plugin(options?.plugin),
    ],
  };
};
export default preset;

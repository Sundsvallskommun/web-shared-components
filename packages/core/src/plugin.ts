import TailwindPlugin from 'tailwindcss/plugin';
import { base } from './base';
import { theme } from './theme';
import { Component, components } from './components';
import { PluginAPI } from 'tailwindcss/types/config';

export interface PluginOptions {
  colors?: string[];
  cssBase?: boolean;
  components?: string[];
}

export const pluginDefaults = { cssBase: true, colors: [] };

const defaultColors = ['warning', 'error', 'success', 'info', 'vattjom', 'juniskar', 'bjornstigen', 'gronsta'];

const getComponentWithDependencies = (compName: string): Component[] => {
  const compWithDeps = components.find((comp) => comp.comp.name === compName);
  if (!compWithDeps) return [];

  let comps: Component[] = [compWithDeps.comp];
  if (compWithDeps?.deps) {
    for (let index = 0; index < compWithDeps?.deps.length; index++) {
      comps = [...getComponentWithDependencies(compWithDeps.deps[index].name), ...comps];
    }
  }

  return comps.filter((val, index, arr) => arr.indexOf(val) === index);
};

const plugin = TailwindPlugin.withOptions<PluginOptions>(
  function (_options) {
    const options = { ...pluginDefaults, ..._options };

    const pickedComponents = components.reduce((comps: Component[], compWithDeps) => {
      if (options?.components && !options.components.includes(compWithDeps.comp.name)) {
        return comps;
      }

      let deps: Component[] = [];
      if (compWithDeps?.deps) {
        for (let index = 0; index < compWithDeps.deps.length; index++) {
          deps = [...getComponentWithDependencies(compWithDeps.deps[index].name), ...deps];
        }
      }

      return [...comps, ...deps, compWithDeps.comp].filter((val, index, arr) => arr.indexOf(val) === index);
    }, []);

    return function ({ addComponents, addBase, theme }: PluginAPI) {
      const optionColors = [...defaultColors, ...(options.colors || [])];

      if (options.cssBase) {
        addBase(base);
      }

      addComponents(pickedComponents.map((component) => component(optionColors, theme)));
    };
  },
  function () {
    return {
      theme: theme,
    };
  }
);

export default plugin;

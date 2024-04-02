import TailwindPlugin from 'tailwindcss/plugin';

export const DataAttributes = TailwindPlugin(function ({ addVariant }) {
  const attributes: Record<string, Array<string>> = {
    open: ['true', 'false'],
    rounded: ['true', 'false'],
    inverted: ['true', 'false'],
    size: ['xs', 'sm', 'md', 'lg', 'xl'],
    varaiant: ['primary', 'secondary', 'tertiary', 'default', 'alt'],
    accent: ['true', 'false'],
    background: ['true', 'false'],
  };

  Object.keys(attributes).forEach((key) => {
    attributes[key].forEach((element) => {
      let selector = `data-${key}-${element}`;
      if (element == 'true') {
        selector = `data-${key}`;
      } else if (element == 'false') {
        selector = `data-!${key}`;
      }
      addVariant(selector, `&[data-${key}="${element}"]`);
    });
  });
});

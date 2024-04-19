import TailwindPlugin from 'tailwindcss/plugin';

export const AriaAttributes = TailwindPlugin(function ({ addVariant }) {
  const attributes: Record<string, Array<string>> = {
    checked: ['true', 'false', 'mixed'],
    disabled: ['true', 'false'],
    expanded: ['true', 'false'],
    hidden: ['true', 'false'],
    orientation: ['horizontal', 'vertical'],
    readonly: ['true', 'false'],
    required: ['true', 'false'],
    selected: ['true', 'false'],
    sort: ['none', 'ascending', 'descending', 'other'],
  };

  Object.keys(attributes).forEach((key) => {
    attributes[key].forEach((element) => {
      let selector = `aria-${key}-${element}`;
      if (element == 'true') {
        selector = `aria-${key}`;
      } else if (element == 'false') {
        selector = `aria-!${key}`;
      }
      addVariant(selector, `&[aria-${key}="${element}"]`);
    });
  });

  const specialAttributes: Record<string, Array<string>> = {
    haspopup: ['menu', 'listbox', 'tree', 'grid', 'dialog', 'true'],
    current: ['true', 'page', 'step', 'location', 'date', 'time'],
  };

  Object.keys(specialAttributes).forEach((key) => {
    const elements = specialAttributes[key];
    const selector = `aria-${key}`;
    addVariant(
      selector,
      elements.map((element) => `&[aria-${key}="${element}"]`)
    );
  });

  Object.keys(specialAttributes).forEach((key) => {
    const selector = `aria-!${key}`;
    addVariant(selector, `&[aria-${key}="${false}"]`);
  });
});

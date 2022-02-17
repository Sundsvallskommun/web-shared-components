import { createMemoClass } from "@sk-web-gui/theme";
import { cx } from "@sk-web-gui/utils";

export const useAccordionClass = createMemoClass((props) => {
  const classes = cx(
    "accordion",
    props.disabled && "accordion-disabled"
  );

  return classes;
});

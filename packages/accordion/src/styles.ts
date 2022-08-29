import { createMemoClass } from "@sk-web-gui/theme";
import { cx } from "@sk-web-gui/utils";

export const useAccordionClass = createMemoClass((props) => {
  const variantClasses = {
    outline: "accordion-outline",
    solid: "accordion-solid",
  };

  const classes = cx(
    "accordion",
    variantClasses[props.variant],
    props.disabled && "accordion-disabled"
  );

  return classes;
});

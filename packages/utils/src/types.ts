/* eslint-disable @typescript-eslint/no-explicit-any */
export type Dict<T = any> = Record<string, T>;

export type CSSMap = Dict<{ value: string; var: string; varRef: string }>;

export type WithCSSVar<T> = T & {
  __cssVars: Dict;
  __cssMap: CSSMap;
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface DefaultProps {
  className?: string;
}

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
// A more precise version of just React.ComponentPropsWithoutRef on its own
export type PropsOf<C extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  React.JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<ExtendedProps = object, OverrideProps = object> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<C extends React.ElementType, Props = object> = ExtendableProps<PropsOf<C>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<C extends React.ElementType, Props = object> = InheritableElementProps<
  C,
  Props & AsProp<C>
>;

/** * Utility type to extract the `ref` prop from a polymorphic component */
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

/** * A wrapper of `PolymorphicComponentProps` that also includes the `ref` * prop for the polymorphic component */
export type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = object> = PolymorphicComponentProps<
  C,
  Props
> & { ref?: PolymorphicRef<C> };

/** Custom onChange event, used to return a simulated change from component to e.g. react-hook-form */
export interface CustomOnChangeEvent<TValue = string | string[], TElement = HTMLInputElement>
  extends Omit<React.ChangeEvent<TElement>, 'target'> {
  target: { value: TValue; name: string };
}

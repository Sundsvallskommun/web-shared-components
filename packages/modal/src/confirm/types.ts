export type DialogContextType = {
  showConfirmation: (
    title: string,
    message: string | React.JSX.Element,
    confirmLabel?: string,
    dismissLabel?: string,
    dialogType?: 'warning' | 'error' | 'info' | 'primary',
    icon?: 'info' | 'error' | 'question',
    labelAs?: React.ElementType
  ) => Promise<boolean>;
};

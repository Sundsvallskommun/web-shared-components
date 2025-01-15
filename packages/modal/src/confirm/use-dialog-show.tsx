import React from 'react';

type UseDialogShowReturnType = {
  show: boolean;
  setShow: (value: boolean) => void;
  onHide: () => void;
};

export const useDialogShow = (): UseDialogShowReturnType => {
  const [show, setShow] = React.useState(false);

  const handleOnHide = () => {
    setShow(false);
  };

  return {
    show,
    setShow,
    onHide: handleOnHide,
  };
};

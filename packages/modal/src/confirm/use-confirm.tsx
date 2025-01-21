import React from 'react';
import { DialogContextType } from './types';
import { ConfirmationDialogContext } from './context';

const useConfirm = (): DialogContextType => React.useContext(ConfirmationDialogContext);

export { useConfirm };
export default useConfirm;

import { DefaultProps } from '@sk-web-gui/utils';
import { Input } from '@sk-web-gui/forms';
import { Button } from '@sk-web-gui/button';
import SendIcon from '@mui/icons-material/Send';
import React, { isValidElement, useRef } from 'react';

interface InputProps extends DefaultProps {
  submitFunction: (comment: string) => void;
  editFunction: (comment: string, id: string | number) => void;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  itemToEdit:
    | {
        id: string | number | undefined;
        comment: string;
      }
    | undefined;
  inputValue: string;
  setInputValue: (comment: string) => void;
  placeholder?: string;
}

const InputComment = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    submitFunction,
    editFunction,
    isEdit,
    setIsEdit,
    itemToEdit,
    inputValue,
    setInputValue,
    placeholder = 'Skriv en kommentar..',
  } = props;

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitFunctionHandler = () => {
    if (isEdit && itemToEdit) {
      editFunction(inputValue, itemToEdit.id as string | number);
      setIsEdit(false);
    } else {
      submitFunction(inputValue);
    }
    setInputValue('');

    inputRef?.current && inputRef.current.focus();
  };

  return (
    <div className="comment-input">
      <Input
        ref={inputRef}
        onChange={inputOnChangeHandler}
        value={inputValue}
        rounded
        className={`${isEdit && 'bg-warning-light'}`}
        placeholder={placeholder}
      />
      <Button onClick={submitFunctionHandler} iconButton variant="ghost" disabled={inputValue.length === 0}>
        <SendIcon className={inputValue.length === 0 ? 'comment-input-inactive' : 'comment-input-active'} />
      </Button>
    </div>
  );
};

export default InputComment;

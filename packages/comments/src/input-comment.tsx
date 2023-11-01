import { DefaultProps } from '@sk-web-gui/utils';
import { Input } from '@sk-web-gui/forms';
import { Button } from '@sk-web-gui/button';
import SendIcon from '@mui/icons-material/Send';
import React, { useRef } from 'react';

interface InputProps extends DefaultProps {
  onSubmitCallback: (comment: string) => void;
  onEditCallback: (comment: string, id: string | number) => void;
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
    onSubmitCallback,
    onEditCallback,
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

  const onSubmitCallbackHandler = () => {
    if (isEdit && itemToEdit) {
      onEditCallback(inputValue, itemToEdit.id as string | number);
      setIsEdit(false);
    } else {
      onSubmitCallback(inputValue);
    }
    setInputValue('');

    inputRef?.current && inputRef.current.focus();
  };

  return (
    <div className="comment-input">
      <Input
        id="comment-input"
        ref={inputRef}
        onChange={inputOnChangeHandler}
        value={inputValue}
        rounded
        className={`${isEdit && 'bg-warning-surface-accent'}`}
        placeholder={placeholder}
      />
      <Button
        onClick={inputValue.length === 0 ? undefined : onSubmitCallbackHandler}
        iconButton
        variant="primary"
        className="border-none p-0 hover:bg-transparent"
        aria-disabled={inputValue.length === 0}
        aria-describedby="comment-input"
      >
        <SendIcon
          className={`${inputValue.length === 0 ? 'comment-input-inactive' : 'comment-input-active'} ${
            inputValue.length >= 1 && 'hover:text-hover'
          }`}
        />
      </Button>
    </div>
  );
};

export default InputComment;

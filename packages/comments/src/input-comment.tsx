import { DefaultProps } from '@sk-web-gui/utils';
import { Input } from '@sk-web-gui/forms';
import { Button } from '@sk-web-gui/button';
import SendIcon from '@mui/icons-material/Send';
import React, { useRef } from 'react';

interface InputProps extends DefaultProps {
  submitFunction: (comment: string) => void;
  inputValue: string;
  setInputValue: (comment: string) => void;
  placeholder?: string;
}

const InputComment = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { submitFunction, inputValue, setInputValue, placeholder = 'Skriv en kommentar..' } = props;

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitFunctionHandler = () => {
    setInputValue('');
    submitFunction(inputValue);
    inputRef?.current && inputRef.current.focus();
  };

  return (
    <div className="comment-input">
      <Input ref={inputRef} onChange={inputOnChangeHandler} value={inputValue} rounded placeholder={placeholder} />
      <Button onClick={submitFunctionHandler} iconButton variant="ghost" disabled={inputValue.length === 0}>
        <SendIcon className={inputValue.length === 0 ? 'comment-input-inactive' : 'comment-input-active'} />
      </Button>
    </div>
  );
};

export default InputComment;

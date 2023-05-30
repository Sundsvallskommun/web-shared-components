import { DefaultProps, cx } from '@sk-web-gui/utils';
import { Input } from '@sk-web-gui/forms';
import { Button } from '@sk-web-gui/button';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

interface InputProps extends DefaultProps {
  submitFunction: () => void;
  inputValue: string;
  setInputValue: (arg: string) => void;
}

const InputComment = (props: InputProps) => {
  const { submitFunction, inputValue, setInputValue } = props;

  const setStyle = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="comment-input">
      <Input onChange={setStyle} defaultValue="" rounded placeholder="Skriv en kommentar..." />
      <Button onClick={submitFunction} iconButton variant="ghost" disabled={inputValue.length === 0}>
        <SendIcon className={inputValue.length === 0 ? 'comment-input-inactive' : 'comment-input-active'} />
      </Button>
    </div>
  );
};

export default InputComment;

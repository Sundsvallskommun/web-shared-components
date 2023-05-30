import { Meta } from '@storybook/react';
import { __DEV__, cx } from '@sk-web-gui/utils';
import * as React from 'react';
import { DefaultProps } from '@sk-web-gui/utils';
import CommentItem from './comment-item';
import InputComment from './input-comment';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { useState } from 'react';
import { Spinner } from '@sk-web-gui/spinner';

export interface IDataObject {
  id: string | number;
  commentorName: string;
  userImage: string;
  commentText: string;
  publishDate: string;
}

interface ICommentsProps extends DefaultProps {
  loading?: boolean;
  commentsData: Array<IDataObject>;
  submitFunction: () => void;
  inputValue?: string;
  setInputValue?: (arg: string) => void;
  header?: boolean;
}

export interface CommentsProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, ICommentsProps {}

export const Comments = React.forwardRef<HTMLSpanElement, CommentsProps>((props) => {
  const [input, setInput] = useState('');
  const { commentsData, loading, submitFunction, inputValue = input, setInputValue = setInput, header = true } = props;

  return (
    <div className="flex flex-col w-full h-full">
      {header && (
        <div className="comment-header">
          <QuestionAnswerOutlinedIcon className="text-primary !text-2xl" />
          <h2>Kommentarer</h2>
        </div>
      )}
      <div className="[&>*:nth-child(even)]:border-t pl-10 pr-16">
        {!loading &&
          commentsData &&
          commentsData.map((comment) => {
            return (
              <div className="py-10 mt-4">
                <CommentItem
                  commentorName={comment.commentorName}
                  commentText={comment.commentText}
                  publishDate={comment.publishDate}
                  imageSrc={comment.userImage}
                />
              </div>
            );
          })}
        {loading && (
          <div className="w-full flex items-center justify-center py-lg">
            <Spinner size="xl" />
          </div>
        )}
      </div>
      <div className="mt-auto">
        <InputComment submitFunction={submitFunction} inputValue={inputValue} setInputValue={setInputValue} />
      </div>
    </div>
  );
});

if (__DEV__) {
  Comments.displayName = 'Kommentarer';
}

export default Comments;

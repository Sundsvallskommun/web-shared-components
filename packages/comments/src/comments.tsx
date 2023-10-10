import { __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { DefaultProps } from '@sk-web-gui/utils';
import CommentItem from './comment-item';
import InputComment from './input-comment';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { useState, useRef, useEffect } from 'react';
import { Spinner } from '@sk-web-gui/spinner';

export interface ICommentData {
  id: string | number;
  commentorName: string;
  userImage: string;
  commentText: string;
  publishDate: string;
}

interface ICommentsProps extends DefaultProps {
  commentsData: Array<ICommentData>;
  submitFunction: (comment: string) => void;
  editFunction: (comment: string, id: string | number) => void;
  inputValue?: string;
  setInputValue?: (comment: string) => void;
  loading?: boolean;
  header?: boolean;
  placeholder?: string;
  doDelete: (id: string | number) => void;
}

export interface CommentsProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, ICommentsProps {}

export const Comments = React.forwardRef<HTMLSpanElement, CommentsProps>((props, ref) => {
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<{ id: string | number | undefined; comment: string } | undefined>();
  const {
    commentsData,
    loading,
    submitFunction,
    editFunction,
    inputValue = input,
    setInputValue = setInput,
    header = true,
    placeholder,
    doDelete,
  } = props;

  const scrollEl = document.getElementById('commentscroll');

  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commentsData]);

  return (
    <div className="flex flex-col w-full h-full" {...ref}>
      {header && (
        <div className="comment-header">
          <QuestionAnswerOutlinedIcon className="text-primary !text-2xl" />
          <h2>Kommentarer</h2>
        </div>
      )}
      <div className="pl-10 pr-16 overflow-y-auto custom-scrollbar">
        {!loading &&
          commentsData &&
          commentsData.map((comment) => {
            return (
              <div className="border-b py-10 mt-4" key={`comment-item-${comment.id}`}>
                <CommentItem
                  commentorName={comment.commentorName}
                  commentText={comment.commentText}
                  publishDate={comment.publishDate}
                  imageSrc={comment.userImage}
                  id={comment.id}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                  itemToEdit={itemToEdit}
                  setItemToEdit={setItemToEdit}
                  setInputValue={setInputValue}
                  doDelete={doDelete}
                />
              </div>
            );
          })}
        {loading && (
          <div className="w-full flex items-center justify-center py-lg">
            <Spinner size="xl" />
          </div>
        )}
        <div id="commentscroll" />
      </div>
      <div className="mt-auto">
        <InputComment
          submitFunction={submitFunction}
          editFunction={editFunction}
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={placeholder}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemToEdit={itemToEdit}
        />
      </div>
    </div>
  );
});

if (__DEV__) {
  Comments.displayName = 'Kommentarer';
}

export default Comments;

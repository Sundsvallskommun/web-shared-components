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
  commentorImage: string;
  commentorUserName?: string | number;
  commentText: string;
  publishDate: string;
}

interface ICommentsProps extends DefaultProps {
  commentsData: Array<ICommentData>;
  onSubmitCallback: (comment: string) => void;
  onEditCallback: (comment: string, id: string | number) => void;
  onDeleteCallback: (id: string | number) => void;
  currentUserName?: string | number;
  inputValue?: string;
  setInputValue?: (comment: string) => void;
  loading?: boolean;
  header?: boolean;
  placeholder?: string;
  restrictUserEdit?: boolean;
  readonly?: boolean;
}

export interface CommentsProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, ICommentsProps {}

export const Comments = React.forwardRef<HTMLDivElement, CommentsProps>((props, ref) => {
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<{ id: string | number | undefined; comment: string } | undefined>();
  const {
    commentsData,
    loading,
    onSubmitCallback,
    onEditCallback,
    onDeleteCallback,
    inputValue = input,
    setInputValue = setInput,
    currentUserName,
    readonly = !currentUserName ? true : false,
    header = true,
    placeholder,
    restrictUserEdit = true,
  } = props;

  const scrollEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollEl && !isEdit) {
      scrollEl?.current?.scroll({
        top: scrollEl?.current?.scrollHeight,
        behavior: 'smooth',
      });
    }
  });

  return (
    <div className="flex flex-col w-full h-full" ref={ref}>
      {header && (
        <div className="comment-header">
          <QuestionAnswerOutlinedIcon className="text-primary !text-2xl" />
          <h2>Kommentarer</h2>
        </div>
      )}
      <div className="pl-10 pr-16 overflow-y-auto custom-scrollbar h-full" ref={scrollEl}>
        {!loading &&
          commentsData &&
          commentsData.map((comment) => {
            return (
              <div className="border-b py-10 mt-4" key={`comment-item-${comment.id}`}>
                <CommentItem
                  commentorName={comment.commentorName}
                  commentorUserName={comment.commentorUserName}
                  commentText={comment.commentText}
                  publishDate={comment.publishDate}
                  imageSrc={comment.commentorImage}
                  id={comment.id}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                  itemToEdit={itemToEdit}
                  setItemToEdit={setItemToEdit}
                  setInputValue={setInputValue}
                  onDeleteCallback={onDeleteCallback}
                  currentUserName={currentUserName}
                  restrictUserEdit={restrictUserEdit}
                  readonly={readonly}
                />
              </div>
            );
          })}
        {loading && (
          <div className="w-full flex items-center justify-center py-lg">
            <Spinner size="xl" />
          </div>
        )}
        <div /*ref={scrollEl}*/ />
      </div>
      <div className="mt-auto">
        <InputComment
          onSubmitCallback={onSubmitCallback}
          onEditCallback={onEditCallback}
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

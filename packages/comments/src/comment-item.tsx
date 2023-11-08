import { ProfilePicture } from '@sk-web-gui/profile';
import { DefaultProps } from '@sk-web-gui/utils';
import React, { Dispatch, SetStateAction } from 'react';
import CommentItemContextmenu from './comment-itemcontextmenu';

interface IItemProps extends DefaultProps {
  /* React node */
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setItemToEdit: Dispatch<SetStateAction<{ id: string | number | undefined; comment: string } | undefined>>;
  itemToEdit:
    | {
        id: string | number | undefined;
        comment: string;
      }
    | undefined;
  setInputValue: (comment: string) => void;
  onDeleteCallback: (id: string | number) => void;
  children?: React.ReactNode;
  commentorName: string;
  commentText: string;
  commentorUserName?: string | number;
  imageSrc?: string;
  imageAlt?: string;
  placeholderImage?: string;
  publishDate?: string;
  id?: string | number;
  currentUserName?: string | number;
  restrictUserEdit?: boolean;
  readonly?: boolean;
}

export const CommentItem = React.forwardRef<HTMLDivElement, IItemProps>((props, ref) => {
  const {
    commentorName,
    commentText,
    imageSrc,
    imageAlt = 'Bild på användare',
    publishDate,
    id,
    setIsEdit,
    isEdit,
    setInputValue,
    setItemToEdit,
    itemToEdit,
    onDeleteCallback,
    restrictUserEdit,
    currentUserName,
    commentorUserName,
    readonly,
  } = props;

  const showContextMenu =
    (!readonly && !restrictUserEdit) ||
    (!readonly && restrictUserEdit && currentUserName && commentorUserName && currentUserName == commentorUserName);

  return (
    <div className="comment-item" ref={ref}>
      <div className="comment-item-container">
        <div className="comment-item-container-textpic">
          <ProfilePicture imageAlt={imageAlt} className="object-cover" image={imageSrc} />
          <div className={`${itemToEdit?.id === id && isEdit ? 'p-sm rounded-lg bg-warning-light' : ''} w-full`}>
            <p className="comment-item-text">{commentText}</p>
            <p className="comment-item-commentorpublished">
              / {commentorName} {publishDate}
            </p>
          </div>
        </div>
        {showContextMenu ? (
          <CommentItemContextmenu
            setInputValue={setInputValue}
            commentValue={commentText}
            setIsEdit={setIsEdit}
            onDeleteCallback={onDeleteCallback}
            commentItem={{
              id: id,
              comment: commentText,
            }}
            setItemToEdit={setItemToEdit}
          />
        ) : (
          <>{!readonly ? <div className="w-[4.8rem] shrink-0"></div> : <></>}</>
        )}
      </div>
    </div>
  );
});

export default CommentItem;

import { ProfilePicture } from '@sk-web-gui/profile';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import CommentItemContextmenu from './comment-itemcontextmenu';

interface IItemProps extends DefaultProps {
  /* React node */
  children?: React.ReactNode;
  commentorName: string;
  commentText: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderImage?: string;
  publishDate?: string;
  id?: string | number;
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
  doDelete: (id: string | number) => void;
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
    doDelete,
  } = props;

  return (
    <div className="comment-item">
      <div className="comment-item-container">
        <div className="comment-item-container-textpic">
          <ProfilePicture imageAlt={imageAlt} className="object-cover" image={imageSrc} />
          <div className={`${itemToEdit?.id === id && isEdit && 'p-sm rounded-lg bg-warning-light'} w-full`}>
            <p className="comment-item-text">{commentText}</p>
            <p className="comment-item-commentorpublished">
              / {commentorName} {publishDate}
            </p>
          </div>
        </div>
        <CommentItemContextmenu
          setInputValue={setInputValue}
          commentValue={commentText}
          setIsEdit={setIsEdit}
          doDelete={doDelete}
          commentItem={{
            id: id,
            comment: commentText,
          }}
          setItemToEdit={setItemToEdit}
        />
      </div>
    </div>
  );
});

export default CommentItem;

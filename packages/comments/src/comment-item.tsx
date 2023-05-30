import { ProfilePicture } from '@sk-web-gui/profile';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import React, { useEffect, useRef } from 'react';

interface IItemProps extends DefaultProps {
  /* React node */
  children?: React.ReactNode;
  commentorName: string;
  commentText: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderImage?: string;
  publishDate?: string;
}

export const CommentItem = React.forwardRef<HTMLDivElement, IItemProps>((props, ref) => {
  const { commentorName, commentText, imageSrc, imageAlt = 'Bild på användare', publishDate } = props;

  return (
    <div className="comment-item">
      <div className="comment-item-container">
        <ProfilePicture imageAlt={imageAlt} className="object-cover" image={imageSrc} />
        <div>
          <p className="comment-item-text">{commentText}</p>
          <p className="comment-item-commentorpublished">
            / {commentorName} {publishDate}
          </p>
        </div>
      </div>
    </div>
  );
});

export default CommentItem;

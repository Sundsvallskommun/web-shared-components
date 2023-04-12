import { DefaultProps } from '@sk-web-gui/theme';
import React from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { ProfilePicture, ProfilePictureProps } from './profile-picture';

interface IProfileProps extends DefaultProps, ProfilePictureProps {
  title?: string;
  subTitle?: string;
  imageAlt?: string;
  placeholderImage?: string;
  image?: string;
  imageElem?: React.ReactElement;
  minimal?: boolean;
  showPicture?: boolean;
}

export interface ProfileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>, IProfileProps {}

export const Profile = React.forwardRef<HTMLDivElement, ProfileProps>((props, ref) => {
  const {
    title,
    subTitle,
    className = '',
    imageAlt,
    placeholderImage,
    image,
    imageElem,
    minimal = true,
    showPicture = true,
    ...rest
  } = props;

  return (
    <div ref={ref} className={cx('profile-container', className, minimal ? 'minimal' : '')} {...rest}>
      {showPicture && (
        <ProfilePicture imageAlt={imageAlt} placeholderImage={placeholderImage} image={image} imageElem={imageElem} />
      )}
      <div>
        <p className="profile-title">{title}</p>
        <p className="profile-subtitle">{subTitle} </p>
      </div>
    </div>
  );
});

if (__DEV__) {
  Profile.displayName = 'Profile picture, name, title';
}

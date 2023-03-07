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
}

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement>, IProfileProps {}

export const Profile = React.forwardRef<HTMLDivElement, ProfileProps>((props, ref) => {
  const { title, subTitle, className, imageAlt, placeholderImage, image, ...rest } = props;

  return (
    <div ref={ref} className={cx('ProfileContainer', className ? className : '')} {...rest}>
      <ProfilePicture imageAlt={imageAlt} placeholderImage={placeholderImage} image={image} />
      <div>
        <p className="ProfileP ProfileMargin">{title}</p>
        <p className="ProfileMargin">{subTitle} </p>
      </div>
    </div>
  );
});

if (__DEV__) {
  Profile.displayName = 'Profile picture, name, title';
}

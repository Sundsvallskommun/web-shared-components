import { DefaultProps } from '@sk-web-gui/theme';
import React, { cloneElement } from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import Person3Icon from '@mui/icons-material/Person3';
interface IProfilePictureProps extends DefaultProps {
  imageAlt?: string;
  placeholderImage?: string;
  image?: string;
  imageElem?: React.ReactElement;
}

export interface ProfilePictureProps extends React.HTMLAttributes<HTMLDivElement>, IProfilePictureProps {}

export const ProfilePicture = React.forwardRef<HTMLDivElement, ProfilePictureProps>((props, ref) => {
  const { imageAlt, placeholderImage, image, className, imageElem, ...rest } = props;

  const profile = image || placeholderImage || undefined;

  return (
    <div ref={ref} className={cx('profile-picture', className ? className : '')} {...rest}>
      {imageElem ? (
        cloneElement(imageElem, { className: `${imageElem.props.className} profile-picture-img` })
      ) : (
        <>
          {profile ? (
            <div
              role="img"
              aria-label={imageAlt}
              style={{ backgroundImage: `url('${profile}')` }}
              className="profile-picture-img"
            ></div>
          ) : (
            <Person3Icon aria-label={imageAlt} className="icon" />
          )}
        </>
      )}
    </div>
  );
});

if (__DEV__) {
  ProfilePicture.displayName = 'ProfilePicture';
}

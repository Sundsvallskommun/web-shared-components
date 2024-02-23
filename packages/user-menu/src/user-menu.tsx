import { Avatar } from '@sk-web-gui/avatar';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
export interface MenuItemGroup {
  label: string;
  elements: { label: string; element: () => JSX.Element }[];
}

export interface UserMenuProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  menuTitle?: string;
  menuSubTitle?: string;
  initials?: string;
  image?: string;
  imageAlt?: string;
  placeholderImage?: string;
  imageElem?: React.ReactElement;
  menuGroups: MenuItemGroup[];
  /**
   * Size of avatar button
   * @default lg
   */
  buttonSize?: React.ComponentProps<typeof Avatar>['size'];
  /**
   * If avatar button should be rounded
   * @default true
   */
  buttonRounded?: React.ComponentProps<typeof Avatar>['rounded'];
}

export const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>((props, ref) => {
  const {
    className,
    menuTitle,
    menuSubTitle,
    menuGroups,
    image,
    imageAlt = '',
    placeholderImage,
    imageElem,
    initials,
    buttonSize = 'lg',
    buttonRounded = true,
    ...rest
  } = props;

  return (
    <div ref={ref} className={cx('sk-usermenu', className)} {...rest}>
      <PopupMenu align="end">
        <PopupMenu.Button size="lg" iconButton className="sk-usermenu-button" rounded>
          <Avatar
            size={buttonSize}
            rounded={buttonRounded}
            initials={initials}
            imageUrl={image}
            imageAlt={imageAlt}
            placeholderImage={placeholderImage}
            imageElement={imageElem}
          />
        </PopupMenu.Button>
        <PopupMenu.Panel>
          {(menuTitle || menuSubTitle) && (
            <PopupMenu.Group>
              <label>{menuTitle}</label>
              <small>{menuSubTitle}</small>
            </PopupMenu.Group>
          )}
          <PopupMenu.Items>
            {menuGroups.map((group, grindex) => (
              <PopupMenu.Group key={`skum-${grindex}`} aria-label={group.label} role="group">
                {group.elements.map((item, index) => (
                  <PopupMenu.Item key={`skum-${grindex}-${index}`}>{item.element()}</PopupMenu.Item>
                ))}
              </PopupMenu.Group>
            ))}
          </PopupMenu.Items>
        </PopupMenu.Panel>
      </PopupMenu>
    </div>
  );
});

if (__DEV__) {
  UserMenu.displayName = 'UserMenu';
}

export default UserMenu;

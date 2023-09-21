import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { Menu } from '@headlessui/react';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Profile } from '@sk-web-gui/profile';

export interface MenuItemGroup {
  label: string;
  showLabel: boolean;
  showOnDesktop: boolean;
  showOnMobile: boolean;
  showDivider?: boolean;
  elements: { label: string; element: (active: boolean) => JSX.Element }[];
}

interface IUserMenuProps extends DefaultProps {
  menuTitle: string;
  menuSubTitle: string;
  image?: string;
  imageAlt?: string;
  placeholderImage?: string;
  imageElem?: React.ReactElement;
}

export interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement>, IUserMenuProps {
  menuGroups: MenuItemGroup[];
}

export const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>((props, ref) => {
  const {
    className,
    menuTitle,
    menuSubTitle,
    menuGroups,
    image,
    imageAlt = 'Bild på användare',
    placeholderImage,
    imageElem,
    ...rest
  } = props;

  const menuWidthClass = imageElem || image || placeholderImage ? 'lg:w-[30rem]' : 'lg:w-96';

  return (
    <Menu as="div" className={cx(className, 'sk-usermenu-wrapper')} {...rest}>
      {({ open }) => (
        <div className={cx(menuWidthClass, 'sk-usermenu')}>
          <Menu.Button as="div" role="button" tabIndex={0} className={cx(menuWidthClass, 'sk-usermenu-header')}>
            <div className="sk-usermenu-button-content">
              <div className="block lg:hidden">
                {open ? (
                  <CloseOutlinedIcon aria-hidden="true" className="sk-usermenu-button-icon material-icon" />
                ) : (
                  <MenuOutlinedIcon aria-hidden="true" className="sk-usermenu-button-icon material-icon" />
                )}
                <span className="leading-10 text-lg font-semibold">Meny</span>
              </div>

              <div className={`hidden lg:flex flex-grow max-w-full ${!menuSubTitle ? 'items-center' : ''}`}>
                <Profile
                  title={menuTitle}
                  subTitle={menuSubTitle}
                  image={image}
                  imageAlt={imageAlt}
                  imageElem={imageElem}
                  placeholderImage={placeholderImage}
                  showPicture={!!image || !!imageElem || !!placeholderImage || false}
                />
                {open ? (
                  <ArrowDropUpOutlinedIcon aria-hidden="true" className="sk-usermenu-button-icon material-icon" />
                ) : (
                  <ArrowDropDownOutlinedIcon aria-hidden="true" className="sk-usermenu-button-icon material-icon" />
                )}
              </div>
            </div>
          </Menu.Button>
          <Menu.Items className="sk-usermenu-body" data-open={open}>
            <div>
              <div className="sk-usermenu-first-row"></div>
            </div>
            {menuGroups.map((g: MenuItemGroup, gidx: number) => {
              return (
                <div
                  data-show-on-mobile={g.showOnMobile}
                  data-show-on-desktop={g.showOnDesktop}
                  role="group"
                  key={`sk-usermenu-group-${gidx}`}
                  aria-labelledby={g.showLabel ? `sk-usermenu-label-${gidx}` : undefined}
                  aria-label={!g.showLabel ? g.label : undefined}
                  className="sk-usermenu-group"
                >
                  {[
                    g.showLabel && (
                      <label
                        id={`sk-usermenu-label-${gidx}`}
                        key={`sk-usermenu-group-${gidx}-label`}
                        aria-hidden={false}
                        className="sk-usermenu-label"
                      >
                        <div className="sk-usermenu-label-content">{g.label}</div>
                        <div className="sk-usermenu-label-line">&nbsp;</div>
                      </label>
                    ),
                    ...g.elements.map((element, idx) => (
                      <Menu.Item key={`sk-usermenu-group-${gidx}-item-${idx}`} aria-label={element.label}>
                        {({ active }) => element.element(active)}
                      </Menu.Item>
                    )),
                    g.showDivider && (
                      <hr key={`sk-usermenu-group-${gidx}-divider`} role="separator" className="sk-usermenu-divider" />
                    ),
                  ]}
                </div>
              );
            })}
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
});

if (__DEV__) {
  UserMenu.displayName = 'UserMenu';
}

export default UserMenu;

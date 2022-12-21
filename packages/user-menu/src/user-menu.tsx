import { DefaultProps } from '@sk-web-gui/theme';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { Menu } from '@headlessui/react';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export interface MenuItemGroup {
  label: string;
  showLabel: boolean;
  showOnDesktop: boolean;
  showOnMobile: boolean;
  elements: { label: string; element: (active: boolean) => JSX.Element }[];
}

interface IUserMenuProps extends DefaultProps {
  /* React node */
  children?: React.ReactNode;
  menuTitle: string;
  menuSubTitle: string;
  image?: string;
  imageAlt?: string;
  placeholderImage?: string;
  imageElem?: React.ReactNode;
}

export interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement>, IUserMenuProps {
  menuGroups: MenuItemGroup[];
}

export const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>((props, ref) => {
  const {
    children,
    className,
    menuTitle,
    menuSubTitle,
    menuGroups,
    color,
    image,
    imageAlt = 'Bild på användare',
    placeholderImage,
    imageElem,
    ...rest
  } = props;

  const menuWidthClass = imageElem || image || placeholderImage ? 'w-[300px]' : 'w-96';

  return (
    <>
      <Menu as="div" className="block -mr-md lg:hidden">
        {({ open }) => (
          <div className={cx('mx-auto usermenu', open ? `usermenu-is-open` : undefined)}>
            <Menu.Button className={cx('usermenu-header px-md py-sm bg-white border-none rounded')}>
              <div className="block lg:hidden">
                <div className="font-bold">
                  {open ? (
                    <CloseOutlinedIcon
                      aria-hidden="true"
                      className="!text-2xl ml-auto mr-2 align-top text-primary material-icon"
                    />
                  ) : (
                    <MenuOutlinedIcon
                      aria-hidden="true"
                      className="!text-2xl ml-auto mr-2 align-top text-primary material-icon"
                    />
                  )}
                  <span className="leading-10 text-lg font-semibold">Meny</span>
                </div>
              </div>
              <div className="hidden lg:block text-left">
                <div className="font-bold">
                  <span className="usermenu-menuTitle">{menuTitle}</span>
                  {open ? (
                    <ArrowDropUpOutlinedIcon
                      aria-hidden="true"
                      className="!text-2xl ml-auto mb-sm align-top material-icon"
                    />
                  ) : (
                    <ArrowDropDownOutlinedIcon
                      aria-hidden="true"
                      className="!text-2xl ml-auto mb-sm align-top material-icon"
                    />
                  )}
                </div>
                <div className="usermenu-menuSubTitle text-left">{menuSubTitle}</div>
              </div>
            </Menu.Button>
            <Menu.Items
              className={cx(
                'usermenu-body mt-6 py-sm absolute right-0 left-0 bg-white border-none rounded border-t-0 shadow-lg'
              )}
            >
              <Menu.Item>
                <div className="hidden bg-white border-t-2 px-md pb-sm -mt-0 mx-md"></div>
              </Menu.Item>
              {menuGroups.map((g: MenuItemGroup, idx: number) => {
                return g.showOnMobile
                  ? [
                      g.showLabel && (
                        <Menu.Item
                          as="div"
                          key={`group${idx}`}
                          disabled
                          aria-hidden={true}
                          aria-label={g.label}
                          className="flex align-middle mt-md"
                        >
                          <div
                            className={`inline-block px-lg py-md lg:pl-md lg:pr-md lg:py-sm text-sm font-semibold uppercase small whitespace-nowrap`}
                          >
                            {g.label}
                          </div>
                          <div className="inline-block w-full h-px border-gray-300 border-t-2 mt-[26px]">&nbsp;</div>
                        </Menu.Item>
                      ),
                      ...g.elements.map((element, idx) => (
                        <Menu.Item key={`icon${idx}`} aria-label={element.label}>
                          {({ active }) => element.element(active)}
                        </Menu.Item>
                      )),
                    ]
                  : [];
              })}
            </Menu.Items>
          </div>
        )}
      </Menu>
      <Menu as="div" className="hidden lg:block">
        {({ open }) => (
          <div className={cx(menuWidthClass, 'mx-sm relative usermenu', open ? `usermenu-is-open` : undefined)}>
            <Menu.Button
              className={cx(
                menuWidthClass,
                'usermenu-header px-md py-sm bg-white border-2 border-solid rounded border-b-0',
                open ? `border-gray-300 shadow-none` : `border-transparent`
              )}
            >
              <div className="block md:hidden">
                <div className="font-bold">
                  {open ? (
                    <CloseOutlinedIcon
                      aria-hidden="true"
                      className="!text-2xl ml-auto mr-2 -mt-0.5 mb-sm align-top material-icon text-blue-500"
                    />
                  ) : (
                    <MenuOutlinedIcon
                      aria-hidden="true"
                      className="!text-2xl ml-auto mr-2 -mt-0.5 mb-sm align-top material-icon text-blue-500"
                    />
                  )}
                  <span>Meny</span>
                </div>
              </div>
              <div className="hidden md:flex items-center text-left">
                {imageElem && (
                  <div className="relative overflow-hidden flex-shrink-0 text-xs leading-none flex items-center justify-center text-center w-[48px] h-[48px] mr-md rounded-full border-2 border-primary">
                    {imageElem}
                  </div>
                )}
                {(placeholderImage || image) && !imageElem && (
                  <div className="relative overflow-hidden flex-shrink-0 text-xs leading-none flex items-center justify-center text-center w-[48px] h-[48px] mr-md rounded-full border-2 border-primary">
                    {placeholderImage && (
                      <div
                        role="img"
                        aria-label={imageAlt}
                        style={{ backgroundImage: `url('${placeholderImage}')` }}
                        className="bg-cover absolute inset-0 bg-center text-xs leading-none"
                      ></div>
                    )}
                    {image && (
                      <div
                        role="img"
                        aria-label={imageAlt}
                        style={{ backgroundImage: `url('${image}')` }}
                        className="bg-cover absolute inset-0 z-[1] bg-center text-xs leading-none"
                      ></div>
                    )}
                  </div>
                )}
                <div className="flex-grow">
                  <div className="font-bold flex flex-between">
                    <span className="usermenu-menuTitle">{menuTitle}</span>
                    {open ? (
                      <ArrowDropUpOutlinedIcon
                        aria-hidden="true"
                        className="!text-2xl ml-auto align-top material-icon"
                      />
                    ) : (
                      <ArrowDropDownOutlinedIcon
                        aria-hidden="true"
                        className="!text-2xl ml-auto align-top material-icon"
                      />
                    )}
                  </div>
                  <div className="usermenu-menuSubTitle text-left">{menuSubTitle}</div>
                </div>
              </div>
            </Menu.Button>
            <Menu.Items
              className={cx(
                menuWidthClass,
                'usermenu-body -mt-2 py-sm absolute bg-white border-2 border-solid rounded border-t-0', // before:my-sm before:mb-lg before:left-1/4 before:content-[''] before:absolute before:top-0 before:h-1px before:w-1/2 before:border-b-2 before:border-gray-300",
                open ? `border-gray-300 shadow-t-0 shadow-lg` : `border-white`
              )}
            >
              <div className="bg-white border-t-2 pb-sm -mt-0 mx-md"></div>
              {menuGroups.map((g: MenuItemGroup, idx: number) => {
                return g.showOnDesktop
                  ? [
                      g.showLabel && (
                        <Menu.Item
                          disabled
                          aria-hidden={true}
                          aria-label={g.label}
                          as="div"
                          key={`group${idx}`}
                          className="flex align-middle mt-md mb-xs"
                        >
                          <div
                            className={`inline-block pl-md pr-md py-sm text-sm font-semibold uppercase small whitespace-nowrap`}
                          >
                            {g.label}
                          </div>
                        </Menu.Item>
                      ),
                      ...g.elements.map((element, idx) => (
                        <Menu.Item key={`icon${idx}`} aria-label={element.label}>
                          {({ active }) => element.element(active)}
                        </Menu.Item>
                      )),
                    ]
                  : [];
              })}
            </Menu.Items>
          </div>
        )}
      </Menu>
    </>
  );
});

if (__DEV__) {
  UserMenu.displayName = 'UserMenu';
}

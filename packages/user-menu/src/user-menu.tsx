import { DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { Menu } from "@headlessui/react";

import { useUserMenuClass } from "./styles";

interface MenuItem {
  icon: string;
  label: string;
  url: string;
}

interface IUserMenuProps extends DefaultProps {
  /* React node */
  children?: React.ReactNode;
  menuTitle: string;
  menuSubTitle: string;
}

export interface UserMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    IUserMenuProps {}

export const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>(
  (props, ref) => {
    const { children, className, menuTitle, menuSubTitle, color, ...rest } =
      props;

    const [menuOpen, setMenuOpen] = React.useState(false);

    const items: MenuItem[] = [
      {
        icon: "account_circle",
        label: "Mina uppgifter",
        url: "/my-account",
      },
      {
        icon: "settings",
        label: "Inställningar som har en riktigt lång text",
        url: "/account-settings",
      },
      {
        icon: "email",
        label: "Meddelanden",
        url: "/messages",
      },
      {
        icon: "logout",
        label: "Logga ut",
        url: "/logout",
      },
    ];

    return (
      <Menu>
        {({ open }) => (
          <div
            className={cx(
              "w-96 mx-sm relative usermenu drop-shadow-none before:drop-shadow-none after:drop-shadow-none before:filter-none",
              open ? `usermenu-is-open` : undefined
            )}
          >
            <Menu.Button
              className={cx(
                "usermenu-header w-96 px-md py-sm bg-white border-2 border-solid rounded border-b-0",
                open ? `border-gray-300 shadow-none` : `border-transparent`
              )}
            >
              <div className="block md:hidden">
                <div className="font-bold">
                  <span
                    className="ml-auto mr-2 -mt-0.5 mb-sm align-top material-icons text-blue-500"
                    aria-hidden="true"
                  >
                    {open ? "close" : "menu"}
                  </span>
                  <span>Meny</span>
                </div>
              </div>
              <div className="hidden md:block text-left">
                <div className="font-bold">
                  <span>{menuTitle}</span>
                  <span
                    className="ml-auto mb-sm align-top material-icons"
                    aria-hidden="true"
                  >
                    {open ? "expand_less" : "expand_more"}
                  </span>
                </div>
                <div className="text-left">{menuSubTitle}</div>
              </div>
            </Menu.Button>
            <Menu.Items
              className={cx(
                "usermenu-body w-96 -mt-2 py-sm absolute bg-white border-2 border-solid rounded border-t-0", // before:my-sm before:mb-lg before:left-1/4 before:content-[''] before:absolute before:top-0 before:h-1px before:w-1/2 before:border-b-2 before:border-gray-300",
                open ? `border-gray-300 shadow-t-0 shadow-lg` : `border-white`
              )}
            >
              <Menu.Item>
                <div className="bg-white border-t-2 pb-sm -mt-0 mx-md"></div>
              </Menu.Item>
              {items.map((item) => (
                <Menu.Item key={item.icon}>
                  {({ active }) => (
                    <a
                      className={`usermenu-item px-md py-sm ${
                        active && "bg-blue-500"
                      } flex`}
                      href={item.url}
                    >
                      <span
                        className="material-icons-outlined align-middle mr-sm"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="inline" aria-hidden="true">
                        {item.label}
                      </span>
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </div>
        )}
      </Menu>
    );
  }
);

if (__DEV__) {
  UserMenu.displayName = "UserMenu";
}

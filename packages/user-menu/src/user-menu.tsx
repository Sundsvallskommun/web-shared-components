import { colors, DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { Menu } from "@headlessui/react";
interface MenuItem {
  icon: string | null;
  label: string;
  url: string;
}

interface MenuItemGroup {
  label: string;
  showLabel: boolean;
  items: MenuItem[];
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

    const menuGroups: MenuItemGroup[] = [
      {
        label: "Main",
        showLabel: false,
        items: [
          {
            icon: null,
            label: "Start",
            url: "/",
          },
          {
            icon: null,
            label: "Pågående ärenden",
            url: "/ongoing",
          },
          {
            icon: null,
            label: "Beslutade ärenden",
            url: "/closed",
          },
          {
            icon: null,
            label: "Handlingsplan",
            url: "/actionplan",
          },
          {
            icon: null,
            label: "Företagsuppgifter",
            url: "/orginfo",
          },
        ],
      },
      {
        label: "Relaterade webbplatser",
        showLabel: true,
        items: [
          {
            icon: null,
            label: "E-tjänster",
            url: "www.sundsvall.se/",
          },
          {
            icon: null,
            label: "Företagscenter Sundsvall",
            url: "www.sundsvall.se/",
          },
        ],
      },
      {
        label: "Inställningar",
        showLabel: true,
        items: [
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
        ],
      },
    ];

    return (
      <>
        <Menu as="div" className="block lg:hidden">
          {({ open }) => (
            <div
              className={cx(
                "w-full mx-auto absolute top-10 inset-0 usermenu drop-shadow-none before:drop-shadow-none after:drop-shadow-none before:filter-none",
                open ? `usermenu-is-open` : undefined
              )}
            >
              <Menu.Button
                className={cx(
                  "usermenu-header w-44 absolute right-16 top-1 px-md py-sm bg-white border-none rounded"
                )}
              >
                <div className="block lg:hidden">
                  <div className="font-bold">
                    <span
                      className={cx(`ml-auto mr-2 align-top material-icons`)}
                      style={{ color: `rgba(${colors.vattjom.dark})` }}
                      aria-hidden="true"
                    >
                      {open ? "close" : "menu"}
                    </span>
                    <span className="leading-10">Meny</span>
                  </div>
                </div>
                <div className="hidden lg:block text-left">
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
                  "usermenu-body -mt-2 py-sm absolute top-40 right-0 left-0 bg-white border-none rounded border-t-0"
                )}
              >
                <Menu.Item>
                  <div className="hidden bg-white border-t-2 px-md pb-sm -mt-0 mx-md"></div>
                </Menu.Item>
                {menuGroups.map((g: MenuItemGroup, idx: number) => {
                  return [
                    g.showLabel && (
                      <Menu.Item
                        as="div"
                        key={`group${idx}`}
                        className="flex align-middle mt-md"
                      >
                        <div
                          className={`usermenu-item inline-block pl-lg pr-md py-sm text-sm font-semibold uppercase small whitespace-nowrap`}
                        >
                          {g.label}
                        </div>
                        <div className="inline-block w-full h-px border-gray-300 border-t-2 mt-7">
                          &nbsp;
                        </div>
                      </Menu.Item>
                    ),
                    ...g.items.map((item, idx) => (
                      <Menu.Item as="div" key={`icon${idx}`}>
                        {({ active }) => (
                          <a
                            className={`usermenu-item px-lg py-md ${
                              active && "bg-hover text-white"
                            } flex`}
                            href={item.url}
                          >
                            {item.icon && (
                              <span
                                className="material-icons-outlined align-middle mr-sm"
                                aria-hidden="true"
                              >
                                {item.icon}
                              </span>
                            )}
                            <span className="inline" aria-hidden="true">
                              {item.label}
                            </span>
                          </a>
                        )}
                      </Menu.Item>
                    )),
                  ];
                })}
              </Menu.Items>
            </div>
          )}
        </Menu>
        <Menu as="div" className="hidden lg:block">
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
                {menuGroups.map((g: MenuItemGroup, idx: number) => {
                  return [
                    g.showLabel && (
                      <Menu.Item
                        as="div"
                        key={`group${idx}`}
                        className="flex align-middle mt-md"
                      >
                        <div
                          className={`usermenu-item inline-block pl-md pr-md py-sm text-sm font-semibold uppercase small whitespace-nowrap`}
                        >
                          {g.label}
                        </div>
                      </Menu.Item>
                    ),
                    ...g.items.map((item, idx) => (
                      <Menu.Item key={`icon${idx}`}>
                        {({ active }) => (
                          <a
                            className={`usermenu-item px-md py-sm ${
                              active && "bg-hover text-white"
                            } flex`}
                            href={item.url}
                          >
                            {item.icon && (
                              <span
                                className="material-icons-outlined align-middle mr-sm"
                                aria-hidden="true"
                              >
                                {item.icon}
                              </span>
                            )}
                            <span className="inline" aria-hidden="true">
                              {item.label}
                            </span>
                          </a>
                        )}
                      </Menu.Item>
                    )),
                  ];
                })}
              </Menu.Items>
            </div>
          )}
        </Menu>
      </>
    );
  }
);

if (__DEV__) {
  UserMenu.displayName = "UserMenu";
}

import * as React from "react";

import { UserMenu as InternalUserMenu, UserMenuProps } from "./user-menu";
interface UserMenu
  extends React.ForwardRefExoticComponent<
    UserMenuProps & React.RefAttributes<HTMLDivElement>
  > {}

const UserMenu = InternalUserMenu as UserMenu;

export type { UserMenuProps };

export { UserMenu };

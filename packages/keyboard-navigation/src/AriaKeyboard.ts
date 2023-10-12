/**
 * Handles keyboard navigation for roles 'menu' and 'menubar' on ul.
 *
 * Expected structure:
 * - menuitems: 'ul li [role="menuitem"]
 * - nested menus: 'ul li [role="menu"], ul li [role="menubar"]'
 *
 * Defaults:
 * - modifyStates: true
 * - autoCloseMenus: true
 * - toggleOnSpace: false
 */
export interface AriaMenuKeyboardOptionsCommon {
  /** Handles tabIndex, aria-expanded and focus */
  modifyStates?: boolean;
  autoCloseMenus?: boolean;
  toggleOnSpace?: boolean;

  selectMenuItem?: string;
  selectAriaCurrent?: string;
  selectNestedMenuItem?: string;
  selectMenu?: string;
  selectFirstNestedMenuItem?: string;

  /** Set tabIndex */
  onSetFocusableItem?: (currentFocusedMenuItem: HTMLElement) => void;
  /** Set tabIndex and focus */
  onSetFocusItem?: (currentFocusedMenuItem: HTMLElement) => void;
  /** Set aria-current */
  onSetActiveItem?: (currentFocusedMenuItem: HTMLElement) => void;
  /** Set aria-expanded */
  onExpandPopup?: (currentFocusedMenuItem: HTMLElement, expandedMenuElement: HTMLElement) => void;
  /** Set aria-expanded */
  onClosePopup?: (currentFocusedMenuItem: HTMLElement) => void;

  onNextItem?: (currentFocusedMenuItem: HTMLElement) => void;
  onPreviousItem?: (currentFocusedMenuItem: HTMLElement) => void;

  // keys
  onSpace?: (event: KeyboardEvent) => void;
  onEnter?: (event: KeyboardEvent) => void;
  onEscape?: (event: KeyboardEvent) => void;
  onTab?: (event: KeyboardEvent) => void;
  onUp?: (event: KeyboardEvent) => void;
  onDown?: (event: KeyboardEvent) => void;
  onLeft?: (event: KeyboardEvent) => void;
  onRight?: (event: KeyboardEvent) => void;
  onHome?: (event: KeyboardEvent) => void;
  onEnd?: (event: KeyboardEvent) => void;
  onFirstLetter?: (event: KeyboardEvent) => void;
}

interface AriaMenuKeyboardOptionsRegular extends AriaMenuKeyboardOptionsCommon {
  modifyStates?: true;
}

interface AriaMenuKeyboardOptionsModifyStates extends AriaMenuKeyboardOptionsCommon {
  modifyStates: false;
  /** Set tabIndex */
  onSetFocusableItem: (currentFocusedMenuItem: HTMLElement) => void;
  /** Set tabIndex and focus */
  onSetFocusItem: (currentFocusedMenuItem: HTMLElement) => void;
  /** Set aria-current
   *  Changing the DOM might cause 'click'-eventlisteners in the menu to not fire correctly
   */
  onSetActiveItem?: (currentFocusedMenuItem: HTMLElement) => void;
  /** Set aria-expanded */
  onExpandPopup: (currentFocusedMenuItem: HTMLElement, expandedMenuElement: HTMLElement) => void;
  /** Set aria-expanded */
  onClosePopup: (currentFocusedMenuItem: HTMLElement) => void;
}

export type AriaMenuKeyboardOptions = AriaMenuKeyboardOptionsRegular | AriaMenuKeyboardOptionsModifyStates;

/** These are always set internally */
interface AriaMenuKeyboardOptionsInternal extends AriaMenuKeyboardOptionsCommon {
  modifyStates: boolean;
  autoCloseMenus: boolean;
  toggleOnSpace: boolean;
}

export const AriaMenuKeyboard = class {
  public menuElement: HTMLElement;
  public currentFocusedMenuItem: HTMLElement;
  public options: AriaMenuKeyboardOptionsInternal = {
    modifyStates: true,
    autoCloseMenus: true,
    toggleOnSpace: false,
  };
  public currentFocusedParentElement: HTMLElement;
  public currentFocusedChildrenElements: NodeListOf<Element>;
  public currentFocusedChildIndex: number;

  // Query-Selects
  public ariaCurrent = 'true';
  public selectMenuItem = `[role="menuitem"]`;
  public selectAriaCurrent = `[aria-current="true"],[aria-current="page"]`;
  public selectNestedMenuItem = `li ${this.selectMenuItem}`;
  public selectMenu = `ul[role="menu"],ul[role="menubar"]`;
  public selectFirstNestedMenuItem = `ul li:first-child ${this.selectMenuItem}`;
  public selectNestedLI = `> li`;

  public firstCharMenuItemIndex: number | null = null;

  constructor(menuElement: HTMLElement, options?: AriaMenuKeyboardOptions) {
    this.menuElement = menuElement;

    if (!menuElement) {
      throw Error(`menuElement does not exist`);
    }

    // Currently focusable menuitem
    this.currentFocusedMenuItem = this.getFocusedMenuItem();

    // Parentdata
    this.currentFocusedParentElement = this.menuElement;
    this.currentFocusedChildrenElements = this.menuElement.querySelectorAll(`:scope ${this.selectNestedLI}`);
    this.currentFocusedChildIndex = this.getChildIndex(
      this.currentFocusedParentElement,
      this.currentFocusedMenuItem.closest('li') as HTMLElement
    );

    this.options = { ...this.options, ...options };

    this.init();
  }

  init = async () => {
    this.menuElement.addEventListener('keydown', this.onKeyDown);
    this.menuElement.addEventListener('onfocusout', this.onFocusOut);
    this.menuElement.addEventListener('click', this.onPointerClick);

    if (this.options.modifyStates) {
      const menuItems = this.menuElement.querySelectorAll(`:scope ${this.selectNestedMenuItem}`);
      menuItems.forEach((menuItem) => {
        menuItem.setAttribute('tabIndex', '-1');
      });
      this.currentFocusedMenuItem?.setAttribute('tabIndex', '0');
    }

    this.options.onSetFocusableItem && (await this.options.onSetFocusableItem(this.currentFocusedMenuItem));
  };

  getSelect = (select: string, modifierFn?: (select: string) => string) => {
    const selectArray = select.split(',');
    if (selectArray.length > 1 && modifierFn) {
      return selectArray.map((x) => modifierFn(x)).join(',');
    }
    return select;
  };

  getFirstMenuItemInMenu = () => {
    return this.menuElement.querySelector(`:scope ${this.selectMenuItem}`);
  };

  getFocusedMenuItem = () => {
    const currentItem = this.menuElement.querySelector(
      this.getSelect(this.selectAriaCurrent, (x) => `:scope ${x}`)
    ) as HTMLElement;
    if (currentItem) {
      this.ariaCurrent = currentItem.getAttribute('aria-current') as string;
    }
    this.currentFocusedMenuItem = currentItem || (this.getFirstMenuItemInMenu() as HTMLElement);
    if (!this.currentFocusedMenuItem) {
      throw Error('Faulty menu structure');
    }
    return this.currentFocusedMenuItem;
  };

  getParentMenu = (element: HTMLElement) => {
    return element.closest(`${this.selectMenu}`);
  };

  getParentMenuItem = () => {
    const closestMenuItem = this.getParentMenu(this.currentFocusedMenuItem)
      ?.closest('li')
      ?.querySelector(`:scope ${this.selectMenuItem}`) as HTMLElement;
    return (closestMenuItem || this.getFirstMenuItemInMenu()) as HTMLElement;
  };

  getChildIndex = (parentElement: HTMLElement, childElement: HTMLElement) => {
    return Array.from(parentElement.children).findIndex((x) => x === childElement);
  };

  getParentData = (menuItem = this.currentFocusedMenuItem) => {
    const closestLI = menuItem.closest('li');
    if (!closestLI) {
      throw Error('Faulty menu structure');
    }
    this.currentFocusedParentElement = closestLI?.closest('ul') as HTMLElement;
    this.currentFocusedChildrenElements = this.currentFocusedParentElement?.querySelectorAll(
      `:scope ${this.selectNestedLI}`
    );
    this.currentFocusedChildIndex = this.getChildIndex(this.currentFocusedParentElement, closestLI);
    return {
      currentFocusedParentElement: this.currentFocusedParentElement,
      currentFocusedChildrenElements: this.currentFocusedChildrenElements,
      currentFocusedChildIndex: this.currentFocusedChildIndex,
    };
  };

  getDefaultOrientation = (role: string) => {
    switch (role) {
      case 'menubar':
        return 'horizontal';
      case 'menu':
        return 'vertical';
      default:
        return 'horizontal';
    }
  };

  leaveCurrentFocusedItem = () => {
    if (this.options.modifyStates) {
      this.currentFocusedMenuItem.setAttribute('tabIndex', '-1');
    }
  };

  setFocusItem = async (menuItem: HTMLElement) => {
    if (this.options.modifyStates) {
      this.leaveCurrentFocusedItem();
      menuItem?.setAttribute('tabIndex', '0');
      menuItem?.focus();
    }
    this.currentFocusedMenuItem = menuItem;
    this.options.onSetFocusItem && (await this.options.onSetFocusItem(menuItem));
  };

  setActiveItem = async (menuItem: HTMLElement) => {
    if (this.options.modifyStates) {
      this.currentFocusedMenuItem.setAttribute('aria-current', 'false');
      menuItem.setAttribute('aria-current', this.ariaCurrent);
      this.setFocusItem(menuItem);
    }

    this.options.onSetActiveItem && (await this.options.onSetActiveItem(menuItem));
  };

  toFirstItem = (withParentData = false) => {
    if (!withParentData) this.getParentData();
    this.setFocusItem(
      this.currentFocusedChildrenElements[0].querySelector(`:scope ${this.selectMenuItem}`) as HTMLElement
    );
  };

  toLastItem = (withParentData = false) => {
    if (!withParentData) this.getParentData();
    this.setFocusItem(
      this.currentFocusedChildrenElements[this.currentFocusedChildrenElements.length - 1].querySelector(
        `:scope ${this.selectMenuItem}`
      ) as HTMLElement
    );
  };

  toNextItem = () => {
    this.getParentData();
    let item: HTMLElement;
    if (this.currentFocusedChildIndex === this.currentFocusedChildrenElements.length - 1) {
      // Go to first item
      return this.toFirstItem(true);
    } else {
      item = this.currentFocusedChildrenElements[this.currentFocusedChildIndex + 1]?.querySelector(
        `:scope ${this.selectMenuItem}`
      ) as HTMLElement;
      if (item === null) {
        // is separator
        item = this.currentFocusedChildrenElements[this.currentFocusedChildIndex + 2]?.querySelector(
          `:scope ${this.selectMenuItem}`
        ) as HTMLElement;
      }
    }
    if (item) {
      this.setFocusItem(item);
      this.options.onNextItem && this.options.onNextItem(item);
    }
  };

  toPreviousItem = () => {
    this.getParentData();
    let item: HTMLElement;
    if (this.currentFocusedChildIndex === 0) {
      // Go to last item
      return this.toLastItem(true);
    } else {
      item = this.currentFocusedChildrenElements[this.currentFocusedChildIndex - 1]?.querySelector(
        `:scope ${this.selectMenuItem}`
      ) as HTMLElement;
      if (item === null) {
        // is separator
        item = this.currentFocusedChildrenElements[this.currentFocusedChildIndex - 2]?.querySelector(
          `:scope ${this.selectMenuItem}`
        ) as HTMLElement;
      }
    }
    if (item) {
      this.setFocusItem(item);
      this.options.onPreviousItem && this.options.onPreviousItem(item);
    }
  };

  togglePopup = () => {
    const isOpen = this.currentFocusedMenuItem.getAttribute('aria-expanded') === 'true' ? true : false;
    const flippedState = !isOpen ? 'true' : 'false';

    if (this.options.modifyStates) {
      this.currentFocusedMenuItem.setAttribute('aria-expanded', flippedState);
    }

    if (isOpen) {
      this.options.onClosePopup && this.options.onClosePopup(this.currentFocusedMenuItem);
    } else {
      this.options.onExpandPopup &&
        this.options.onExpandPopup(this.currentFocusedMenuItem, this.currentFocusedMenuItem);
    }
  };

  expandPopup = () => {
    if (!this.hasPopup(this.currentFocusedMenuItem)) {
      return;
    }

    const expandedMenuItem = this.currentFocusedMenuItem;
    const expandedLI = expandedMenuItem.closest('li');
    const item = expandedLI?.querySelector(`:scope ${this.selectFirstNestedMenuItem}`) as HTMLElement;

    if (item) {
      if (this.options.modifyStates) {
        this.currentFocusedMenuItem.setAttribute('aria-expanded', 'true');
      }

      this.setFocusItem(item);
      this.options.onExpandPopup && this.options.onExpandPopup(item, expandedMenuItem);
    }
  };

  focusToParent = () => {
    const parentMenuItem = this.getParentMenuItem();
    if (parentMenuItem === this.menuElement) return;

    if (parentMenuItem) {
      this.setFocusItem(parentMenuItem);
    }

    return parentMenuItem;
  };

  closePopup = () => {
    const parentMenuItem = this.focusToParent();
    if (parentMenuItem) {
      if (this.options.modifyStates) {
        this.currentFocusedMenuItem.setAttribute('aria-expanded', 'false');
      }

      this.options.onClosePopup && this.options.onClosePopup(parentMenuItem);
    }
  };

  hasPopup = (element: HTMLElement) => {
    return element.getAttribute('aria-haspopup') === 'true';
  };

  getFirstCharFromElement = (element: HTMLElement) => {
    const menuItem = element.querySelector(`${this.selectMenuItem}`) as HTMLElement;
    return menuItem?.innerText ? menuItem.innerText[0].toLowerCase() : '';
  };

  toFirstLetter = (char: string) => {
    const charLower = char.toLowerCase();
    this.getParentData();
    const firstCharactersLower = Array.from(this.currentFocusedChildrenElements).map(
      (x) => `${this.getFirstCharFromElement(x as HTMLElement)}`
    );

    // Save matching indexes
    const charIndexMatches: number[] = [];
    firstCharactersLower.forEach((_charLower, i) => {
      if (_charLower === charLower) {
        charIndexMatches.push(i);
      }
    });

    // No matching characters
    if (!charIndexMatches.length) return false;

    const charIndexMatchesAfterCurrent = charIndexMatches.filter((x) => x > this.currentFocusedChildIndex);
    const nextMatchIndex = charIndexMatchesAfterCurrent.length ? charIndexMatchesAfterCurrent[0] : charIndexMatches[0];

    this.setFocusItem(
      this.currentFocusedChildrenElements[nextMatchIndex].querySelector(`${this.selectMenuItem}`) as HTMLElement
    );

    return true;
  };

  handleVerticalMenuKeyDown = (key: KeyboardEvent['key'], event: KeyboardEvent) => {
    switch (key) {
      case ' ':
      case 'Space':
        if (this.options.toggleOnSpace) {
          this.togglePopup();
          event.preventDefault();
        }
        this.setActiveItem(this.currentFocusedMenuItem);
        this.options.onSpace && this.options.onSpace(event);
        break;
      case 'Enter':
        this.setActiveItem(this.currentFocusedMenuItem);
        this.options.onEnter && this.options.onEnter(event);
        break;
      case 'Esc':
      case 'Escape':
        this.closePopup();
        this.options.onEscape && this.options.onEscape(event);
        break;
      case 'Tab':
        this.options.onTab && this.options.onTab(event);
        break;
      case 'Up':
      case 'ArrowUp':
        event.preventDefault();
        this.toPreviousItem();
        this.options.onUp && this.options.onUp(event);
        break;
      case 'Down':
      case 'ArrowDown':
        event.preventDefault();
        this.toNextItem();
        this.options.onDown && this.options.onDown(event);
        break;
      case 'Left':
      case 'ArrowLeft':
        if (this.options.autoCloseMenus) {
          this.closePopup();
        } else {
          this.focusToParent();
        }
        this.options.onLeft && this.options.onLeft(event);
        break;
      case 'Right':
      case 'ArrowRight':
        this.expandPopup();
        this.options.onRight && this.options.onRight(event);
        break;
      case 'Home':
      case 'PageUp':
        this.toFirstItem();
        this.options.onHome && this.options.onHome(event);
        break;
      case 'End':
      case 'PageDown':
        this.toLastItem();
        this.options.onEnd && this.options.onEnd(event);
        break;
      default:
        // Set focus by first character
        if (key.match(/\S/)) {
          if (this.toFirstLetter(key)) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
          this.options.onFirstLetter && this.options.onFirstLetter(event);
        }
        break;
    }
  };

  handleHorizontalMenuKeyDown = (key: KeyboardEvent['key'], event: KeyboardEvent) => {
    switch (key) {
      case ' ':
      case 'Space':
        if (this.options.toggleOnSpace) {
          this.togglePopup();
          event.preventDefault();
        }
        this.setActiveItem(this.currentFocusedMenuItem);
        this.options.onSpace && this.options.onSpace(event);
        break;
      case 'Enter':
        this.setActiveItem(this.currentFocusedMenuItem);
        this.options.onEnter && this.options.onEnter(event);
        break;
      case 'Esc':
      case 'Escape':
        this.closePopup();
        this.options.onEscape && this.options.onEscape(event);
        break;
      case 'Tab':
        this.options.onTab && this.options.onTab(event);
        break;
      case 'Up':
      case 'ArrowUp':
        this.closePopup();
        this.options.onUp && this.options.onUp(event);
        break;
      case 'Down':
      case 'ArrowDown':
        this.expandPopup();
        this.options.onDown && this.options.onDown(event);
        break;
      case 'Left':
      case 'ArrowLeft':
        event.preventDefault();
        this.toPreviousItem();
        this.options.onLeft && this.options.onLeft(event);
        break;
      case 'Right':
      case 'ArrowRight':
        event.preventDefault();
        this.toNextItem();
        this.options.onRight && this.options.onRight(event);
        break;
      case 'Home':
      case 'PageUp':
        this.toFirstItem();
        this.options.onHome && this.options.onHome(event);
        break;
      case 'End':
      case 'PageDown':
        this.toLastItem();
        this.options.onEnd && this.options.onEnd(event);
        break;
      default:
        // Set focus by first character
        if (key.match(/\S/)) {
          if (this.toFirstLetter(key)) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
          this.options.onFirstLetter && this.options.onFirstLetter(event);
        }
        break;
    }
  };

  onKeyDown = (event: KeyboardEvent) => {
    this.getFocusedMenuItem();

    this.currentFocusedMenuItem = event.target as HTMLElement;
    const parentMenu = this.getParentMenu(this.currentFocusedMenuItem as HTMLElement);
    const role = parentMenu?.getAttribute('role') || 'menubar';
    const parentMenuOrientation = parentMenu?.getAttribute('aria-orientation');
    const orientation = parentMenuOrientation || this.getDefaultOrientation(role);

    switch (orientation) {
      case 'vertical':
        return this.handleVerticalMenuKeyDown(event.key, event);
      case 'horizontal':
        return this.handleHorizontalMenuKeyDown(event.key, event);
    }
  };

  onFocusOut = () => {
    this.getFocusedMenuItem();
  };

  onPointerClick = (event: MouseEvent) => {
    const newMenuItemFocus = (event.target as HTMLElement)?.closest(`${this.selectMenuItem}`) as HTMLElement;
    if (newMenuItemFocus) {
      this.setActiveItem(newMenuItemFocus);
    }
  };

  destroy = () => {
    this.menuElement.removeEventListener('keydown', this.onKeyDown);
    this.menuElement.removeEventListener('onfocusout', this.onFocusOut);
    this.menuElement.removeEventListener('click', this.onPointerClick);
  };
};

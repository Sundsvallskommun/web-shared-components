import { IDataObject, IMenu } from './side-menu';

var dragging: boolean = false;
var draggedElement: Element;
var draggedElementData: IMenu | undefined;
var draggedElementDataParent: IMenu | undefined;
var dropSuccess: boolean = false;
var draggedElementGhost: any;
var draggedElementGhostBoundingClientRect: any;

export const Draggable = class {
  public menuElement: HTMLElement;
  public menuElementData: Array<IMenu>;
  public dropFunction: (draggedElementData: IMenu, newParent: IMenu) => void;
  public document: HTMLHtmlElement;
  constructor(
    menuElement: HTMLElement,
    menuElementData: Array<IMenu>,
    onDrop: (draggedItem: IMenu, newParent: IMenu) => void
  ) {
    this.menuElement = menuElement;
    this.menuElementData = menuElementData;
    this.dropFunction = onDrop;
    this.document = this.menuElement.closest('html') as HTMLHtmlElement;

    this.menuElement.addEventListener('mouseover', this.handleDragEnter);
    this.menuElement.addEventListener('mouseleave', this.handleDragLeave);
    this.menuElement.addEventListener('mousedown', this.handleDragStart);
    this.document.addEventListener('mouseup', this.handleDragEnd);
  }

  handleDragEnter = (e: MouseEvent) => {
    if (!dragging) return;
    this.removeDragenter();
    const elementData = this.getElementDataFromEvent(e);
    if (elementData && draggedElementData?.id == elementData.id) return;
    const closestMenuItem = this.getClosestMenuItem(e);
    if (closestMenuItem !== null) {
      if (!closestMenuItem.className.includes('movedAway')) {
        closestMenuItem.classList.add('dragenter');
      }
    }
  };

  handleDragLeave = (e: MouseEvent) => {
    if (!dragging) return;
    this.removeDragenter();
  };

  handleDragStart = (e: MouseEvent) => {
    dropSuccess = false;
    const isMoveButton = (e.target as HTMLElement).closest("[draggable='true']");
    if (!isMoveButton) return;
    const closestMenuItem = this.getClosestMenuItem(e);
    if (closestMenuItem) {
      dragging = true;
      draggedElement = closestMenuItem;

      this.createGhostElement(draggedElement);
      this.handleMouseDrag(e);
      this.document.addEventListener('mousemove', this.handleMouseDrag);

      draggedElement.classList.add('movedAway');
      draggedElementData = this.getElementDataFromEvent(e);
      if (draggedElementData) {
        draggedElementDataParent = this.findParentData(draggedElementData.id);
      }
    }
  };

  handleDragEnd = (e: MouseEvent) => {
    if (!dragging) return;
    this.handleDrop(e);
    if (!dropSuccess) {
      draggedElement.classList.remove('movedAway');
    }
    draggedElementGhost.remove();
    this.document.removeEventListener('mousemove', this.handleMouseDrag);
    dragging = false;
  };

  handleDrop = (e: MouseEvent) => {
    const closestMenuItem = this.document.querySelector('.dragenter');
    if (closestMenuItem?.className.includes('movedAway')) return;
    if (closestMenuItem?.className.includes('dragenter')) {
      this.document.querySelector('.dragenter')?.classList.remove('dragenter');
      const id = closestMenuItem.getAttribute('data-id');
      if (!id) return;
      const newParent: IMenu | undefined = this.findElementFromId(parseInt(id));
      if (
        newParent &&
        draggedElementData &&
        newParent.id !== draggedElementData.id &&
        draggedElementDataParent?.id !== newParent.id
      ) {
        draggedElement.classList.add('movedAway');
        this.dropFunction(draggedElementData, newParent);
        e.stopPropagation();
        dropSuccess = true;
      }
    }
  };

  handleMouseDrag = (e: MouseEvent) => {
    draggedElementGhost.style.top = e.clientY - 20 + 'px';
    draggedElementGhost.style.left = e.clientX + 10 + 'px';
  };

  createGhostElement = (draggedElement: Element) => {
    draggedElementGhost = draggedElement.cloneNode(true);
    draggedElementGhost.style.position = 'fixed';
    draggedElementGhostBoundingClientRect = draggedElement.getBoundingClientRect();
    draggedElementGhost.style.height = draggedElementGhostBoundingClientRect.height + 'px';
    draggedElementGhost.style.width = draggedElementGhostBoundingClientRect.width + 'px';
    draggedElementGhost.style.pointerEvents = 'none';
    draggedElementGhost.style.opacity = '.75';
    const wrapper = document.createElement('div');
    wrapper.classList.add('side-menu');
    wrapper.style.fontSize = 'inherit';
    wrapper.appendChild(draggedElementGhost);
    this.document.appendChild(wrapper);
  };

  removeDragenter = () => {
    this.document.querySelector('.dragenter')?.classList.remove('dragenter');
  };

  getClosestMenuItem = (e: MouseEvent) => {
    if (e.target !== null) {
      return (e.target as Element).closest('.MenuItem');
    }
    return null;
  };

  getParentData = (elementData: IMenu, id: IMenu['id']): IMenu | undefined => {
    if (elementData.id == id) return elementData; // is top parent
    if (!elementData.subItems) return undefined;
    if (elementData?.subItems?.length > 0) {
      if (elementData?.subItems?.find((x: IDataObject) => x.id == id)) {
        return elementData;
      }
      for (const subItem of elementData.subItems) {
        const found: any = this.getParentData(subItem, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  findParentData = (id: IMenu['id']): IMenu | undefined => {
    let result: IMenu | undefined = undefined;
    this.menuElementData.find((menuElement) => {
      result = this.getParentData(menuElement, id);
      return result !== undefined;
    });
    return result ? result : undefined;
  };

  getElementFromId = (element: IMenu, id: number) => {
    if (!element) return;
    if (parseInt(element.id as string) === id) {
      return element;
    } else if (element.subItems && element.subItems.length > 0) {
      for (const subItem of element.subItems) {
        const found: any = this.getElementFromId(subItem, id);
        if (found) return found;
      }
    }
  };

  findElementFromId = (id: number): IMenu | undefined => {
    let result: IMenu | undefined = undefined;
    this.menuElementData.find((menuElement) => {
      result = this.getElementFromId(menuElement, id);
      return result !== undefined;
    });
    return result ? result : undefined;
  };

  getElementDataFromEvent = (e: MouseEvent): IMenu | undefined => {
    const closestMenuItem = this.getClosestMenuItem(e);
    if (closestMenuItem !== null) {
      const id = closestMenuItem.getAttribute('data-id');
      if (!id) return undefined;
      return this.findElementFromId(parseInt(id));
    }
    return undefined;
  };

  destroy = () => {
    this.menuElement.removeEventListener('mouseover', this.handleDragEnter);
    this.menuElement.removeEventListener('mouseleave', this.handleDragLeave);
    this.menuElement.removeEventListener('mousedown', this.handleDragStart);
    this.document.removeEventListener('mouseup', this.handleDragEnd);
  };
};

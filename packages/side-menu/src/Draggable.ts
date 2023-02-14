import { IMenuExtended } from './menu-item';
import { IDataObject, IMenu } from './side-menu';

var draggedElement: Element;
var draggedElementData: IMenu;
var draggedElementDataParent: IMenu;
var dragoverTimeout: any;
var dropSuccess: boolean = false;

export const Draggable = class {
  public element: HTMLElement;
  public elementData: IMenu;
  public dropFunction: (draggedElementData: IMenu, newParent: IMenu) => void;
  constructor(
    element: HTMLElement,
    elementData: IMenuExtended,
    onDrop: (draggedItem: IMenu, newParent: IMenu) => void
  ) {
    this.element = element;
    this.elementData = elementData;
    this.dropFunction = onDrop;

    this.element.addEventListener('dragenter', this.handleDragEnter);
    this.element.addEventListener('dragleave', this.handleDragLeave);
    this.element.addEventListener('dragover', this.handleDragOver);
    this.element.addEventListener('dragstart', this.handleDragStart);
    this.element.addEventListener('dragend', this.handleDragEnd);
    this.element.addEventListener('drop', this.handleDrop);
  }

  handleDragEnter = (e: DragEvent) => {
    this.removeDragenter();
    if (draggedElementData.id == this.getElementDataFromEvent(e).id) return;
    const closestMenuItem = this.getClosestMenuItem(e);
    if (closestMenuItem !== null) {
      if (!closestMenuItem.className.includes('movedAway')) {
        closestMenuItem.classList.add('dragenter');
      }
    }
  };

  handleDragLeave = () => {
    if (!dragoverTimeout) {
      dragoverTimeout = window.setTimeout(() => {
        this.removeDragenter();
      }, 100);
    }
  };

  handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (dragoverTimeout) {
      window.clearTimeout(dragoverTimeout);
      dragoverTimeout = null;
    }
  };

  handleDragStart = (e: DragEvent) => {
    setTimeout(() => {
      window.addEventListener('mousemove', this.handleMouseDrag);
    });
    dropSuccess = false;
    const closestMenuItem = this.getClosestMenuItem(e);
    if (e.dataTransfer && closestMenuItem) {
      draggedElement = closestMenuItem;
      draggedElement.classList.add('movedAway');
      e.dataTransfer.setDragImage(closestMenuItem, 0, 0);
    }
    draggedElementData = this.getElementDataFromEvent(e);
    draggedElementDataParent = this.getParentData(this.elementData, draggedElementData.id);
    console.log('draggedElementDataParent', draggedElementDataParent);
  };

  handleDragEnd = () => {
    if (!dropSuccess) {
      draggedElement.classList.remove('movedAway');
    }
    window.removeEventListener('mousemove', this.handleMouseDrag);
  };

  handleDrop = (e: DragEvent) => {
    const closestMenuItem = this.getClosestMenuItem(e);
    if (closestMenuItem?.className.includes('movedAway')) return;
    if (closestMenuItem?.className.includes('dragenter')) {
      document.querySelector('.dragenter')?.classList.remove('dragenter');
      const newParent: IMenu = this.getElementDataFromEvent(e);
      if (newParent.id !== draggedElementData.id && draggedElementDataParent.id !== newParent.id) {
        draggedElement.classList.add('movedAway');
        this.dropFunction(draggedElementData, newParent);
        e.stopPropagation();
        dropSuccess = true;
      }
    }
  };

  handleMouseDrag = (e: MouseEvent) => {
    console.log('handleMouseDrag', e.clientX, e.clientY);
  };

  getParentData = (elementData: IMenu, id: IMenu['id']) => {
    if (elementData.id == id) return elementData; // is top parent
    if (!elementData.subItems) return null;
    if (elementData?.subItems?.length > 0) {
      if (elementData?.subItems?.find((x: IDataObject) => x.id == id)) {
        return elementData;
      }
      for (const subItem of elementData.subItems) {
        const found: any = this.getParentData(subItem, id);
        if (found) return found;
      }
    }
    return null;
  };

  removeDragenter = () => {
    document.querySelector('.dragenter')?.classList.remove('dragenter');
  };

  setDraggedElementPosition = (e: MouseEvent) => {
    console.log('setDraggedElementPosition', e);
  };

  getClosestMenuItem = (e: DragEvent) => {
    if (e.target !== null) {
      return (e.target as Element).closest('.MenuItem');
    }
    return null;
  };

  getElementFromId = (element: any, id: any) => {
    if (element.id.toString() === id.toString()) {
      return element;
    } else if (element.subItems?.length > 0) {
      for (const subItem of element.subItems) {
        const found: any = this.getElementFromId(subItem, id);
        if (found) return found;
      }
    }
  };

  getElementDataFromEvent = (e: DragEvent) => {
    const closestMenuItem = this.getClosestMenuItem(e);
    if (closestMenuItem !== null) {
      const id = closestMenuItem.getAttribute('data-id');
      return this.getElementFromId(this.elementData, id);
    }
  };

  destroy = () => {
    this.element.removeEventListener('dragenter', this.handleDragEnter);
    this.element.removeEventListener('dragleave', this.handleDragLeave);
    this.element.removeEventListener('dragover', this.handleDragOver);
    this.element.removeEventListener('dragstart', this.handleDragStart);
    this.element.removeEventListener('dragend', this.handleDragEnd);
    this.element.removeEventListener('drop', this.handleDrop);
  };
};

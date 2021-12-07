export class Draggable {

  constructor() {

    // draggable.createDraggableContent({
    //   draggableElementSelector: '.my-apples',
    //   dropAreaSelector: '.my-apple-container',
    //   eventPrefix: 'apple',
    // });
    //
    // draggable.on('dragstart:apple', (e) => {
    //
    // })


    this.ops = new Map();
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.dragData;
    this.placeHolder;
    this.elements;
    this.currentElement;
    this.handle;
  }

  setElement(el, hooks, handle = null) {
    this.ops.set(el, {
      hooks
    });

    this.handle = handle;
  
    (this.handle || el).setAttribute('draggable', true);
    (this.handle || el).addEventListener('dragstart', this.onDragStart);
  }

  //must create clone and dragData.clone for succesfull dragging operation
  onDragStart(e) {
    e.preventDefault();
    const op = this.ops.get(e.target);
    this.currentElement = (this.handle || e.target);

    window.addEventListener("pointermove", this.onDrag);
    window.addEventListener("pointerup", this.onDrop);

    const movingItem = this.handle && this.closest ? this.handle.closest(this.closest) : e.target;

    const clone = movingItem.cloneNode(true);
    clone.classList.add("clone");

    this.dragData = {
      clone
    };

    if (op && op.hooks && op.hooks.onDragStart && typeof op.hooks.onDragStart === 'function') {
      op.hooks.onDragStart(e);
    }
  }

  onDrag(ev) {//op changes all time so we have find another way to handle mouse move
    const op = this.ops.get(this.currentElement);

    if (this.dragData && this.dragData.clone && !this.dragData.clone.parentNode) {
      document.body.appendChild(this.dragData.clone);
    }

    const centerToElement = this.handle || this.dragData.clone;

    if (this.dragData && this.dragData.clone) {
      this.dragData.clone.style.left =
        ev.clientX - centerToElement.offsetWidth / 2 + "px";
      this.dragData.clone.style.top =
        ev.clientY - centerToElement.offsetHeight / 2 + "px";
    }

    this.elements = document.elementsFromPoint(ev.clientX, ev.clientY);

    let underElement = this.elements[1].getBoundingClientRect()
    this.left = ev.clientX - underElement.left; //x position within the element.
    this.top = ev.clientY - underElement.top; //y position within the element.

    if (op && op.hooks && op.hooks.onDrag && typeof op.hooks.onDrag === 'function') {
      op.hooks.onDrag(ev);
    }
  }

  onDrop(e) {
    window.removeEventListener("pointermove", this.onDrag);
    window.removeEventListener("pointerup", this.onDrop);

    const op = this.ops.get(this.currentElement);
    this.currentElement = null;

    if (this.dragData && this.dragData.clone) {
      this.dragData.clone.remove();
    }
    this.dragData = null;

    if (op && op.hooks && op.hooks.onDrop && typeof op.hooks.onDrop === 'function') {
      op.hooks.onDrop(e);
    }
  }

}

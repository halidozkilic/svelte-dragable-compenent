class Draggable {

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
    console.log(this.closest);
    const movingItem =  this.handle.closest('myitem'); 
    console.log(movingItem);
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

    let underElement = this.elements[1].getBoundingClientRect();
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

export { Draggable as D };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ2dhYmxlLjFiYzZkOTBhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL0RyYWdnYWJsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRHJhZ2dhYmxlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgLy8gZHJhZ2dhYmxlLmNyZWF0ZURyYWdnYWJsZUNvbnRlbnQoe1xyXG4gICAgLy8gICBkcmFnZ2FibGVFbGVtZW50U2VsZWN0b3I6ICcubXktYXBwbGVzJyxcclxuICAgIC8vICAgZHJvcEFyZWFTZWxlY3RvcjogJy5teS1hcHBsZS1jb250YWluZXInLFxyXG4gICAgLy8gICBldmVudFByZWZpeDogJ2FwcGxlJyxcclxuICAgIC8vIH0pO1xyXG4gICAgLy9cclxuICAgIC8vIGRyYWdnYWJsZS5vbignZHJhZ3N0YXJ0OmFwcGxlJywgKGUpID0+IHtcclxuICAgIC8vXHJcbiAgICAvLyB9KVxyXG5cclxuXHJcbiAgICB0aGlzLm9wcyA9IG5ldyBNYXAoKTtcclxuICAgIHRoaXMub25EcmFnU3RhcnQgPSB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uRHJhZyA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uRHJvcCA9IHRoaXMub25Ecm9wLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRyYWdEYXRhO1xyXG4gICAgdGhpcy5wbGFjZUhvbGRlcjtcclxuICAgIHRoaXMuZWxlbWVudHM7XHJcbiAgICB0aGlzLmN1cnJlbnRFbGVtZW50O1xyXG4gICAgdGhpcy5oYW5kbGU7XHJcbiAgfVxyXG5cclxuICBzZXRFbGVtZW50KGVsLCBob29rcywgaGFuZGxlID0gbnVsbCkge1xyXG4gICAgdGhpcy5vcHMuc2V0KGVsLCB7XHJcbiAgICAgIGhvb2tzXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZSA9IGhhbmRsZTtcclxuICBcclxuICAgICh0aGlzLmhhbmRsZSB8fCBlbCkuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKTtcclxuICAgICh0aGlzLmhhbmRsZSB8fCBlbCkuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5vbkRyYWdTdGFydCk7XHJcbiAgfVxyXG5cclxuICAvL211c3QgY3JlYXRlIGNsb25lIGFuZCBkcmFnRGF0YS5jbG9uZSBmb3Igc3VjY2VzZnVsbCBkcmFnZ2luZyBvcGVyYXRpb25cclxuICBvbkRyYWdTdGFydChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBvcCA9IHRoaXMub3BzLmdldChlLnRhcmdldCk7XHJcbiAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gKHRoaXMuaGFuZGxlIHx8IGUudGFyZ2V0KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHRoaXMub25EcmFnKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIHRoaXMub25Ecm9wKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY2xvc2VzdClcclxuICAgIGNvbnN0IG1vdmluZ0l0ZW0gPSAgdGhpcy5oYW5kbGUuY2xvc2VzdCgnbXlpdGVtJykgXHJcbiAgICBjb25zb2xlLmxvZyhtb3ZpbmdJdGVtKVxyXG4gICAgY29uc3QgY2xvbmUgPSBtb3ZpbmdJdGVtLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoXCJjbG9uZVwiKTtcclxuXHJcbiAgICB0aGlzLmRyYWdEYXRhID0ge1xyXG4gICAgICBjbG9uZVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAob3AgJiYgb3AuaG9va3MgJiYgb3AuaG9va3Mub25EcmFnU3RhcnQgJiYgdHlwZW9mIG9wLmhvb2tzLm9uRHJhZ1N0YXJ0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG9wLmhvb2tzLm9uRHJhZ1N0YXJ0KGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25EcmFnKGV2KSB7Ly9vcCBjaGFuZ2VzIGFsbCB0aW1lIHNvIHdlIGhhdmUgZmluZCBhbm90aGVyIHdheSB0byBoYW5kbGUgbW91c2UgbW92ZVxyXG4gICAgY29uc3Qgb3AgPSB0aGlzLm9wcy5nZXQodGhpcy5jdXJyZW50RWxlbWVudCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZHJhZ0RhdGEgJiYgdGhpcy5kcmFnRGF0YS5jbG9uZSAmJiAhdGhpcy5kcmFnRGF0YS5jbG9uZS5wYXJlbnROb2RlKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kcmFnRGF0YS5jbG9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2VudGVyVG9FbGVtZW50ID0gdGhpcy5oYW5kbGUgfHwgdGhpcy5kcmFnRGF0YS5jbG9uZTtcclxuXHJcbiAgICBpZiAodGhpcy5kcmFnRGF0YSAmJiB0aGlzLmRyYWdEYXRhLmNsb25lKSB7XHJcbiAgICAgIHRoaXMuZHJhZ0RhdGEuY2xvbmUuc3R5bGUubGVmdCA9XHJcbiAgICAgICAgZXYuY2xpZW50WCAtIGNlbnRlclRvRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIgKyBcInB4XCI7XHJcbiAgICAgIHRoaXMuZHJhZ0RhdGEuY2xvbmUuc3R5bGUudG9wID1cclxuICAgICAgICBldi5jbGllbnRZIC0gY2VudGVyVG9FbGVtZW50Lm9mZnNldEhlaWdodCAvIDIgKyBcInB4XCI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LmVsZW1lbnRzRnJvbVBvaW50KGV2LmNsaWVudFgsIGV2LmNsaWVudFkpO1xyXG5cclxuICAgIGxldCB1bmRlckVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzWzFdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICB0aGlzLmxlZnQgPSBldi5jbGllbnRYIC0gdW5kZXJFbGVtZW50LmxlZnQ7IC8veCBwb3NpdGlvbiB3aXRoaW4gdGhlIGVsZW1lbnQuXHJcbiAgICB0aGlzLnRvcCA9IGV2LmNsaWVudFkgLSB1bmRlckVsZW1lbnQudG9wOyAvL3kgcG9zaXRpb24gd2l0aGluIHRoZSBlbGVtZW50LlxyXG5cclxuICAgIGlmIChvcCAmJiBvcC5ob29rcyAmJiBvcC5ob29rcy5vbkRyYWcgJiYgdHlwZW9mIG9wLmhvb2tzLm9uRHJhZyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBvcC5ob29rcy5vbkRyYWcoZXYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Ecm9wKGUpIHtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgdGhpcy5vbkRyYWcpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgdGhpcy5vbkRyb3ApO1xyXG5cclxuICAgIGNvbnN0IG9wID0gdGhpcy5vcHMuZ2V0KHRoaXMuY3VycmVudEVsZW1lbnQpO1xyXG4gICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuZHJhZ0RhdGEgJiYgdGhpcy5kcmFnRGF0YS5jbG9uZSkge1xyXG4gICAgICB0aGlzLmRyYWdEYXRhLmNsb25lLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kcmFnRGF0YSA9IG51bGw7XHJcblxyXG4gICAgaWYgKG9wICYmIG9wLmhvb2tzICYmIG9wLmhvb2tzLm9uRHJvcCAmJiB0eXBlb2Ygb3AuaG9va3Mub25Ecm9wID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG9wLmhvb2tzLm9uRHJvcChlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBTyxNQUFNLFNBQVMsQ0FBQztBQUN2QjtBQUNBLEVBQUUsV0FBVyxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJ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
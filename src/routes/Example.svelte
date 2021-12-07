<script>
  import { onMount } from 'svelte';
  import { Draggable } from './Draggable.js';

  const draggable = new Draggable();
  draggable.closest = '.myitem';
  let mydiv;
  let handle;

  function onDragStart(ev) {
    /*
    // set cloned object and its bg color
    const clone = ev.target.cloneNode(true);
    clone.classList.add("clone");

    draggable.dragData = {
      clone,

    };
    */
  }

  function onDrag(ev) {
    if (draggable.dragData && draggable.dragData.clone && !draggable.dragData.clone.parentNode) {
      document.body.appendChild(draggable.dragData.clone);
    }
    if (draggable && draggable.dragData && draggable.dragData.clone) {
      draggable.dragData.clone.style.left =
        ev.clientX - draggable.dragData.clone.offsetWidth / 8 + "px";
      draggable.dragData.clone.style.top =
        ev.clientY - draggable.dragData.clone.offsetHeight / 4 + "px";
      draggable.dragData.clone.style.background = 'orange'
    }
  }

  function onDrop() {

  }

  onMount(() => {
    draggable.setElement(mydiv, {
      onDragStart,
      onDrag,
      onDrop
    }, handle)

  });
</script>

<div class="myitem" style="width: 100%; height: 80px; background-color: #555;" bind:this={mydiv}>
  <div
    style=" cursor: grab;width: 20px"
    class="handle"
    bind:this={handle}
  >
    [=]
  </div>
</div>
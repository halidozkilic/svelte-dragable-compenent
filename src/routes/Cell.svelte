<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { Draggable } from './Draggable.js';

  export let row;
  export let id;

  const draggable = new Draggable();
  draggable.closest = '.field';

  let cells = [];
  let handle;

  function onDragStart(ev) {
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

  function onDrag(ev) {

  }

  function onDrop() {

  }

  onMount(() => {
    cells.forEach((item) => {
      draggable.setElement(item, {
        onDragStart,
        onDrag,
        onDrop
      }, handle)
    })
  });

</script>

<style>
    .cell {
        flex: 1;
        color: #bbb;
        border: 1px solid #888;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
    }

    .cell:not(:first-of-type),
    .cell:first-of-type {
        border-left: none;
    }

    .handle {
        position: absolute;
        left: 4px;
        cursor: grab;
        font-size: 10px;
    }
</style>

<div
  class="cell field"
  style="background-color: {row.color}"
  {id}
  bind:this={cells[id]}
>
  <div
    class="handle"
    bind:this={handle}
  >
    [=]
  </div>
  {row.title}
</div>

<script>
  import { onMount } from "svelte";
  import Row from "./Row.svelte";
  import { Draggable } from "./Draggable.js";
  import Example from "./example.svelte";

  const draggable = new Draggable();

  let activeArea = 25;
  let placeholder = null;
  let to;
  let dontMove;
  //export let relocate = false;
  let bindItems = [];

  //$: console.trace(placeholder);

  const COLORS = {
    brown: "#721919",
    blue: "#22228d",
    orange: "#976100",
    green: "#1f621f",
    red: "#873e3e",
    pink: "#873e75",
    gray: "#424242",
    yellow: "#767614",
  };

  let dragItems = [
    { id: 1, title: "Drag Item 1", color: COLORS.brown },
    { id: 2, title: "Drag Item 2", color: COLORS.green },
    { id: 3, title: "Drag Item 3", color: COLORS.pink },
    { id: 4, title: "Drag Item 4", color: COLORS.gray },
    { id: 10, title: "Drag Item 4", color: COLORS.blue },
  ];

  let dropZoneItems = [
    // [{ id: 13, title: "Item (blue)", color: COLORS.blue }],
    // [
    //   { id: 5, title: "Item (yellow)", color: COLORS.yellow },
    //   { id: 6, title: "Item (orange)", color: COLORS.orange },
    //   { id: 7, title: "Item (blue)", color: "#22228d" },
    // ],
    // [{ id: 8, title: "Item (green)", color: COLORS.green }],
    // [
    //   { id: 9, title: "Item (yellow)", color: COLORS.yellow },
    //   { id: 10, title: "Item (blue)", color: COLORS.blue },
    //   { id: 11, title: "Item (orange)", color: COLORS.orange },
    //   { id: 12, title: "Item (red)", color: COLORS.red },
    //   { id: 13, title: "Item (red)", color: COLORS.red },
    //   { id: 14, title: "Item (red)", color: COLORS.red },
    //   { id: 16, title: "Item (red)", color: COLORS.red },
    // ],
  ];

  function generatePlaceHolder(vIdx, hIdx) {
    placeholder = {
      item: draggable.dragData.item,
      placeholder: true,
      color: "rgb(124 124 124 / 72%)",
      position: [vIdx, hIdx],
    };
  }

  function addNewCell() {
    if (placeholder.position[1] === null) {
      dropZoneItems.splice(placeholder.position[0], 0, [placeholder]);
    } else {
      dropZoneItems[placeholder.position[0]].splice(
        placeholder.position[1],
        0,
        placeholder
      );
    }
    dropZoneItems = dropZoneItems;
  }

  function removeCell(VIdx, HIdx) {
    if (!placeholder) return;
    if (placeholder && placeholder.position[1] === null) {
      dropZoneItems.splice(placeholder.position[0], 1);
    } else {
      dropZoneItems[placeholder.position[0]].splice(placeholder.position[1], 1);
    }
    dropZoneItems = dropZoneItems;
    placeholder = null;
  }

  function removePlaceHolderKey() {
    //All dropZoneItems must have same data structre
    if (placeholder && placeholder.position)
      dropZoneItems[placeholder.position[0]][placeholder.position[1] || 0] =
        placeholder.item;
  }

  function onDragStart(ev) {
    draggable.dragData.item = dragItems.find(
      (o) => o.id === Number(ev.target.getAttribute("data-id"))
    );
  }

  function onDrag(ev) {
    const onField =
      draggable.elements[1] &&
      (draggable.elements[1].classList.contains("field") ||
        draggable.elements[1].classList.contains("placeholder"));

    const onZone =
      draggable.elements[1] && draggable.elements[1].classList.contains("zone");

    if (onField && !dontMove) {
      const onHorizontal =
        draggable.left < activeArea ||
        draggable.left > draggable.elements[1].offsetWidth - activeArea;

      let hIdx;
      let vIdx;

      if (draggable.elements[1].getAttribute("data-placeholder")) return;

      vIdx = calculateVIdx(
        draggable.elements,
        draggable.top,
        onHorizontal
      );
      if (vIdx === null) {
        if (placeholder !== null) {
          removeCell();
        }
        return;
      }

      if (onHorizontal) {
        hIdx = calculateHIdx(draggable.elements, draggable.left);
      } else {
        hIdx = null;
      }

      if (!placeholder) {
        generatePlaceHolder(vIdx, hIdx);
        addNewCell();

        dontMove = true;
        clearTimeout(to);
        to = setTimeout(() => {
          dontMove = false;
        }, 800);
      }
      const deletePlaceHolder =
        (vIdx !== placeholder.position[0] ||
          hIdx !== placeholder.position[1]) &&
        !draggable.elements[1].getAttribute("data-placeholder");

      if (placeholder && deletePlaceHolder) {
        removeCell();
      }
    }

    //once mouse lefts from field then delete placerholder
    if (!onField && placeholder) {
      removeCell();
    }

    //dropping first element
    if (!onField && onZone && dropZoneItems.length < 1) {
      generatePlaceHolder(0, null);
      addNewCell();
    }
  }

  function onDrop(ev) {
    removePlaceHolderKey();
    placeholder = null;
  }

  function calculateHIdx(elements, left) {
    if (left > elements[1].offsetWidth / 2) {
      return Number(elements[1].id) + 1;
    } else {
      return elements[2].classList.contains("field")
        ? Number(elements[2].id)
        : Number(elements[1].id);
    }
  }

  function calculateVIdx(elements, top, onHorizontal) {
    const lineElement = elements[1].closest('.row');

    if (onHorizontal) {
      return Number(lineElement.getAttribute('id'));
    }

    if (top > lineElement.offsetHeight - activeArea) {
      return Number(lineElement.id) + 1;
    }

    if (top < activeArea) {
      return Number(lineElement.id);
    }
    return null
  }

  onMount(() => {
    bindItems.forEach((item) => {
      draggable.setElement(item, {
        onDragStart,
        onDrag,
        onDrop,
      });
    });
  });
</script>

<!--drop zone-->
<div class="zone">
  {#each dropZoneItems as rows, index}
    <Row {placeholder} rowIndex={index} {rows} />
  {/each}
</div>

<div class="drag-list" id="dragList">
  {#each dragItems as item, index (item.id)}
    <div
      bind:this={bindItems[index]}
      class="cell"
      data-id={item.id}
      style="background-color: {item.color};"
    >
      {item.title}
    </div>
  {/each}
</div>

<Example />

<style>
  :global(html),
  :global(body) {
    margin: 0;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
  }

  @keyframes w {
    0% {
      flex: 0;
    }
    100% {
      flex: 1;
    }
  }

  @keyframes h {
    0% {
      height: 0;
    }
    100% {
      height: 80px;
    }
  }

  :global(.placeholderw) {
    animation: w 0.2s;
  }

  :global(.placeholderh) {
    animation: h 0.2s;
  }

  .cell {
    flex: 1;
    color: #bbb;
    border: 1px solid #888;
    overflow: hidden;
    white-space: nowrap;
  }

  .zone {
    border: #999 1px solid;
    width: 100%;
    margin-bottom: 50px;
    min-height: 80px;
  }

  .drag-list {
    border: 1px solid;
    width: 200px;
  }

  :global(.clone) {
    width: 200px !important;
    position: absolute;
    opacity: 0.6;
  }
</style>

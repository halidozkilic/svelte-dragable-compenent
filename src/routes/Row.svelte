<script>
  import Cell from './Cell.svelte';
  import Placeholder from './Placeholder.svelte';

  export let rows;
  export let placeholder;
  export let rowIndex;

  let id;

  function shouldInsertFullRowPlaceholder() {
    return placeholder && 
      placeholder.position[0] === indexJ && 
      placeholder.position[1] === null;
  }

</script>

<style>
    .row {
        font-size: 19px;
        display: flex;
        text-align: center;
        height: 80px;
        flex: 1;
    }

    :global(.row:not(:first-of-type) > .cell),
    :global(.row:first-of-type > .cell) {
        border-top: none;
    }

    :global(.row:last-of-type > .cell) {
        border-bottom: none;
    }

</style>

<div
  class="row"
  class:placeholderh={shouldInsertFullRowPlaceholder}
  id={rowIndex}
>
  {#each rows as row, index}
    {#if row.placeholder}
      <Placeholder
        {placeholder}
      />
    {:else}
      <Cell
        {row}
        id={index}
      />
    {/if}
  {/each}
</div>

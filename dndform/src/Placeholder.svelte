<script>
  export let placeholder;
</script>

<style>
  .placeholder {
      flex: 1;
      color: #bbb;
      border: 1px solid #888;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
  }

  .placeholder:not(:first-of-type),
  .placeholder:first-of-type {
      border-left: none;
  }
</style>

<div
  class="placeholder"
  class:placeholderw={placeholder.position[1] || placeholder.position[1] === 0}
  style="background-color: {placeholder.color}"
  data-placeholder="true"
/>
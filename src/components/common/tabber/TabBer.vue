<template>
  <div id="tab-ber">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBer"
  }
</script>

<style scoped>
  #tab-ber {
    display: flex;
    background-color: #ccc;

    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100,100,100,0.1);
  }
</style>

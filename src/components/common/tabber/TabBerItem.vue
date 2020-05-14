<template>
  <div class="tab-ber-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle" ><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBerItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default:'red'
      }
    },
    data() {
      return {
        // isActive: false
      }
    },
    computed: {
      isActive() {
        // /home -> item1(/home) = true
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color : this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-ber-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-ber-item img {
    height: 24px;
    width: 24px;
  }

</style>

<template>
  <div id="app">

<!--    <tab-ber>-->
<!--      <tab-ber-item>-->
<!--        <img src="">-->
<!--        <div></div>-->
<!--      </tab-ber-item>-->
<!--    </tab-ber>-->

<!--    让Home不要随意销毁,用keep-alive-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-ber></main-tab-ber>

  </div>
</template>

<script>
import MainTabBer from "./components/content/mainTabber/MainTabBer";

export default {
  name: 'App',
  components: {
    MainTabBer
  }
}
</script>

<style>
  @import "./assets/css/base.css";


</style>

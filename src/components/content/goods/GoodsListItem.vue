<template>
  <div class="goods-item" @click="itemClick">
<!--    监听图片加载完成：1.原生的js监听图片：img.onload = function(){}-->
<!--                    2.vue中监听：@load='方法'-->
    <img :src="showImage" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {

      // 事件总线:涉及到非父子组件的通信
      // Vue.prototype.$bus = new Vue()
      // this.$bus.$emit('事件名称')
      // this.$bus.$on('事件名称',回调函数(参数))
      imageLoad() {
        this.$bus.$emit('itemImageLoad')

        // 各自监听自己的全局事件0
        // if(this.$route.path.indexOf('/home')){
        //   this.$bus.$emit('homeItemImageLoad')
        // }else if(this.$route.path.indexOf('/detail')){
        //   this.$bus.$emit('detailItemImageLoad')
        // }
      },

      // 获取详情页的iid
      itemClick() {
        // 跳转到详情页
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

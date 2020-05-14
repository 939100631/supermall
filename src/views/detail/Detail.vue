<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="Shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

  import Scroll from "../../components/common/Scroll/Scroll";

  import {getDetail, Goods, Shop} from "../../network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        Shop: {},
        detailInfo: {}

        // price:null,    //这个null声明的就是数字类型，如果后端需要的是数字类型，而你写的是''，那么就一定会报错
        // goods:'' ,   //同理，''就是字符串，要求字段要什么类型你就声明什么类型
        // form:{
        //   id:''    //这个就是对象写法
        // },
        // tableata:[]    //声明数组
      }
    },
    created() {
      // console.log(this.$route.params);

      // 1.保存获取的iid，通过iid去获取更详细的信息
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取商品的店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情页面
        this.detailInfo = data.detailInfo
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>

<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <ul>
        <li v-for="item in $store.state.cartList" :key="item.iid">
          {{item}}
        </li>
      </ul>

      <!-- 属性：topImages  传入值：top-images-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="Shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/Scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  // import BackTop from "components/content/backtop/BackTop";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";

  import {itemListenerMixin, backTopMinin} from "../../common/mixin";
  import {debounce} from "../../common/utils";


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // BackTop
    },
    mixins: [itemListenerMixin, backTopMinin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        Shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // isShowBackTop: true,

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
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取商品的店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情页面
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论的信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        // 1.第一次获取，值不对
        // 原因：this.$refs.param.$el压根没有渲染
        // this.themeTopYs = []
        //
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        //
        // console.log(this.themeTopYs);

        // this.$nextTick(() => {
          // 2.第二次：值不对
          // 原因:图片没有计算在内
          // 根据最新的数据，对应的Dom是已经被渲染出来
          // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
          // offsetTop值不对的时候，都是因为图片问题
          // this.themeTopYs = []
          //
          // this.themeTopYs.push(0)
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          //
          // console.log(this.themeTopYs);
        // })
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      // 4.给getThemeTopY赋值(对给getThemeTopY赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)

        console.log(this.themeTopYs);
      }, 100)
    },
    mounted(){
      // let newRefresh = debounce(this.$refs.scroll.refresh, 100)
      // this.itemImgListener = () => {
      //   newRefresh()
      // }
      // this.$bus.$on('itemImgLoad', this.itemImgListener)

      // console.log('mounted');
    },
    updated() {

    },
    deactivated() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        // 1.
        // this.$refs.scroll.refresh()
        // 2.使用防抖函数
        this.newRefresh()

        this.getThemeTopY()
      },

      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      // backClick() {
      //   this.$refs.scroll.scrollTo(0, 0)
      // },

      contentScroll(position) {

        // 1.获取Y值
        const positionY = -position.y

        // 2.positionY和主题中值进行对比
        // [0, 7938, 9120, 9452]
        // positionY在0 ~ 7938 之间， index = 0
        // positionY在7938 ~ 9120 之间， index = 1
        // positionY在9120 ~ 9452 之间， index = 2
        // positionY大于或等于 9452， index = 3

        // positionY在9452 ~ Number.MAX_VALUE 之间， index = 3

        let length = this.themeTopYs.length
        // for(let i = 0; i < length; i++) {
        //   // this.currentIndex !== i 防止赋值的过程过于频繁
        //   if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i]
        //       && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i;
        //     console.log(this.currentIndex);
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }

        for(let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && (positionY >=this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 3.是否显示回到顶部
        this.isShowBackTop = (-position.y) >1000

      },
      addToCart(){
        // 1.获取购物车拿到的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车里
        // console.log(this.$store)
        // this.$store.commit('addCart', product)  //mutation
        this.$store.dispatch('addCart', product) //action
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
    height: calc(100% - 44px - 49px);
  }
</style>

import {debounce} from "./utils";
import BackTop from "components/content/backtop/BackTop";


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  //生命周期的函数可以收取，既可在mixin写，也可以在.vue写，最后会合并
  // 但是methods里的函数内部的东西不能抽取，最后只能合并函数，函数内部的东西会被覆盖
  mounted() {
    // this.$refs.scroll.refresh对这个函数进行防抖操作
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

    // 对监听事件进行保存
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('混入');
  }
}

export const backTopMinin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}

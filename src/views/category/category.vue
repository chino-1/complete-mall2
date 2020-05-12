<template>
    <div id="category">
        <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
        <div class="content">
            <cate-goods-list :goodslist="goodslist" @selectItem="selectItem"
                ></cate-goods-list>
            <scroll :data="[goodsItem]" id="tab-content" ref="catescroll">
                    <cate-goods-right :goodsItem="showSubcategory" 
                    ></cate-goods-right>
                    <tab-control :titles="['综合', '新品', '销量']"
                       @tabclick="tabClick"></tab-control>
                    <cate-goods-detail :category-detail="showCategoryDetail"></cate-goods-detail>
            </scroll>
        </div>
    </div>
</template>
<script scoped>
import NavBar from 'components/common/navbar/NavBar'
import CateGoodsList from './childComps/CateGoodsList'
import CateGoodsRight from './childComps/CateGoodsRight'
import Scroll from 'components/common/Scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import CateGoodsDetail from './childComps/CateGoodsDetail'

import {getCategory,getSubcategory,getCategoryDetail} from "network/category"
import {debounce} from 'common/utils'
export default {
    name:'category',
    components:{
        NavBar,
        CateGoodsList,
        CateGoodsRight,
        Scroll,
        TabControl,
        CateGoodsDetail
    },
    data() {
        return {
            currentIndex:-1,
            goodslist:[],
            goodsItem:{},
            currentType:'pop'
        }
    },methods: {
        _getCategorydata(){
            getCategory().then(res => {
                console.log(res)
                this.goodslist = res.data.category.list
                for(let i=0;i<this.goodslist.length;i++){
                    this.goodsItem[i] = {
                    subcategories: {},
                    categoryDetail: {
                    'pop': [],
                    'new': [],
                    'sell': []
                    }
                    }
                }
                this._getSubcategories(0)
            })
        },
        _getSubcategories(index){
            this.currentIndex = index;
            const mailKey = this.goodslist[index].maitKey
            getSubcategory(mailKey).then(res => {
              this.goodsItem[index].subcategories = res.data.list
              this.goodsItem = {...this.goodsItem}
              this._getCategoryDetail('pop')
              this._getCategoryDetail('sell')
              this._getCategoryDetail('new')
            })
        },
        _getCategoryDetail(type){
            const miniWallkey = this.goodslist[this.currentIndex].miniWallkey;
            getCategoryDetail(miniWallkey,type).then(res =>{
               this.goodsItem[this.currentIndex].categoryDetail[type] = res
               this.goodsItem = {...this.goodsItem}
            //    console.log(res)
            })
        },
        selectItem(index){
            this._getSubcategories(index)
        },
        tabClick(index){
            switch (index) {
                case 0:
                this.currentType = 'pop'
                break
                case 1:
                this.currentType = 'new'
                break
                case 2:
                this.currentType = 'sell'
                break
            }
        }
    },created() {
        this._getCategorydata()
        // this._getCategoryDetail()
    },
    computed: {
        showSubcategory() {
		    if (this.currentIndex === -1) return {}
            return this.goodsItem[this.currentIndex].subcategories
      },showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.goodsItem[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    mounted() {
        const refresh = debounce(this.$refs.catescroll.refresh,50)
        this.$bus.$on('cateImgLoad',()=>{
            refresh()
        })
    },
}
</script>
<style scoped>
#category{
    height: 100vh;
    background-color:#F7F7F7;
    position: relative;
}
.content{
    position: absolute;
    left: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    display: flex;
}
.category-nav{
    background-color: var(--color-tint);
    color: #fff;
    z-index: 6;
}
#tab-content{
    height: 100%;
    flex:1;
}
</style>
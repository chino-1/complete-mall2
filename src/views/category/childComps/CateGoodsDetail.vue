<template>
    <gird-view>
        <goods-list-item v-for="(item, index) in categoryDetail" :key="index" 
        :goodsitem="item"></goods-list-item>
    </gird-view>
</template>
<script>
import GirdView from 'components/common/gridView/GridView'
import GoodsListItem from 'components/content/goods/GoodsListItem'
export default {
   name:'CateGoodsDetail',
   components:{
       GirdView,
       GoodsListItem
   },props:{
       categoryDetail:{
           type:Array,
           default(){
               return []
           }
       }
   }
}
</script>
<style scoped>
</style>

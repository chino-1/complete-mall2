import {request} from './request'
export function getDeatail(iid){
   return request({
    url:'',
    params: {
        iid
    }
   })
}
export function getRecommend(){
    return request({
        url:''
    })
}
export class Goods{
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.descount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}
export class GoodsParam{
    constructor(info,rule){
        //images有些有值，有些没有
        this.image = info.images ? info.images[0] :''
        this.infos = info.set
        this.sizes = rule.tables
    }
}
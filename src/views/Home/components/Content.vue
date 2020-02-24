<template>
  <div>
    <div class="nav">
      <div class="sort">
        <span>排序:</span>
        <el-button class="default" @click="handleDefault">默认</el-button>
        <span class="prices" @click="handleSort">价格
        <i class="iconfont ">
          {{(sortFlag==1)?'&#xe7f1;':'&#xe7f2;'}}
        </i>
      </span>
      </div>
    </div>
    <el-container>
      <el-aside width="300px" class="aside">
        <h4>Price:</h4>
        <p @click="handlePrice(item.gt,item.lt)" v-for="item of searchPrice" :key="item.id">{{item.gt}}--{{item.lt}}</p>
      </el-aside>
      <el-container>
        <el-main class="main">
          <cart-item :data="item" v-for="item of goodsList" :key="item.productId"></cart-item>
        </el-main>
        <el-footer>
          <el-pagination
            @current-change="getPage"
            class="page"
            background
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CartItem from "./CartItem";
export default {
  data(){
    return{
      searchPrice: [
        { gt: 0, lt: 100, id: 1001 },
        { gt: 100, lt: 500, id: 1002 },
        { gt: 500, lt: 1000, id: 1003 },
        { gt: 1000, lt: 5000, id: 1004 },
        { gt: 5000, lt: 10000, id: 1005 }
      ],
      limit:8,
      start:0,
      goodsList:[],
      sortFlag:1,
      total:10
    }
  },
  components:{
    CartItem
  },
  methods:{
    getPage(page) {
      this.start = (page - 1) * this.limit;
      this.initData();
    },
    initData(){  //封装HTTP
      this.$http.get("/goods/list",{
        //通过params属性传递参数给后端
        params: { start: this.start, limit: this.limit }
      }).then(res=> {
        if(res.data.code == 200) {
          this.goodsList = res.data.result;
          this.total = Math.ceil(res.data.total/this.limit)*10;
        }
      })
    },
    handlePrice(gt,lt){
      this.$http({
        url:'/goods/price',
        method:"get",
        params:{
          gt,
          lt
        }
      }).then(res=>{
        if(res.data.code==200){
          this.goodsList = res.data.result;
          this.total = 10;
        }
      })
    },
    //升序 
    compareUp(value){
      return (a,b)=>{
        return a[value]-b[value]
      }
    },
    //降序
    compareDown(value){
      return (a,b)=>{
        return b[value]-a[value]
      }
    }, 
    handleSort(){
      this.sortFlag=(this.sortFlag==1)?-1:1;
      if(this.sortFlag==1){
        this.goodsList.sort(this.compareUp("salePrice"))
      }else{
        this.goodsList.sort(this.compareDown("salePrice"))
      }
    },
    handleDefault(){
      this.initData()
    }
  },
  mounted() {   //直接调用
    this.initData();
  },
}
</script>

<style lang="scss" scoped>
.page {
  margin: 0 auto;
}
.nav {
  background: #fff;
  height: 60px;
  position: relative;
}
.sort {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.aside {
  text-align: center;
  p {
    line-height: 40px;
  }
  h4 {
    line-height: 60px;
  }
}
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
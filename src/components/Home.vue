<template>
  <!--布局窗口默认都有一个与标签名相同的class属性名,即class="el-header"-->
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div class="header-left">
        <img src="../assets/img/header_logo.png" alt="">
        <span>xxx后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体部分-->
    <el-container>
      <!--左边栏-->
      <el-aside :width="isCollapse? '64px':'200px'">
        <!--这里放置一个div，用于折叠菜单栏,通过事件绑定，改变isCollapse的属性值-->
        <div class="toggle-collapse" @click="toggleCollapse" >
        |||
        </div>
        <!--侧边栏菜单区域-->
        <!--
          unique-opened 默认为true，表示每次只展开一个菜单
          collapse表示是否折叠显示
          collapse-transition表示是否开启折叠动画
        -->
        <el-menu background-color="#333744" text-color="#fff" unique-opened :collapse="isCollapse"
                 :collapse-transition="false">
          <!--一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!--一级菜单模板区域-->
            <template slot="title">
              <!--一级菜单图标区域-->
              <i :class="iconsObj[item.id]"></i>
              <!--一级菜单文本区域-->
              <span slot="title">{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
              <template>
                <!--二级菜单图标-->
                <i class="el-icon-menu"></i>
                <!--二级菜单文本-->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <!--右侧主体内容-->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: false,
      menuList: {
        type: Array,
        default: []
      },
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-3702mima',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      }
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(this.meta.msg)
      this.menuList = res.data
      console.log(res)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
    // isCollapse() {
    //   this.isCollapse()
    // }
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath)
    // }
  }
}

</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    .header-left {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eadef1;
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-collapse {
    background-color: #3F4448;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    color: #fff;
  }
</style>

<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
            <!-- select 菜单激活回调 点一下就会去找对应的index -->
            <!-- 启用vue-router 可以让index作为路由-->
            <el-menu router>
                <!-- 把路由全部循环出来 -->
                <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" :key="index" v-if="!item.hidden">
                    <template slot="title"><i class="el-icon-location"></i><span>{{item.name}}</span></template>
                        <el-menu-item :index="children.path" v-for="(children,index) in item.children">{{children.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
//   methods: {
//       menuClick(index){
//           this.$router.push(index);
//       }
//   }
};
</script>

<style scoped></style>

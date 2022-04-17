<template>
  <div id="app">
    <el-container>
      <el-header class="el-header" style="background-color: white" height="100px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-main>
          <!--引入跳转路由-->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from './components/Header'

  export default {
    name: "App",
    components: {
      Header
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

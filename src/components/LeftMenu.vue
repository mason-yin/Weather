<template>
  <div class="leftmenu">
    <el-menu class="menu"
             background-color="#E9EEF3"
             text-color="black">
      <template v-slot:title><i class="el-icon-message"></i>导航一</template>
      <el-menu-item-group>
        <el-menu-item index="1-1">Realtime Data</el-menu-item>
        <el-menu-item index="1-2">History Data</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LeftMenu"
}
</script>

<style scoped>
  .leftmenu{
    height: fit-content;
  }
</style>

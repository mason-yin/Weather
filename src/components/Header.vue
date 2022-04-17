<template>
  <div id="header">
    <h1>Welcome to Mason's Weather App</h1>
    <router-link to="/">Realtime Data</router-link> | <router-link to="/history">History Data</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
#header {
  padding: 10px;
}

#header a {
  font-weight: bold;
  color: #2c3e50;
}

#header a.router-link-exact-active {
  color: #42b983;
}
</style>

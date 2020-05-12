<template lang="html">
  <div >
    <h1 v-if="meals.length" style="text-align: center;">Calorie Log</h1>
    <log-list-item style="text-align: center;" v-for="(meal, index) in meals" :key="index" :meal="meal"></log-list-item>
  </div>
</template>

<script>
import LogListItem from '@/components/LogListItem.vue'
export default {
  name: 'log-list',
  components: {
    'log-list-item': LogListItem
  },
  props: ['meals']
}
</script>

<style lang="css" scoped>

h1 {
  padding-bottom: 45px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

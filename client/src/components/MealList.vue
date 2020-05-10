<template lang="html">
  <div>
    <h3>Calorie Log</h3>
    <meal-list-item v-for="(meal, index) in meals" :key="index" :meal="meal"></meal-list-item>
  </div>
</template>

<script>
import MealListItem from '@/components/MealListItem.vue'
export default {
  name: 'meal-list',
  components: {
    'meal-list-item': MealListItem
  },
  props: ['meals']
}
</script>

<style lang="css" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

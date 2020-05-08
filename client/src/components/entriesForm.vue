<template lang="html">
  <form v-on:submit.prevent="addFoodToEntries" method="post">
    <label for="">Food name:</label>
    <input type="text" v-model="name">

    <label for="">Calories</label>
    <input type="number" v-model="calories">

    <input type="submit" value="Add food to entry">
  </form>
</template>

<script>
import trackerService from '@/services/trackerService.js'
export default {
  name: 'food-form',
  data(){
    return {
      name: '',
      calories: null
    }
  },
  methods: {
    addFoodToEntries(){
      const newFood = {
        name: this.name,
        calories: this.calories
      }
      trackerService.postFoodData(newFood)
    }
  }
}
</script>

<style lang="css" scoped>
</style>

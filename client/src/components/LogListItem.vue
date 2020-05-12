<template lang="html">
  <div>
    <p>{{meal.date}} Calorie Target: {{meal.caloriesEntered}} Calories over/under: {{meal.caloriesLeft}}</p>
  </div>
</template>

<script>
import {eventBus} from '@/main.js'
import CalorieTrackerService from '@/services/CalorieTrackerService.js'
export default {
  name: 'log-list-item',
  data(){
    return {
      date: this.meal.date,
      caloriesLeft: this.meal.caloriesLeft,
      food: Object.keys(Object.entries(this.meal)[4][1]).toString(),
      caloriesInFood: Object.values(Object.entries(this.meal)[4][1]).valueOf()[0]

    }
  },
  methods: {
    updateMeal(){
      const updatedMeal = {

      }
      CalorieTrackerService.updateMealDetails(updatedMeal, this.meal._id)
    },
    deleteMeal(){
      CalorieTrackerService.deleteMeal(this.meal._id)
      .then(() => eventBus.$emit('meal-deleted', this.meal._id))
    }
  },
  props: ['meal']
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

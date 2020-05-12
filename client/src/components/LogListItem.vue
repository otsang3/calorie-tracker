<template lang="html">
  <div class="flex-container">
    <div class="flex-item">
      <label>Date: </label>
      <label>{{meal.date}}</label>
    </div>

    <div class="flex-item">
      <label>Calories Limit: </label>
      <label>{{meal.caloriesEntered}}</label>
    </div>

    <div class="flex-item">
      <label>Calories Consumed: </label>
      <label>{{meal.caloriesEntered - meal.caloriesLeft}}</label>
    </div>

    <div class="flex-item">
      <label>Calories Difference: </label>
      <label v-bind:class="meal.caloriesLeft > 0 ? 'label-green' : 'label-red'">{{meal.caloriesLeft}}</label>
    </div>

    <!-- <p>Date: {{meal.date}} Calorie Limit: {{meal.caloriesEntered}} Calories over/under: {{meal.caloriesLeft}}</p> -->
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

.flex-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;

  padding: 0px;
  margin: 0px;
  list-style: none;
}

.flex-item {
  padding-bottom: 10px;
}

.label-green {
  color: #00ff00;
}

.label-red {
  color: #ff3300;
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

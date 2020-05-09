<template lang="html">
  <div id="app">
    <calorie-tracker-form :meals="meals" :person="person"></calorie-tracker-form>
  </div>
</template>

<script>
import CalorieTrackerForm from '@/components/CalorieTrackerForm.vue';
import TrackerService from '@/services/CalorieTrackerService.js';
import {eventBus} from '@/main.js';

export default {
  name: 'App',
  data(){
    return {
      person: {},
      meals: []
    };
  },
  components: {
    'calorie-tracker-form': CalorieTrackerForm
  },
  mounted(){
    this.getPersonDetails();
    this.getMealDetails();
    eventBus.$on('new-person-added', (person) => {
      this.person = person;
    });
    eventBus.$on('new-meal-added', (meal) => {
      this.meals.push(meal);
    });
    eventBus.$on('meal-updated', (updatedMeal) => {
      const index = this.meals.findIndex(meal => meal._id === updatedMeal._id);
      this.meals.splice(index, 1, updatedMeal);
    })
  },
  methods:{
    getPersonDetails(){
      TrackerService.getPersonData()
      .then(person => this.person = person[0]);
    },
    getMealDetails(){
      TrackerService.getMealsData()
      .then(meals => this.meals = meals);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

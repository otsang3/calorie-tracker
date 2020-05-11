<template lang="html">
  <div id="app">
    <calorie-tracker-form :meals="meals" :person="person"></calorie-tracker-form>
    <filter-data-by-date :meals="meals"></filter-data-by-date>
    <meal-list :meals="meals"></meal-list>
    <tracker-chart :meals="meals"></tracker-chart>
  </div>
</template>

<script>
import CalorieTrackerForm from '@/components/CalorieTrackerForm.vue';
import MealList from '@/components/MealList.vue'
import FilterForm from '@/components/FilterForm.vue';
import TrackerChart from '@/components/TrackerChart.vue';
import TrackerService from '@/services/CalorieTrackerService.js';
import {eventBus} from '@/main.js';

export default {
  name: 'App',
  data(){
    return {
      person: null,
      meals: []
    };
  },
  components: {
    'calorie-tracker-form': CalorieTrackerForm,
    'meal-list': MealList,
    'filter-data-by-date': FilterForm,
    'tracker-chart': TrackerChart
  },
  mounted(){
    this.getPersonDetails();
    this.getMealDetails();
    eventBus.$on('new-person-added', (person) => {
      this.person = person;
    });
    eventBus.$on('person-details-updated', (person) => {
      this.person = person;
    });
    eventBus.$on('profile-deleted', () => {
      this.person = null;
    });
    eventBus.$on('new-meal-added', (meal) => {
      this.meals.push(meal);
    });
    eventBus.$on('meal-updated', (updatedMeal) => {
      const index = this.meals.findIndex(meal => meal._id === updatedMeal._id);
      this.meals.splice(index, 1, updatedMeal);
    });
    eventBus.$on('all-meals-deleted', (meals) => {
      this.meals = meals;
    });
  },
  methods:{
    getPersonDetails(){
      TrackerService.getPersonData()
      .then(person => this.person = person[0]);
    },
    getMealDetails(){
      TrackerService.getMealsData()
      .then(meals => this.meals = meals);
    },

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

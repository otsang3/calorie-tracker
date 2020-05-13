<template lang="html">
    <div id="app">
      <calorie-tracker-form v-bind:class="meals.length ? 'background-image' : 'background-image2'" :meals="meals" :person="person"></calorie-tracker-form>
      <log-list class="div-padding" :meals="meals"></log-list>
      <div v-if="meals.length" class="fade_rule"></div>
      <filter-data-by-date class="div-padding":meals="meals"></filter-data-by-date>
      <tracker-chart v-if="selectedMeals.length && person" :meals="selectedMeals"></tracker-chart>
    </div>
  </template>

  <script>
  import CalorieTrackerForm from '@/components/CalorieTrackerForm.vue';
  import LogList from '@/components/LogList.vue'
  import FilterForm from '@/components/FilterForm.vue';
  import TrackerChart from '@/components/TrackerChart.vue';
  import TrackerService from '@/services/CalorieTrackerService.js';
  import {eventBus} from '@/main.js';
  export default {
    name: 'App',
    data(){
      return {
        person: {},
        meals: [],
        selectedMeals: []
      };
    },
    components: {
      'calorie-tracker-form': CalorieTrackerForm,
      'log-list': LogList,
      'filter-data-by-date': FilterForm,
      'tracker-chart': TrackerChart
    },
    mounted(){
      this.getPersonDetails();
      this.getMealDetails();
      const mealsCallBack = (updatedMeal) => {
        const index = this.meals.findIndex(meal => meal._id === updatedMeal._id);
        this.meals.splice(index, 1, updatedMeal);
      };
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
      eventBus.$on('meal-updated', mealsCallBack);
      eventBus.$on('meal-item-updated', mealsCallBack);
      eventBus.$on('meal-item-deleted', mealsCallBack);
      eventBus.$on('update-meal-calories', mealsCallBack);
      eventBus.$on('all-meals-deleted', (meals) => {
        this.meals = meals;
      });
      eventBus.$on('selected-meals', (meals) => {
        this.selectedMeals = meals;
      });
    },
    methods:{
      getPersonDetails(){
        TrackerService.getPersonData()
        .then((person) => {
          if (person[0]) {
            this.person = person[0]
          } else {
            this.person = null
          }
        });
      },
      getMealDetails(){
        TrackerService.getMealsData()
        .then(meals => this.meals = meals);
      }
    }
  }
  </script>

<style>
.background-image {
  background-image: url('../public/background-image4.png');
  overflow: hidden;
  background-size: cover;
  width: 100;
  height: 500px;
}

.background-image2 {
  background-image: url('../public/background-image4.png');
  overflow: hidden;
  background-size: cover;
  width: 100;
  height: 700px;
}

.div-padding {
  padding-top: 100px;
  padding-bottom: 100px;
}

.fade_rule {
        height: 1px;
        background-color: #E6E6E6;
        width: 66.0em;
        margin: 0 auto;
        background-image: linear-gradient(left , white 2%, #E6E6E6 50%, white 98%);
        background-image: -o-linear-gradient(left , white 2%, #E6E6E6 50%, white 98%);
        background-image: -moz-linear-gradient(left , white 2%, #E6E6E6 50%, white 98%);
        background-image: -webkit-linear-gradient(left , white 2%, #E6E6E6 50%, white 98%);
        background-image: -ms-linear-gradient(left , white 2%, #E6E6E6 50%, white 98%);
        background-image: -webkit-gradient( linear, left bottom, right bottom, color-stop(0.02, white), color-stop(0.5, gray), color-stop(0.98, white) );
}


#app {
  font-family: "Open Sans",Verdana;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>

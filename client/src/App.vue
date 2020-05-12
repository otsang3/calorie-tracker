<template lang="html">
    <div id="app">
      <calorie-tracker-form class="background-image" :meals="meals" :person="person"></calorie-tracker-form>
      <log-list :meals="meals"></log-list>
      <filter-data-by-date :meals="meals"></filter-data-by-date>
      <tracker-chart v-if="selectedMeals.length" :meals="selectedMeals"></tracker-chart>
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
      eventBus.$on('all-meals-deleted', (meals) => {
        this.meals = meals;
      });
      eventBus.$on('selected-meals', (meals) => {
        this.selectedMeals = meals
      })
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
  width: 100%;
  height: 400px;
}

#app {
  font-family: "Open Sans",Verdana;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

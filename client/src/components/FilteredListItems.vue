<template lang="html">
  <div>
    <p>Date: {{meal.date}}</p>
    <p>Calories left: {{meal.caloriesLeft}}</p>
    <p>Calories added: {{meal.caloriesEntered}}</p>
    <p v-if="breakfast"><h4>Breakfast</h4></p>
    <div v-for="[key, value] of Object.entries(meal.breakfast)">
      {{key}} : <input type="number" v-model="value"><button v-on:click="updateMeal(key, value, mealTypes[0])">update</button>
      <button v-on:click="deleteMeal(key, mealTypes[0])">delete</button>
    </div>
    <p v-if="lunch"><h4>Lunch</h4></p>
    <div v-for="[key, value] of Object.entries(meal.lunch)">
      {{key}} : <input type="number" v-model="value"><button v-on:click="updateMeal(key, value, mealTypes[1])">update</button>
      <button v-on:click="deleteMeal(key, mealTypes[1])">delete</button>
    </div>
    <p v-if="dinner"><h4>Dinner</h4></p>
    <div v-for="[key, value] of Object.entries(meal.dinner)">
      {{key}} : <input type="number" v-model="value"><button v-on:click="updateMeal(key, value, mealTypes[2])">update</button>
      <button v-on:click="deleteMeal(key, mealTypes[2])">delete</button>
    </div>
  </div>
</template>

<script>
import TrackerService from '@/services/CalorieTrackerService.js';
import {eventBus} from '@/main.js';

export default {
  name: 'list-item',
  props: ['meal'],
  data(){
    return {
      allMeals: [],
      mealTypes: ["breakfast", "lunch", "dinner"],
      mealKeys: [],
      mealValues: [],
      mealObjectId: null
    };
  },
  mounted(){
    this.mealObjectId = this.meal._id;
  },
  computed: {
    breakfast(){
      return this.extractMeals(this.mealTypes[0]);
    },
    lunch(){
      return this.extractMeals(this.mealTypes[1]);
    },
    dinner(){
      return this.extractMeals(this.mealTypes[2]);
    }
  },
  methods: {
    extractMeals(type){
      if (this.meal[type]) {
        return (Object.keys(this.meal[type]).map((key, index) => [key, Object.values(this.meal[type])[index]])).flat();
      }
    },
    deleteMeal(mealKey, mealType){
      const updatedObject = this.meal;
      delete updatedObject._id;
      delete updatedObject[mealType][mealKey];
      TrackerService.updateMealDetails(updatedObject, this.mealObjectId)
      .then((meal) => eventBus.$emit('meal-item-deleted', meal));
    },
    updateMeal(mealKey, mealValue, mealType){
      this.meal[mealType][mealKey] = parseInt(mealValue);
      const updatedObject = this.meal;
      delete updatedObject._id;
      TrackerService.updateMealDetails(updatedObject, this.mealObjectId)
      .then((meal) => eventBus.$emit('meal-item-updated', meal));
    }
  }
}
</script>

<style lang="css" scoped>
</style>

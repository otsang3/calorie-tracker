<template lang="html">
  <div>
    <p>Date: {{meal.date}}</p>
    <p>Calories left: {{meal.caloriesLeft}}</p>
    <p>Calories added: {{meal.caloriesEntered}}</p>
    <div v-if="meal.breakfast">
      <h4>Breakfast</h4>
      <div v-for="[key, value] of Object.entries(meal.breakfast)">
        {{key}} : <input type="number" v-model="value"><button v-on:click="updateMeal(key, value, mealTypes[0])">update</button>
        <button v-on:click="deleteMeal(key, mealTypes[0])">delete</button>
      </div>
    </div>
    <div v-else-if="meal.lunch">
      <h4>Lunch</h4>
      <div v-for="[key, value] of Object.entries(meal.lunch)">
        {{key}} : <input type="number" v-model="value"><button v-on:click="updateMeal(key, value, mealTypes[1])">update</button>
        <button v-on:click="deleteMeal(key, mealTypes[1])">delete</button>
      </div>
    </div>
    <div v-else-if="meal.dinner">
      <h4>Dinner</h4>
      <div v-for="[key, value] of Object.entries(meal.dinner)">
        {{key}} : <input type="number" v-model="value"><button v-on:click="updateMeal(key, value, mealTypes[2])">update</button>
        <button v-on:click="deleteMeal(key, mealTypes[2])">delete</button>
      </div>
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
    if (this.meal){
      this.mealObjectId = this.meal._id;
    }
  },
  methods: {
    deleteMeal(mealKey, mealType){
      const updatedObject = this.meal;
      delete updatedObject._id;
      const mealKeyValue = updatedObject[mealType][mealKey];
      delete updatedObject[mealType][mealKey];
      updatedObject.caloriesEntered -= parseInt(mealKeyValue);
      updatedObject.caloriesLeft += parseInt(mealKeyValue);
      TrackerService.updateMealDetails(updatedObject, this.mealObjectId)
      .then((meal) => eventBus.$emit('meal-item-deleted', meal));
    },
    updateMeal(mealKey, mealValue, mealType){
      const currentKeyValue = this.meal[mealType][mealKey]
      this.meal[mealType][mealKey] = parseInt(mealValue);
      this.meal.caloriesLeft += parseInt(currentKeyValue - mealValue);
      const calculatedValue = currentKeyValue < mealValue ? mealValue - currentKeyValue : mealValue - currentKeyValue;
      this.meal.caloriesEntered += parseInt(calculatedValue);
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

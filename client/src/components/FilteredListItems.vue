<template lang="html">
  <div>
    <div v-if="meal.date == todaysDate">
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
      <div v-if="meal.lunch">
        <h4>Lunch</h4>
        <div v-for="[key, value] of Object.entries(meal.lunch)">
          {{key}} : <input type="number" v-model="value"><button v-on:click="updateMeal(key, value, mealTypes[1])">update</button>
          <button v-on:click="deleteMeal(key, mealTypes[1])">delete</button>
        </div>
      </div>
      <div v-if="meal.dinner">
        <h4>Dinner</h4>
        <div v-for="[key, value] of Object.entries(meal.dinner)">
          {{key}} : <input type="number" v-model="value"><button v-on:click="updateMeal(key, value, mealTypes[2])">update</button>
          <button v-on:click="deleteMeal(key, mealTypes[2])">delete</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p v-on:click="handleClick">Date: {{meal.date}}</p>
      <p>Calories left: {{meal.caloriesLeft}}</p>
      <p>Calories added: {{meal.caloriesEntered}}</p>
    </div>
  </div>
</template>

<script>
import TrackerService from '@/services/CalorieTrackerService.js';
import {eventBus} from '@/main.js';
import moment from 'moment';

export default {
  name: 'list-item',
  props: ['meal'],
  data(){
    return {
      allMeals: [],
      mealTypes: ["breakfast", "lunch", "dinner"],
      mealKeys: [],
      mealValues: [],
      mealObjectId: null,
      todaysDate: moment().format('DD-MM-YYYY')
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
    },
    handleClick(){
      eventBus.$emit('meal-selected', this.meal);
    }
  }
}
</script>

<style lang="css" scoped>

.past-dates {
  text-decoration: line-through;
  padding-left: 25px;
  padding-right: 25px;
}

.todays-date {
  color: black;
  padding-left: 25px;
  padding-right: 25px;
}
</style>

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
    <div id="click-me" v-else>
      <div v-on:click="handleClick" >
        <div class="past-dates">
          <p>Date: {{meal.date}}</p>
          <p>Calories left: {{meal.caloriesLeft}}</p>
          <p>Calories added: {{meal.caloriesEntered}}</p>
        </div>
        <span v-if="!selectedMeal" id="hover-text">
          click to view foods
        </span>
      </div>
        <meal-detail v-if="selectedMeal" :meal="selectedMeal"></meal-detail>
    </div>
  </div>
</template>

<script>
import MealDetail from '@/components/MealDetails.vue'
import TrackerService from '@/services/CalorieTrackerService.js';
import {eventBus} from '@/main.js';
import moment from 'moment';

export default {
  name: 'list-item',
  components: {
    'meal-detail': MealDetail
  },
  props: ['meal'],
  data(){
    return {
      allMeals: [],
      mealTypes: ["breakfast", "lunch", "dinner"],
      mealKeys: [],
      mealValues: [],
      mealObjectId: null,
      selectedMeal: null,
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
      this.selectedMeal = this.meal;
    }
  }
}
</script>

<style lang="css" scoped>

  .past-dates {
    font-style: italic;
    text-decoration: line-through;
    padding-left: 25px;
    padding-right: 25px;
  }

  .todays-date {
    color: black;
    padding-left: 25px;
    padding-right: 25px;
  }

  #hover-text {
    border: 1px solid #ccc;
    display: none;
    font-size: 10px;
    margin-top: 10px;
    padding: 5px;
  }

  #click-me:hover #hover-text {
    display: block;
  }

</style>

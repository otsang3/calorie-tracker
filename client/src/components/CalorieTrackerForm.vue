<template lang="html">
  <form v-on:submit.prevent="saveInfo" method="POST">
    <h3>Person details</h3>
    <label>Name:</label>
    <input type="text" v-model="name">

    <label>Gender:</label>
    <select v-model="gender">
      <option disabled>Select a gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>

    <label>Age:</label>
    <input type="number" v-model="age">

    <label>Height (cm):</label>
    <input type="numbers" v-model="height">

    <label>Weight (kg):</label>
    <input type="numbers" v-model="weight">

    <label>Activity level:</label>
    <select v-model="activityLevel">
      <option disabled>Select an activity level</option>
      <option value="sedentary">Sedentary (little to no exercise)</option>
      <option value="lightlyActive">Lightly Active (light exercise 1 - 3 days per week)</option>
      <option value="moderatelyActive">Moderately Active (moderate exercise 3 - 5 days per weeek)</option>
      <option value="veryActive">Very Active (heavy exercise 6 - 7 days per week)</option>
    </select>

    <label>Daily calories:</label>
    <input type="numbers" v-model="dailyRequiredCalories" disabled>

    <h3>Add food details</h3>
    <label for="">Food name:</label>
    <input type="text" v-model="foodName">

    <label>Meal type:</label>
    <select v-model="mealType">
      <option disabled>Select a meal type</option>
      <option value="breakfast">breakfast</option>
      <option value="lunch">lunch</option>
      <option value="dinner">dinner</option>
    </select>

    <label for="">Calories</label>
    <input type="number" v-model="foodCalories">

    <input type="submit" value="save details">
  </form>
</template>

<script>
import TrackerService from '@/services/CalorieTrackerService.js';
import {eventBus} from '@/main.js';

export default {
  name: 'calorie-tracker-form',
  data(){
    return {
      name: '',
      gender: '',
      age: 0,
      height: 0,
      weight: 0,
      activityLevel: '',
      dailyRequiredCalories: 0,
      mealType: '',
      foodName: '',
      foodCalories: 0,
      activityLevelValues: {
          sedentary: 1.2,
          lightlyActive: 1.375,
          moderatelyActive: 1.55,
          veryActive: 1.725
        }
    }
  },
  methods: {
    calculateBMR(){
      let femaleBMR = (655 + (9.6*this.weight) + (1.8*this.height) - (4.7*this.age));
      let maleBMR = (66 + (13.7*this.weight) + (5*this.height) - (6.8*this.age));

      if ((this.gender === 'female') && (Object.keys(this.activityLevelValues).includes(this.activityLevel))) {
        this.dailyRequiredCalories = (femaleBMR * this.activityLevelValues[this.activityLevel]).toFixed(0);

      } else if ((this.gender === 'male') && (Object.keys(this.activityLevelValues).includes(this.activityLevel))) {
        this.dailyRequiredCalories = (maleBMR * this.activityLevelValues[this.activityLevel]).toFixed(0);
      }
    },
    saveInfo(){
      this.calculateBMR();
      const newPerson = {
        name: this.name,
        gender: this.gender,
        age: parseInt(this.age),
        height: parseFloat(this.height),
        weight: parseFloat(this.weight),
        dailyCalories: parseInt(this.dailyRequiredCalories),
        caloriesLeft: this.dailyRequiredCalories - parseInt(this.foodCalories),
        caloriesEntered: this.dailyRequiredCalories - (this.dailyRequiredCalories - this.foodCalories)
      }
      const newMeal = {
        date: '09/05/2020'
      }
      newMeal[this.mealType] = {};
      newMeal[this.mealType][this.foodName] = parseInt(this.foodCalories);
      TrackerService.postPersonData(newPerson)
      .then((person) => eventBus.$emit('new-person-added', person));

      TrackerService.postMealsData(newMeal)
      .then((meal) => eventBus.$emit('new-meal-added', meal));
    }
  }
}
</script>

<style lang="css" scoped>
</style>

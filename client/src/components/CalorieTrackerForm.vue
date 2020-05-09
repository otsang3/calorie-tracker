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
      dailyRequiredCalories: 0,
      mealType: '',
      foodName: '',
      foodCalories: 0
    }
  },
  methods: {
    saveInfo(){
      const newPerson = {
        name: this.name,
        gender: this.gender,
        age: this.age,
        height: this.height,
        weight: this.weight,
        calories: 2750
      }
      const newMeal = {
        date: '09/05/2020'
      }
      newMeal[this.mealType] = {};
      newMeal[this.mealType][this.foodName] = this.foodCalories;
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

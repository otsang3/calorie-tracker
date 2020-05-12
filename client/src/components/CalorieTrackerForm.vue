<template lang="html">
  <div class="form-body">

    <div style="padding-left: 10px;" v-if="person">
      <p>Hello, {{person.name}} <span style="float: right;">{{todaysDate}} Calories left:{{caloriesInfo}}</span></p>


      <div class="flex-container">
      <div class="flex-item">
        <h3>Your details</h3>
        <div>
          <label>Age:</label>
          <input type="number" v-model="age">
        </div>

        <div>
          <label>Height (cm):</label>
          <input type="numbers" v-model="height">
        </div>
        <div>
          <label>Weight (kg):</label>
          <input type="numbers" v-model="weight">
        </div>

        <div>
          <label>Activity level:</label>
          <select v-model="activityLevel">
            <option disabled>Select an activity level</option>
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="lightlyActive">Lightly Active (light exercise 1 - 3 days per week)</option>
            <option value="moderatelyActive">Moderately Active (moderate exercise 3 - 5 days per weeek)</option>
            <option value="veryActive">Very Active (heavy exercise 6 - 7 days per week)</option>
          </select>
        </div>

        <button type="button" v-on:click="updateDetails">update details</button>
        <button type="button" v-on:click="deleteProfile">DELETE profile!</button>
      </div>



    </div>


    </div>

    <form v-on:submit.prevent="saveInfo" method="POST">
      <div v-if="!person">
        <h2 style="text-align:center;">Hi! Please enter your details below to start tracking your calories!</h2>
        <div class="flex-container">
          <div class="flex-item">
            <div class="">
              <label>Name</label>
              <input type="text" v-model="name">
            </div>


            <div class="">
              <label>Gender</label>
              <select v-model="gender">
                <option disabled>Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label>Age</label>
              <input type="number" v-model="age">
            </div>


          </div>

          <div class="flex-item">

            <div>
              <label>Height (cm)</label>
              <input type="number" v-model="height">
            </div>
            
            <div class="">
              <label>Weight (kg)</label>
              <input type="number" v-model="weight">
            </div>

            <div>
              <label>Activity level</label>
              <select v-model="activityLevel">
                <option disabled>Select an activity level</option>
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="lightlyActive">Lightly Active (light exercise 1 - 3 days per week)</option>
                <option value="moderatelyActive">Moderately Active (moderate exercise 3 - 5 days per weeek)</option>
                <option value="veryActive">Very Active (heavy exercise 6 - 7 days per week)</option>
              </select>
            </div>

              <input type="hidden" v-model="dailyRequiredCalories">
            </div>
          </div>



        </div>

      <div v-else>

        <div style="padding-right: 200px;" class="flex-container">
          <div class="flex-item">
            <h3>Add food details</h3>
            <div class="">
              <label for="">Food name:</label>
              <input type="text" v-model="foodName">
            </div>

            <div class="">
              <label>Meal type</label>
              <select v-model="mealType">
                <option disabled>Select a meal type</option>
                <option value="breakfast">breakfast</option>
                <option value="lunch">lunch</option>
                <option value="dinner">dinner</option>
              </select>
            </div>


            <label for="">Calories</label>
            <input type="number" v-model="foodCalories">
          </div>
        </div>


      </div>
      <div v-bind:class="person ? 'save-details' : 'save-details-2'">
          <input type="submit" value="save details">
      </div>
        <!-- <input class="save-details" type="submit" value="save details"> -->
    </form>
  </div>
</template>

<script>
import TrackerService from '@/services/CalorieTrackerService.js';
import {eventBus} from '@/main.js';
import moment from 'moment';

export default {
  name: 'calorie-tracker-form',
  props: ['meals', 'person'],
  data(){
    return {
      name: '',
      gender: '',
      age: 0,
      height: 0,
      weight: 0,
      activityLevel: 'sedentary',
      dailyRequiredCalories: 0,
      mealType: '',
      foodName: '',
      foodCalories: 0,
      activityLevelValues: {
          sedentary: 1.2,
          lightlyActive: 1.375,
          moderatelyActive: 1.55,
          veryActive: 1.725
        },
      todaysDate: moment().format('DD-MM-YYYY')
    }
  },
  watch: {
    person: function(){
      if (this.person) {
        this.age = this.person.age;
        this.height = this.person.height;
        this.weight = this.person.weight;
        this.gender = this.person.gender;
        this.activityLevel = this.person.activityLevel;
      }
    }
  },
  computed: {
    caloriesInfo(){
      if (this.checkMeal()){
        return this.checkMeal().caloriesLeft;
      } else {
        return this.person.dailyCalories;
      }
    }
  },
  methods: {
    calculateBMR(){
      const femaleBMR = (655 + (9.6*this.weight) + (1.8*this.height) - (4.7*this.age));
      const maleBMR = (66 + (13.7*this.weight) + (5*this.height) - (6.8*this.age));

      if ((this.gender === 'female') && (Object.keys(this.activityLevelValues).includes(this.activityLevel))) {
        this.dailyRequiredCalories = (femaleBMR * this.activityLevelValues[this.activityLevel]).toFixed(0);

      } else if ((this.gender === 'male') && (Object.keys(this.activityLevelValues).includes(this.activityLevel))) {
        this.dailyRequiredCalories = (maleBMR * this.activityLevelValues[this.activityLevel]).toFixed(0);
      }
    },
    checkMeal(){
      const result = this.meals.filter(meal => meal.date === moment().format('DD-MM-YYYY'));
      return result[0];
    },
    calculateCalories(meal){
      let totalCalories = 0;
      if (this.checkMeal()) {
        const mealTypes = ["breakfast", "lunch", "dinner"];
        const types = mealTypes.filter(mealType => Object.keys(meal).includes(mealType));
        const values = types.map(type => Object.values(meal[type]).reduce((total, calorieValue) => total + calorieValue, 0));
        totalCalories = values.reduce((total, calorieValue) => total + calorieValue, 0);
      }
      const caloriesLeft = this.person.dailyCalories - totalCalories;
      return [totalCalories, caloriesLeft];
    },
    saveInfo(){
      this.calculateBMR();

      if (!this.person){
        const newPerson = {
          name: this.name,
          gender: this.gender,
          activityLevel: this.activityLevel,
          age: parseInt(this.age),
          height: parseFloat(this.height),
          weight: parseFloat(this.weight),
          dailyCalories: parseInt(this.dailyRequiredCalories)
        }
        TrackerService.postPersonData(newPerson)
        .then((person) => eventBus.$emit('new-person-added', person));
      }

      if (this.person){
        if (this.checkMeal()) {
          const mealObject = this.checkMeal();
          const keyExists = Object.keys(mealObject).includes(this.mealType);
          const mealId = this.checkMeal()._id;
          delete mealObject._id

          if (keyExists){
            mealObject[this.mealType][this.foodName] = parseInt(this.foodCalories);
          } else {
            mealObject[this.mealType] = {};
            mealObject[this.mealType][this.foodName] = parseInt(this.foodCalories);
          }
          const totalCalories = this.calculateCalories(mealObject);
          mealObject.caloriesLeft = totalCalories[1];
          mealObject.caloriesEntered = totalCalories[0];

          TrackerService.updateMealDetails(mealObject, mealId)
          .then((meal) => eventBus.$emit('meal-updated', meal));
        } else {
          const totalCalories = this.calculateCalories(newMeal);
          const newMeal = {
            date: moment().format('DD-MM-YYYY'),
            dailyCalories: parseInt(this.dailyRequiredCalories),
            caloriesLeft: totalCalories[1] - parseInt(this.foodCalories),
            caloriesEntered: totalCalories[0] + parseInt(this.foodCalories)
          }
          newMeal[this.mealType] = {};
          newMeal[this.mealType][this.foodName] = parseInt(this.foodCalories);

          TrackerService.postMealsData(newMeal)
          .then((meal) => eventBus.$emit('new-meal-added', meal));
        }
      }
    },
    updateDetails(){
      this.calculateBMR();
      const updateDetails = {
        age: parseInt(this.age),
        height: parseFloat(this.height),
        weight: parseFloat(this.weight),
        activityLevel: this.activityLevel,
        dailyCalories: parseInt(this.dailyRequiredCalories)
      }
      TrackerService.updatePersonDetails(updateDetails, this.person._id)
      .then((person) => eventBus.$emit('person-details-updated', person));

      const mealObject = this.checkMeal();
      const mealId = this.checkMeal()._id;
      delete mealObject._id
      mealObject.dailyCalories = parseInt(this.dailyRequiredCalories);
      const totalCalories = this.calculateCalories(mealObject);
      mealObject.caloriesLeft = parseInt(this.dailyRequiredCalories) - totalCalories[0];
      mealObject.caloriesEntered = totalCalories[0];
      TrackerService.updateMealDetails(mealObject, mealId)
      .then((meal) => eventBus.$emit('update-meal-calories', meal));
    },
    deleteProfile(){
      TrackerService.deletePerson(this.person._id)
      .then(() => eventBus.$emit('profile-deleted', this.person._id));
      TrackerService.deleteAllMeals()
      .then((deletedMeals) => eventBus.$emit('all-meals-deleted', deletedMeals));
    }
  }
}
</script>

<style lang="css" scoped>
  .form-body {
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0px;
  margin: 0px;
  opacity: 1;
  color: white;
  text-shadow: 2px 2px #000000;
  opacity: 0.95;
  }

  label {
    font-size: 13px;
    display: inline-block;
    width: 150px;
    text-align: left;
    padding-left: 0px;
    padding-bottom: 15px;
    font-weight: bold;
  }
  h2 {
    font-weight: 100;
    padding-bottom: 50px;
  }

  select {
  padding: 16px 20px;
  border-radius: 25px;
  background-color: #F5F5F5;
  }

  .flex-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;

    padding: 0px;
    margin: 0px;
    list-style: none;
  }

  .save-details {
    padding-left: 470px;
  }

  .save-details-2 {
    padding-left:770px;
  }


</style>

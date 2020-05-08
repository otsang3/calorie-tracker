<template lang="html">
  <form v-on:submit.prevent="newPerson" method="post">
    <label>Name:</label>
    <input type="text" v-model="name">

    <label>Gender:</label>
    <select v-model="gender">
      <option disabled on value>Select a gender</option>
      <option value="male" >Male</option>
      <option value="female" >Female</option>
    </select>

    <label>Age:</label>
    <input type="number" v-model="age">

    <label>Height (cm):</label>
    <input type="numbers" v-model="height">

    <label>Weight (kg):</label>
    <input type="numbers" v-model="weight">

    <input type="submit">

  </form>
</template>

<script>
import trackerService from '@/services/trackerService.js';

export default {
  name: 'tracker-form',
  data(){
    return {
      name: '',
      gender: '',
      age: null,
      height: null,
      weight: null,
      dailyRequiredCalories: null
    }
  },
  methods: {
    newPerson(){
      const newPerson = {
        name: this.name,
        gender: this.gender,
        height: this.height,
        weight: this.weight,
        calories: 2750
      }
      trackerService.postPersonData(newPerson)
    }
  }
}
</script>

<style lang="css" scoped>
</style>

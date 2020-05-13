<template lang="html">
  <div>
    <div v-if="meal.breakfast">
      <h4>Breakfast</h4>
      <div v-for="[key, value] of Object.entries(meal.breakfast)">
        {{key}} : {{value}}
      </div>
    </div>
    <div v-if="meal.lunch">
      <h4>Lunch</h4>
      <div v-for="[key, value] of Object.entries(meal.lunch)">
        {{key}} : {{value}}
      </div>
    </div>
    <div v-if="meal.dinner">
      <h4>Dinner</h4>
      <div v-for="[key, value] of Object.entries(meal.dinner)">
        {{key}} : {{value}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'meal-details',
  props: ['meal']
}
</script>

<style lang="css" scoped>
</style>

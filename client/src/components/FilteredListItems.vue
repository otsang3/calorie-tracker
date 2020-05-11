<template lang="html">
  <div>
    <p>Date: {{meal.date}}</p>
    <p>Calories left: {{meal.caloriesLeft}}</p>
    <p>Calories added: {{meal.caloriesEntered}}</p>
    <p v-if="breakfast" >Breakfast: {{breakfast}}</p>
    <p v-if="lunch">Lunch: {{lunch}}</p>
    <p v-if="dinner">Dinner: {{dinner}}</p>
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: ['meal'],
  data(){
    return {
      allMeals: [],
      mealTypes: ["breakfast", "lunch", "dinner"]
    };
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
    }
  }
}
</script>

<style lang="css" scoped>
</style>

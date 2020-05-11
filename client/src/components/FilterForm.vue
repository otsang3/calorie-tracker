<template lang="html">
  <section>
    <h3>Filter log</h3>
    <p>Please enter a date range:</p>
    <form v-on:submit.prevent="filterData">
    <label for="from">From:</label>
    <input id="from" type="date" :max="dates.to" v-model="dates.from" required/>
    <label for="to">To:</label>
    <input id="to" type="date" :min="dates.from" v-model="dates.to" required/>
    <input type="submit" value="search"/>
  </form>
  <display-filtered-list v-if="meals.length" :meals="selectedMeals"></display-filtered-list>
  </section>
</template>

<script>
import {eventBus} from '@/main.js'
import List from '@/components/FilteredList.vue';
import moment from 'moment';

export default {
  name: 'filter-data-form',
  props: ['meals'],
  data(){
    return {
      selectedMeals: [],
      dates: {
        from: null,
        to: null
      }
    };
  },
  components: {
    'display-filtered-list': List
  },
  methods: {
    formatData(){
      const dates = {
        from: moment(this.dates.from).format('DD-MM-YYYY'),
        to: moment(this.dates.to).format('DD-MM-YYYY')
      }
      this.dates = dates;
    },
    filterData(){
      this.formatData();
      const result = this.meals.filter(meal => meal.date >= this.dates.from && meal.date <= this.dates.to);
      this.selectedMeals = result;
      eventBus.$emit('selected-meals', this.selectedMeals)
    }
  }
}
</script>

<style lang="css" scoped>
</style>

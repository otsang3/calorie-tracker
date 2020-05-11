<template lang="html">
  <div id="app" style="position:absolute; width:600px; height:600px;">
    <canvas id="calories-chart"></canvas>
    <label>Daily Target: 2500 cals</label>
  </div>
</template>

<script>

import caloriesChartData from './chart-data.js';
export default {
  data() {
  return {
    caloriesChartData: caloriesChartData,
  }
},
  methods: {
  createChart(chartId, chartData) {
    const ctx = document.getElementById(chartId);
    const myChart = new Chart(ctx, {
      type: chartData.type,
      data: this.getChartData(),
      options: chartData.options,
    });
  },
  getChartData(){
    const mealDates = this.meals.map(meal => meal.date)
    const mealCalories = this.meals.map(meal => meal.caloriesEntered)
    const chartData = mealDates.map((date, index) => mealCalories[index])
    // console.log(chartData);
    return [["date", "calories"], ["10-05-2020", "1150"]]
    console.log(mealDates);
    console.log(mealCalories);
  }
},
mounted() {
  this.createChart('calories-chart', this.caloriesChartData);
  this.getChartData();
},
props: ['meals']
}
</script>

<style lang="css" scoped>
</style>

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
      data: chartData.data,
      options: chartData.options,
    });
  }
},
mounted() {
  this.createChart('calories-chart', this.caloriesChartData);
}
}
</script>

<style lang="css" scoped>
</style>

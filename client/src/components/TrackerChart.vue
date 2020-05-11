<template lang="html">
  <div id="app" style="position:absolute; width:600px; height:600px;">
    <canvas id="calories-chart"></canvas>
  </div>
</template>

<script>
export default {
  name: 'calorie-chart-tracker',
  props: ['meals'],
  data() {
  return {
    caloriesChartData: null,
    mealDates: [],
    mealCalories: []
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
  },
    getChartData(){
      this.mealDates = this.meals.map(meal => meal.date)
      this.mealCalories = this.meals.map(meal => meal.caloriesEntered)
    },
  getCaloriesData(){
    this.getChartData()
    return this.caloriesChartData = {
      type: 'bar',
      data: {
        labels: this.mealDates.flat(),
        datasets: [
          {
            label: 'Calories consumed',
            data: this.mealCalories.flat(),
            backgroundColor: [
              '#ff8080',
              '#ffff99',
              '#b3ffd9',
              '#ff8080',
              '#ffff99',
              '#ffff99',
              '#b3ffd9'

            ],
            borderColor: [
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 5,
            }
          }]
        }
      }
    }


  }
},
mounted() {
  this.getCaloriesData()
  this.createChart('calories-chart', this.caloriesChartData);
}
}
</script>

<style lang="css" scoped>
</style>

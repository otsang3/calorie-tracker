<template lang="html">
  <div id="app">
    <canvas id="calories-chart"></canvas>
    <p for="">Daily Calories: {{this.meals[0].dailyCalories}}</p>
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
    mealCalories: [],
    chartColors: []
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
      this.chartColors = this.meals.map(meal => {
        if (meal.caloriesLeft < 0) {
          return '#ff8080'
        } else {
          return '#b3ffd9'
        }
      })
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
            backgroundColor: this.chartColors,
            borderWidth: 2
          }
        ]
      },
      options: {
      lineAt: 2500,
      legend: { display: false },
      title: {
        display: true,
        text: 'Calories Consumed'
      },
      scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 5,
              max: 4500
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
},
watch: {
  meals: function(){
    if (this.meals) {
      this.getCaloriesData();
      this.createChart('calories-chart', this.caloriesChartData);
    }
  }
}
}
</script>

<style lang="css" scoped>

div {
  max-height: 300px;
  max-width: 800px;
  position: absolute;
  left: 310px;
  right: 250px;
}

p {
  text-align: center;
  padding-bottom: 50px;
}
</style>

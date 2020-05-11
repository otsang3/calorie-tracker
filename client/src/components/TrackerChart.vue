<template lang="html">
  <GChart :type="chartType" :data="getChartData" :options="chartOptions"></GChart>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  name: 'calorie-chart-tracker',
  props: ['meals'],
  data(){
    return {
      chartType: 'ColumnChart',
      chartOptions: {
        width: 800,
        height: 240,
        title: 'Calorie Tracker',
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
          '#ff8080',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
        ],
        borderWidth: 2,
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
  },
  components: {
    GChart
  },
  computed: {
    getChartData(){
      const mealDates = this.meals.map(meal => meal.date)
      const mealCalories = this.meals.map(meal => meal.caloriesEntered)
      const chartData = mealDates.map((date, index) => {
        return [date, mealCalories[index]]
      })
      chartData.unshift(["date", "calories"])
      return chartData
    }
  }
}
</script>

<style lang="css" scoped>
</style>

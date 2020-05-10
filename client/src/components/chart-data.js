export const caloriesChartData = {
  type: 'bar',
  data: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Calories consumed',
        data: [2750, 2000, 2500, 3000, 1950, 2100, 2500],
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

export default caloriesChartData;

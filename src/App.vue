<template>
  <div id="app">
    <input type="text" v-model="amount">
    <button v-on:click="postAmount">Send</button>
    <p> あと {{restAmount}} ml だよ</p>
    <div>
      <canvas id="weekly-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'App',
  data: () => ({
    amount: 0,
    weeklyData: [],
    restAmount: 1500,
    chartData: {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Weekly Data",
            data: [],
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25
              }
            }
          ]
        }
      }
    }
  }),
  mounted: function() {
    this.getAmount();
  },
  methods: {
    postAmount: function() {
      fetch('/api/water_amount',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: this.amount})
      })
      .then(() => this.getAmount());
    },
    getAmount: async function() {
      fetch('/api/water_amount/this_week')
        .then(res => res.json())
        .then(res => this.weeklyData = res)
        .then(() => {

          // Set rest amount of water
          const today = new Date();
          const todayData = this.weeklyData.filter((item) => {
            const date = new Date(item.created_at);
            return date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
          });
          this.restAmount -= todayData[0].amount;

          // Set data to chart.js
          const labels = this.weeklyData.map(item => item.created_at);
          this.chartData.data.labels = labels;
          const amount = this.weeklyData.map(item => item.amount);
          this.chartData.data.datasets[0].data = amount;
          const ctx = document.getElementById('weekly-chart');
          new Chart(ctx, this.chartData);
        });
    }
  }
}
</script>

<style>
#app {}
</style>

<template>
  <div id="app">
    <div class="header">
      <section class="inner">
        <h1>Daily Water Tracker</h1>
        <p>毎日1500mlを目標に水分をとりましょう！</p>
      </section>
    </div>
    <div class="inner card">
      <section class="form">
        <p>飲んだ量を記録する</p>
        <form>
          <input type="text" v-model="amount">
          <button v-on:click="postAmount">Send</button>
        </form>
      </section>
    </div>
    <div class="status inner card">
      <p v-if="restAmount > 0"> 1500mlまであと <span class="large-txt"> {{restAmount}} ml </span>だよ </p>
      <p v-if="restAmount <= 0" class="large-txt"> 達成 🎉 </p>
      <canvas id="pie-chart" width="500px" height="auto"></canvas>
    </div>
    <div class="inner card">
      <h2>Weekly Summary</h2>
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
    target: 1500,
    restAmount: 1500,
    chartData: {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Weekly Data",
            data: [],
            backgroundColor: "rgba(0, 40, 151, 0.16)",
            borderColor: "rgba(0, 40, 151, 0.69)",
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
    },
    pieChartData: {
      type: 'pie',
      data: {
        labels: [
          '飲んだ量',
          '残り'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [],
          backgroundColor: [
            'rgba(0, 40, 151, 0.69)',
            'rgba(0, 40, 151, 0.16)',
          ],
          hoverOffset: 4
        }]
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
          this.restAmount = this.target - todayData[0].amount;

          // Set data to chart.js
          const labels = this.weeklyData.map(item => item.created_at);
          this.chartData.data.labels = labels;
          const amount = this.weeklyData.map(item => item.amount);
          this.chartData.data.datasets[0].data = amount;
          const ctx = document.getElementById('weekly-chart');
          new Chart(ctx, this.chartData);

          // Set pie chart
          const amounts = [todayData[0].amount, this.restAmount > 0 ? this.restAmount : 0];
          this.pieChartData.data.datasets[0].data = amounts;
          const ctx2 = document.getElementById('pie-chart');
          new Chart(ctx2, this.pieChartData);
        });
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&family=Nunito:wght@400;700&family=Readex+Pro:wght@400;700&display=swap');
body {
  margin: 0;
}
p {
  margin-top: 0;
}
.inner {
  width: 80%;
  margin: 0 auto;
}
.card {
  background: #Fff;
  border-radius: 15px;
  box-shadow: 0 0 8px #d9d9d9;
  padding: 35px 20px;
  margin-bottom: 30px;
  color: #333;
}
#app {
  font-family: 'Nunito', 'M PLUS Rounded 1c', sans-serif;
  text-align: center;
  background: #f7f7f7;
  padding-bottom: 30px;
}
.header {
  padding: 50px 0;
  background-color: #00639c;
  background-image: linear-gradient(160deg, #00639c 0%, #75bdb5 100%);
  color: #fff;
  margin-bottom: 30px;
}
.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}
.form {
  display: inline-block;
}
.form form {
  border-bottom: 1px solid rgba(0, 40, 151, 0.69);
}
.form input {
  border: none;
  padding: 10px;
}
.form button {
  border: none;
  padding: 9px;
  border-radius: 3px;
  cursor: pointer;
  background: rgba(0, 40, 151, 0.69);
  color: #fff;
}
.status {
  margin-bottom: 50px;
}
.large-txt {
  font-size: 2.5em;
}
</style>

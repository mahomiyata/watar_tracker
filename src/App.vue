<template>
  <div id="app">
    <input type="text" v-model="amount">
    <button v-on:click="postAmount">Send</button>
    <p> あと {{restAmount}} ml だよ</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    amount: 0,
    weeklyData: [],
    restAmount: 0
  }),
  created: function () {
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
    getAmount: function() {
      fetch('/api/water_amount/this_week')
        .then(res => res.json())
        .then(res => this.weeklyData = res)
        .then(() => {
          const today = new Date();
          const todayData = this.weeklyData.filter((item) => {
            const date = new Date(item.created_at);
            return date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
          });
          this.restAmount = 1500 - todayData[0].amount;
        });
    }
  }
}
</script>

<style>
#app {}
</style>

<template>
  <div id="app">
    <input type="text" v-model="amount">
    <button v-on:click="postAmount">Send</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    amount: 0
  }),
  methods: {
    postAmount: function() {
      fetch('/api/water_amount',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: this.amount})
      }).then(() => console.log('clicked!'));
    }
  }
}
</script>

<style>
#app {}
</style>

<template>
  <div id="tickets" class="columns">
    <div class="list-group">
      <ticket-component v-for="ticket in tickets" :ticket="ticket" :key="ticket.ticket"/>
    </div>
  </div>
</template>

<script>
import tickets from '../json/data.json'
import Vue from 'vue'
Vue.component('ticket-component', {
  template: `
    <div class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">List group item heading</h5>
        <small>{{ticket.daysOpen}} days ago</small>
      </div>
      <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
      <small>Donec id elit non mi porta.</small>
    </div>
  `,
  props: {
    ticket: Object
  }
})

export default {
  name: 'TicketDisplay',
  data () {
    return {
      tickets: tickets
    }
  },
  methods: {
  }
}
</script>

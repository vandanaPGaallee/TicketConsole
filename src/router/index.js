import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
// import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import TicketDisplay from '@/components/TicketDisplay'
import Table from '@/components/Table'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: TicketDisplay
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    }
  ]
})

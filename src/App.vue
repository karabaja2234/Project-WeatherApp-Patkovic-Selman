<template>
  <div id="app d-flex align-items-center justify-content-center">
    <router-view></router-view>
  </div>
</template>

<script>
import FrontPage from './components/FrontPage'
import Forecast from './components/Forecast'

export default {
  components: {
    FrontPage, Forecast
  }
}
</script>

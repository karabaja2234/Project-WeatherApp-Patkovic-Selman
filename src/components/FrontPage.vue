<template>
  <div class="Front" :style="{ backgroundImage: 'url(' + require('@/images/backgrounds/frontpagebg.jpg') + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '100%', height: '100vh', padding: '0', margin: '0'}">
    <div class="container d-flex flex-column align-items-center justify-content-center" style="height: 100vh">
      <h2 class="text-light text-center">
        Welcome to <font class="text-info">cleverWeather!</font>
      </h2>
      <div class="d-flex flex-column align-items-center justify-content-center text-center">
        <p class="mt-4 text-light">Enter the name of your city:</p>
        <input type="text" id="search_bar" class="form-control ml-4 mr-4" v-model="city.name">
        <p class="text-light text-center mt-2" style="font-size: 14px">Note: If the autofill does not work, refresh the page.</p>
        <button class="btn btn-info mt-2" @click="addCity">Continue</button>
      </div>
      <p class="mt-5 text-light">
        Already entered your city before?
      </p>
      <button class="btn btn-secondary" @click="checkTheForecast">Check the weather forecast right away</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrontPage',
  data() {
    return {
      city: {
        name: null,
        id: ""
      },
      repeat: false
    }
  },
  methods: {
    generateID(length) {
      var ret = "";
      while (ret.length < length) {
        ret += Math.random().toString(16).substring(2);
      }
      return ret.substring(0, length);
    },
    addCity() {
      this.repeat = false;
      this.city.name = document.getElementById('search_bar').value;
      if(this.$store.state.cities.length == 0) {
        if(this.city.name == "") {
          Toast.fire({
            icon: "error",
            title: "Enter a city to retrieve a forecast!",
          }); 
        } else {
          this.city.id = this.generateID(26);
          this.$store.commit("addToCities", this.city);
          this.$router.push("forecast");
        }
      } else {
        this.$store.state.cities.forEach((city) => {
          if(city.name == this.city.name) return this.repeat = true;
        })
        if(this.repeat) {
          Toast.fire({
              icon: "error",
              title: "City that you entered already exists in your database!",
          });
        } else if(this.city.name == "") {
          Toast.fire({
            icon: "error",
            title: "Enter a city to retrieve a forecast!",
          });
        } else {
          this.city.id = this.generateID(26);
          this.$store.commit("addToCities", this.city);
          this.$router.push("forecast");
        }
      }
    },
    checkTheForecast() {
      if(this.$store.state.cities.length == 0) {
        Toast.fire({
          icon: "error",
          title: "Your database is currently empty, please enter a city!",
        });
      } else {
        this.$router.push("forecast");
      }
    }
  },
  created() {
    this.$store.commit('saveData');
  },
}
</script>



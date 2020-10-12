<template>
  <div class="Front" :style="{ backgroundImage: 'url(' + require('@/images/frontpagebg.jpg') + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '100%', height: '100vh', padding: '0', margin: '0'}">
    <div class="container d-flex flex-column align-items-center justify-content-center" style="height: 100vh">
      <h1 class="text-light text-center">
        Welcome to <font class="text-info">cleverWeather!</font>
      </h1>
      <p class="mt-5 text-light">
        Enter the name of your city:
      </p>
      <div class="row d-flex flex-wrap align-items-center justify-content-center">
        <input type="text" id="search_bar" class="form-control" v-model="city.name">
        <button class="btn btn-info mt-4" @click="addCity">Continue</button>
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
        name: "",
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
          document.getElementById('search_bar').reset()
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
          document.getElementById('search_bar').reset()
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
    },
    print() {
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=5874315343445491bc07e2559123999e')
      .then(response => response.json())
      .then(data => console.log(data))
    }
  },
  created() {
    this.$store.commit('saveData');
    console.log(this.$store.cities)
  },
}
</script>



<template>
  <div class="Forecast" :style="{ backgroundImage: 'url(' + require('@/images/forecastbg1.jpg') + ')', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize: '1920px 1080px', 
                        width: '100%', 
                        minHeight: '100vh', 
                        padding: '0', 
                        margin: '0'}"
  >
  <div class="container d-flex flex-wrap justify-content-around" style="padding-top: 3%;">
    <div class="row d-flex flex-wrap bg-dark align-items-center" v-for="(city, index1) in shownForecast" v-bind:key="index1" style="minHeight: 350px; maxHeight: 400px; minWidth: 500px; margin-bottom: 5%; border-radius: 15px">
      <div class="col-6 d-flex flex-column bg-secondary p-4" :style="{ backgroundImage: 'url(' + require('@/images/morning.jpg') + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '220px', minHeight: '360px', borderRadius: '15px'}">
        <p class="h2 text-light">{{ dayOfTheWeek }}</p>
        <p class="h5">{{ date }}</p>
        <p><i class="fas fa-map-marker-alt"></i> {{ names[shownForecast.indexOf(city)] }}</p>
        <p class="text-light" style="font-size: 46px"> {{ Math.floor(city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].temperature - 273.15) }} &deg;C</p>
        <p class="text-light" style="font-size: 26px"> {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription }}</p>
      </div>
      <div class="col-6 d-flex flex-column justify-content-start p-4" style="minHeight: 300px">
        <p class="text-info">Description: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].sideDescription }}</p>
        <p class="text-info">Humidity: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].humidity }}</p>
        <p class="text-info">Wind: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].wind }} km/h</p>
        <span v-for="(temperature, tempIndex2) in shownTemperatures[shownForecast.indexOf(city)]" v-bind:key="tempIndex2">
          <div class="d-flex align-items-center">
            <i class="fas fa-cloud mr-2 text-light"></i><font class="text-light">{{ Math.floor(temperature - 273.15) }} &deg;C</font>
          </div>
        </span>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Forecast',
  data() {
    return {
      forecast: [],
      temperatures: [],
      shownTemperatures: [],
      shownForecast: [],
      names: [],
      day: {
        temperature: "",
        humidity: "",
        wind: "",
        mainDescription: "",
        sideDescription: ""
      },
      date: "",
      dayOfTheWeek: ""
    }
  },
  methods: {
    resetDayData() {
      this.day = {
        temperature: "",
        humidity: "",
        wind: "",
        mainDescription: "",
        sideDescription: ""
      }
    },
    getDateInfo() {
      let newDate = new Date;
      let dayNumber = newDate.getDay();
      let day = "";
      if(dayNumber == 1) this.dayOfTheWeek = "Monday";
      else if(dayNumber == 2) this.dayOfTheWeek = "Tuesday";
      else if(dayNumber == 3) this.dayOfTheWeek = "Wednesday";
      else if(dayNumber == 4) this.dayOfTheWeek = "Thursday";
      else if(dayNumber == 5) this.dayOfTheWeek = "Friday";
      else if(dayNumber == 6) this.dayOfTheWeek = "Saturday";
      else if(dayNumber == 7) this.dayOfTheWeek = "Sunday";

      let monthNumber = newDate.getMonth() + 1;
      let month = "";
      if(monthNumber == 1) month = "January";
      else if(monthNumber == 2) month = "February";
      else if(monthNumber == 3) month = "March";
      else if(monthNumber == 4) month = "April";
      else if(monthNumber == 5) month = "May";
      else if(monthNumber == 6) month = "June";
      else if(monthNumber == 7) month = "July";
      else if(monthNumber == 8) month = "August";
      else if(monthNumber == 9) month = "September";
      else if(monthNumber == 10) month = "October";
      else if(monthNumber == 11) month = "November";
      else if(monthNumber == 12) month = "December";

      let dayOfTheMonth = newDate.getDate();
      let year = newDate.getFullYear();

      this.date = `${dayOfTheMonth} ${month} ${year}`
    }
  },
  created() {
    this.$store.state.cities.forEach(city => {
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city.name + '&appid=5874315343445491bc07e2559123999e')                                                                       
      .then(response => response.json())
      .then(data => {
        this.names.push(city.name)
        let i = 0;
        while(i <= data.list.length) {
          this.day = {
            temperature: data.list[i].main.temp,
            humidity: data.list[i].main.humidity,
            wind: data.list[i].wind.speed,
            mainDescription: data.list[i].weather[0].main,
            sideDescription: data.list[i].weather[0].description
          }
          this.temperatures.push(this.day.temperature)
          this.forecast.push(this.day)
          this.resetDayData();
          if(i == 0) {
            i+=7
          } else {
            i+=8
          }
        }
        this.shownForecast.push(this.forecast)
        this.shownTemperatures.push(this.temperatures)
        this.forecast = []
        this.temperatures = []
      })
    })
    this.getDateInfo();
    console.log(this.shownForecast)
    console.log(this.shownTemperatures)
    console.log(this.date)
  }
}
</script>

<style scoped>

</style>

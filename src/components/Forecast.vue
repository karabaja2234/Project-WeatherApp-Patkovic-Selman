<template>
  <div class="Forecast" :style="{ backgroundImage: 'url(' + require('@/images/forecastbg1.jpg') + ')', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize: 'cover', 
                        width: '100%', 
                        height: '100vh', 
                        padding: '0', 
                        margin: '0'}"
  >
  <div class="container">
    <div class="row bg-dark" v-for="(city, index) in shownForecast" v-bind:key="index">

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
      shownForecast: [],
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
        let i = 0;
        console.log(data.list)
        while(i <= data.list.length) {
          this.day = {
            temperature: data.list[i].main.temp,
            humidity: data.list[i].main.humidity,
            wind: data.list[i].wind.speed,
            mainDescription: data.list[i].weather[0].main,
            sideDescription: data.list[i].weather[0].description
          }
          this.forecast.push(this.day)
          this.resetDayData();
          if(i == 0) {
            i+=7
          } else {
            i+=8
          }
        }
        this.shownForecast.push(this.forecast)
        this.forecast = []
      })
    })
    this.getDateInfo();
    console.log(this.shownForecast)
    console.log(this.date)
  }
}
</script>

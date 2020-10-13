<template>
  <div id="Forecast">
  <div class="d-flex flex-wrap justify-content-start align-items-left" style="padding-top: 3%;">
    <div class="wrapper" v-for="(city, index1) in shownForecast" v-bind:key="index1" style="">
      <div class="todays-forecast" v-bind:style="[city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription == 'Thunderstorm'  
                                                          ? { backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + require('@/images/thunderstorm.jpg') + ')'}
                                                          : city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription == 'Drizzle'
                                                          ? { backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + require('@/images/drizzle.jpg') + ')'}
                                                          : city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription == 'Clouds'
                                                          ? { backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + require('@/images/clouds.jpg') + ')'}
                                                          : city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription == 'Snow'
                                                          ? { backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + require('@/images/snow.jpg') + ')'}
                                                          : city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription == 'Clear'
                                                          ? { backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + require('@/images/clear.jpg') + ')'}
                                                          : city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription == 'Atmosphere'
                                                          ? { backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + require('@/images/atmosphere.jpg') + ')'}
                                                          : city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription == 'Rain'
                                                          ? { backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + require('@/images/rain.jpg') + ')'}
                                                          : { backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + require('@/images/bg2.jpg') + ')'}]" >
        <div class="d-flex flex-column justify-content-center align-items-center">
          <p class="h2 text-light">{{ dayOfTheWeek }}</p>
          <p class="h5 text-light">{{ date }}</p>
          <p class="text-light"><i class="fas fa-map-marker-alt"></i> {{ names[shownForecast.indexOf(city)] }}</p>
        </div>
        <div class="d-flex flex-column justify-content-center" style="margin-top: 10%; border-radius: 15px">
          <p class="text-light" style="font-size: 36px"> {{ Math.floor(city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].temperature - 273.15) }} &deg;C</p>
          <p class="text-light" style="font-size: 24px"> {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription }}</p>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-start p-4 bg-dark" style="minHeight: 250px; maxHeight: 350px; border-top-right-radius: 15px; border-bottom-right-radius: 15px">
        <p class="text-light">DESCRIPTION: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].sideDescription }}</p>
        <p class="text-light">HUMIDITY: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].humidity }} %</p>
        <p class="text-light">WIND: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].wind }} km/h</p>
        <span v-for="(forecast, tempIndex2) in shownFiveDayForecast[shownForecast.indexOf(city)]" v-bind:key="tempIndex2">
          <div class="fiveDayForecast d-flex align-items-center justify-content-start mt-1 text-light" v-if="tempIndex2 != 0">
            <i style="font-size: 18px" class="fas mr-3" :class="forecast.description == 'Thunderstorm' 
                                          ? 'fa-poo-storm' 
                                          : forecast.description == 'Clouds' ? 'fa-cloud'
                                          : forecast.description == 'Drizzle' ? 'fa-cloud-rain'
                                          : forecast.description == 'Snow' ? 'fa-snowflake'
                                          : forecast.description == 'Clear' ? 'fa-sun'
                                          : forecast.description == 'Atmosphere' ? 'fa-smog'
                                          : forecast.description == 'Rain' ? 'fa-cloud-showers-heavy'
                                          : null"></i>
            <span style="font-size: 18px" class="mr-2">{{ Math.floor(forecast.temperature - 273.15) }}&deg;C</span>
            <span style="font-size: 18px"> {{ nextFiveDays[tempIndex2 - 1]}}</span>
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
      fiveDayForecast: [],
      nextFiveDays: [],
      shownFiveDayForecast: [],
      shownForecast: [],
      names: [],
      day: {
        temperature: "",
        humidity: "",
        wind: "",
        mainDescription: "",
        sideDescription: ""
      },
      fiveDayInfo: {
        description: "",
        temperature: ""
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
      this.fiveDayInfo = {
        description: "",
        temperature: ""
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
    let newDate = new Date;
    let nextFiveDays = [newDate.getDay() + 1, newDate.getDay() + 2, newDate.getDay() + 3, newDate.getDay() + 4, newDate.getDay() + 5];
    let i = 0;
    nextFiveDays.forEach((day, index) => {
       if(day == 8) {
        this.nextFiveDays[i] = "Monday"; i++;
       } else if(day == 2) {
         this.nextFiveDays[i] = "Tuesday"; i++;
       } else if(day == 3) {
         this.nextFiveDays[i] = "Wednesday"; i++;
       } else if(day == 4) {
        this.nextFiveDays[i] = "Thursday"; i++;
       } else if(day == 5) {
         this.nextFiveDays[i] = "Friday"; i++;
       } else if(day == 6) {
         this.nextFiveDays[i] = "Saturday"; i++;
       } else if(day == 7) {
        this.nextFiveDays[i] = "Sunday"; i++;
      }
    })

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
          this.fiveDayInfo = {
            description: this.day.mainDescription,
            temperature: this.day.temperature
          }
          this.fiveDayForecast.push(this.fiveDayInfo)
          this.forecast.push(this.day)
          this.resetDayData();
          if(i == 0) {
            i+=7
          } else {
            i+=8
          }
        }
        this.shownForecast.push(this.forecast)
        this.shownFiveDayForecast.push(this.fiveDayForecast)
        this.forecast = []
        this.fiveDayForecast = []
      })
    })
    this.getDateInfo();
  }
}
</script>

<style scoped>
#Forecast {
  background-image: url('../images/bg2.jpg');
  background-repeat: no-repeat;
  background-size: auto;
  min-height: 100vh;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px; 
  max-height: 350px; 
  min-width: 600px; 
  margin-bottom: 5%; 
  border-radius: 15px;
}
.todays-forecast {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover; 
  width: 220px; 
  height: 350px;
  border-radius: 10px;
  background-color: rgb(0,0,0, 0.3); 
  padding: 4%;
  -webkit-transition: 200ms ease;
	-o-transition: 200ms ease;
	transition: 200ms ease;
  cursor: pointer;
}

.todays-forecast:hover {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
  -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2)
}

.fiveDayForecast:hover {
  -webkit-transform: scale(1.1);
	    -ms-transform: scale(1.1);
	        transform: scale(1.1);
  -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
	        box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
  color: rgb(41, 43, 44) !important;
  background-color: rgb(247, 247, 247);
}

.fiveDayForecast {
-webkit-transition: 200ms ease;
	-o-transition: 200ms ease;
	transition: 200ms ease;
  border-radius: 10px;
  padding-left: 5%;
}

@media screen and (max-width: 650px){
  .wrapper {
    flex-direction: column;
    height: 100%
  }

}

</style>

<template>
  <div id="Forecast">
    <Navbar />
    <div class="container mainWrapper">
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
          <div class="todays-forecast-top">
            <p class="todays-day-of-week">{{ dayOfTheWeek }}</p>
            <p class="todays-date">{{ date }}</p>
            <p class="todays-location"><i class="fas fa-map-marker-alt"></i> {{ names[shownForecast.indexOf(city)] }}</p>
          </div>
          <div class="todays-forecast-bottom">
            <span class="todaysTemperature"> {{ Math.floor(city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].temperature - 273.15) }}&deg;C</span>
            <span class="todaysDescription"> {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].mainDescription }}</span>
          </div>
        </div>
        <div class="bg-dark nextFiveDayForecast">
          <p class="text-light">DESCRIPTION: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].sideDescription }}</p>
          <p class="text-light">HUMIDITY: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].humidity }} %</p>
          <p class="text-light">WIND: {{ city[shownForecast.indexOf(city) - shownForecast.indexOf(city)].wind }} km/h</p>
          <span v-for="(forecast, tempIndex2) in shownFiveDayForecast[shownForecast.indexOf(city)]" v-bind:key="tempIndex2">
            <div class="fiveDayForecast d-flex align-items-center justify-content-start mt-1 text-light" v-if="tempIndex2 != 0">
              <i style="font-size: 16px" class="fas mr-3" :class="forecast.description == 'Thunderstorm' 
                                            ? 'fa-poo-storm' 
                                            : forecast.description == 'Clouds' ? 'fa-cloud'
                                            : forecast.description == 'Drizzle' ? 'fa-cloud-rain'
                                            : forecast.description == 'Snow' ? 'fa-snowflake'
                                            : forecast.description == 'Clear' ? 'fa-sun'
                                            : forecast.description == 'Atmosphere' ? 'fa-smog'
                                            : forecast.description == 'Rain' ? 'fa-cloud-showers-heavy'
                                            : null">
              </i>
              <span class="nextFiveDaysText mr-2">{{ Math.floor(forecast.temperature - 273.15) }}&deg;C</span>
              <span class="nextFiveDaysText"> {{ nextFiveDays[tempIndex2 - 1]}}</span>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Forecast',
  components: {
    Navbar
  },
  data() {
    return {
      forecast: [],
      fiveDayForecast: [],
      nextFiveDays: [],
      shownFiveDayForecast: [],
      shownForecast: [],
      names: [],
      date: "",
      dayOfTheWeek: ""
    }
  },
  methods: {
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
          this.fiveDayForecast.push({description: data.list[i].weather[0].main, temperature: data.list[i].main.temp})
          this.forecast.push({temperature: data.list[i].main.temp, humidity: data.list[i].main.humidity, wind: data.list[i].wind.speed,
                              mainDescription: data.list[i].weather[0].main, sideDescription: data.list[i].weather[0].description})
          i == 0 ? i+=7 : i+=8;
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
  background-repeat: repeat-y;
  background-size: "100% auto";
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
.mainWrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 100px 0px 0px 0px
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px; 
  max-height: 350px; 
  width: 500px; 
  margin-bottom: 5%;
  margin-left: 5%; 
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
.todays-forecast-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.todays-forecast-bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%; 
  border-radius: 15px;
}
.todays-day-of-week {
  color: rgb(247, 247, 247);
  font-size: 32px;
}
.todays-date {
  color: rgb(247, 247, 247);
  font-size: 20px;
}
.todays-location {
  color: rgb(247, 247, 247);
  font-size: 16px;
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
}
.todaysTemperature {
  color: rgb(247, 247, 247);
  font-size: 30px;
}
.todaysDescription {
  color: rgb(247, 247, 247);
  font-size: 24px;
}
.todays-forecast:hover {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
  -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2)
}
.nextFiveDayForecast {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 10% 10% 10% 5%;
  width: 350px;
  height: 320px;
  border-top-right-radius: 15px; 
  border-bottom-right-radius: 15px;
}
.nextFiveDaysText {
  font-size: 16px
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
  padding-left: 5px;
  padding-right: 5px;
}

@media screen and (max-width: 650px){
  .mainWrapper {
    padding: 200px 0px 0px 0px
  }
  .wrapper {
    flex-direction: column;
    height: 100%;
    margin-bottom: 200px;
    margin-left: 0
  }
  .todays-forecast {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    padding: 3% 8% 3% 8%; 
    height: 250px;
  }
  .todays-forecast-top {
    align-items: center;
    justify-content: center;
  }
  .todays-forecast-bottom {
    margin-top: 0%
  }
  .todaysTemperature {
    font-size: 24px
  }
  .nextFiveDayForecast {
    width: 250px;
    height: 340px;
    border-top-right-radius: 0px; 
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
}

@media screen and (max-width: 400px){
  .todays-forecast {
    width: 250px;
    padding: 3% 10% 3% 5%; 
    height: 180px;
  }
  .todays-forecast-top {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .todays-day-of-week {
    color: rgb(247, 247, 247);
    font-size: 24px;
  }
  .todays-date {
    color: rgb(247, 247, 247);
    font-size: 16px;
  }
  .todays-location {
    color: rgb(247, 247, 247);
    font-size: 16px;
    text-align: center;
  }
  .todaysTemperature {
    font-size: 24px
  }
  .todaysDescription {
    font-size: 16px;
  }
  .nextFiveDayForecast {
    width: 200px;
    height: 340px;
    border-top-right-radius: 0px; 
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  .nextFiveDaysText {
    font-size: 14px;
  }
}
</style>

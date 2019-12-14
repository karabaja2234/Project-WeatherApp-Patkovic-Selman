//Osnovne varijable
var oneDayForecast = document.querySelector('#oneDayForecast');
var button2 = document.querySelector('#button2');
var inputValue = document.querySelector('.inputValue');

//Varijable za natpise
var name2 = document.querySelector('.name2');
var name2Label = document.querySelector('#name2');
var today = document.querySelector('.today');

//Varijable za slucaj sa jednim danom
var oneDayDate = document.querySelector('.oneDayDate');
var oneDayDescription = document.querySelector('.oneDayDescription');

//Niz u kojem se nalaze svi podaci
var results = [];

//Varijable za temperature
var temp1_max = document.querySelector('.maxtemp1');
var temp1_min = document.querySelector('.mintemp1');
var maxTemp1 = document.querySelector('.text_tempMax1');
var minTemp1 = document.querySelector('.text_tempMin1');

//Varijable za dan
var date_1;
var dateRaw1;
var day_date1;
var date1 = document.querySelector('.date1');

$(oneDayForecast).hide();

button2.addEventListener('click', function () {

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=5874315343445491bc07e2559123999e').then(response => response.json()).then(data => {

        for (var i = 0; i < data.list.length; i += 8) {
            results[i] = [data.list[i].dt_txt, data.list[i].weather[0].description, data.list[i].main.temp_max, data.list[i].main.temp_min];
        }

        //Ubacivanje natpisa
        name2 = data.city.name;
        name2Label.innerHTML = name2;
        today.innerHTML = 'Today';

        //Ubacivanje dobijenih rezultata za maksimalnu i minimalnu temperaturu u html strukturu
        temp1_max.innerHTML = Math.floor(results['0']['2'] - 273, 15) + '&deg;';
        temp1_min.innerHTML = Math.floor(results['0']['3'] - 273, 15) + '&deg;';

        //Ubacivanje dobijenih deskripcija vremena u html strukturu
        oneDayDescription.innerHTML = results['0']['1'];

        //Dobijanje prvobitnog oblika datuma iz json strukture
        dateRaw1 = results['0']['0'];

        //Pretvaranje u originalni oblik datuma
        date_1 = new Date(dateRaw1);

        //Dobijanje broja dana navedenog datuma
        day_date1 = parseInt(date_1.getDay());

        //Provjera koji je dan u pitanju
        if (day_date1 == 1) { date_1 = 'Monday' }
        if (day_date1 == 2) { date_1 = 'Tuesday' }
        if (day_date1 == 3) { date_1 = 'Wednesday' }
        if (day_date1 == 4) { date_1 = 'Thursday' }
        if (day_date1 == 5) { date_1 = 'Friday' }
        if (day_date1 == 6) { date_1 = 'Saturday' }
        if (day_date1 == 0) { date_1 = 'Sunday' }

        //Dodavanje dobijenog dana u html stukturu
        date1.innerHTML = date_1;

        //Dodavanje teksta za temperaturu
        maxTemp1.innerHTML = 'Maximum Temperature: ';
        minTemp1.innerHTML = 'Minimum Temperature: ';

        //Animacije
        $("#oneDayForecast").slideDown(500);

    }).catch(err => alert("Wrong city name!"))
})
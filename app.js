//Osnovne varijable
var button = document.querySelector('#button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var nameLabel = document.querySelector('#name');

//Boxovi u kojima se nalaze dani
var box1 = document.querySelector('.dayOne');
var box2 = document.querySelector('.dayTwo');
var box3 = document.querySelector('.dayThree');
var box4 = document.querySelector('.dayFour');
var box5 = document.querySelector('.dayFive');
var firstRow = document.querySelector('#firstRow');

//Skrivanje elemenata prije ispisa
$(box1).hide();
$(box2).hide();
$(box3).hide();
$(box4).hide();
$(box5).hide();
$(firstRow).hide();


//Niz u kojem se nalaze svi podaci
var results = [];

//Temperature za svih 5 dana pojedinacno
var temp1_max = document.querySelector('.maxtemp1');
var temp1_min = document.querySelector('.mintemp1');

var temp2_max = document.querySelector('.maxtemp2');
var temp2_min = document.querySelector('.mintemp2');

var temp3_max = document.querySelector('.maxtemp3');
var temp3_min = document.querySelector('.mintemp3');

var temp4_max = document.querySelector('.maxtemp4');
var temp4_min = document.querySelector('.mintemp4');

var temp5_max = document.querySelector('.maxtemp5');
var temp5_min = document.querySelector('.mintemp5');

//Deskripcije
var description_1 = document.querySelector('.description1');
var description_2 = document.querySelector('.description2');
var description_3 = document.querySelector('.description3');
var description_4 = document.querySelector('.description4');
var description_5 = document.querySelector('.description5');

//Varijable za originalni oblik datuma u html-u
var date_1;
var date_2;
var date_3;
var date_4;
var date_5;

//Varijable za pohranjivanje dobijenog dana iz originalnog oblika datuma
var date1 = document.querySelector('.date1');
var date2 = document.querySelector('.date2');
var date3 = document.querySelector('.date3');
var date4 = document.querySelector('.date4');
var date5 = document.querySelector('.date5');

//Varijable za numericke vrijednosti trazenih dana
var dateRaw1, dateRaw2, dateRaw3, dateRaw4, dateRaw5;
var day_date1, day_date2, day_date3, day_date4, day_date5;

//Varijable za tekst temperature
var maxTemp1 = document.querySelector('.text_tempMax1');
var minTemp1 = document.querySelector('.text_tempMin1');

var maxTemp2 = document.querySelector('.text_tempMax2');
var minTemp2 = document.querySelector('.text_tempMin2');

var maxTemp3 = document.querySelector('.text_tempMax3');
var minTemp3 = document.querySelector('.text_tempMin3');

var maxTemp4 = document.querySelector('.text_tempMax4');
var minTemp4 = document.querySelector('.text_tempMin4');

var maxTemp5 = document.querySelector('.text_tempMax5');
var minTemp5 = document.querySelector('.text_tempMin5');


//Button koji pokrece fetch podataka sa api-a
button.addEventListener('click', function () {

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=5874315343445491bc07e2559123999e').then(response => response.json()).then(data => {

        for (var i = 0; i < data.list.length; i += 8) {
            results[i] = [data.list[i].dt_txt, data.list[i].weather[0].description, data.list[i].main.temp_max, data.list[i].main.temp_min];
        }


        name = data.city.name;
        nameLabel.innerHTML = name;
        //Ubacivanje dobijenih rezultata za maksimalnu i minimalnu temperaturu u html strukturu
        temp1_max.innerHTML = Math.floor(results['0']['2'] - 273, 15) + '&deg;';
        temp1_min.innerHTML = Math.floor(results['0']['3'] - 273, 15) + '&deg;';

        temp2_max.innerHTML = Math.floor(results['8']['2'] - 273, 15) + '&deg;';
        temp2_min.innerHTML = Math.floor(results['8']['3'] - 273, 15) + '&deg;';

        temp3_max.innerHTML = Math.floor(results['16']['2'] - 273, 15) + '&deg;';
        temp3_min.innerHTML = Math.floor(results['16']['3'] - 273, 15) + '&deg;';

        temp4_max.innerHTML = Math.floor(results['24']['2'] - 273, 15) + '&deg;';
        temp4_min.innerHTML = Math.floor(results['24']['3'] - 273, 15) + '&deg;';

        temp5_max.innerHTML = Math.floor(results['32']['2'] - 273, 15) + '&deg;';
        temp5_min.innerHTML = Math.floor(results['32']['3'] - 273, 15) + '&deg;';

        //Ubacivanje dobijenih deskripcija vremena u html strukturu
        description_1.innerHTML = results['0']['1'];
        description_2.innerHTML = results['8']['1'];
        description_3.innerHTML = results['16']['1'];
        description_4.innerHTML = results['24']['1'];
        description_5.innerHTML = results['32']['1'];

        //Dobijanje prvobitnog oblika datuma iz json strukture
        dateRaw1 = results['0']['0'];
        dateRaw2 = results['8']['0'];
        dateRaw3 = results['16']['0'];
        dateRaw4 = results['24']['0'];
        dateRaw5 = results['32']['0'];

        //Pretvaranje u originalni oblik datuma
        date_1 = new Date(dateRaw1);
        date_2 = new Date(dateRaw2);
        date_3 = new Date(dateRaw3);
        date_4 = new Date(dateRaw4);
        date_5 = new Date(dateRaw5);

        //Dobijanje broja dana navedenog datuma
        day_date1 = parseInt(date_1.getDay());
        day_date2 = parseInt(date_2.getDay());
        day_date3 = parseInt(date_3.getDay());
        day_date4 = parseInt(date_4.getDay());
        day_date5 = parseInt(date_5.getDay());

        //Provjera koji je dan u pitanju
        if (day_date1 == 1) { date_1 = 'Monday'; }
        if (day_date1 == 2) { date_1 = 'Tuesday'; }
        if (day_date1 == 3) { date_1 = 'Wednesday'; }
        if (day_date1 == 4) { date_1 = 'Thursday'; }
        if (day_date1 == 5) { date_1 = 'Friday'; }
        if (day_date1 == 6) { date_1 = 'Saturday'; }
        if (day_date1 == 0) { date_1 = 'Sunday'; }

        if (day_date2 == 1) { date_2 = 'Monday'; }
        if (day_date2 == 2) { date_2 = 'Tuesday'; }
        if (day_date2 == 3) { date_2 = 'Wednesday'; }
        if (day_date2 == 4) { date_2 = 'Thursday'; }
        if (day_date2 == 5) { date_2 = 'Friday'; }
        if (day_date2 == 6) { date_2 = 'Saturday'; }
        if (day_date2 == 0) { date_2 = 'Sunday'; }

        if (day_date3 == 1) { date_3 = 'Monday'; }
        if (day_date3 == 2) { date_3 = 'Tuesday'; }
        if (day_date3 == 3) { date_3 = 'Wednesday'; }
        if (day_date3 == 4) { date_3 = 'Thursday'; }
        if (day_date3 == 5) { date_3 = 'Friday'; }
        if (day_date3 == 6) { date_3 = 'Saturday'; }
        if (day_date3 == 0) { date_3 = 'Sunday'; }

        if (day_date4 == 1) { date_4 = 'Monday'; }
        if (day_date4 == 2) { date_4 = 'Tuesday'; }
        if (day_date4 == 3) { date_4 = 'Wednesday'; }
        if (day_date4 == 4) { date_4 = 'Thursday'; }
        if (day_date4 == 5) { date_4 = 'Friday'; }
        if (day_date4 == 6) { date_4 = 'Saturday'; }
        if (day_date4 == 0) { date_4 = 'Sunday'; }

        if (day_date5 == 1) { date_5 = 'Monday'; }
        if (day_date5 == 2) { date_5 = 'Tuesday'; }
        if (day_date5 == 3) { date_5 = 'Wednesday'; }
        if (day_date5 == 4) { date_5 = 'Thursday'; }
        if (day_date5 == 5) { date_5 = 'Friday'; }
        if (day_date5 == 6) { date_5 = 'Saturday'; }
        if (day_date5 == 0) { date_5 = 'Sunday'; }


        //Dodavanje dobijenog dana u html stukturu
        date1.innerHTML = date_1;
        date2.innerHTML = date_2;
        date3.innerHTML = date_3;
        date4.innerHTML = date_4;
        date5.innerHTML = date_5;

        //Dodavanje teksta za temperaturu
        maxTemp1.innerHTML = 'Maximum Temperature: ';
        minTemp1.innerHTML = 'Minimum Temperature: ';

        maxTemp2.innerHTML = 'Maximum Temperature: ';
        minTemp2.innerHTML = 'Minimum Temperature: ';

        maxTemp3.innerHTML = 'Maximum Temperature: ';
        minTemp3.innerHTML = 'Minimum Temperature: ';

        maxTemp4.innerHTML = 'Maximum Temperature: ';
        minTemp4.innerHTML = 'Minimum Temperature: ';

        maxTemp5.innerHTML = 'Maximum Temperature: ';
        minTemp5.innerHTML = 'Minimum Temperature: ';

        //Animacije
        $("#dayOne").slideDown(500);
        $("#dayTwo").slideDown(500);
        $("#dayThree").slideDown(500);
        $("#dayFour").slideDown(500);
        $("#dayFive").slideDown(500);
        $("#firstRow").slideDown(500);
        $("#firstRow").css({ backgroundImage: 'linear-gradient(60deg, #29323c 0%, #485563 100%)', borderRadius: '10px', border: '1px solid #cdcdcd' })

    }).catch(err => alert("Wrong city name!"))

});


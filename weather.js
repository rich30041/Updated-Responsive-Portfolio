var citylist =$("#city-list");
var cities = [];
var key = "10bed3fd22a7204ac32c558e968d28f2";

var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

//Format for day
function FormatDay(date){
    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var outday = (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day + '/' +
        date.getFullYear() ;
    return outday;
}

// check for stored cities exist and loads the list if so add to choices


cityName = "Robbinsville"
state = "NC"
CoordLon = "83.80"
CoordLat = "35.32"

  //Function to populate all the forecast data 
  
  function getResponseWeather(cityName){
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}%2c${state}%2c&appid=${key}&units=imperial`; 
 //   var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
    //Clear content of weather-today
    $("#weather-today").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)
      // Create a new table row element
      //citydate = $("<h3>").text("Robbinsville, NC "+ FormatDay());
      citydate = $("<h3>").text("Tail of the Dragon, NC ");
      $("#weather-today").append(citydate);    
//   var convtemp = parseInt((response.main.temp)* 9/5 - 459);
//   var citytemp = $("<p>").text("Temperature: "+ convtemp + " °F");
    //   var citytemp = $("<p>").text("High Temp: "+ parseInt(response.main.temp_max) + " °F");
    //   $("#weather-today").append(citytemp);
    //   var cityLow = $("<p>").text("Low Temp: "+ parseInt(response.main.temp_min) + " °F");
    //   $("#weather-today").append(cityLow);
    //   var cityhumid = $("<p>").text("Humidity: "+ response.main.humidity + " %");
    //   $("#weather-today").append(cityhumid);
    //   var citywind = $("<p>").text("Wind Speed: "+ parseInt(response.wind.speed) + " MPH");
    //   $("#weather-today").append(citywind);
      var CoordLon = response.coord.lon;
      var CoordLat = response.coord.lat;
    
     
        //Section to get forecast  
        // var queryURL3 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}%2c${state}%2c&appid=${key}&units=imperial`;
        var queryURL3 = `https://api.openweathermap.org/data/2.5/onecall?appid=${key}&lat=${CoordLat}&lon=${CoordLon}&units=imperial`;
        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function(respForecast) { 
            console.log(respForecast)
            $("#boxes").empty();
            //for(var i=5, j=0; j<=4; i=i+8){
            for(var i=0, j=0; j<=6; i=i+1){
                var read_date = respForecast.daily[i].dt;
                //if(respForecast.list[i].dt != respForecast.list[i+1].dt){
                if(respForecast.daily[i].dt != respForecast.daily[i+1].dt){
                    var forecastDiv = $("<div>");
                    forecastDiv.attr("class","col-3 m-2 bg-primary")
                    var d = new Date(0);
                    d.setUTCSeconds(read_date);
                    var date = d;
                    var month = date.getMonth()+1;
                    var day = date.getDate();   
                    var dayOfWeek = date.getDay();              
                 //   var outday = (month<10 ? '0' : '') + month + '/' +
                   // (day<10 ? '0' : '') + day + '/' +
                   // date.getFullYear();
                    var outday = `${weekday[dayOfWeek]} ${(month<10 ? '0' : '') + month}/${(day<10 ? '0' : '') + day}`;
                    var forecasth4 = $("<h6>").text(outday);
                    //add image to forecast block
                    var imgtag = $("<img>");
                    var skyconditions = respForecast.daily[i].weather[0].main;
                    if(skyconditions==="Clouds"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
                    } else if(skyconditions==="Clear"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
                    }else if(skyconditions==="Rain"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
                    }

                    // var ptempK = respForecast.list[i].main.temp;
                    // var convtemp = parseInt((ptempK)* 9/5 - 459);
                    var tempP = $("<p>").text("High Temp: "+ parseInt(respForecast.daily[i].temp.max) + " °F");
                    var tempL = $("<p>").text("Morn Temp: "+ parseInt(respForecast.daily[i].temp.morn) + " °F");
                    var humidityP = $("<p>").text("Humidity: "+ respForecast.daily[i].humidity + "%");
                    var windSp = $("<p>").text("Wind: "+ parseInt(respForecast.daily[i].wind_speed));
                    forecastDiv.append(forecasth4);
                    forecastDiv.append(imgtag);
                    forecastDiv.append(tempP);
                    forecastDiv.append(tempL);
                    forecastDiv.append(humidityP);
                    forecastDiv.append(windSp);
                    $("#boxes").append(forecastDiv);
                    j++;
                }
            
        }
      
    });
      

    });
    
  }


 
getResponseWeather(cityName);

	var isTempCel = true;
	var tempCelsius = 0;
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
		var lat = "lat=" + position.coords.latitude;
		var long = "lon=" + position.coords.longitude; 
		var urlString = "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" +long; 
		var request = {
		url: urlString,
		type: 'GET',
      	success: dataReceived,
      	cache: false,
      	timeout: 4000
		}
		$.ajax(request); 
		});
	}

function dataReceived(data){
	console.log(data);
	console.log(data.name +", " + data.sys.country);
	console.log("Latitide = " + data.coord.lat + " Longitude = " + data.coord.lon);
	console.log(data.weather[0].description);
	console.log("Temperature = " + data.main.temp + " Celsius");
	var loc = data.name +", " + data.sys.country;
	console.log(data.weather[0].icon);
	$("img").attr("src", data.weather[0].icon);
	$("#location").text(loc);
	$("#desc").text(data.weather[0].description);
	tempCelsius = Math.round(data.main.temp);
	$("#temp").text(tempCelsius);

}

$("#symbol").on("click", function(){
	var tempFah = Math.round((9/5) * tempCelsius + 32);
	if (isTempCel){
		console.log("Switched to Fahrenheit at " + tempFah + " °F");
		$("#temp").text(tempFah);
		$("#symbol").text("F");
		isTempCel = false;
	} else {
		console.log("Switched to Celsius at " + tempCelsius + " °C");
		$("#temp").text(tempCelsius);
		$("#symbol").text("C");
		isTempCel = true;
	}
});

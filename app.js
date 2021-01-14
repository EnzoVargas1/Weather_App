let long;
let lat;

var blueSky = "#1C9CF6";
var nightSky =  shadeColor(blueSky, -80);
var d1 = new Date(0);
var d2 = new Date(0);
var currentTime = new Date();
var currentHour = currentTime.getHours();

var weatherDescriptions = ["scattered clouds", "overcast clouds", "clear sky"];
var unit = document.querySelector(".temperature");
var symbol = document.querySelector(".temperature-degree");
var t = document.querySelector(".temperature-number");

var c = document.querySelector("#cityName");
var f = document.querySelector("#forecast");
var icon = document.querySelector("#img");
var data;



window.addEventListener("load", () => {
      
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            var request = new XMLHttpRequest();
           
            request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+long +'&appid=e5b23759fb840b8e8981cdd7f0bee333', true);
           
            request.onload = function(){
                data = JSON.parse(this.response);
                console.log(data);
                    
                    t.textContent = Math.round((((9*data.main.temp) - 2458.35)/5) + 32);
                    c.textContent = data.name;
                    f.textContent = data.weather[0].description;
                    var weatherDescri = data.weather[0].description;
                    const sunrise = data.sys.sunrise;
                    const sunset = data.sys.sunset;
                    
                    d1.setUTCSeconds(sunrise);
                    d2.setUTCSeconds(sunset);

                    currentHour = currentTime.getHours();
                    const sunriseHr = d1.getHours();
                    const sunsetHr = d2.getHours();

                    changeBackgroundColor(sunriseHr, sunsetHr, currentHour);
                    setIcon(weatherDescri, icon, sunriseHr, sunsetHr, currentHour);

                    unit.addEventListener("click", () =>{
                        if(symbol.textContent == "F"){
                            t.innerText = Math.round(data.main.temp - 273.15);
                            symbol.textContent = "C";
                        }
                        else{
                            t.innerText = Math.round((((9*data.main.temp) - 2458.35)/5) + 32);
                            symbol.textContent = "F";
                        }
                    });
              
            }
            
       request.send();
    });

}   

});




function changeBackgroundColor(sunrise, sunset, current){
    if((current >= sunrise) && (current < sunset)){
        document.body.style.backgroundColor = blueSky;
    }
    else if((current >= sunset) || (current < sunrise)){
        document.body.style.backgroundColor = nightSky;
    }
}

function setIcon(text, currentImage, sunrise, sunset, current){
   
        if(weatherDescriptions[0]== text){
            var srcImage = "Images/Partly_Cloudy.png";
            currentImage.src = srcImage;
        }

        if(weatherDescriptions[1] == text){
            var srcImage = "Images/Cloudy.png";
            currentImage.src = srcImage;
            document.body.style.backgroundColor = "#a6a6a6";
            changeBackgroundColor(sunriseHr, sunsetHr, currentHour);
        }
        if(weatherDescriptions[2] == text){
            if((current >= sunrise) && (current < sunset)){
                var srcImage = "Images/Sunny.png";
                document.body.style.backgroundColor = blueSky;
                currentImage.src = srcImage;
            }
            else if((current >= sunset) || (current < sunrise)){
                var srcImage = "Images/Clearly_Night.png";
                document.body.style.backgroundColor = nightSky;
                currentImage.src = srcImage;
            }
        }
        
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}







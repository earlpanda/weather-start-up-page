// get date
var today = new Date();
var weekDay = '';
switch (today.getDay()) {
    case 0:
        weekDay = 'Sunday';
        break;
    case 1:
        weekDay = 'Monday';
        break;
    case 2:
        weekDay = 'Tueday';
        break;
    case 3:
        weekDay = 'Wednesday';
        break;
    case 4:
        weekDay = 'Thursday';
        break;
    case 5:
        weekDay = 'Friday';
        break;
    case 6:
        weekDay = 'Saturday';
        break;
}
var date = weekDay + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160) + today.getDate() + '-'+ (today.getMonth() + 1) + '-' + today.getFullYear();
var hour = today.getHours();
var time = hour + ":" + today.getMinutes();

// Fill current date time
$(".date").text(date);
$(".time").text(time);

// set bg color and sun's position depend on time
var bgColor = '#c7cefe';
if (hour <= 4) {
    bgColor = '#404791';
    $(".sun").css("transform", 'rotate(-90deg) translate(40vw) rotate(-90deg)');
    $(".sun").css("background-color", '#e6dde4');
    $(".date").css("color", '#e6dde4');
    $(".time").css("color", '#e6dde4');
    $(".google a").css("color", '#e6dde4');
    $(".google path").css("fill", '#e6dde4');
} else if (hour <= 8) {
    bgColor = '#8fbeff';
    $(".sun").css("transform", 'rotate(-150deg) translate(40vw) rotate(-150deg)');
} else if (hour <= 10) {
    bgColor = '#bff6ff';
    $(".sun").css("transform", 'rotate(-120deg) translate(40vw) rotate(-120deg)');
} else if (hour <= 14) {
    bgColor = '#8afbff';
    $(".sun").css("transform", 'rotate(-90deg) translate(40vw) rotate(-90deg)');
} else if (hour <= 16) {
    bgColor = '#fcb862';
    $(".sun").css("transform", 'rotate(-60deg) translate(40vw) rotate(-60deg)');
    $(".weather").css("left", '10%');
} else if (hour <= 18) {
    bgColor = '#f56a42';
    $(".weather").css("left", '10%');
    $(".sun").css("transform", 'rotate(-30deg) translate(40vw) rotate(-30deg)');
} else if (hour <= 23) {
    bgColor = '#353b78';
    $(".sun").css("transform", 'rotate(-90deg) translate(40vw) rotate(-90deg)');
    $(".sun").css("background-color", '#e6dde4');
    $(".date").css("color", '#e6dde4');
    $(".time").css("color", '#e6dde4');
    $(".google a").css("color", '#e6dde4');
    $(".google path").css("fill", '#e6dde4');
} 
$(".container").css("background-color", bgColor);

//background image change time by time
var bgImage='<img src="citylight.svg">';
if (today.getHours() <= 4) {
    $(".citydark").css("display",'block');
} else if (today.getHours() <= 18) {
    $(".citylight").css("display",'block');
} else if (today.getHours() <= 23) {
    $(".citydark").css("display",'block');
}
$(".container").css("background-image", bgImage);
    
// icon set: https://www.iconfinder.com/iconsets/weather-color-2
var cloudy = '<img src="images/cloudy.png">';
var foggy = '<img src="images/foggy.png">';
var heavy_rain = '<img src="images/heavy_rain.png">';
var light_rain = '<img src="images/light_rain.png">';
var light_sun = '<img src="images/light_sun.png">';
var moderate_rain = '<img src="images/moderate.png">';
var rainy_sun = '<img src="images/rainy_sun.png">';
var snowy = '<img src="images/snowy.png">';
var storm = '<img src="images/storm.png">';
var sun_foggy = '<img src="images/sun_foggy.png">';
var sunny = '<img src="images/sunny.png">';
var sun_windy = '<img src="images/sun_windy.png">';
var tornado = '<img src="images/tornado.png">';
var thunder = '<img src="images/thunder.png">';
var windy = '<img src="images/windy.png">';
var hail_rain = '<img src="images/hail_rain.png">';

// get weather
$(document).ready(function() {
    var city = '';
    var weather = [];
    const actions = new Map([
        [200, [thunder, 'add_thunder_rain']],
        [201, [thunder, 'add_thunder_rain']],
        [202, [thunder, 'add_thunder_heavy_rain']],
        [210, [thunder, 'add_thunder']],
        [211, [thunder, 'add_thunder']],
        [212, [thunder, 'add_thunder']],
        [221, [thunder, 'add_thunder']],
        [230, [thunder, 'add_thunder_rain']],
        [231, [thunder, 'add_thunder_rain']],
        [232, [thunder, 'add_thunder_rain']],

        [300, [light_rain, 'add_rain']],
        [301, [light_rain, 'add_rain']],
        [302, [light_rain, 'add_rain']],
        [310, [light_rain, 'add_rain']],
        [311, [light_rain, 'add_rain']],
        [312, [light_rain, 'add_rain']],
        [313, [light_rain, 'add_rain']],
        [314, [light_rain, 'add_rain']],
        [321, [light_rain, 'add_rain']],

        [500, [light_rain, 'add_rain']],
        [501, [moderate_rain, 'add_rain']],
        [502, [heavy_rain, 'increase_rain_width']],
        [503, [heavy_rain, 'increase_rain_width']],
        [504, [heavy_rain, 'increase_rain_width']],
        [511, [heavy_rain, 'increase_rain_width']],
        [520, [heavy_rain, 'increase_rain_width']],
        [521, [heavy_rain, 'increase_rain_width']],
        [522, [heavy_rain, 'increase_rain_width']],
        [531, [heavy_rain, 'increase_rain_width']],

        [/^[600-622]$/, [snowy, 'add_snow']],

        [701, [windy, 'add_mist']],
        [702, [windy, 'add_mist']],
        [703, [windy, 'add_mist']],
        [704, [windy, 'add_mist']],
        [731, [foggy, 'add_fog']],
        [741, [foggy, 'add_fog']],
        [771, [hail_rain, 'add_headvy_rain']],
        [781, [tornado, 'add_headvy_rain']],

        [800, [sunny, '']],
        [801, [light_sun, '']],
        [802, [cloudy, '']],
        [803, [cloudy, '']],
        [804, [cloudy, '']],

        ['default', [sunny, '']]
    ]);
    function icon(icon_name) {
        $(".weather .icon").html(icon_name);
    }
    function doWeather(action) {
        switch (action) {
            case 'add_thunder_rain': 
                $(".lightning").css("display", 'block');
                $(".layer-1 .rain-drop").css("display", 'block');
                break;
            case 'add_thunder_heavy_rain': 
                $(".thunder").css("display", 'block');
                $(".rain-drop").css("display", 'block');
                $(".rain-drop").css("width", '2px');
                break;
            case 'add_thunder': 
                $(".thunder").css("display", 'block');
                break;
            case 'add_rain': 
                $(".layer-1 .rain-drop").css("display", 'block');
                break;
            case 'increase_rain': 
                $(".rain-drop").css("display", 'block');
                $(".rain-drop").css("width", '2px');
                break;
            case 'add_snow': 
                $(".snowflakes .snowflake").css("display", 'block');
                break;
            case 'add_mist': 
                $(".fog").css("display", 'block');
                break;
            case 'add_fog': 
                $(".fog").css("display", 'block');
                $(".fog").css("filter", 'blur(80px)');
                break;
            default:
                $(".sakuras .snowflake").css("display", 'block');
        }
    }

    function checkWeather(status) {
        let action = actions.get(status) || actions.get('default');
        icon(action[0]);
        doWeather(action[1]);
    }
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {},
        url: "https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=8abd04009b0b784352dd637c0ecb8668&units=metric",
        success: function(data)
        {
            weather.date = moment.unix(data.dt).format("MM/DD/YYYY");
            weather.time = moment.unix(data.dt).format("HH:MM");
            weather.city = data.name;
            weather.weather = data.weather[0].description;
            weather.weather_id = data.weather[0].id;
            checkWeather(weather.weather_id);
            weather.temp = data.main.temp;
            weather.feels_like = data.main.feels_like;
            weather.maxTemp = data.main.temp_max;
            weather.minTemp = data.main.temp_min;
            $(".weather .city").html(weather.city);
            $(".weather .curr-temp span").html(weather.temp);
            $(".weather .description").html(weather.weather);
            $(".weather .feel").html(weather.feels_like);
            $(".weather .max a").html(weather.maxTemp);
            $(".weather .min a").html(weather.minTemp);
        }
    });
});

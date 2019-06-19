const hamburger = document.querySelector(".hamburger");
const cog = document.querySelector(".cog");
const newCity = document.querySelector(".update-city");
const settings = document.querySelector(".settings");
const topCity = document.querySelector(".place .city");
const topCountry = document.querySelector(".place .country");
const deg = document.querySelector(".temperature .deg");
const condition = document.querySelector(".temperature .condition");
const ppplace = document.querySelector(".temperature .place");
const icon = document.querySelector(".weather-icon .icon");
const background = document.querySelector(".app");

topCity.addEventListener("click", () => {

    newCity.classList.add("show");
    hamburger.src = "img/back.png";

});

topCountry.addEventListener("click", () => {

    newCity.classList.add("show");
    hamburger.src = "img/back.png";

});

hamburger.addEventListener("click", () => {

    newCity.classList.toggle("show");
    settings.className = "settings";
    cog.classList.remove("rotate");

    if (newCity.className === "update-city show" || settings.className === "settings show") {

        hamburger.src = "img/back.png";

    } else {

        hamburger.src = "img/hamburger.png";

    }

});

cog.addEventListener("click", () => {

    settings.classList.toggle("show");
    newCity.className = "update-city";
    cog.classList.toggle("rotate");

    hamburger.src = "img/hamburger.png";

});



const key = "D3P03enScVUGcBN5An01q9M7coRiAV2q";

const getCity = async city => {

    const response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}
    &q=${city}`);
    const data = await response.json();

    return data[0];

};

const getWeather = async id => {

    const response = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`);
    const data = await response.json();

    return data[0];

};

const updateCity = async city => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails,
        weather
    };

};

const form = document.querySelector(".form");

form.addEventListener("submit", e => {

    e.preventDefault();

    let city = form.city.value;

    updateCity(city)
        .then(data => {

            console.log(data);

            topCity.innerHTML = data.cityDetails.EnglishName;
            topCountry.innerHTML = data.cityDetails.Country.EnglishName;
            icon.src = `img/icons/${data.weather.WeatherIcon}.svg`;
            deg.innerHTML = `${data.weather.Temperature.Metric.Value}&deg`;
            condition.innerHTML = data.weather.WeatherText;
            ppplace.innerHTML = `${data.cityDetails.EnglishName}, ${data.cityDetails.Country.EnglishName}`;

            if (data.weather.IsDayTime) {

                background.style.backgroundImage = `url("img/day.png")`;
                document.body.style.color = "#000";
                document.querySelector(".tools").style.backgroundColor = "transparent";
                document.querySelector(".tools .title").style.color = "#000";

            } else {

                background.style.backgroundImage = `url("img/night.png")`;
                document.body.style.color = "#fff";
                document.querySelector(".tools").style.backgroundColor = "#fff";
                document.querySelector(".tools").style.borderTopLeftRadius = "10px";
                document.querySelector(".tools").style.borderTopRightRadius = "10px";
                document.querySelector(".tools .title").style.color = "#000";

            }

        })
        .catch(err => console.error(err));

    newCity.className = "update-city";
    e.target.reset();

    hamburger.src = "img/hamburger.png";

});

// APPEARANCE SETTINGS
const small = document.querySelector(".small"),
    medium = document.querySelector(".medium"),
    large = document.querySelector(".large"),
    circle = document.querySelector(".circle"),
    small2 = document.querySelector(".small2"),
    large2 = document.querySelector(".large2"),
    circle2 = document.querySelector(".circle2");

small.addEventListener("click", () => {

    circle.style.marginLeft = "32px";
    topCity.style.fontSize = "24px";
    topCountry.style.fontSize = "16px";
    deg.style.fontSize = "3.5em";
    condition.style.fontSize = "1.2em";
    ppplace.style.fontSize = "1.2em";

});

medium.addEventListener("click", () => {

    circle.style.marginLeft = "133px";
    topCity.style.fontSize = "30px";
    topCountry.style.fontSize = "20px";
    deg.style.fontSize = "4em";
    condition.style.fontSize = "1.5em";
    ppplace.style.fontSize = "1.5em";

});

large.addEventListener("click", () => {

    circle.style.marginLeft = "233px";
    topCity.style.fontSize = "40px";
    topCountry.style.fontSize = "30px";
    deg.style.fontSize = "4.5em";
    condition.style.fontSize = "2em";
    ppplace.style.fontSize = "2em";

});

small2.addEventListener("click", () => {

    circle2.style.marginLeft = "74px";
    icon.style.transform = "scale(1.8)";
    icon.style.animationName = "animate-icon";

});

large2.addEventListener("click", () => {

    circle2.style.marginLeft = "191px";
    icon.style.transform = "scale(2.7)";
    icon.style.animationName = "animate-icon2";

});

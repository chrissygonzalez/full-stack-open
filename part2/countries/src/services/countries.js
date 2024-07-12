const getCountries = () => {
    return fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(res => res.json());
}

const getCountry = (country) => {
    return fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(res => res.json());
}

const weather = (lat, lng) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}&units=imperial`)
        .then(res => res.json())
}

export default { getCountries, getCountry, weather };
import { useState, useEffect } from 'react';
import countryServices from './services/countries';

const CountryDetail = ({ detail }) => {
    const [weather, setWeather] = useState(null);
    const [lat, lng] = detail.capitalInfo.latlng;

    useEffect(() => {
        countryServices.weather(lat, lng).then(res => setWeather(res));
    }, []);

    return (<div>
        <h1>{detail.name.common}</h1>
        <p>capital {detail.capital[0]}</p>
        <p>area {detail.area}</p>
        <h3>languages:</h3>
        <ul>
            {Object.values(detail.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={detail.flags.png} alt={detail.flags.alt} />
        {!!weather &&
            <>
                <h3>Weather in {detail.capital[0]}</h3>
                <p>temperature {weather.main.temp} Fahrenheit</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <p>{weather.weather[0].description}</p>
                <p>wind {weather.wind.speed} miles per hour</p>
            </>}
    </div>)
}

export default CountryDetail;
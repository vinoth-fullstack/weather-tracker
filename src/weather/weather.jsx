import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Weather() {
  const [city, setCity] = useState('Chennai');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '1ca40bcbe57d79dc56f9d6c4596d1c7f';

  useEffect(() => {
    if (city) {
      
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
          setCurrentWeather(response.data);
          return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        })
        .then(response => {
          setForecast(response.data.list);
          setLoading(false);
        })
        .catch(error => {
          setError('');
          setLoading(false);
        });
    }
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const renderForecast = () => {
   
    const dailyForecasts = forecast.filter(item => item.dt_txt.includes("12:00:00"));

    const nextDays = dailyForecasts.slice(0, 4);

    return nextDays.map((day, index) => (
      <div key={index} className='weather-dates'>
        <div className='weather-message'>
          <h3>{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
        </div>
        <div className='weather-icon'>
          <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
        </div>
        <div className='weather-sky'>
          <h3>{day.main.temp}°C</h3>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className='containers'>
        <div className='weather-container'>
          <div className='weather-input'>
            <input 
              type='text' 
              placeholder='Enter City Name' 
              value={city}
              onChange={handleCityChange}
            />
          </div>
        
          {error && <div>{error}</div>}
          {currentWeather && (
            <div className='weather-details'>
              <div className='weather-info'>
                <div className='weather-img'>
                  <img src='https://pngfre.com/wp-content/uploads/sun-44.png' alt='temperature' />
                </div>
                <div className='weather-description'>
                  <div className='weather-days'>
                    <h3>Today</h3>
                  </div>
                  <div className='weather-city'>
                    <h2>{currentWeather.name}</h2>
                  </div>
                  <div className='weather-temp'>
                    <h3>Temperature: {currentWeather.main.temp}°C</h3>
                  </div>
                  <div className='weather-sky'>
                    <h3>{currentWeather.weather[0].description}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='weather-future'>
            {renderForecast()}
          </div>
        </div>
      </div>
    </div>
  );
}  

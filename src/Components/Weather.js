import axios from 'axios';
import React, { useState } from 'react';

export default function Weather() {

    //settin up the state
    const [data, setData] = useState({

        celcius: 0,
        name: '',
        humidity: 0,
        speed: 0,
        pressure: 0,
        temp_max: 0,
        temp_min: 0,
        visibility: 0,
        feels_like: 0,
        sea_level: 0,
        image: '/images/sunny.png'
    })

    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [randomImage, setRandomImage] = useState('https://i.natgeofe.com/k/42e832f5-fd48-43ff-b338-091bdf4048ca/india-tajmahal_16x9.jpg?w=1200');

    //get current day
    const currentDay = () => {
        const now = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[now.getDay()];
        return `${dayOfWeek}`;
    }
    //get current time
    const currentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;

    }

    //current date and time.
    const Today = currentDay();
    const Time = currentTime()

    // fetch weather api data
    const onSearchCity = () => {

        getRandomImage();

        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=946d8e0679444cb190cb8e4a128cd5e4&&units=metric`;

            axios.get(apiUrl)

                .then(res => {
                    console.log(res.data);
                    let imagePath = '';
                    if (res.data.weather[0].main == "Clouds") {
                        imagePath = '/images/cloudy.png';
                    } else if (res.data.weather[0].main == "Clear") {
                        imagePath = '/images/sunny.png';
                    } else if (res.data.weather[0].main == "Rain") {
                        imagePath = '/images/rainy.png';
                    } else if (res.data.weather[0].main == "Drizzle") {
                        imagePath = '/images/drizzle.png';
                    } else if (res.data.weather[0].main == "Mist") {
                        imagePath = '/images/mist.png'
                    } else {
                        imagePath = '/images/sunny.png';

                    }

                    setData({
                        ...data, celcius: res.data.main.temp, name: res.data.name,
                        humidity: res.data.main.humidity, speed: res.data.wind.speed,
                        pressure: res.data.main.pressure, lat: res.data.coord.lat,
                        lon: res.data.coord.lon, visibility: res.data.visibility,
                        feels_like: res.data.main.feels_like, sea_level: res.data.main.sea_level,
                        temp_max: res.data.main.temp_max, temp_min: res.data.main.temp_min,
                        image: imagePath

                    })
                    setError('');
                })
                .catch(err => {
                    if (err.response.status == 404) {
                        setError("Please Enter Valid City Name")
                    } else {
                        setError('');
                    }
                    console.log(err)
                });

        }
    }

    //get unsplash api images
    const getRandomImage = () => {
        const imageURL = 'https://api.unsplash.com/photos/random?client_id=rrnjUkOvQXhj9f9BBoDr3AfOUADs9VA1Wizc8cOzNCE';
        axios.get(imageURL)
            .then(res => {

                setRandomImage(res.data.urls.regular);
            })
            .catch(err => {

                console.log(err)
            });
    }


    return (
        <div className="main"> {/*main container */}

            <div className="weather-info"> {/*main container first-child */}

                <div className="weather-info-left-container">   {/*to search weather by location and display images through api */}

                    <div className="search-weather">
                        <svg onClick={onSearchCity} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        <input type="text" placeholder="Search for places..." onChange={e => setName(e.target.value)} />
                        <div className="cross-hair-icon" onClick={onSearchCity}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-crosshair" viewBox="0 0 16 16">
                                <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7.001 7.001 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7.001 7.001 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7.001 7.001 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7.001 7.001 0 0 0 8.5 1.018V.5Zm-6.48 7A6.001 6.001 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6.001 6.001 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6.002 6.002 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6.001 6.001 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1h-.48ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                            </svg>
                        </div>
                        <div className="error-message">

                            <p>{error}</p>
                        </div>

                    </div>


                    <div className="weather-data">
                        <div className="weather-image">
                            <img src={data.image} alt="" className="animated-image" />
                            <span>{data.celcius}°c</span>
                            <div className="current-time">
                                <span className='current-day'>{Today},</span>
                                <span className='current-time'>{Time}</span>
                            </div>
                            <div className="weather-probability">
                                <div className="cloudy">
                                    <img src="/images/mostly-cloudy.png" alt="cloud" />
                                    <span>Mostly Cloudy</span>
                                </div>
                                <div className="rain">
                                    <img src="/images/rain.png" alt="rain" />
                                    <span>Rain-30%</span>
                                </div>
                            </div>

                        </div>
                        <div className="random-country-image">
                            {randomImage && <img src={randomImage} alt="Random" />}
                            <h3>{data.name}</h3>
                        </div>

                    </div>


                </div>



                <div className="weather-info-right-container">
                    {/*header, past weekly data (UI only), get data from axios api and display different weather terms */}
                    <div className="past-data">
                        <div className="weather-header">
                            <div className="weather-title">
                                <span className="today">Today</span>
                                <span className="week">Week</span>
                            </div>
                            <div className="weather-units">
                                <div className="units">
                                    <div className="celcius-logo">
                                        <span>°c</span>
                                    </div>
                                    <div className="fahrenheit-logo">
                                        <span>°F</span>
                                    </div>
                                </div>
                                <div className="profile-pic">
                                    <img src="/images/profile-pic.jpg" alt="profile-pic" />
                                </div>
                            </div>
                        </div>
                        <div className="weather-history">
                            <div className="week-day">
                                <span>Sun</span>
                                <img src="/images/rain.png" alt="rain" />
                                <span>15° <span className="grey-text">-3°</span></span>
                            </div>
                            <div className="week-day">
                                <span>Mon</span>
                                <img src="/images/pressure.png" alt="pressure" />
                                <span>12° <span className="grey-text">7°</span></span>
                            </div>
                            <div className="week-day">
                                <span>Tue</span>
                                <img src="/images/sunny.png" alt="sunny" />
                                <span>8° <span className="grey-text">-1°</span></span>
                            </div>
                            <div className="week-day">
                                <span>Wed</span>
                                <img src="/images/drizzle.png" alt="drizzle" />
                                <span>5° <span className="grey-text">2°</span></span>
                            </div>
                            <div className="week-day">
                                <span>Thu</span>
                                <img src="/images/mist.png" alt="mist" />
                                <span>4° <span className="grey-text">4°</span></span>
                            </div>
                            <div className="week-day">
                                <span>Fri</span>
                                <img src="/images/wind.png" alt="wind" />
                                <span>3° <span className="grey-text">3°</span></span>
                            </div>
                            <div className="week-day">
                                <span>Sat</span>
                                <img src="/images/cloudy.png" alt="cloud" />
                                <span>9° <span className="grey-text">7°</span></span>
                            </div>

                        </div>
                        <h2>Today's Highlights</h2>
                    </div>

                    <div className="weather-highlights">

                        <div className="weather-content">
                            <p className="weather-prop-title">Humidity</p>
                            <p>{data.humidity}<span>%</span></p>
                            <img src="/images/humidity.png" alt="humidity" />

                        </div>
                        <div className="weather-content">
                            <p className="weather-prop-title">Wind</p>
                            <p>{data.speed}<span>km/h</span></p>
                            <img src="/images/wind.png" alt="wind" />
                        </div>
                        <div className="weather-content">
                            <p className="weather-prop-title">Pressure</p>
                            <p>{data.pressure}<span>mb</span></p>
                            <img src="/images/pressure.png" alt="pressure" />
                        </div>

                        <div className="weather-content">
                            <p className="weather-prop-title">Visibility</p>
                            <p>{data.visibility / 10000} <span>km</span></p>
                            <img src="/images/visibility.png" alt="visibility" />
                        </div>
                        <div className="weather-content">
                            <p className="weather-prop-title">Feels like</p>
                            <p>{data.feels_like}<span>°</span></p>
                            <img src="/images/feels-like.png" alt="feels_like" />
                        </div>
                        <div className="weather-content">
                            <p className="weather-prop-title">Sea level</p>
                            <p>{data.sea_level / 1000}<span>km</span></p>
                            <img src="/images/sea-level.png" alt="sea-level" />
                        </div>
                        <div className="weather-content">
                            <p className="weather-prop-title">Max temp</p>
                            <p>{data.temp_max}<span>°</span></p>
                            <img src="/images/max-temp.png" alt="max-temp" />
                        </div>
                        <div className="weather-content">
                            <p className="weather-prop-title">Min temp</p>
                            <p>{data.temp_min}<span>°</span></p>
                            <img src="/images/min-temp.png" alt="min-temp" />
                        </div>


                    </div>
                </div>
            </div>

        </div >
    )
}

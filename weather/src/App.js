import axios from 'axios';
import React, { useState } from 'react';

function App() {

  const [data,setData] = useState({})
  const [city,setCity] = useState('')

  // const [state, setState] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=f92031dc1ecb4ed439d828dad7d31586`

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();


  return `${day} ${date} ${month} ${year}`
  }

  const searchLocation = (event)=> {
    if(event.key === "Enter"){
    axios.get(url).then((response)=>{
      setData(response.data)
      console.log(response.data)
    })
    setCity("")
    // setState("")
    }
  }

  return (
    <div className="app">
      <div className='search'>
        <input value={city} onChange={event => setCity(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text"/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp}°F</h1> : null}
          <div className='date'>{dateBuilder(new Date())}</div>
            {/* <h1>{data.main.temp}°F</h1> */}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p>: null}
          </div>
        </div>

        {data.name != undefined &&
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like}°F</p>: null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p>: null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed} MPH</p>: null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

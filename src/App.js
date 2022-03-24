import React, { useState } from 'react';

const api = {
  key: "47b9fdbe4e0928537e2784396f6d11cd",
  base: "https://api.openweathermap.org/data/2.5/"
}
const formSubmitHandler = (event) =>{
  event.preventDefault();
  
}
function App() {
  const [query, setQuery] = useState('');
  
  const [weather, setWeather] = useState({});
  const [show, setShow] = useState(false)
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
 
  return (
    
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app warm' : 'app') : 'app warm'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
      
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          
        </div>
        
        ) : (<div className="wrong_city">Search for Weather</div>)}
        <form onSubmit={formSubmitHandler}>
        <button onClick={()=>setShow(!show)} className="developer-button"  ><span></span>Developed By- </button>
        </form>
        {show?<div><div className="circle-img"></div><div className="developer_name">Tarun Maharshi</div></div>:null}
      </main>
      
    </div>
  );
}

export default App;
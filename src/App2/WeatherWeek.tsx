import './css/WeatherApp.css';
import { WeatherObj } from './WeatherApp';
import {useState,useEffect} from 'react';
import WeatherSubDisplay from './WeatherSubDisplay';


type PropsData = {
  data:WeatherObj;
}

interface FutureList {
  list:{
    dt_txt:string;
    main:{
      temp:number;
      temp_max:number;
      temp_min:number;
    };
    weather:{
      icon:string
    }[]
  }[]
}
export type {FutureList}

function WeatherWeek(props:PropsData){
  const [futureData,setFutureData] = useState<FutureList>();

  const date  = new Date();
  const month = date.getMonth() + 1;
  const day   = date.getDate();

  type GetFutureData = (lat:number,lon:number) => Promise<FutureList>;
  const getFutureData:GetFutureData = async(lat:number,lon:number) => {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&&appid=5fd5e4b2c8f430197fbfddfe9c328c2f`);

      return result.json();

    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    getFutureData(props.data.coord.lat,props.data.coord.lon)
    .then(res => {
        setFutureData(res);
    })
  })

  return (
    <div className="weather-display-wrap">
      <div className="current-weather">
        <div className="main-weather">
          <div className="main-container">
            <span className="current-date">{month}月${day}日</span>
            <h2 className="city-name">{props.data.name}</h2>
            <div className="main-container-item">
              <div className="main-weather-icon"><img alt='本日の天気アイコン' src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}/></div>
              <p className="main-weather-temp">{ Math.round(props.data.main.temp) }℃</p>
            </div>
          </div>
          <div className="sub-container">
            <div className="sub-container-item">
              <div className="wind">
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z"/></svg>
                { props.data.wind.speed }m/s
              </div>
              <div className="location">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
                { props.data.coord.lat },{ props.data.coord.lon }
              </div>
            </div>
            <div className="sub-container-item">
              <div className="high-temp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M680-520v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM320-120q-83 0-141.5-58.5T120-320q0-48 21-89.5t59-70.5v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q38 29 59 70.5t21 89.5q0 83-58.5 141.5T320-120Zm-40-440h80v-160q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720v160Z"/></svg>
                { Math.round(props.data.main.temp_max) }℃
              </div>
              <div className="low-temp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-640v-80h320v80H560ZM320-120q-83 0-141.5-58.5T120-320q0-48 21-89.5t59-70.5v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q38 29 59 70.5t21 89.5q0 83-58.5 141.5T320-120ZM200-320h240q0-29-12.5-54T392-416l-32-24v-280q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720v280l-32 24q-23 17-35.5 42T200-320Z"/></svg>
                { Math.round(props.data.main.temp_min) }℃
              </div>
            </div>
          </div>
        </div>
        {
          futureData && 
          <WeatherSubDisplay
            currentDate={ date }
            futureData={ futureData }
          />
        }
      </div>
    </div>
  )
}

export default WeatherWeek;

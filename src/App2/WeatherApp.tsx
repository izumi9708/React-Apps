import React from 'react';
import {useState} from 'react';
import WeatherWeek from './WeatherWeek';

import './css/WeatherApp.css';


// 課題: ウェザーアプリ
// シンプルなウェザーアプリを作成してください。以下の要件を満たすようにコンポーネントを設計・実装してください。

// 要件:
// 天気データ表示: ユーザーが都市名を入力すると、その都市の現在の天気情報（気温、天候状況、湿度など）を表示します。

// 天気アイコン: 各天候状況に対応するアイコンを表示してください。例えば、晴れの場合は太陽のアイコン、雨の場合は雨のアイコンなど。

// デザイン: シンプルながら使いやすいUIデザインを考えて、ウェザーアプリのレイアウトを作成してください。

interface WeatherObj {
  cod:number;
  coord:{
    lat:number
    lon:number
  };
  main:{
    temp:number
    temp_min:number
    temp_max:number
  };
  name:string;
  weather:[{
    id:number
    icon:string
  }];
  wind:{
    speed:number
    deg:number
  };
}export type {WeatherObj}

function WeatherApp(){
  const [weatherObj,setWeatherObj] = useState<WeatherObj>();
  const [isLooding,setLooding]     = useState<boolean>();

  type GetWeather<T> = (val:string) => Promise<T>;
  const getWeather:GetWeather<WeatherObj> = async(val) => {
    try {
      await new Promise((resolve,reject) => {
        setLooding(true);
        resolve('');
      })

      await new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve('')
        }, 500);
      })

      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&lang=ja&appid=5fd5e4b2c8f430197fbfddfe9c328c2f`);
      console.log(result)
      if(result.status === 200)setLooding(false);

      return result.json();

    }catch(er){
      console.error(er);
    }

  }

  const weatherInfo = ():void => {
    const val = (document.querySelector('.weather-input') as HTMLInputElement).value;

    getWeather(val)
    .then(res => setWeatherObj(res))
    .catch(er => console.error(er))
  }


  return (
    <div className="weather-app wrap">
      天気情報アプリケーション<span className="file-name">(WeatherApp.tsx)</span>
      <div className="weather-content">
        <p className="weather-text">国名、都市名を半角英語で入力してください</p>
        <input className="weather-input" type="text" placeholder="例）tokyo"/>
        <button type="button" className="weather-search"
          onClick={weatherInfo}
        >表示</button>
        
        <div className="weather-display">
          {weatherObj && 
            <WeatherWeek data={weatherObj}/>
          }
        </div>
      </div>
    </div>
  )
}

export default WeatherApp;

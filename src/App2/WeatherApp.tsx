import * as React from 'react';
import {useState,useEffect} from 'react';

import './css/WeatherApp.css';


// 課題: ウェザーアプリ
// シンプルなウェザーアプリを作成してください。以下の要件を満たすようにコンポーネントを設計・実装してください。

// 要件:
// 天気データ表示: ユーザーが都市名を入力すると、その都市の現在の天気情報（気温、天候状況、湿度など）を表示します。

// 天気アイコン: 各天候状況に対応するアイコンを表示してください。例えば、晴れの場合は太陽のアイコン、雨の場合は雨のアイコンなど。

// 都市の切り替え: ユーザーは複数の都市の天気情報を切り替えて表示できるようにしてください。都市ごとに異なる天気情報が表示されるようにします。

// デザイン: シンプルながら使いやすいUIデザインを考えて、ウェザーアプリのレイアウトを作成してください。

interface WeatherObj {
  coord:{
    lat:number;
    lon:number;
  };
  main:{
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name:string;
  weather:{
    description: string
    icon: string
    id: number
    main: string
  }[]
  cod:string;
}

function WeatherApp(){
  const [weatherObj,setWeatherObj] = useState<WeatherObj>();

  type GetWeather<T> = (val:string) => Promise<T>;
  const getWeather:GetWeather<WeatherObj> = async(val) => {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&lang=ja&appid=5fd5e4b2c8f430197fbfddfe9c328c2f`);

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
        { (weatherObj) && (weatherObj.cod == '200')
        ?
       ( <div className="weather-item">
          <p className="local-name">{weatherObj.name}</p>
          <div className="local-container">
            <div className="local-img"><img src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`}/></div>
            <p className="local-temp">{weatherObj.main.temp}<span>℃</span></p>
          </div>
        </div>)
        :
        (weatherObj && <p>存在しません</p>)
        }
        </div>
      </div>
    </div>
  )
}

export default WeatherApp;

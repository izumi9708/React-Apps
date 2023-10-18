import React, { useState,  useEffect, } from 'react';
import WeatherWeek from './WeatherWeek';

import './css/WeatherApp.css';


// 課題: ウェザーアプリ
// シンプルなウェザーアプリを作成してください。以下の要件を満たすようにコンポーネントを設計・実装してください。

// 要件:
// 天気データ表示: ユーザーが都市名を入力すると、その都市の現在の天気情報（気温、天候状況、湿度など）を表示します。

// 天気アイコン: 各天候状況に対応するアイコンを表示してください。例えば、晴れの場合は太陽のアイコン、雨の場合は雨のアイコンなど。

// デザイン: シンプルながら使いやすいUIデザインを考えて、ウェザーアプリのレイアウトを作成してください。

interface WeatherObj {
  cod:number|string;
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
  const [input,setInput]           = useState<string>();
  // 初回のレンダーを監視
  const [initialRender,setRender]  = useState<boolean>(true);
  

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
        }, 1000);
      })

      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&lang=ja&appid=5fd5e4b2c8f430197fbfddfe9c328c2f`);

      if(result.status)setLooding(false);

      return result.json();

    }catch(er){
      alert('データの取得に失敗しました');
    }

  }

  const weatherInfo = ():void => {
    const val = (document.querySelector('.weather-input') as HTMLInputElement).value;

    if(val.replace(/\s+/g, "") !== ''){
      setInput(val);
    }else{
      alert('都市名を入力してください');
    }
  }

  useEffect(() => {
    if(initialRender){
      setRender(false)
    }else {
      if(input){
        getWeather(input)
        .then(res => setWeatherObj(res))
        .catch(er => console.error(er))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[input])


  return (
    <div className="weather-app wrap">
      <div className='app-title'>
        <div className='title-icon'><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/></svg></div>
        <p style={{marginLeft:'5px'}}>天気情報アプリケーション<span className="file-name">(WeatherApp.tsx)</span></p>
      </div>
      <div className="weather-content">
        <p className="weather-text">国名、都市名を半角英語で入力してください</p>
        <input className="weather-input" type="text" placeholder="例）東京またはtokyo"/>
        <button type="button" className="weather-search"
          onClick={weatherInfo}
        >表示</button>
        
        <div className="weather-display">
          {isLooding 
          ?
            (
            <div className="load-wrap">
              <div className="load-icon">
                <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fillRule="evenodd" strokeWidth="3"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle></g></svg>
              </div>
              <p className="load-text">天気情報を取得しています</p>
            </div>
            )
          :
            (
            weatherObj && weatherObj.cod === '404' 
            ?
              (<p> 入力されたキーワードの地名が見つかりませんでした。<br/>
              日本語で入力している場合は半角英字で入力すると検索できる場合があります。</p>)
            :
              (weatherObj && <WeatherWeek data={weatherObj}/>)
            )
          }
          
        </div>
      </div>
    </div>
  )
}

export default WeatherApp;

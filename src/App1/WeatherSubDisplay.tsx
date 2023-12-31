import {useState,useEffect} from 'react';
import { FutureList } from '../App1/WeatherWeek';

interface FutureItem {
  dt_txt:string;
  main:{
    temp:number;
    temp_max:number;
    temp_min:number;
  };
  weather:{
    icon:string
  }[]
}

type PropsData = {
  futureData:FutureList;
  currentDate:Date
}
type CreateFutureObj = (newData:FutureList) => void;

function WeatherSubDisplay(props:PropsData){
  
  const [futureData,setFutureData] = useState<FutureItem[]|[]>([]);


  const createFutureObj:CreateFutureObj = (newData) => {
    
    const futureObj:any = {};
    const dataArray:FutureItem[] = [];

    const futureDateArray = newData.list.filter(item => {
      const futureDate = new Date(item.dt_txt);
      
      
      if(futureDate.getDate() !== props.currentDate.getDate()){
        return item;
      }
    })    

    if(futureDateArray){
      futureDateArray.forEach(item => {
        const dateString = item.dt_txt.substr(0,item.dt_txt.indexOf(' '));
  
        if(!futureObj[dateString]){
          futureObj[dateString] = [item];
        }else {
          futureObj[dateString] = [...futureObj[dateString],item];
        }
      });
    }        

    if(futureObj){
      Object.keys(futureObj).forEach(objItem => {
        const TempArray:number[] = [];
        const value:FutureItem[] = futureObj[objItem]
        
        if(value){
          Object.keys(value).forEach(childItem => {
            TempArray.push(value[Number(childItem)].main.temp);
          })
        }
  
        const maxTemp = TempArray.reduce((prev,next) => Math.max(prev,next));
        const minTemp = TempArray.reduce((prev,next) => Math.min(prev,next));
        
        if(value[4]){        
          const valueDate = new Date(value[4].dt_txt);
          const valueMonth = valueDate.getMonth() + 1;
          const valueDay   = valueDate.getDate();
  
          value[4].dt_txt = `${valueMonth}月${valueDay}日`;
          value[4].weather[0].icon = `https://openweathermap.org/img/wn/${value[4].weather[0].icon}@2x.png`
          value[4].main.temp_max = maxTemp;
          value[4].main.temp_min = minTemp;
  
          dataArray.push(value[4]);
        }
      })
    }    
    setFutureData(dataArray)
    
  }

  useEffect(() => {
    createFutureObj(props.futureData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.futureData])  
  
  return (
    <div className="sub-weather">
      <p className="sub-text">翌日以降の天気</p>
      {futureData.map((item,index) => {
        return (
          <div key={index} className="sub-weather-item">
            <p className="future-date">{ item.dt_txt }</p>
            <div className="future-icon"><img alt="週刊天気アイコン" src={item.weather[0].icon}/></div>
            <p className="future-temp">{ Math.round(item.main.temp_max) }/{ Math.round(item.main.temp_min) }℃</p>
          </div>
        )
      })}
    </div>
  )
}
export default WeatherSubDisplay;
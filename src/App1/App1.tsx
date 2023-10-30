import  React           from 'react';
// import CountDownTimer       from './CountDownTimer';
import ToggleSwitch         from './ToggleSwitch';
import ColorPicker          from './ColorPicker';
import FilteredList         from './FilteredList';
import {emailList}          from './ts/FilteredList';
import SearchAccount        from './SearchGithubAccount';
import WeatherApp from './WeatherApp';
import SearchAnime from '../App1/SearchAnime';


function App1(){

  return (
    <>
      {/* <CountDownTimer/> */}
      <SearchAccount/>
      <WeatherApp/>
      <SearchAnime/>
      <ColorPicker/>
      <FilteredList list={emailList}/>
      <ToggleSwitch/>
    </>
  )
}

export default App1;
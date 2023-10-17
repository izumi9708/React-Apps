import  React           from 'react';
// import CountDownTimer       from './CountDownTimer';
import ToggleSwitch         from './ToggleSwitch';
import ColorPicker          from './ColorPicker';
import FilteredList         from './FilteredList';
import {emailList}          from './ts/FilteredList';
import ShoppingCart         from './ShoppingCart';
import {productsData}       from './ts/ShoppingCart';
import SearchAccount        from './SearchGithubAccount';

function App1(){

  return (
    <>
      {/* <CountDownTimer/> */}
      <SearchAccount/>
      <ColorPicker/>
      <FilteredList list={emailList}/>
      <ShoppingCart products={productsData}/>
      <ToggleSwitch/>
    </>
  )
}

export default App1;
import React  from 'react';
import {useContext} from 'react';
import {ThemeContext} from './ThemeContextComponent';

function ThemeToggler(){
  const {currentTheme,toggleTheme} = useContext(ThemeContext);
  
  return (
    <div>
      <button type="button" onClick={()=>toggleTheme('right')}>ライトなテーマ</button>
      <button type="button" onClick={()=>toggleTheme('dark')}>ダークなテーマ</button>
    </div>
  )
}
export default ThemeToggler;
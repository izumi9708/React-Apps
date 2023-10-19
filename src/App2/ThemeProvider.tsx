import React  from 'react';
import ThemeToggler from './ThemeToggler';

function ThemeProvider(){
  
  return (
    <div className="">
      <div className="toggle-area">
        <div className="elem1"></div>
        <div className="elem2"></div>
        <div className="elem3"></div>
      </div>
      <ThemeToggler/>
    </div>
  )
}

export default ThemeProvider;
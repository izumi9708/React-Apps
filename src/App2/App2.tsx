import React  from 'react';
import {useState,useEffect,createContext} from 'react';


import WeatherApp from '../App1/WeatherApp';
import Quiz from './Quiz';
import {quizData} from './ts/Quiz';
import ArticleIndex from './ArticleIndex';
import UseAuth from './UseAuth';
import DamyFetch from './DamyFetch';
import BlogPostList from './BlogPostList';
import ThemeContextComponent from './ThemeContextComponent';
import ShoppingCart         from '../App2/ShoppingCart';
import {productsData}       from './ts/ShoppingCart';


export const AppContext = createContext({});

function App2(){
  const [testState,setState] = useState('test');


  return (
    <>
      <AppContext.Provider value={{testState,setState}}>
      <Quiz data={quizData}/>
      {/* <ArticleIndex/> */}
      {/* <UseAuth/> */}
      </AppContext.Provider>
      {/* <DamyFetch/> */}
      {/* <BlogPostList/> */}
      <ThemeContextComponent/>
      <ShoppingCart products={productsData}/>
      
    </>
  )
}

export default App2
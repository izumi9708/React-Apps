import * as React  from 'react';
import './App.css';
import App1 from './App1/App1';
import App2 from './App2/App2';
import App3 from './App3/App3';
import Top from './Top';

import {useEffect} from 'react';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';


function App(){

  useEffect(() => {
    const url = window.location.href;
    const urlArray = url.split('/');

    const current = urlArray[urlArray.length - 1];
    const allLink = document.querySelectorAll('.link-item');
        if(current !== ''){
          allLink.forEach(val => {
            if((val as HTMLElement).dataset.path === current){
              val.classList.add('active');
            }
          })

        }else {
          allLink[0].classList.add('active');
        }
        
  })

  const toggleActive = (event:React.MouseEvent<HTMLElement>):void => {
    const allLink = document.querySelectorAll('.link-item');
          allLink.forEach(val => val.classList.remove('active'));

    (event.target as HTMLElement).classList.add('active');
  }

  return (
    <>
    <BrowserRouter>
      <div className="header-menu">
        <p>選択してください</p>
        <Link className="link-item" data-path="Top" to="/" onClick={toggleActive}>
          トップ
        </Link>
        <Link className="link-item" data-path="App1" to="/App1/App1" onClick={toggleActive}>
          App1へ
        </Link>
        <Link className="link-item" data-path="App2" to="/App2/App2" onClick={toggleActive}>
          App2へ
        </Link>
        <Link className="link-item" data-path="App3" to="/App3/App3" onClick={toggleActive}>
          App3へ
        </Link>
      </div>


      <Switch>
        <Route exact path="/"><Top/></Route> 
        <Route path="/App1/App1"><App1/></Route>
        <Route path="/App2/App2"><App2/></Route>
        <Route path="/App3/App3"><App3/></Route>
      </Switch>

    </BrowserRouter>

    </>
  )
}

export default App;
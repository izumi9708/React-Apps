import React, { useEffect } from 'react';
import {useState,} from 'react';
import DisplayAnimeList from './DisplayAnimeList';   

import './css/SearchAnime.css';

type AnimeList = {
    data: {
    url:string;
    images:{jpg:{image_url:string}};
    year:string;
    type:string;
    title_japanese:string;
    mal_id:number
  }[]
}

function SearchAnime(){
  const [animeList,setAnimeList] = useState<AnimeList>();
  const [isLoding,setLoding] = useState<boolean>();
  const [input,setInput] = useState<string>();


  type GetSearchStation<T> = (name:string) => Promise<T>;
  const getSearchStation:GetSearchStation<AnimeList> = async(name) => {
    try {
      // ロード画面実装のための意味ない処理
      await new Promise((resolve,reject) => {
        setLoding(true);
        resolve('');
      })

      await new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve('');
        },1000)
      })
      //

      const result = await fetch(`https://api.jikan.moe/v4/anime?q=${name}&sfw`)

      if(result.status === 200)setLoding(false)
      return result.json();

    } catch(error) {
      console.error(error);
    }
  }

  type SearchAnimeList = (event:React.MouseEvent<HTMLButtonElement>) => void;
  const searchAnimeList:SearchAnimeList = (event) => {
    const name = (event.target as HTMLElement).closest('.search-anime-content')!.querySelector('input')!.value;

    if(name.replace(/\s+/g, "") !== ''){
      setInput(name);
    }else{
      alert('都市名を入力してください');
    }
  }

  useEffect(() => {
    if(input){
      getSearchStation(input)
      .then(res => setAnimeList(res))
      .catch(error => alert('通信に失敗しました'))
    }
  },[input])


  
  return (
    <div className="search-anime wrap">
      <div className='title-wrap'>
        <div className='title-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm263-80h377v-309l-27-37-93 30-92-30-58 79-93 30v98l-57 79 43 60Zm-99 0-43-60 76-105v-130l123-40 77-105 123 40 120-39v-41H160v480h164Zm113-237Z"/></svg></div>
        <p style={{marginLeft:'5px'}}>アニメ検索アプリケーション(MyAnimeListより)</p>
      </div>
        <div className="search-anime-content">
          <p className="anime-content-text">検索したいアニメの名前を入力してください</p>
          <input type="text" placeholder="例）ドラゴンボール"/>
          <button type="button" className="search-btn"
            onClick={searchAnimeList}>
            検索
          </button>
            {isLoding ?
            (
              <div className="load-wrap">
                <div className="load-icon">
                  <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff"><circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" /><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="60" cy="15" r="9" fillOpacity="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite" /><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" /></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" /><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" /></circle></svg>
                </div>
                <p className="load-text">検索しています</p>
              </div>
            )
            :
              animeList && <DisplayAnimeList data={animeList}/>
            }
        </div>
      </div>
  )
}

export default SearchAnime;
export type {AnimeList};
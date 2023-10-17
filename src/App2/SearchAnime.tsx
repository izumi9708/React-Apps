import React from 'react';
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

type Test = {
  testState:string;
  setState:React.Dispatch<React.SetStateAction<string>>;
}

function SearchAnime(){
  const [animeList,setAnimeList] = useState<AnimeList>();
  const [isLoding,setLoding] = useState<boolean>();


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

    getSearchStation(name)
    .then(res => setAnimeList(res))
    .catch(error => console.error(error))
  }


  return (
    <div className="search-anime wrap">
      アニメ検索アプリケーション(MyAnimeListより)
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
                <p className="load-text">Loading</p>
                <div className="load-icon">
                  <svg width="58" height="58" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(2 1)"  stroke-width="1.5"><circle cx="42.601" cy="11.462" r="5" fill-opacity="1" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="1;0;0;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="49.063" cy="27.063" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;1;0;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="42.601" cy="42.663" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;1;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="27" cy="49.125" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;1;0;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="11.399" cy="42.663" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;1;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="4.938" cy="27.063" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;1;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="11.399" cy="11.462" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;0;1;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="27" cy="5" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;0;0;1" calcMode="linear"repeatCount="indefinite" /></circle></g></g></svg>
                </div>
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
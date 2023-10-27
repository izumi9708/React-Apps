import React from 'react';
import {useState,MouseEvent} from 'react';
import './css/SearchAccount.css';

// GitHub APIを使用してユーザー情報の取得

type UserInfo = {
  name          :string;
  avatar_url    :string;
  updated_at    :string;
  created_at    :string;
  followers     :number;
  following     :number;
  public_repos  :number;
}

function SearchAccount(){
  const [user,setUser] = useState<UserInfo>();
  const [isLoding,setLoding] = useState<boolean>();


  type DispalyInfo = (event:MouseEvent) => void;
  type GetSearch<T> = (id:string) => Promise<T>;

  const displayInfo:DispalyInfo = (event) => {
    const val = (event.target as HTMLElement).closest('.search-account')!.querySelector('input')!.value;

    getSearch(val).then(res => {
      const updated_at = optimumDate(res.updated_at);
      const created_at = optimumDate(res.created_at)

      const userObj:UserInfo = {
        name       : res.name,
        avatar_url : res.avatar_url,
        updated_at : updated_at,
        created_at : created_at,
        followers  :  res.followers,
        following  :  res.following,
        public_repos: res.public_repos,
      }

      setUser(userObj);

    }).catch(error => {
      alert('エラーが発生しました。');
      console.error(error);
    })
  }

  const getSearch:GetSearch<UserInfo> = async(id) => {
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

      const result =  await fetch(`https://api.github.com/users/${id}`);

      if(result.status === 200)setLoding(false)
      return result.json();

    }catch(error) {
      alert('エラーが発生しました')
      console.error(error)
    }

  }

  const optimumDate = (dateString:string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month =  date.getMonth() + 1;
    const dates = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return isNaN(year) ? '-----' : `${year}年${month}月${dates}日 ${hours}:${minutes}`;
  }

  return (
    <div className="search-account wrap">
      <span className="github-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">{/* Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
      </span>
      GitHubアカウント検索
      <div className="search-area">
        <input type="text" placeholder="ユーザーIDを入力してください"/>
        <button className="search-btn" type="button" onClick={displayInfo}>検索</button>
      </div>

      {isLoding ? 
      <div className="load-wrap">
        <p className="load-text">Loading</p>
        <div className="load-icon">
          <svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(2 1)"  stroke-width="1.5"><circle cx="42.601" cy="11.462" r="5" fill-opacity="1" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="1;0;0;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="49.063" cy="27.063" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;1;0;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="42.601" cy="42.663" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;1;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="27" cy="49.125" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;1;0;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="11.399" cy="42.663" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;1;0;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="4.938" cy="27.063" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;1;0;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="11.399" cy="11.462" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;0;1;0" calcMode="linear"repeatCount="indefinite" /></circle><circle cx="27" cy="5" r="5" fill-opacity="0" ><animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;0;0;1" calcMode="linear"repeatCount="indefinite" /></circle></g></g></svg>
        </div>
      </div>
      :
      ''
      }

      {user && 
        (<div className="user-info">
          <div className="user-img"><img alt='githubのアイコン画像' src={user.avatar_url}/></div>
          <div className="user-text">
            <p className="user-name">{user.name ? user.name : '---'}</p>
            <div className="user-detail">
              <p className="detail-item">最終更新日<span>{user.updated_at ? user.updated_at : '---'}</span></p>
              <p className="detail-item">アカウント作成日<span>{user.created_at ? user.created_at : '---'}</span></p>
              <p className="detail-item">フォロー<span>{(user.following) || (user.following == 0) ? user.following : '---'}人</span></p>
              <p className="detail-item">フォロワー<span>{(user.followers) || (user.followers == 0) ? user.followers : '---'}人</span></p>
              <p className="detail-item">公開リポジトリ<span>{(user.public_repos) || (user.public_repos == 0) ? user.public_repos : '---'}</span></p>
            </div>
          </div>
        </div>)
        
      }
      
    </div>
  )
}

export default SearchAccount;
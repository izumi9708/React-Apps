import React  from 'react';
import {useState,useEffect} from 'react';

import {BrowserRouter,Switch,Route,} from 'react-router-dom';
import Article from './Article';
import ArticleDetail from './ArticleDetail';
import './css/Article.css';

// 記事一覧の表示: APIから取得した記事データを一覧表示してください。各記事にはタイトル、内容が含まれています。
// 記事詳細の表示: 記事一覧から選択した記事をクリックすると、詳細ページに遷移し、記事の詳細な内容を表示してください。
// ルーティング: React Routerを使用して、記事一覧と記事詳細のページをルーティングしてください。
// API連携: 記事データは外部のAPI（たとえばJSONPlaceholderなど）から取得してください。

type ArticleItem = {
  body:string;
  id:number;
  userId:number;
  title:string;
}

function ArticleIndex(){
  const [articleList,setArticleList] = useState<ArticleItem[]>();

  type GetArticle<T> = () => Promise<T>;
  const getArticle:GetArticle<ArticleItem[]> = async() => {
    try {
      const result = await fetch('https://jsonplaceholder.typicode.com/posts');

      return result.json();

    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    getArticle().then(res => setArticleList(res))
  },[])

  return (
    <div className="article wrap">
      記事閲覧アプリケーション<span className="file-name">(ArticleIndex.tsx)</span>
      <div className="article-content">
      <BrowserRouter>
        <Switch>
          {articleList ? 
            <>
            <Route path="/ArticleDetail/:id"><ArticleDetail data={articleList}/></Route>
            <Route path="/"><Article data={articleList}/></Route>
            </>
          :
          ''
          }
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default ArticleIndex;

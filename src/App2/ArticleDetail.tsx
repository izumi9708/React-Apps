import React from 'react';
import {useParams,Link} from 'react-router-dom';

import './css/Article.css';


type ArticleItem = {
  body:string;
  id:number;
  userId:number;
  title:string;
}

type ArticleProps = {
  data:ArticleItem[]
}
type Params = {
  id:string
}

function ArticleDetail(props:ArticleProps){
  const {id}:Params = useParams();
  

  const findTopick = props.data.find(item => item.id === Number(id));

  return (
    <div className="article-topick-wrap">
      <Link className="topick-back" to="/">戻る</Link>
      <div className="article-topick">
        <p>記事詳細</p>
        {findTopick &&
          <>
            <p className="topick-title">{findTopick.title}</p>
            <p className="topick-text">{findTopick.body}</p>
          </>
        }
      </div>
    </div>
  )
}

export default ArticleDetail;
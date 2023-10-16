import * as React  from 'react';
import {Link} from 'react-router-dom';

type ArticleItem = {
  body:string;
  id:number;
  userId:number;
  title:string;
}

type ArticleProps = {
  data:ArticleItem[]
}

function Article(props:ArticleProps){
  return (
        <div className="article-list">
          記事一覧
          {props.data &&
           props.data.map(item => {
              if(item.id <= 10){
              return (
                <Link 
                  className="article-list-item" 
                  to={`/ArticleDetail/${item.id}`}
                  key={item.id}
                >
                  <p>{item.title}</p>
                </Link>
              )
              }
          })}
        </div>
        
  )
}

export default Article;
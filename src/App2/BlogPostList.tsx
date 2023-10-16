import * as React  from 'react';
import {useState,useEffect,createContext} from 'react';
import {fetchPots} from './ts/FetchPots';

import BlogPost from './BlogPost';

// 以下の要件を満たすコンポーネントを実装してください。
// ブログ投稿データは、次のAPIエンドポイントから取得します：https://jsonplaceholder.typicode.com/posts
// ブログ投稿データを取得する非同期関数 fetchPosts を作成してください。この関数は、APIからデータを取得し、データの配列を返します。
// ブログ投稿データを表示するためのコンポーネント BlogPostList を作成してください。このコンポーネントは、fetchPosts を使用してブログ投稿データを取得し、それをリスト形式で表示します。
// BlogPostList コンポーネント内で、各ブログ投稿を表示するための BlogPost サブコンポーネントを作成してください。BlogPost コンポーネントは、ブログ投稿のタイトルと本文を受け取り、それを表示します。
// BlogPostList コンポーネントは、最初にローディング中の状態を表示し、データの取得が完了したら投稿一覧を表示します。
// コンポーネントのパフォーマンスを最適化するため、BlogPost コンポーネントには適切なキーを設定してください。
// 余裕があれば、エラーハンドリングやデータの表示順などの追加の機能を実装してみてください。

interface Data {
  body:string;
  title:string;
  id:number;
  userId:number
}

function BlogPostList(){
  const [isLoding,setIsLoding] = useState<number>();
  const [data,setData] = useState<Data[]>();

  useEffect(() => {
    fetchPots().then(res => {
      setIsLoding(res.status);
      return res.json() as Promise<Data[]>;
    })
    .then(res => setTimeout(() => setData(res),3000))
  },[]);

  return (
    <div>
      {
        isLoding === 200 && data
        ?
        (
         <>
          {data.map(item => {
            return <BlogPost key={item.id} id={item.id} title={item.title} body={item.body}/>
          })}
         </>
        )
        :
        (
          <p>loading...</p>
        )
      }
    </div>
  )
}
export default BlogPostList;
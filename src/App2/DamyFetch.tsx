import * as React  from 'react';
import {useState,useEffect,createContext} from 'react';
import {useFetch} from './CustomFetch';

// 問題: カスタムフックを使用したAPIデータ取得
// useFetch というカスタムフックを作成し、指定されたURLからデータを取得する機能を実装してください。また、このカスタムフックを使用してAPIからデータを取得し、画面上に表示するコンポーネントも作成してください。
// useFetch カスタムフックの要件:
// 関数内で fetch を使用して指定されたURLからデータを取得します。
// データの取得が完了したら、データと読み込み中のステータスを返します。
// データ取得中のステータスは loading、データ取得後のステータスは loaded、エラー発生時のステータスは error とします。

interface Data {
  id:number;
  body:string
}

function DamyFetch(){
  const [status,setStatus] = useState<number>();
  const [data,setData] = useState<Data>();

  useEffect(() => {
    useFetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => {
      setStatus(res.status)
      console.log(res)
      return res.json()　as Promise<Data>;
    })
    .then(res => setData(res))
  },[])

  console.log(data)

  return (
    <div>
      {status === 200 
      ?
      (
        <div>
          <h1>Data from API</h1>
          <p>Status: {status}</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )
      : status ? 
      (
        <p>Error occurred with status code: {status}</p>
      )
      :
      (
        <p>Loading...</p>
      )
      }
      
    </div>
  )
}
export　default DamyFetch;


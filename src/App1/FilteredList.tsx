import * as React from 'react';
import {useState,useEffect} from 'react';
import './css/FilteredList.css';

// Reactコンポーネントで、リストアイテムを表示し、その中から特定の条件に一致するものだけを表示する機能を実装してください。
// 要件：
// コンポーネント名は「FilteredList」とします。
// プロパティとして「items」と「filterText」を受け取ります。
// 「items」はアイテムの配列で、各アイテムは「id」と「text」のプロパティを持つオブジェクトです。
// 「filterText」はフィルタリングのためのテキストです。
// コンポーネントは、受け取ったアイテムを表示しますが、表示するアイテムは「text」が「filterText」に含まれるものだけとします。
// フィルタリングは大文字と小文字を区別しないで行うものとします。
// フィルタリング結果がない場合は、「該当するアイテムはありません」と表示します。
// リストアイテムの表示には<ul>と<li>要素を使用してください。
// 余裕があれば、フィルタリング用の入力フィールドを追加しても構いません。

type MailObj = {
  id:number,
  text:string
}

type MailList<T> = {
  list:T[]
}

function FilteredList(props:MailList<MailObj>){
  const [searchResult,setResult] = useState<MailObj[]>();

  type SearchList<T> = (event:T) => void;
  const searchList:SearchList<React.ChangeEvent<HTMLInputElement>> = (event) => {
    const val = event.target.value;

    let result:MailObj[];
    if(val == ''){
      result = [];
    }else {
      result = props.list.filter(item => item.text.includes(val));
    } 
    
    setResult(result);
  }

  return (
    <div className="filtered-list wrap">
      メールアドレス検索
      <div><input type="text" onChange={searchList}/></div>
      <ul className="result-area">
        {/* 検索結果がない　または　エラー */}
        {searchResult == undefined || searchResult == null || searchResult.length == 0 && (
          <div>該当するアドレスは存在しません</div>
        )}

        {/* 検索結果がある場合 */}
        {searchResult && 
          searchResult.map(item => {
            return (
              <li key={item.id}>{item.text}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default FilteredList;



import * as React from 'react';
import {useState,useEffect} from 'react';
import './css/NumberCounter.css';

// 以下の要件を満たす「数字カウンター」コンポーネントを作成してください。
// 要件：
// コンポーネント名は「NumberCounter」とします。
// プロパティとして「count」という数値を受け取ります。
// 「NumberCounter」コンポーネントは、受け取った「count」の値を表示します。
// ユーザーが「+」ボタンをクリックすると、カウンターの値が1増えます。
// ユーザーが「-」ボタンをクリックすると、カウンターの値が1減ります。
// カウンターの値は0未満にならないようにしてください。
// カウンターの値の表示とボタンのクリックイベントの実装には、useStateフックを使用してください。
// ユーザーがボタンをクリックすると、カウンターの値が変更され、表示も更新されるようにしてください。

function NumberCounter(){
  const [number,setNumber] = useState<number>(0);

  type ClickCounter = (str:string) => void;
  const clickCounter:ClickCounter = (str) => {
    if(str == 'add') {
      setNumber(number + 1);

    }else {
      if(number !== 0)setNumber(number - 1);
    }
  }

  return (
    <div className="counter-wrap wrap">
      数字カウンター
      <div className="current-number">{number}</div>
      <div className="btn-wrap">
        <button type="button" className="add-btn" onClick={() => clickCounter('add')}>＋</button>
        <button type="button" className="remove-btn" onClick={() => clickCounter('remove')}>−</button>
      </div>
    </div>
  )
}

export default NumberCounter;
import * as React from 'react';
import {useState,ChangeEvent} from 'react';
import './css/ColorPicker.css';

// 以下の要件を満たすReactコンポーネントを作成してください。
// 要件：
// コンポーネント名は「ColorPicker」です。
// 「ColorPicker」コンポーネントは、プロパティとして「initialColor」と「onChange」を受け取ります。
// 「initialColor」は初期の色情報で、文字列として渡されます（例: "#FF5733"）。
// 「onChange」は、色が変更されたときに呼び出されるコールバック関数で、新しい色情報を引数として受け取ります。
// 「ColorPicker」コンポーネントは、カラーピッカーUIを表示します。カラーピッカーは初期の色情報で初期化されます。
// カラーピッカーが変更されると、選択された色情報を「onChange」コールバックに渡して呼び出してください。
// カラーピッカーUIは、<input type="color">要素を使用して作成します。
// ユーザーが新しい色を選択した場合、カラーピッカーUIの表示はその色に合わせて変化するようにしてください。
// カラーピッカーUIの下には、選択された色情報の文字列が表示されます。
// 余裕があれば、選択された色のプレビューを表示するためのUIを追加しても構いません。

function ColorPicker(){
  const [initialColor,setInitial] = useState('#FF5733');

  function colorChange(e:ChangeEvent<HTMLInputElement>){
    setInitial((e.target).value);
  }

  return (
    <div className="color-picker wrap">
      カラーピッカー
      <div className="select-wrap">
        <div className="select-wrap-item">
          <p>色を選択：</p>
          <div className="preview-color" style={{backgroundColor:initialColor}}>
            <input type="color" value={initialColor} onChange={colorChange}/>
          </div>
        </div>
        <div className="select-wrap-item"><p>コード：</p><p className="preview-code">{initialColor}</p></div>
      </div>

    </div>
  )
}

export default ColorPicker;
import React from 'react';
import {useState,useEffect} from 'react';
import './css/ToggleSwitch.css';

// 以下の要件を満たすReactコンポーネントを作成してください。
// 要件：
// コンポーネント名は「ToggleSwitch」とします。
// 「ToggleSwitch」コンポーネントは、オン・オフを切り替えるためのスイッチを表示します。
// スイッチはONの状態とOFFの状態を持ちます。
// 初期状態では、「on」プロパティに応じてスイッチの状態を切り替えます。trueならON、falseならOFFを表示します。
// ユーザーがスイッチをクリックすると、スイッチの状態を切り替えます。

function ToggleSwitch(){
  const [toggleState,setToggle] = useState<boolean>(false);

  const changeToggle = () => {
    setToggle(!toggleState);
  }

  return (
    <div className="toggle-switch wrap">
      トグルスイッチ
      {toggleState ? (
        <div data-testid="toggle-btn" className="switch-btn toggle-active" onClick={changeToggle}>
          <div className="btn-circle circle-active"></div>
        </div>
      ) : (
        <div data-testid="toggle-btn" className="switch-btn" onClick={changeToggle}>
          <div className="btn-circle"></div>
        </div>
      )
    }
      <span data-testid="btn-status">ボタンの状態：{toggleState ? 'ON' : 'OFF'}</span>
    </div>
  )
}

export default ToggleSwitch;
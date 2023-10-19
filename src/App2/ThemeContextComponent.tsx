import React  from 'react';
import {useState,createContext} from 'react';
import ThemeProvider from './ThemeProvider';

import './css/Theme.css';

// あなたは、ダークモードとライトモードのテーマ切り替え機能を持つアプリケーションを開発しています。コンテキストを使用してテーマ情報を管理し、テーマ切り替えボタンを提供するコンポーネントを実装してください。

// 以下の要件を満たすコードを実装してください。

// テーマ情報を管理するためのコンテキスト ThemeContext を作成してください。このコンテキストは、現在のテーマ（ダークモードまたはライトモード）を保持します。

// テーマ切り替えを行うための関数 toggleTheme を ThemeContext コンテキスト内で定義してください。この関数は、現在のテーマを切り替える役割を持ちます。

// テーマ情報と toggleTheme 関数を提供するためのプロバイダーコンポーネント ThemeProvider を作成してください。このプロバイダーコンポーネントは、コンテキストを使用してテーマ情報と関数を子コンポーネントに渡します。

// ボタンを含むコンポーネント ThemeToggler を作成してください。このコンポーネントは、toggleTheme 関数を使用してテーマを切り替えるためのボタンを提供します。

// アプリケーションの別のコンポーネント内で ThemeToggler を使用して、ユーザーがテーマを切り替えることができるようにしてください。

interface Context {
  currentTheme:string;
  toggleTheme:(str:string) => void;
}

export type {Context};


const toggleTheme = (str:string):void => {
  const are = document.querySelector('.toggle-area')!;

  if(str === 'right'){
    are.classList.remove('dark');
    are.classList.add('right');

  }else {
    are.classList.remove('right');
    are.classList.add('dark');
  }
}

export const ThemeContext = createContext<Context>({currentTheme:'',toggleTheme:toggleTheme});

function ThemeContextComponent(){
  const [currentTheme,setTheme] = useState<string>('');

  return (
    <div className="theme-wrap wrap">
      コンテキストを使用したテーマ切り替え<span className="file-name">(ThemeContextComponent.tsx)</span>
      <ThemeContext.Provider value={{currentTheme,toggleTheme}}>
        <ThemeProvider/>
      </ThemeContext.Provider>
    </div>
  )
}

export default ThemeContextComponent;
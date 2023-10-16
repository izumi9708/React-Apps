import React from 'react';
import {useState,createContext,useContext} from 'react';
import ContentSwitch from '../App2/ContentSwitch';

// AuthContextの作成とエクスポート
// - ログイン状態を表す`isLoggedIn`ステートを持つ
// - `login`と`logout`という関数を提供する
// - コンテキストを使用して提供する値を定義する

// useAuthカスタムフックの作成とエクスポート
// - AuthContextを使用して`isLoggedIn`と`login`、`logout`を返す

// ログイン状態に応じて表示を切り替えるComponentの作成
// - useAuthを使用してログイン状態を取得
// - ログインしている場合は "Welcome, User!" を表示
// - ログインしていない場合は "Please log in" を表示

interface Context {
  isLoggedIn:boolean;
  login:()=>void;
  logout:()=>void;
}

export const AuthContext = createContext<Context|undefined>(undefined);

function AuthProvider(){
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

  const login = () => {
    setIsLoggedIn(true);
  }

  const logout = () => {
    setIsLoggedIn(false);
  }
  return (
    <>
    <AuthContext.Provider value={{isLoggedIn,login,logout}}>
      <ContentSwitch/>
    </AuthContext.Provider>
    </>
  )
}


export default AuthProvider;

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}
export {useAuth};
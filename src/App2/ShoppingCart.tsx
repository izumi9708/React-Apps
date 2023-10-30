import React from 'react';
import {useState,MouseEvent} from 'react';
import './css/ShoppingCart.css';

// Reactコンポーネントを使用して、シンプルなショッピングカート機能を実装してください。
// 要件：
// コンポーネント名は「ShoppingCart」とします。
// プロパティとして「products」と「currency」を受け取ります。
// 「products」は商品の配列で、各商品は「id」、「name」、「price」のプロパティを持つオブジェクトです。
// コンポーネントは、受け取った商品を表示するショッピングカートを作成します。
// カート内の商品はリスト形式で表示し、各商品の「name」、「price」を表示します。
// カート内の商品の合計金額も表示します。
// 合計金額は選択された通貨で表示し、通貨記号の後に合計金額を表示してください。
// ショッピングカートの表示には適切なHTML要素を使用してください。
// 余裕があれば、カート内の商品を削除できるボタンを追加しても構いません。
type CartArray = {
  id:number;
  name:string|undefined;
  price:number
}

type Param = {
  products:CartArray[]
}

function ShoppingCart(data:Param){
  const [cart,setCart] = useState<CartArray[]>([]);
  const [step,setStep] = useState<number>(1)

  type AddCart = (event:React.MouseEvent<HTMLButtonElement>) => void;
  const addCart:AddCart = (event) => {
    const productsItem = ((event.target as HTMLElement).closest('.products-item') as HTMLElement);
    const price = Number(productsItem.dataset.price);
    const name  = productsItem.dataset.name;
    const id    = Number(productsItem.dataset.id);

    const cartObj = {id:id,price:price,name:name};
    setCart([...cart,cartObj]);
  }

  type RemoveCart = (id:number) => void;
  const removeCart:RemoveCart = (id) => {
    const removeObj = cart.filter(item => id !== item.id);
    setCart(removeObj);
  } 


  const displayJSX = () => {
    if(step === 1){
      return (
        <div className="item-list">
          おすすめの商品
        <div>
        {data.products.map(item => {
          // カートに追加されているかどうかの判定
          const isCart = cart.find(list => list.id == item.id);

          return (
            <div className="products-item" key={item.id} data-name={item.name} data-price={item.price} data-id={item.id}>
              <div className="item-inner">
                <div className="products-img"></div>
                <p className="products-name">{item.name}</p>
                <p className="products-price">¥{item.price}</p>

              {isCart ?
                <button type="button" className="shopping-remove" onClick={() =>removeCart(item.id)}>カートから削除</button>
              :
                <button type="button" className="shopping-btn" onClick={addCart}>カートに入れる</button>
              }
              </div>
  
              </div>
          )
        })}

        <button type="button" className="cart-btn" onClick={() => {
          if(cart.length == 0){
            alert('カートに商品がありません');

          }else {
            setStep(2);
          }
        }}>カートを見る（{cart.length}）</button>
      </div>
      </div>
      )

    }else if(step == 2) {
      let sum;
      cart.length > 0 ? sum = cart.map(item => item.price).reduce((prev,next) => prev + next) : sum = 0;

      return (
        <div className="cart-list">
          カート内の商品
          <div className="cart-list-area">

            {cart.map(item => {
              return (
                <div className="cart-list-item" key={item.id}>
                  <div className="cart-list-img"></div>
                  <div className="cart-info-wrap">
                    <p>{item.name}</p>
                    <p>¥{item.price}</p>
                  </div>
                  <button type="button" className="cart-list-remove" onClick={()=> removeCart(item.id)}>削除</button>
                </div>
              )
            })}

            <p className="sum">計 {cart.length} 点：¥{sum}</p>

            <div className="cart-btn-wrap">
              <button type="button" className="shopping-back" onClick={()=>setStep(1)}>戻る</button>
              <button type="button" className="pay-step" onClick={()=> {
                if(cart.length == 0){
                  alert('カートに商品がありません');
                }else {
                  setStep(3)
                }
              }}>購入</button>
            </div>

          </div>
        </div>
      )

    }else {
      return (
        <div className="thanks-wrap">
          ご注文ありがとうございます。
          <button type="button" className="start-step" onClick={() => {
            setStep(1);
            setCart([]);
          }}>トップへ</button>
        </div>
      )
    }
  }

  return (
    <div className="shopping-cart wrap">
      {displayJSX()}
    </div>
  )
}

export default ShoppingCart;
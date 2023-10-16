import * as React  from 'react';
import {useState,useEffect,useMemo} from 'react';
import './css/UserForm.css';

// 以下の要件に従って、Reactコンポーネントを実装してください。
// ユーザー登録フォームを作成します。フォームには以下のフィールドが含まれます。
// ユーザー名（必須、3文字以上）
// メールアドレス（必須、正しい形式）
// パスワード（必須、6文字以上）
// フォームの各フィールドはユーザーの入力に対してバリデーションを行います。バリデーションに問題がある場合、エラーメッセージを表示します。
// フォームが送信されたとき、フォームの内容をコンソールにログ出力します。
// ユーザーが入力した値をフォームの送信後にクリアします。

function UserForm(){

  const [state,setState] = useState('input');
  const [formData,setFormData] = useState<FormData>();

  type DisplayPass  = (event:React.MouseEvent<HTMLSpanElement>) => void;
  const displayPass:DisplayPass = (event) => {
    const {target} = event;
    const open  = document.querySelector('.open');
    const close = document.querySelector('.close');
    const input = (event.target as HTMLElement).closest('label')!.querySelector('input')!;
    input.type === 'password' ? input.type = 'text' : input.type = 'password';

    if((target as HTMLElement).classList.contains('open')){
      (target as HTMLElement).style.display = 'none';
      (close as HTMLElement).style.display = 'block';

    }else {
      (target as HTMLElement).style.display = 'none';
      (open as HTMLElement).style.display = 'block';
    }

  }

  const sendForm = () => {
    const name = document.querySelector('input[name="name"]') as HTMLInputElement;
    const mail = document.querySelector('input[name="mail"]') as HTMLInputElement;
    const pass = document.querySelector('input[name="pass"]') as HTMLInputElement;

    let errCount = 0;

    if(name.value === ''){
      const err    = name.closest('div')!.querySelector('.err');
      const errMsg = document.createElement('span');
      errMsg.classList.add('err')
      errMsg.textContent = '入力してください';

      if(!err)name.closest('div')!.appendChild(errMsg);
      errCount++;

    }else {
      const err    = name.closest('div')!.querySelector('.err');
      if(err)err.remove();
    }

    if(!/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(mail.value)){
      const err    = mail.closest('div')!.querySelector('.err');
      const errMsg = document.createElement('span');
      errMsg.classList.add('err')
      errMsg.textContent = '正しい形式で入力してください';

      if(!err)mail.closest('div')!.appendChild(errMsg);
      errCount++;

    }else {
      const err    = mail.closest('div')!.querySelector('.err');
      if(err)err.remove();
    }

    if(!/^[a-zA-Z0-9!+?_]+$/.test(pass.value)){
      const err    = pass.closest('div')!.querySelector('.err');
      const errMsg = document.createElement('span');
      errMsg.classList.add('err')
      errMsg.textContent = '半角英数字で入力してください';

      if(!err)pass.closest('div')!.appendChild(errMsg);
      errCount++;

    }else {
      const err    = pass.closest('div')!.querySelector('.err');
      if(err)err.remove();
    }

    if(errCount == 0){
      const form = new FormData();
      form.append('name',name.value);
      form.append('mail',mail.value);
      form.append('pass',pass.value);

      setFormData(form);
      setState('confirm');
    
    }

  }

  if(formData){
    const pass = formData.get('pass') as string;
    const passArr = pass.split('');
    const shift = passArr.shift();
    const pop   = passArr.pop();

    const mapArr = passArr.map(val => '●');
    formData.set('display_pass',[shift,...mapArr,pop].join(''));
  }

  return (
    <div className="user-form-wrap wrap">
      ユーザーフォーム（作成中）
      <div className="user-form-content">
        {
          state === 'input' 
          ?
          (
            <>
            <div className="form-item">
              <p>ユーザー名</p>
              <label>
                <input type="text" placeholder="例）山田太郎" name="name"/>
              </label>
            </div>
            <div className="form-item">
              <p>メールアドレス</p>
              <label>
                <input type="text" placeholder="例）xxxx@xxx.com" name="mail"/>
              </label>
            </div>
            <div className="form-item">
              <p>パスワード</p>
              <label>
                <input type="password" placeholder="半角英数字" name="pass"/>
                <span 
                  className="material-symbols-outlined close"
                  onClick={displayPass}
                >
                  visibility
                </span>
                <span 
                  className="material-symbols-outlined open"
                  onClick={displayPass}
                >
                  visibility_off
                </span>       
              </label>
            </div>
            </>
          )
          : state === 'confirm' && formData ?
          (
            <form>
            <div className="form-item">
              <p>ユーザー名</p>
              <p>{String(formData.get('name'))}</p>
              <input type="hidden" name="name" value={String(formData.get('name'))}/>
            </div>
            <div className="form-item">
              <p>メールアドレス</p>
              <p>{String(formData.get('mail'))}</p>
              <input type="hidden" name="mail" value={String(formData.get('mail'))}/>
            </div>
            <div className="form-item">
              <p>パスワード</p>
              <p>{String(formData.get('display_pass'))}</p>
              <input type="hidden" name="pass" value={String(formData.get('pass'))}/>
            </div>
            </form>
          )
          :
          (
            <div>ユーザーの登録が完了しました。</div>
          )
        }

        <div className="form-btn-wrap">
          {
          state === 'input' 
          ?
          <button type="button" className="form-btn"
            onClick={sendForm}
          >確認</button>
          : state === 'confirm' ?
          <button type="button" className="form-btn"
            onClick={() => setState('send')}
          >送信</button>
          :
          <button type="button" className="form-btn"
            onClick={() => setState('input')}
          >トップへ</button>
          }
            
        </div> 
      </div>
    </div>
  )
}
export default UserForm;
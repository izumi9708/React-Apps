import * as React from 'react';
import {useState,MouseEvent} from 'react';
import './css/TodoList.css';

// 以下の要件を満たすReactコンポーネントを作成してください。
// 要件：
// コンポーネント名は「TodoList」。
// 「TodoList」コンポーネントは、プロパティとして「todos」という配列を受け取ります。各要素は「id」と「title」を持つオブジェクトとします。
// 「TodoList」コンポーネントは、渡された「todos」配列の要素ごとに、タイトルを表示するUIを作成します。
// 各タイトルの前にはチェックボックスがあり、ユーザーはタイトルの前のチェックボックスをクリックして、タスクを完了済みとしてマークできます。
// チェックボックスがクリックされたら、そのタスクの完了状態をトグルします。

interface Todos {
  id: number;
  title: string;
  completed: boolean
}
interface PropsObj {
  todos : Todos[]
}

function TodoList(props:PropsObj){
  const [todos,setTodos] = useState<Todos[]>(props.todos);

  function changeCompleted (target:HTMLInputElement) {
    const targetId = target.closest('label')!.id;

    const result = todos.filter(item => {
      if(item.id == Number(targetId)){
        item.completed = !item.completed;
      }
      return item
    });

    setTodos(result);
  }


  return (
    <div className="todos-wrap wrap">
      <p className="title">todoリスト</p>
      <div className="todos-list">
        {todos.map(val => {
          return (
            <label id={String(val.id)} className="todos-item" key={val.id}>
              {val.completed ? <input type="checkbox" checked onChange={(e) => changeCompleted(e.target)}/> : <input type="checkbox" onChange={(e) => changeCompleted(e.target)}/>}
              {val.title}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default TodoList;
import { render, screen, waitFor } from "@testing-library/react";
import SearchAccount from "../../App1/SearchGithubAccount";
import userEvent from "@testing-library/user-event";

// ユーザーがユーザーIDを入力し、検索ボタンをクリックした場合、displayInfo関数が正しく呼び出されることをテストしてください。
// displayInfo関数内でAPIリクエストが正しく処理され、ユーザー情報が表示されることをテストしてください。
// ユーザーが無効なユーザーIDを入力し、エラーが発生した場合、エラーメッセージが表示されることをテストしてください。
// ロード中に正しいローディングアイコンが表示されることをテストしてください。
// ユーザー情報が表示されると、正しいユーザー名、アバター画像、更新日、作成日、フォロワー数、フォロー数、および公開リポジトリ数が表示されることをテストしてください。
// ロード中にはユーザー情報が表示されないことをテストしてください。
// ユーザー情報が不完全な場合（nullまたはundefinedのプロパティが含まれている場合）、デフォルトの"---"が表示されることをテストしてください。
// getSearch関数が正しく呼び出されることをモックしてテストしてください。
// optimumDate関数が日付文字列を正しくフォーマットし、表示される日付が期待値と一致することをテストしてください。

describe('SearchGithub Component Test',() => {
  it('IDを入力し、検索ボタンをクリックした場合、displayInfo関数が正しく呼び出されるか',() => {
    render(<SearchAccount/>);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    
    userEvent.type(input,'izumi9708');
    userEvent.click(button);
        
  })
})
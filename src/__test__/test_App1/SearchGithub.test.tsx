import { act, render, screen, waitFor } from "@testing-library/react";
import SearchAccount from "../../App1/SearchGithubAccount";
import userEvent from "@testing-library/user-event";

// ユーザーがユーザーIDを入力し、検索ボタンをクリックした場合、displayInfo関数が正しく呼び出されることをテストしてください。
// displayInfo関数内でAPIリクエストが正しく処理され、ユーザー情報が表示されることをテストしてください。
// ロード中に正しいローディングアイコンが表示されることをテストしてください。
// ユーザー情報が表示されると、正しいユーザー名、作成日が表示されることをテストしてください。
// ロード中にはユーザー情報が表示されないことをテストしてください。
// getSearch関数が正しく呼び出されることをモックしてテストしてください。
// optimumDate関数が日付文字列を正しくフォーマットし、表示される日付が期待値と一致することをテストしてください。

describe('SearchGithub Component Test',() => {

  
  it('IDを入力し、検索ボタンをクリックした場合、ユーザー情報が表示されるか',async() => {
    render(<SearchAccount/>);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    
    userEvent.type(input,'izumi9708');

    act(() => {
      userEvent.click(button);
    })
    
    setTimeout(() => {
      const userInfo = screen.getByTestId('user-info');
      
      expect(userInfo).toBeInTheDocument();
      
    }, 2000);
    
  })

  it('ロード中にロードアイコンが表示されるか',async() => {
    render(<SearchAccount/>);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    userEvent.type(input,'izumi9708');

    act(() => {
      userEvent.click(button);
    })

    await waitFor(() => {
      const loadWrap = screen.getByTestId('load-wrap');

      expect(loadWrap).toBeInTheDocument()
    })
  })

  it('ユーザー情報のユーザー名、作成日が正しく表示されているか',async() => {
    render(<SearchAccount/>);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    userEvent.type(input,'izumi9708');

    act(() => {
      userEvent.click(button);
    })

    await waitFor(async() => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // デバッグ情報を表示
      const name = screen.getByTestId('user-name');

      expect(name?.textContent).toBe('soma izumi');
    }, { timeout: 2500 })

    await waitFor(async() => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // デバッグ情報を表示
      const createDate = screen.getByTestId('user-create-date');

      expect(createDate?.textContent).toBe('2022年5月23日 21:45');
    }, { timeout: 2500 })
  })
})
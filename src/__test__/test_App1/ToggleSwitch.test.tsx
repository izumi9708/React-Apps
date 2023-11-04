import { act, render, screen, waitFor } from "@testing-library/react";
import ToggleSwitch from "../../App1/ToggleSwitch";
import userEvent from "@testing-library/user-event";

// コンポーネントが初期状態で正しくレンダリングされていることを確認するテスト。
// スイッチをクリックしたときに、スイッチの状態が正しく切り替わることを確認するテスト。
// ユーザーのクリックに対してスイッチの状態が正しく反応していることを確認するテスト。

describe('ToggleSwitch Component Test',() => {
  it('コンポーネントが初期状態で正しくレンダリングされていることを確認するテスト。',() => {
    render(<ToggleSwitch/>);

    const result = screen.getByTestId('btn-status')

    expect(result.textContent).toMatch(/OFF/);
    
  })

  it('スイッチをクリックしたと時に、状態が正しく切り替わるか',async() => {
    render(<ToggleSwitch/>);

    const toggleBtn = screen.getByTestId('toggle-btn');
    const result = screen.getByTestId('btn-status');

      userEvent.click(toggleBtn);
    
    await waitFor(() => {
      // console.log(result.textContent);
      
      expect(result).toHaveTextContent('ボタンの状態：ON')
    })
  })
})
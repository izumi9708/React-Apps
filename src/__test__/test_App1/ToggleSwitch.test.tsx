import { render, screen } from "@testing-library/react";
import ToggleSwitch from "../../App1/ToggleSwitch";

// コンポーネントが初期状態で正しくレンダリングされていることを確認するテスト。
// スイッチをクリックしたときに、スイッチの状態が正しく切り替わることを確認するテスト。
// ユーザーのクリックに対してスイッチの状態が正しく反応していることを確認するテスト。
// スイッチの状態をプロパティで設定し、正しい初期状態でレンダリングされていることを確認するテスト。
// テスト時にコンポーネント内のCSSクラスが正しく設定されていることを確認するテスト。

describe('ToggleSwitch Component Test',() => {
  it('コンポーネントが初期状態で正しくレンダリングされていることを確認するテスト。',() => {
    render(<ToggleSwitch/>);

    const result = screen.getByTestId('btn-status')

    expect(result.textContent).toMatch(/OFF/);
    
  })
})
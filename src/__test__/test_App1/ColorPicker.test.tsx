import { render, screen } from "@testing-library/react"
import ColorPicker from "../../App1/ColorPicker"

// プロパティ initialColor が正しく初期化されていることを確認するテストケースを書いてください。
// <input type="color"> 要素の変更イベントをシミュレートし、onChange プロパティに渡されたコールバック関数が呼び出されることを確認するテストケースを書いてください。
// <input type="color"> 要素の変更イベントをシミュレートし、onChange プロパティに渡されたコールバック関数に正しい新しい色情報が渡されることを確認するテストケースを書いてください。
// カラーピッカーのUI要素の表示が正しいことを確認するテストケースを書いてください。特に、選択された色情報の文字列が正しく表示されていることを確認します。
// カラーピッカーのUI要素で選択された色に応じて、プレビューの背景色が正しく更新されていることを確認するテストケースを書いてください。

describe('ColorPicker Component Test',() => {
  it('プロパティinitialColorが正しく初期化されているか',() => {
    render(<ColorPicker/>);
  
    const color = screen.getByTestId('target-element');

    expect(color.textContent).toBe('#FF5733')
    
  })
})

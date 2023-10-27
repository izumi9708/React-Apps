import { act, render, screen } from "@testing-library/react"
import ColorPicker from "../../App1/ColorPicker"
import userEvent from "@testing-library/user-event";

// プロパティ initialColor が正しく初期化されていることを確認するテストケースを書いてください。

describe('ColorPicker Component Test',() => {
  it('プロパティinitialColorが正しく初期化されているか',() => {
    render(<ColorPicker/>);
  
    const color = screen.getByTestId('target-element');

    expect(color.textContent).toBe('#FF5733')
    
  })

})

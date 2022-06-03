import {render, screen} from "@testing-library/react";
import SummaryPage from "../SummaryPage";

test("체크박스 초기상태 확인", () => {
    render(<SummaryPage/>);
    const checkbox : HTMLInputElement = screen.getByRole("checkbox",{ name : "주문하려는 것을 확인하셨나요?"});
    expect(checkbox.checked).toEqual(false);
});

test("확인 버튼 초기 상태 화인", ()=> {
    render(<SummaryPage/>);
    const confirmButton : HTMLButtonElement = screen.getByRole("button", {name : "주문 확인" });
    expect(confirmButton.disabled).toBeTruthy();
});



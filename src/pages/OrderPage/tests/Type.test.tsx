import Type from "../Type";
import {render, screen} from "@testing-library/react";
import {rest} from "msw";
import {server} from "../../../mocks/server";
import {Simulate} from "react-dom/test-utils";

test("서버에서 product 이미지 개수 확인", async ()=> {
    render(<Type orderType="products"/>);

    const productImages = await screen.findAllByRole("img",
        {name: /product$/i,});

    expect(productImages).toHaveLength(2);
});

test("서버에서 product 이미지 이름 확인", async () => {
    render(<Type orderType="products"/>);

    const productImages = await screen.findAllByRole("img",
        {name: /product$/i,});

    // const altText = productImages.map((element) => element.alt);
    // expect(altText).toEqual(['America product' , 'England product' ]);
});

test("테스트 에러가 발생했을 때 에러 메세지 발생", async ()=> {
    server.resetHandlers(
        rest.get('http://localhost:5000/products', (req, res, ctx) =>
            res(ctx.status(500)))
    );

    render(<Type orderType="products"/>);
    const errorBanner = await screen.findByTestId("error-banner");
    expect(errorBanner).toHaveTextContent("에러가 발생했습니다.");

});

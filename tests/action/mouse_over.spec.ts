import test, { expect } from "playwright/test";

test("Practice page - Mouse Over ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");


    //solution #2
    const mouseOverContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Mouse Over" }) });
    const mouseOverLink = mouseOverContainer.getByRole("link");
    const mouseOverDescText = await mouseOverContainer.locator("p").textContent();

    console.log("mouseOverDescText", mouseOverDescText);
    await mouseOverLink.click();


    //
    let  COUNT = 3;

    const initCountLabel = Number( await page.locator('#clickCount').textContent() );


   for (let i = 0; i < COUNT; i++) {

    await page.locator('a[title="Click me"]').hover();

    await page.locator('a[title="Active Link"]').click();

    console.log(
        await page.locator('#clickCount').textContent()
    );
}


    // const finalCountLabel = Number( await page.locator('#clickCount').textContent() );
    // expect(finalCountLabel).toBe(initCountLabel + COUNT);
    
});

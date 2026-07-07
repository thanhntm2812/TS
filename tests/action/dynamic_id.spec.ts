import test from "playwright/test";

test("Practice page - Dynamic ID ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #1

    // const dynamicIdLink = page.getByRole("link", { name: "Dynamic ID" });
    // await dynamicIdLink.click();

    //solution #2
    const dynamicIdContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Dynamic ID" }) });
    const dynamicIdLink = dynamicIdContainer.getByRole("link");
    const dynamicIdDescText = await dynamicIdContainer.locator("p").textContent();

    console.log("dynamicIdDescText", dynamicIdDescText);
    await dynamicIdLink.click();

    // click on button
    const dynamicIdButton = page.locator("button.btn-primary"); //css
    await dynamicIdButton.click();
});

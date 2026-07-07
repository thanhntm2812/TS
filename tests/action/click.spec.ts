import test, { expect } from "playwright/test";

test("Practice page - Click", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #2
    const clickContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Click", exact: true }) });
    const clickLink = clickContainer.getByRole("link");
    const clickDescText = await clickContainer.locator("p").textContent();

    console.log("clickDescText", clickDescText);
    await clickLink.click();

    // click on button
    const clickButton = page.locator("#badButton"); //css
    await clickButton.click();
});

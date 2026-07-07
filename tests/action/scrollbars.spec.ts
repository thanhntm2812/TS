import test from "playwright/test";

test("Practice page - Scrollbars", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #2
    const scrollbarsContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Scrollbars" }) });
    const scrollbarsLink = scrollbarsContainer.getByRole("link");
    const scrollbarsDescText = await scrollbarsContainer.locator("p").textContent();

    console.log("scrollbarsDescText", scrollbarsDescText);
    await scrollbarsLink.click();

    // solution 1 - build-in style
    // await page.getByRole("button", { name: "Hiding Button" }).scrollIntoViewIfNeeded();
    // await page.getByRole("button", { name: "Hiding Button" }).click();

    // solution 2 - heretical style
    // get the scroll bar
    const scrollPannel = page.locator("div[style*=scroll]");
    await scrollPannel.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
        el.scrollLeft = el.scrollWidth;
    });

    // click on button
    const hiddenButton = page.locator("#hidingButton"); //css
    await hiddenButton.click();
});

import test from "playwright/test";

test("Practice page - Class Attribute ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #2
    const classAttContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Class Attribute" }) });
    const classAttLink = classAttContainer.getByRole("link");
    const classAttDescText = await classAttContainer.locator("p").textContent();

    console.log("classAttDescText", classAttDescText);
    await classAttLink.click();

    // click on Class Attribute button
    const classAttButton = page.locator("button.btn-primary"); //css
    await classAttButton.click();
});

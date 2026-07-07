import test from "playwright/test";

test("Practice page - Text Input ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #2
    const textInputContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Text Input" }) });
    const textInputLink = textInputContainer.getByRole("link");
    const textInputDescText = await textInputContainer.locator("p").textContent();

    console.log("textInputDescText", textInputDescText);
    await textInputLink.click();

    // input text
    const inputText = page.locator("#newButtonName");
    await inputText.fill("This is the name of the button");

    // click on button to update text
    const updateButton = page.locator("#updatingButton"); //css
    await updateButton.click();
});

import test, { expect } from "playwright/test";

test("Practice page - Sample App ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");


    //solution #2
    const sampleAppContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Sample App" }) });
    const sampleAppLink = sampleAppContainer.getByRole("link");
    const sampleAppDescText = await sampleAppContainer.locator("p").textContent();

    console.log("sampleAppDescText", sampleAppDescText);
    await sampleAppLink.click();

    //
    const username = 'Have a nice day';

    const usernameTextbox = page.getByRole('textbox', {name: 'User Name'});
    await usernameTextbox.click();
    await usernameTextbox.fill(username);

    const passwordTextbox = page.locator('input[name="Password"]');
    //await passwordTextbox.click();
    await passwordTextbox.fill('pwd');

    const loginButton = page.getByRole('button', {name:'Log In'});
    await loginButton.click();

    const welcomeText = page.locator('#loginstatus');
    await expect(welcomeText).toContainText(username);
});

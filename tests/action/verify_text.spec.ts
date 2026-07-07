import { test } from "@playwright/test";

test("Practice page - Verify Text", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #2
    const verifyTextContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Verify Text" }) });
    const verifyTextLink = verifyTextContainer.getByRole("link");
    const verifyTextDescText = await verifyTextContainer.locator("p").textContent();

    console.log("verifyTextDescText", verifyTextDescText);
    await verifyTextLink.click();

    // find the text "Hello UserName!" in the yellow
    const yellowText = await page.locator("//p[@class='bg-warning']//span[contains(normalize-space(.),'Hello UserName!')]").textContent();
    console.log('the text "Hello UserName!" in the yellow = ', yellowText);

    // find the text "Hello UserName!" in the blue
    const blueText = await page.locator("//div[@class='bg-primary']//span[normalize-space(.)='Welcome UserName!']").textContent();
    console.log('the text "Welcome UserName!" in the blue = ', blueText);

    
});

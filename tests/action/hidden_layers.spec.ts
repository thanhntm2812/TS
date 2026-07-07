import test, { expect } from "playwright/test";

test("Practice page - Hidden Layers ", async ({ page }) => {
  await page.goto("http://uitestingplayground.com/");

  //solution #2
  const hiddenLayersContainer = page
    .locator("div.col-sm")
    .filter({ has: page.getByRole("link", { name: "Hidden Layers" }) });
  const hiddenLayersLink = hiddenLayersContainer.getByRole("link");
  const hiddenLayersDescText = await hiddenLayersContainer
    .locator("p")
    .textContent();

  console.log("hiddenLayersDescText", hiddenLayersDescText);
  await hiddenLayersLink.click();

  // click on button
  const hiddenLayersGreenButton = page.locator("#greenButton"); //css
  await hiddenLayersGreenButton.click(); //click one

  const hiddenLayersBlueButton = page.locator("#blueButton");
  //expect(hiddenLayersBlueButton).toBeVisible();
  await expect(hiddenLayersBlueButton).toBeVisible({ timeout: 10000 });
});

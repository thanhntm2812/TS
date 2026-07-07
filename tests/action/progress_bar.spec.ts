import test from "playwright/test";

test("Practice page - Progress Bar ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #2
    const startContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Progress Bar" }) });
    const startLink = startContainer.getByRole("link");
    const startDescText = await startContainer.locator("p").textContent();

    console.log("startDescText", startDescText);
    await startLink.click();

    // implement test
    const startButton = page.locator("#startButton"); //css
    const stopButton = page.locator("#stopButton"); //css
    const progressBar = page.locator("#progressBar");

    await startButton.click(); //click start button

    // wait for progress bar = 75%
    while (true) {
        const number = Number(await progressBar.getAttribute("aria-valuenow"));
        if (number >= 75) {
            await stopButton.click(); //then click Stop btn
            break;
        }
        await page.waitForTimeout(20);
    }

    const progressText = await progressBar.textContent();
    console.log("% value = ", progressText);
});

import test, { expect } from "playwright/test";

test("Practice page - Scroll to Click ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #1

    // const dynamicIdLink = page.getByRole("link", { name: "Scroll to Click" });
    // await dynamicIdLink.click();

    //solution #2
    const dynamicIdContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Scroll to Click" }) });
    const dynamicIdLink = dynamicIdContainer.getByRole("link");
    const dynamicIdDescText = await dynamicIdContainer.locator("p").textContent();

    console.log("dynamicIdDescText", dynamicIdDescText);
    await dynamicIdLink.click();

    // Case 1 — Page Scroll
    const pagescroll = page.locator("#case1-spacer");
    await pagescroll.scrollIntoViewIfNeeded();

    const scrollTarget1Button = page.locator("#scrollTarget1");
    await scrollTarget1Button.click();

    let progressText = await page.locator("#progressText").textContent();
    console.log(progressText);
    

    expect(await scrollTarget1Button.textContent() === "Clicked!");


    // Case 2 — Container Scroll
    const containerScroll = page.locator("#scrollContainer2");
    await containerScroll.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
        el.scrollLeft = el.scrollWidth;
    });

    const scrollTarget2Button = page.locator("#scrollTarget2");
    await scrollTarget2Button.click();

    progressText = await page.locator("#progressText").textContent();
    console.log(progressText);
    

    expect(await scrollTarget2Button.textContent() === "Clicked!");


    // Case 3 — Nested Scroll (Parent + Child)
    const outerScroll3Parent = page.locator("#outerScroll3");
    await outerScroll3Parent.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
    });

    const innerScroll3Child = page.locator("#innerScroll3");
    await innerScroll3Child.evaluate((el) => {
        el.scrollLeft = el.scrollWidth;
    });

    const scrollTarget3Button = page.locator("#scrollTarget3");
    await scrollTarget3Button.click();

    progressText = await page.locator("#progressText").textContent();
    console.log(progressText);
    

    expect(await scrollTarget3Button.textContent() === "Clicked!");


    // Case 4 — Hover to Reveal
    const hoverList = page.locator("#hoverList");

    const targetRow4 = hoverList.locator("#targetRow4");
    await targetRow4.hover();

    const scrollTarget4Button = hoverList.locator("#scrollTarget4");
    await scrollTarget4Button.click();

    progressText = await page.locator("#progressText").textContent();
    console.log(progressText);

    expect(await scrollTarget4Button.textContent() === "Clicked!");


});

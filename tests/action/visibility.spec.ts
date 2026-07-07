import test, { expect } from "playwright/test";
import { ExpectedTexts } from "../../src/data/test.data";

test("Practice page - Visibility ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #2
    const visibilityContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Visibility" }) });
    const visibilityLink = visibilityContainer.getByRole("link");
    const visibilityDescText = await visibilityContainer.locator("p").textContent();

    console.log("visibilityDescText", visibilityDescText);
    await visibilityLink.click();

    //table
    const table = page.locator('//table');

    // Hide button
    /*
    | CSS                 | Có trong DOM  | Chiếm chỗ  | Nhìn thấy |
    | ------------------- | ------------  | ---------  | --------- |
    | `visibility:hidden` | ✅            | ✅         | ❌        |
    | `display:none`      | ✅            | ❌         | ❌        |
    | `opacity:0`         | ✅            | ✅         | ❌        |

    */

    /*
    | Button            | Sau khi Hide              | Cách verify         |
    | ----------------- | ------------------------- | ------------------- |
    | Removed           | Bị remove khỏi DOM        | `toHaveCount(0)`    |
    | Zero Width        | Vẫn tồn tại nhưng width=0 | `not.toBeVisible()` |
    | Overlapped        | Bị div khác che           | vẫn visible         |
    | Opacity 0         | opacity:0                 | `toHaveCSS('opacity', '0')` |
    | Visibility Hidden | visibility:hidden         | `toHaveCSS('visibility', 'hidden')`|
    | Display None      | display:none              | `not.toBeVisible()` |
    | Offscreen         | Ra ngoài màn hình         | vẫn visible         |

    */

    const hideButton = table.locator('#hideButton');

    const removeButton = table.locator('#removedButton');
    const zeroWidthButton = table.locator('#zeroWidthButton'); 
    const overlappedButton = table.locator('#overlappedButton');

    const transparentButton = table.locator('#transparentButton');
    const invisibleButton = table.locator('#invisibleButton');
    const notdisplayedButton = table.locator('#notdisplayedButton');
    const offscreenButton = page.locator('#offscreenButton');

    await hideButton.click();

    //remove from DOM
    await expect(removeButton).toHaveCount(0);

    //is not visible
    //await expect(zeroWidthButton).not.toBeVisible();
    await expect(zeroWidthButton).toHaveClass(/zerowidth/);
    await expect(transparentButton).toHaveCSS('opacity', '0');
    await expect(invisibleButton).toHaveCSS('visibility', 'hidden');
    await expect(notdisplayedButton).toHaveCSS('display', 'none');

    //still visible but overlap, and can not be clicked
    await expect(overlappedButton).toBeVisible();

    const canClick = await overlappedButton.click({trial:true}).then(() => true).catch(() => false); //try to click
    expect(canClick).toBe(false);

    // out of screen
    await expect(offscreenButton).not.toBeInViewport(); //kiem tra Element có nằm trong vùng nhìn thấy của màn hình (viewport) hay không.

});

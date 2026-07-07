import { test } from "@playwright/test";

/** LOCATOR
 * 1. Use locator build-in
 * 2. css / xpath: priority: id, class, attribute
 * 3. ưu tiên chọn ~ locator rõ nghĩa, unique
 */

test("Menu list > Store list - CSS", async ({ page }) => {
    await page.goto("https://ht-portal-uat.finviet.com.vn/auth/login", {
        waitUntil: "networkidle",
    });

    //----------------------- 01 - Login
    const usernameTextbox = page.locator("input#username");
    const passwordTextbox = page.locator('input[placeholder="Nhập vào mật khẩu."]');
    const loginButton = page.locator('//span[contains(text(),"Đăng nhập")]');

    await usernameTextbox.click();
    await usernameTextbox.fill("QCMTHO");

    await passwordTextbox.click();
    await passwordTextbox.fill("Abc@123123");

    await loginButton.click();

    // click

    // fill
});

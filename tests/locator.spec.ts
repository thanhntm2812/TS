import { test } from "@playwright/test";

test("Locator_01", async ({ page }) => {
    await page.goto("https://ht-portal-uat.finviet.com.vn/auth/login", {
        waitUntil: "networkidle",
    });

    // 01 - getByRole
    // const usernameTextbox = page.getByRole("textbox", {
    //     name: "Nhập vào tài khoản",
    // });

    // 02 - getByRole
    const usernameTextbox = page.getByPlaceholder("Nhập vào tài khoản");
    const passwordTextbox = page.getByPlaceholder("Nhập vào mật khẩu");
    const loginButton = page.getByRole("button", { name: "Đăng nhập" });

    // await usernameTextbox.highlight();
    await usernameTextbox.click();
    await usernameTextbox.fill("QCMTHO");

    await passwordTextbox.click();
    await passwordTextbox.fill("Abc@123123");

    await loginButton.click();

    // 03 - navigate to "Dữ Liệu Nền"
    const menuList = page.getByText("Dữ Liệu Nền");
    await menuList.click();
});

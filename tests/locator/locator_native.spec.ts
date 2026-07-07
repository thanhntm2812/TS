import { test } from "@playwright/test";

test("Menu list > Store list - NATIVE ", async ({ page }) => {
    await page.goto("https://ht-portal-uat.finviet.com.vn/auth/login", {
        waitUntil: "networkidle",
    });

    // 01 - login
    const usernameTextbox = page.getByRole("textbox", {
        name: "Nhập vào tài khoản",
    });
    const passwordTextbox = page.getByRole("textbox", {
        name: "Nhập vào mật khẩu",
    });
    const loginButton = page.getByRole("button", { name: "Đăng nhập" });

    await usernameTextbox.click();
    await usernameTextbox.fill("QCMTHO");

    await passwordTextbox.click();
    await passwordTextbox.fill("Abc@123123");

    await loginButton.click();

    // 02 - navigate to "Dữ Liệu Nền"
    // const parentMenu = page.getByText("Dữ Liệu Nền");
    const parentMenu = page.getByRole("menuitem", {
        name: "Dữ Liệu Nền",
    });
    await parentMenu.click();

    // 03 - navigate to "Kinh doanh"
    const childMenu = page.getByRole("menuitem", {
        name: "Kinh Doanh",
        exact: true,
    });
    await childMenu.click();

    // 04 - navigate to "Danh sách điểm bán"
    const storeList = page.getByRole("menuitem", {
        name: "Danh Sách Điểm Bán",
    });
    await storeList.click();

    await page.waitForTimeout(10000);

    const searchForm = page.locator("form.ant-pro-query-filter");

    //05 - search by keyword
    const keywordTextbox = searchForm.locator("input#keyword");
    await keywordTextbox.click();
    await keywordTextbox.fill("test css");

    //06 - search by area
    const areaCombobox = searchForm.getByRole("combobox", { name: "Vùng :" });
    await areaCombobox.click();
    await areaCombobox.fill("North");

    const areaSelect = searchForm.getByTitle("North", { exact: true });
    await areaSelect.click();
    await page.keyboard.press("Escape");

    //07 - search by status
    // const statusCombobox = searchForm.getByText("Hoạt động", { exact: true });
    const statusCombobox = searchForm.getByPlaceholder("Chọn trạng thái.");
    await statusCombobox.click();

    const statusList = page.locator("div.ant-select-item-option-content").filter({ hasText: "Khởi tạo" });
    await statusList.click();

    // const selectCombobox = page.getByText("Khởi tạo", { exact: true })
    // await selectCombobox.click();
    // await page.keyboard.press("Escape");

    // 08 - filter by type of customer
    // const customerTypeCombobox = searchForm.getByRole("combobox").nth(3);
    // await customerTypeCombobox.click();

    const customerTypeCombobox = searchForm.locator("input#store_types");
    await customerTypeCombobox.click();

    const customerTypeOption = page.locator("div.ant-select-item-option-content").filter({ hasText: "INDIRECT" });
    await customerTypeOption.click();

    // const customerTypeSelectCombobox = page.getByTitle("INDIRECT");
    // await customerTypeSelectCombobox.click();

    // 09 - Loại điểm bán
    const typeStoreList = searchForm.locator("input#store_type_id");
    await typeStoreList.click();

    const typeStoreOption = page.locator("div.ant-select-item-option-content").filter({ hasText: "MTI" });
    await typeStoreOption.click();

    // 10 - Sale Channel
    const saleChannelList = searchForm.locator("input#sale_channel_id");
    await saleChannelList.click();
    await saleChannelList.fill("CHUNG");

    const saleChannelOption = page.locator("span.ant-pro-select-item-option-content-light").filter({ hasText: "CHUNG" });
    await saleChannelOption.click();

    await page.keyboard.press("Escape");

    //final - button Search;
    const searchButton = page.getByText("Tìm kiếm", { exact: true });
    await searchButton.click();
});

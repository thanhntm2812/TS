import { test } from "@playwright/test";

test("Menu list > Store list - XPath", async ({ page }) => {
    // 1. must have // at the first
    // 2. input[@att='username']
    // 3.

    await page.goto("https://ht-portal-uat.finviet.com.vn/auth/login", {
        waitUntil: "networkidle",
    });

    const loginForm = page.locator("//form");

    //---------------------- 01 - login
    const usernameTextbox = loginForm.locator('//input[@id="username"]');
    const passwordTextbox = loginForm.locator('//input[@id="password"]');
    const loginButton = page.locator('//button[contains(@class,"btn-login")]');

    await usernameTextbox.click();
    await usernameTextbox.fill("QCMTHO");

    await passwordTextbox.click();
    await passwordTextbox.fill("Abc@123123");

    await loginButton.click();

    //--------------------- 02 - Navigate to "Dữ liệu nền"
    const menuSidebar = page.locator("//aside");

    const menuBGData = menuSidebar.locator('//div[contains(@data-menu-id,"BACKGROUND_DATA")]');
    await menuBGData.click();

    //--------------------- 03 - Navigate to "Kinh doanh"

    // //aside//ul[contains(@id,"BACKGROUND_DATA-popup")]//div[contains(@data-menu-id,"BUSINESS")]
    const menuBGDataPopup = menuSidebar.locator('//ul[contains(@id,"BACKGROUND_DATA-popup")]');

    const menuBusiness = menuBGDataPopup.locator('//div[contains(@data-menu-id,"BUSINESS")]');
    await menuBusiness.click();

    //-------------------- 04 - Navigate to "Danh sách điểm bán"

    // //aside//ul[contains(@id,"BACKGROUND_DATA-popup")]//ul[contains(@id,"BUSINESS-popup")]//li[contains(@data-menu-id,"/base-data/business/store") and not(contains(@data-menu-id,"store-"))]
    const menuBusinessPopup = menuBGDataPopup.locator('//ul[contains(@id,"BUSINESS-popup")]');

    const menuStoreList = menuBusinessPopup.locator('//li[contains(@data-menu-id,"/base-data/business/store") and not(contains(@data-menu-id,"store-"))]');
    // const menuStoreList = menuSidebar.locator('//a[@href="/base-data/business/store"]');
    await menuStoreList.click();

    //--------------------- 05 - Search by keyword
    // const searchForm = page.locator("(//form)[1]");
    const searchForm = page.locator('//div[contains(@class,"ant-pro-table-search-query-filter")]');

    // //form//input[@id="keyword"]
    const keywordTextbox = searchForm.locator('//input[@id="keyword"]');
    await keywordTextbox.click();
    await keywordTextbox.fill("NBI");

    //----------------------06 - Search by area = North
    const areaCombobox = searchForm.locator('//input[@id="area_groups"]');
    await areaCombobox.click();

    const areaSelect = searchForm.locator('//span[@aria-label="Select North"]');
    await areaSelect.click();

    // -----------------------07 - Search by NPP
    const nppButton = searchForm.locator('//span[text()="Chọn"]');
    await nppButton.click();

    // Pop up "Chọn nhà phân phối" is opened
    const nppDialog = page.locator('//div[@role="dialog"]');
    const nppTextbox = nppDialog.locator('//input[@id="keyword"]');
    await nppTextbox.click();
    await nppTextbox.fill("ERPNORTH");

    const nppSearchButton = nppDialog.locator('//span[text()="Tìm kiếm"]');
    await nppSearchButton.click();

    const nppCheckbox = nppDialog.locator('(//div[@role="dialog"]//input[@type="checkbox"])[3]');
    await nppCheckbox.click();

    const nppAgreeButton = nppDialog.locator('//span[text()="Đồng ý"]');
    await nppAgreeButton.click();
    // Pop up "Chọn nhà phân phối" is closed

    //--------------------- Click button search
    const searchButton = searchForm.locator('//span[text()="Tìm kiếm"]');
    await searchButton.click();
});

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

  // 01 - login
  // id => #
  // class => .
  // input[att='username']

  //----------------------- 01 - Login
  const usernameTextbox = page.locator("input#username");
  const passwordTextbox = page.locator(
    'input[placeholder="Nhập vào mật khẩu."]',
  );
  const loginButton = page.locator('//span[contains(text(),"Đăng nhập")]');

  await usernameTextbox.click();
  await usernameTextbox.fill("QCMTHO");

  await passwordTextbox.click();
  await passwordTextbox.fill("secreat");

  await loginButton.click();

  //------------------------ 02 - Navigate to "Dữ liệu nền"
  const menuSidebar = page.locator("aside");

  const menuBGData = menuSidebar.locator(
    'div[data-menu-id$="BACKGROUND_DATA"]',
  );
  await menuBGData.click();

  //--------------------- 03 - Navigate to "Kinh doanh"

  const menuBusiness = menuSidebar.locator('div[data-menu-id$="BUSINESS"]');
  await menuBusiness.click();

  //-------------------- 04 - Navigate to "Danh sách điểm bán"
  const menuStoreList = menuSidebar.locator(
    'a[href="/base-data/business/store"]',
  );
  await menuStoreList.click();

  //--------------------- 05 - Search by keyword
  const searchForm = page.locator(
    'div[class*="ant-pro-table-search-query-filter"]',
  );

  //
  const keywordTextbox = searchForm.locator("input#keyword");
  await keywordTextbox.click();
  await keywordTextbox.fill("NBI");

  //----------------------06 - Search by area = North
  const areaCombobox = searchForm.locator("input#area_groups");
  await areaCombobox.click();

  const areaSelect = searchForm.locator('span[title="North"]');
  await areaSelect.click();

  await searchForm.click();

  //----------------------07 - Search status = "Khởi tạo"
  // const statusSelectBox = page.locator('input[id="status"]');
  const statusSelectBox = page.locator(
    'span.ant-select-selection-item:has-text("Hoạt động")',
  );
  await statusSelectBox.click();

  const itemStatusSelectBox = page.locator('div[title="Khởi tạo"]');
  // const itemStatusSelectBox = searchForm.locator('div.ant-select-item-option-content:has-text("Khởi tạo")');
  await itemStatusSelectBox.click();

  //--------------------- Click button search
  const searchButton = page.locator('span:text-is("Tìm kiếm")');
  await page.waitForTimeout(5000);

  await searchButton.click();
});

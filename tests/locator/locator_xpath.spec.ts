import { expect, test } from "@playwright/test";

test("Menu list > Store list - XPath", async ({ page }) => {
  test.setTimeout(180000);

  await page.goto("https://ht-portal-uat.finviet.com.vn/auth/login", {
    waitUntil: "domcontentloaded",
  });

  //---------------------- 01 - login
  const usernameTextbox = page.locator(
    '//input[@placeholder="Nhập vào tài khoản."]',
  );
  const passwordTextbox = page.locator(
    '//input[@placeholder="Nhập vào mật khẩu."]',
  );
  const loginButton = page.locator(
    '//button[.//span[normalize-space()="Đăng nhập"]]',
  );

  await usernameTextbox.fill("QCMTHO");
  await passwordTextbox.fill("secreat");
  await loginButton.click();
  await page.waitForURL("**/dashboard", { timeout: 60000 });

  //-------------------- 02 - Navigate to "Danh sách điểm bán"
  const menuBGData = page.locator(
    "//div[@role='menuitem' and contains(normalize-space(.), 'Dữ Liệu Nền')]",
  );
  await menuBGData.waitFor({ state: "visible", timeout: 60000 });
  await menuBGData.click();

  const menuBusiness = page.locator(
    "//div[@role='menuitem' and contains(normalize-space(.), 'Kinh Doanh')]",
  );
  await menuBusiness.waitFor({ state: "visible", timeout: 60000 });
  await menuBusiness.click();

  const menuStoreList = page.locator(
    "//a[contains(normalize-space(.), 'Danh Sách Điểm Bán')]",
  );
  await menuStoreList.waitFor({ state: "visible", timeout: 60000 });
  await menuStoreList.click();

  await page.waitForURL("**/base-data/business/store");

  //--------------------- 03 - Search by keyword
  const keywordTextbox = page.locator("//input[@id='keyword']");
  await expect(keywordTextbox).toBeVisible({ timeout: 30000 });
  await keywordTextbox.fill("NBI");

  //----------------------04 - Search by area = North
  await page.locator("//input[@id='area_groups']").click();
  const northOption = page.locator("//span[normalize-space()='NORTH']").first();
  await northOption.waitFor({ state: "visible", timeout: 30000 });
  await northOption.click();
  await page.keyboard.press("Escape");

  //-----------------------05 - Search by NPP
  const searchForm = page.locator(
    '//div[contains(@class,"ant-pro-table-search-query-filter")]',
  );

  const nppButton = searchForm.locator(
    '//button[.//span[normalize-space()="Chọn"]]',
  );
  await nppButton.click();

  // Pop up "Chọn nhà phân phối" is opened
  const nppDialog = page.locator("//div[@role='dialog']");
  const nppTextbox = nppDialog.locator("//input[@id='keyword']");
  await nppTextbox.click();
  await nppTextbox.fill("ERPNORTH");

  const nppSearchButton = nppDialog.locator(
    "//button[.//span[normalize-space()='Tìm kiếm']]",
  );
  await nppSearchButton.click();

  const nppCheckbox = nppDialog.locator(
    "(//div[@role='dialog']//input[@type='checkbox'])[3]",
  );
  await nppCheckbox.click();

  const nppAgreeButton = nppDialog.locator(
    "//button[.//span[normalize-space()='Đồng ý']]",
  );
  await nppAgreeButton.click();
  // Pop up "Chọn nhà phân phối" is closed

  //--------------------- 06 - Click button search
  const searchButton = searchForm.locator(
    '//button[.//span[normalize-space()="Tìm kiếm"] and not(contains(@class, "ant-btn-loading")) and not(@disabled)]',
  );
  await searchButton.first().click();
});

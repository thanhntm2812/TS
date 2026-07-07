import test, { expect } from "playwright/test";

/*
| Ký hiệu | Khi nào dùng                                                       | Ý nghĩa                         |
| ------- | ------------------------------------------------------------------ | ------------------------------- |
| `!`     | **Bạn chắc chắn giá trị không bao giờ là `null` hoặc `undefined`** | Bỏ qua cảnh báo của TypeScript  |
| `?.`    | **Có thể là `null` hoặc `undefined`**                              | Nếu có giá trị thì mới gọi tiếp |
| `?`     | Dùng khi **khai báo** thuộc tính hoặc tham số là tùy chọn          | Có thể có hoặc không            |

*/

/*
| Hàm              | Nên dùng  |
| ---------------- | --------- |
| `textContent()`  | `?.`      |
| `innerText()`    | `?.`      |
| `getAttribute()` | `?.`      |
| `inputValue()`   | Không cần |
| `toHaveText()`   | Không cần |
| `toHaveValue()`  | Không cần |

*/

test("Practice page - Select ", async ({ page }) => {
  await page.goto("http://uitestingplayground.com/");

  //solution #1

  // const dynamicIdLink = page.getByRole("link", { name: "Select", exact: true });
  // await dynamicIdLink.click();

  //solution #2
  const dynamicIdContainer = page
    .locator("div.col-sm")
    .filter({ has: page.getByRole("link", { name: "Select", exact: true }) });
  const dynamicIdLink = dynamicIdContainer.getByRole("link");
  const dynamicIdDescText = await dynamicIdContainer.locator("p").textContent();

  console.log("dynamicIdDescText", dynamicIdDescText);
  await dynamicIdLink.click();

  //---------------------------------------------------------------------------------------------------------
  console.log("\n------------------Language----------------- ");

  // Programming Language (single-select)
  const selectLanguageForm = page.locator("#selectLanguage");
  await selectLanguageForm.click();

  //   await selectLanguageForm.selectOption({ value: "js" });
  //   let statusLanguageLabel = await page.locator("#statusLanguage").textContent();
  //   console.log(statusLanguageLabel);

  const selectLanguageOption = selectLanguageForm.locator("option");
  const countLanguage = await selectLanguageOption.count();

  for (let i = 0; i < countLanguage; i++) {
    const option = selectLanguageOption.nth(i);

    const text = (await option.textContent())!.trim();
    const value = await option.getAttribute("value");

    await selectLanguageForm.selectOption({ value: value! });

    await expect(selectLanguageForm).toHaveValue(value!);

    await expect(selectLanguageForm.locator("option:checked")).toHaveText(
      text!,
    );

    const statusLanguageLabel = await page
      .locator("#statusLanguage")
      .textContent();
    console.log(statusLanguageLabel);
  }

  //---------------------------------------------------------------------------------------------------------
  console.log("\n------------------City----------------- ");
  // City (contains non-breaking spaces)

  const selectCityForm = page.locator("#selectCity");
  await selectCityForm.click();

  // await selectCityForm.selectOption({ value: "nyc" });
  // let statusCityLabel = await page.locator("#statusCity").textContent();
  // console.log(statusCityLabel);

  const selectCityOption = selectCityForm.locator("option");
  const countCity = await selectCityOption.count();

  for (let i = 0; i < countCity; i++) {
    const option = selectCityOption.nth(i);

    const text = (await option.textContent())!.trim();
    // console.log(text);

    const value = await option.getAttribute("value");
    // console.log(value);

    await selectCityForm.selectOption({ value: value! });
    await expect(selectCityForm).toHaveValue(value!);

    await expect(selectCityForm.locator("option:checked")).toHaveText(text!);

    const statusCityLabel = await page.locator("#statusCity").textContent();
    console.log(statusCityLabel);
  }

  //---------------------------------------------------------------------------------------------------------
  console.log("\n-----------------Product----------------- ");
  // Product Version (select by value)

  const selectProductForm = page.locator("#selectProduct");
  await selectProductForm.click();

  // await selectProductForm.selectOption({ value: "v1.0" });
  // let statusProductLabel = await page.locator("#statusProduct").textContent();
  // console.log(statusProductLabel);

  const selectProductOption = selectProductForm.locator("option");
  const countProduct = await selectProductOption.count();

  for (let i = 0; i < countProduct; i++) {
    const option = selectProductOption.nth(i);

    const text = (await option.textContent())!.trim();
    // console.log(text);

    const value = await option.getAttribute("value");
    // console.log(value);

    await selectProductForm.selectOption({ value: value! });
    await expect(selectProductForm).toHaveValue(value!);

    await expect(selectProductForm.locator("option:checked")).toHaveText(text!);

    const statusProductLabel = await page
      .locator("#statusProduct")
      .textContent();
    console.log(statusProductLabel);
  }

  //---------------------------------------------------------------------------------------------------------
  console.log(
    "\n------------------Colors-----------------Multi select------------ ",
  );
  // Colors (multi-select, hold Ctrl/Cmd to select multiple)

  const selectColorsForm = page.locator("#selectColors");
  await selectColorsForm.click();

  // await selectColorsForm.selectOption(["red", "green", "blue"]);

  // let statusColorsLabel = await page.locator("#statusColors").textContent();
  // console.log(statusColorsLabel);

  const selectColorOption = selectColorsForm.locator("option");
  const countColor = await selectColorOption.count();

  // create a color array
  let colorsArray = []; // Array of Colors
  for (let i = 0; i < countColor; i++) {
    const option = selectColorOption.nth(i);

    const value = await option.getAttribute("value");
    // console.log(value);

    colorsArray.push(value!);
  }
  console.log("Colors = ", colorsArray);

  // create a random color array
  const randomColorArray: string[] = []; //sub color array to multi select

  while (randomColorArray.length < 3) {
    //select 3 elements
    const randomIndex = Math.floor(Math.random() * colorsArray.length);

    if (!randomColorArray.includes(colorsArray[randomIndex])) {
      randomColorArray.push(colorsArray[randomIndex]);
    }
  }
  console.log("random Colors = ", randomColorArray);

  await selectColorsForm.selectOption(randomColorArray);

  let statusColorsLabel = await page.locator("#statusColors").textContent();
  console.log(statusColorsLabel);

  //---------------------------------------------------------------------------------------------------------
  console.log(
    "\n------------------Fruits-----------------Multi select------------ ",
  );
  // Fruits (multi-select, some pre-selected)

  const selectFruitsForm = page.locator("#selectFruits");
  await selectFruitsForm.click();

  // await selectFruitsForm.selectOption(["apple", "banana", "cherry"]);
  // let statusFruitsLabel = await page.locator("#statusFruits").textContent();
  // console.log(statusFruitsLabel);

  const selectFruitOption = selectFruitsForm.locator("option");
  const countFruit = await selectFruitOption.count();

  // create a Fruit array
  let FruitsArray = []; // Array of Fruits
  for (let i = 0; i < countFruit; i++) {
    const option = selectFruitOption.nth(i);

    const value = await option.getAttribute("value");
    // console.log(value);

    FruitsArray.push(value!);
  }
  console.log("Fruits = ", FruitsArray);

  // create a random Fruit array
  const randomFruitArray: string[] = []; //sub Fruit array to multi select

  while (randomFruitArray.length < 3) {
    //select 3 elements
    const randomIndex = Math.floor(Math.random() * FruitsArray.length);

    if (!randomFruitArray.includes(FruitsArray[randomIndex])) {
      randomFruitArray.push(FruitsArray[randomIndex]);
    }
  }
  console.log("random Fruits = ", randomFruitArray);

  await selectFruitsForm.selectOption(randomFruitArray);

  let statusFruitsLabel = await page.locator("#statusFruits").textContent();
  console.log(statusFruitsLabel);

  //---------------------------------------------------------------------------------------------------------
  console.log(
    "\n\n------------------Final-----------------What I selected------------ ",
  );
  //final selected elements
  let opstatusLabel = await page.locator("#opstatus").textContent();
  console.log(opstatusLabel);
});

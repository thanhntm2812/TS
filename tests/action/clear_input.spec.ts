import test, { expect } from "playwright/test";

test("Practice page - Clear Input ", async ({ page }) => {
    await page.goto("http://uitestingplayground.com/");

    //solution #1

    // const dynamicIdLink = page.getByRole("link", { name: "Clear Input" });
    // await dynamicIdLink.click();

    //solution #2
    const dynamicIdContainer = page.locator("div.col-sm").filter({ has: page.getByRole("link", { name: "Clear Input" }) });
    const dynamicIdLink = dynamicIdContainer.getByRole("link");
    const dynamicIdDescText = await dynamicIdContainer.locator("p").textContent();

    console.log("dynamicIdDescText", dynamicIdDescText);
    await dynamicIdLink.click();

    //fields remaining
    let statusLabel = page.locator("#opstatus");
    let fieldsRemaining = await statusLabel.textContent();
    console.log("Begining = ", fieldsRemaining);

    /*
    | Ký hiệu | Ý nghĩa            |
    | ------- | ------------------ |
    | `\d`    | Một chữ số (0-9)   |
    | `+`     | Một hoặc nhiều lần |

    */

    let count = Number(fieldsRemaining?.match(/\d+/)?.[0]);  
    console.log("Begining, count = ", count);


    //Input (type=text) 
    const textInput = page.locator("#clearInput");
    await textInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear Input (type=text), count = ", count);

    expect(await textInput.textContent() === null);


    // Textarea
    const textareaInput = page.locator("#clearTextarea");
    await textareaInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear Textarea, count = ", count);

    expect(await textareaInput.textContent() === null);

    //Input (type=password)
    const passwordInput = page.locator("#clearPassword");
    await passwordInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear (type=password), count = ", count);

    expect(await passwordInput.textContent() === null);


    //Input (type=email)
    const clearEmailInput = page.locator("#clearEmail");
    await clearEmailInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear (type=email), count = ", count);

    expect(await clearEmailInput.textContent() === null);

    //Input (type=number)
    const clearNumberInput = page.locator("#clearNumber");
    await clearNumberInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear (type=number), count = ", count);

    expect(await clearNumberInput.textContent() === null);


    //Input (type=search)
    const clearSearchInput = page.locator("#clearSearch");
    await clearSearchInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear (type=search), count = ", count);

    expect(await clearSearchInput.textContent() === null);

    //Input (type=url)
    const clearUrlInput = page.locator("#clearUrl");
    await clearUrlInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear (type=url), count = ", count);

    expect(await clearUrlInput.textContent() === null);

      //Input (type=tel)
    const clearTelInput = page.locator("#clearTel");
    await clearTelInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear (type=clearTel), count = ", count);

    expect(await clearTelInput.textContent() === null);


     //Input Content Editable Div
    const clearContentEditableInput = page.locator("#clearContentEditable");
    await clearContentEditableInput.clear();

    statusLabel = page.locator("#opstatus");
    fieldsRemaining = await statusLabel.textContent();
    count = Number(fieldsRemaining?.match(/\d+/)?.[0]);
    console.log("After clear clearContentEditable, count = ", count);

    expect(await clearContentEditableInput.textContent() === null);

});

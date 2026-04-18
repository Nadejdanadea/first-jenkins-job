import { test, expect } from "@playwright/test";
import { CommonUI } from "./CommonUI";
import { faker } from "@faker-js/faker"; 

test.describe("Start Application Page @sep01", () => {

  test.beforeEach(async ({ page }) => {
    await CommonUI.login(page);
  });

  test("Verify that clicking the Terms & Conditions link opens a new Terms & Conditions tab", async ({
    page,
  }) => {

    let windowPopupEvent = page.waitForEvent("popup");

    let termsAndConditionsLink = page.getByText("Terms and conditions");

    await expect(termsAndConditionsLink).toBeVisible();
    await expect(termsAndConditionsLink).toBeEnabled();

    await termsAndConditionsLink.click();

    let newPage = await windowPopupEvent;

    let termsAndConidtionHeader = newPage.locator("//bdt[@class='question']/strong[text()='TERMS AND CONDITIONS']");

    await expect(termsAndConidtionHeader).toBeVisible();

  });


  test("Verify that the first stepper is blue initially and changes to green once Step 1 is completed.", async ({
    page,
  }) => {

    
    let step1StepperCircle = page.locator("//div[@class='step-circle']").first();

    await expect(step1StepperCircle).toBeVisible();
    await expect(step1StepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");

    await CommonUI.completeStartApplicationStep(page); // complete step1

    await expect(step1StepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");

  });

  test("Verify that personal input fields are enabled and accept user input", async ({
    page,
  }) => {

    let firstNameInputBox = page.locator("//input[@formcontrolname='firstName']");
    let lastNameInputBox = page.locator("//input[@formcontrolname='lastName']");
    let emailInputBox = page.locator("//mat-label[normalize-space()='Email Address']");
    let phoneNumberInputBox = page.locator("//input[@formcontrolname='phoneNumber']");

    let firstName = faker.person.firstName(); 
    await firstNameInputBox.fill(firstName);
    await expect(firstNameInputBox).toHaveValue(firstName);

    let lastName = faker.person.lastName(); 
    await lastNameInputBox.fill(lastName);
    await expect(lastNameInputBox).toHaveValue(lastName);

    let email = faker.internet.email();
    await emailInputBox.fill(email);
    await expect(emailInputBox).toHaveValue(email);

    let phoneNumber = faker.string.numeric(10);
    await phoneNumberInputBox.fill(phoneNumber);
    await expect(phoneNumberInputBox).toHaveValue(phoneNumber);


  });


});

import { test, expect } from "@playwright/test";
import { CommonUI } from "./CommonUI";

test.describe("Payment Plan Page @sep2", () => {
  test.beforeEach(async ({ page }) => {
    await CommonUI.login(page);
    await CommonUI.completeStartApplicationStep(page);
  });

  test("Verify that Step 2 stepper is blue and Step 1 stepper is green.", async ({
    page,
  }) => {
    let step1StepperCircle = page
      .locator("//div[@class='step-circle']")
      .first();
    await expect(step1StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)",
    );

    let step2StepperCircle = page.locator("//div[@class='step-circle']").nth(1);
    await expect(step2StepperCircle).toHaveCSS(
      "background-color",
      "rgb(1, 201, 255)",
    );
  });

  test("Verify that the Next button is disabled by default.", async ({
    page,
  }) => {
    let inactiveNextButton = page.locator(
      "//button[@class='next-button disabledButton' and text()='Next']",
    );
    await expect(inactiveNextButton).not.toBeEnabled();
    await expect(inactiveNextButton).toBeDisabled();
  });

  test("Verify that the Next button becomes enabled when a payment plan is selected", async ({
    page,
  }) => {
    let upfrontPaymentPlan = page.locator(
      "//mat-expansion-panel//span[@class='payment-type' and normalize-space()='Upfront']",
    );
    await upfrontPaymentPlan.click();

    let activeNextButton = page.locator(
      "//button[@class='next-button' and text()='Next']",
    );
    await expect(activeNextButton).toBeEnabled();
  });

  test("Verify Clicking the active next button will change the stepper 2 color to green", async ({
    page,
  }) => {
    await CommonUI.completePaymentPlanStep(page); // complete step2

    let step2StepperCircle = page.locator("//div[@class='step-circle']").nth(1);
    await expect(step2StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)",
    );


  });
});

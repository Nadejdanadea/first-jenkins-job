import { faker } from "@faker-js/faker"; 

export class CommonUI {

    static async login(page){
        
        const encoded_credential = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");
        await page.setExtraHTTPHeaders( {'Authorization': `Basic ${encoded_credential}`} );

        await page.goto(`${process.env.SEP_QA_URL}`);
        await page.waitForLoadState("networkidle");
       
    }

    static async completeStartApplicationStep(page){
        let firstNameInputBox = page.locator("//input[@formcontrolname='firstName']");
        let lastNameInputBox = page.locator("//input[@formcontrolname='lastName']");
        let emailInputBox = page.locator("//mat-label[normalize-space()='Email Address']");
        let phoneNumberInputBox = page.locator("//input[@formcontrolname='phoneNumber']");
        let howDidYouHearAboutUsDropDown = page.locator("//mat-label[text()='How did you hear about us?']");

        await firstNameInputBox.fill(faker.person.firstName());
        await lastNameInputBox.fill(faker.person.lastName());
        await emailInputBox.fill(faker.internet.email());
        await phoneNumberInputBox.fill(faker.string.numeric(10));

        await howDidYouHearAboutUsDropDown.click();
        await page.click("//span[text()='Email']");

        let nextBttnStartAppPage = page.locator("//button[@type='submit']");
        await nextBttnStartAppPage.click();
    }

    static async completePaymentPlanStep(page){
        let upfrontPaymentPlan = page.locator("//mat-expansion-panel//span[@class='payment-type' and normalize-space()='Upfront']");
        await upfrontPaymentPlan.click();

        let activeNextButton = page.locator("//button[@class='next-button' and text()='Next']");
        await activeNextButton.click();
    }

}
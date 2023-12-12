import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page){
        this.page = page

        this.discountCode = page.frameLocator(('[data-qa="active-discount-container"]'))
                                .locator(('[data-qa="discount-code"]'))
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.activateDiscountBtn = page.locator('[data-qa="submit-discount-button"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.validUntilInput = page.locator('[data-qa="valid-until"]')
        this.creditCardCVCInput = page.locator('[data-qa="credit-card-cvc"]')
        this.payBtn = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        // Option 1 for laggy inputs: using .fill() with await expect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        // Option 1 for laggy inputs: slow typing
        // await this.discountInput.pressSequentially(code, { delay: 1000 })
        // expect(await this.discountInput.inputValue()).toBe(code)
        // await this.page.pause()
        
        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)

        await this.activateDiscountBtn.waitFor()
        await this.activateDiscountBtn.click() 
        await this.discountActiveMessage.waitFor()
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText()
        const discountValueOnlyString = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyString, 10)
        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyString = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyString, 10)

        expect(discountValueNumber).toBeLessThan(totalValueNumber)
    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.number)
        await this.validUntilInput.waitFor()
        await this.validUntilInput.fill(paymentDetails.validUntil)
        await this.creditCardCVCInput.waitFor()
        await this.creditCardCVCInput.fill(paymentDetails.cvc)
    }

    completePayment = async () => {
        await this.payBtn.waitFor()
        await this.payBtn.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
    }
}
import { expect } from "@playwright/test"

export class Checkout {
    constructor(page){
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveBtn = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        let justNumbers = allPriceTexts.map(element => {
            let withoutDollarSign = element.replace('$', '')
            return parseInt(withoutDollarSign, 10)
        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        let specificRemoveBtn = this.basketItemRemoveBtn.nth(smallestPriceIndex)
        await specificRemoveBtn.waitFor()
        await specificRemoveBtn.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutBtn.waitFor()
        await this.continueToCheckoutBtn.click()
        this.page.waitForURL(/\/login/, {timeout: 3000})
    }
}
import { test, expect } from "@playwright/test"

test.skip("Product Page Add To Basket", async ({ page }) => {
    await page.goto("/");

    let addToBasketBtn = page.locator('[data-qa="product-button"]').first();
    let basketCounter = page.locator('[data-qa="header-basket-count"]')
    
    await expect(basketCounter).toHaveText('0');

    await expect(addToBasketBtn).toHaveText("Add to Basket");
    
    await addToBasketBtn.click();

    await expect(basketCounter).toHaveText('1');

    await expect(addToBasketBtn).toHaveText("Remove from Basket");

    const checkoutLink = page.getByRole('link', { name: 'Checkout' })

    await checkoutLink.click()
    await page.waitForURL('/basket')
})
export class LoginPage {
    constructor(page){
        this.page = page

        this.registerBtn = page.locator('[data-qa="go-to-signup-button"]')
    }

    moveToSignUp = async () => {
        await this.registerBtn.waitFor()
        await this.registerBtn.click()
        this.page.waitForURL(/\/signup/, {timeout: 3000})
    }
}
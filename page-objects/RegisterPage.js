export class RegisterPage {
    constructor(page){
        this.page = page

        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.registerBtn = page.getByRole('button', { name: 'Register' })
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(password)
        await this.registerBtn.waitFor()
        await this.registerBtn.click()
    }
}
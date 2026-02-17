import { Page, Locator, expect } from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly txtusername: Locator;
    readonly txtpassword: Locator;
    readonly btnlogin: Locator;
    readonly lblSwagLabs: Locator;


    constructor(page:Page){
       this.page = page;
       this.txtusername = page.locator("//*[@id='user-name']");
       this.txtpassword = page.locator("//*[@id='password']");
       this.btnlogin = page.locator("//*[@id='login-button']");
       this.lblSwagLabs = page.locator("//*[@class='app_logo']");
    }

    async loadLoginPage (){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async logintoSystem(username: string, password: string){
        await this.txtusername.fill(username);
        await this.txtpassword.fill(password);
        await this.btnlogin.click();
    }

    async validateLoggedInPage(){
        await expect(this.lblSwagLabs).toBeVisible();
    }
}

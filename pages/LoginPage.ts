import { Page, Locator, expect } from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly txtusername: Locator;
    readonly txtpassword: Locator;
    readonly btnlogin: Locator;
    readonly lblSwagLabs: Locator;


    constructor(page:Page){
       this.page = page;
       this.txtusername = page.locator('#user-name');
       this.txtpassword = page.locator('#password');
       this.btnlogin = page.locator('#login-button');
       this.lblSwagLabs = page.locator('.app_logo');
    }

    //Navigate to website
    async loadLoginPage (){
        await this.page.goto('https://www.saucedemo.com/');
    }

    //Login to the system
    async logintoSystem(username: string, password: string){
        await this.txtusername.fill(username);
        await this.txtpassword.fill(password);
        await this.btnlogin.click();
    }

    //Validate LoggedIn page
    async validateLoggedInPage(){
        await expect(this.lblSwagLabs).toBeVisible();
    }
}

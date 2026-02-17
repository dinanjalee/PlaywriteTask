import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage.ts';

test('Verify Selected Product Details', async ({page})=>{
    const login = new LoginPage(page);
    const productlist = new ProductListPage(page);

    //Validate the User should be able to add an item to the cart
    await login.loadLoginPage();
    await login.logintoSystem("standard_user","secret_sauce");
    await login.validateLoggedInPage();

    await productlist.goToProductDetails("Sauce Labs Bike Light");
    //await productlist.validateProductDetailsVisible();
    await productlist.verifyProductDetails("Sauce Labs Bike Light","A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.","9.99")
})

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage.ts';

test('Add Items to Cart', async ({page})=>{
    const login = new LoginPage(page);
    const productlist = new ProductListPage(page);

    //Validate the User should be able to add an item to the cart
    await login.loadLoginPage();
    await login.logintoSystem("standard_user","secret_sauce");
    await login.validateLoggedInPage();
    
    await productlist.addItemToCart("Sauce Labs Bike Light");
    await productlist.verifyCartIcon();
    await productlist.verifyAddedItemInCart("Sauce Labs Bike Light");

})


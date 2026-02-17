import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage.ts';

test('Verify Selected Product Details', async ({page})=>{
    const login = new LoginPage(page);
    const productlist = new ProductListPage(page);

    await login.loadLoginPage();
    await login.logintoSystem("standard_user","secret_sauce");
    await login.validateLoggedInPage();

    await productlist.selectSortingMethod("za");
})

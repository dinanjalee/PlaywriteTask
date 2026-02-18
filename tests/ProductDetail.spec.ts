import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage';
import { LoginDetails } from '../test-data/LoginDetails';
import { ProductList } from '../test-data/ProductList';

test('Verify Selected Product Details', async ({page})=>{
    const login = new LoginPage(page);
    const productlist = new ProductListPage(page);

    //Validate user login to the system and loggedIn page
    await login.loadLoginPage();
    await login.logintoSystem(LoginDetails.username,LoginDetails.password);

    //Validate user can navigate to the product details page
    await productlist.goToProductDetails(ProductList[1].name);

    //Validate the display product details
    await productlist.verifyProductDetails(ProductList[1].name,ProductList[1].description,ProductList[1].price)
})

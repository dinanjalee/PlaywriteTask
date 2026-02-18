import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage';
import { LoginDetails } from '../test-data/LoginDetails';
import { ProductList } from '../test-data/ProductList';

test('Add Items to Cart', async ({page})=>{
    const login = new LoginPage(page);
    const productlist = new ProductListPage(page);

    //Login to the system
    await login.loadLoginPage();
    await login.logintoSystem(LoginDetails.username,LoginDetails.password);
    await login.validateLoggedInPage();

    //Validate the User should be able to add an item to the cart and display the added item count in cart icon
    await productlist.addItemListToCart([ProductList[0].name,ProductList[1].name]);
    await productlist.verifyItemCountDisplayInCartIcon(2);
    await productlist.navigateToCartPage();
    await productlist.verifyAddedItemListInCart([ProductList[0].name,ProductList[1].name]);
    await productlist.navigateBackToContinueShopping();

})


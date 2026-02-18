import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage';
import { LoginDetails } from '../test-data/LoginDetails';
import { SortList } from '../test-data/SortList';

test('Verify Selected Product Details', async ({page})=>{
    const login = new LoginPage(page);
    const productlist = new ProductListPage(page);

    //Validate user login to the system and loggedIn page
    await login.loadLoginPage();
    await login.logintoSystem(LoginDetails.username,LoginDetails.password);

    //Validate sort behaviour in product list page
    await productlist.sortproductListAndVerifySortBehaviour(SortList[3]);
})

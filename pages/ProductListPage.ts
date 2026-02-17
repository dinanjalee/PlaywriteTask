import { Page, Locator, expect } from '@playwright/test';

export class ProductListPage{
    readonly page: Page;
    readonly lblProductItems: Locator;
    readonly btnCart: Locator;
    readonly lblProductInCart: Locator;
    readonly btnContinueShopping: Locator;
    readonly lblproductNameinList: Locator;
    readonly productDetails: Locator;
    readonly imgProductImage: Locator;
    readonly lblProductName: Locator;
    readonly lblProductDescription: Locator;
    readonly lblProductprice: Locator;
    readonly ddSort: Locator;
    
    constructor(page:Page){
        this.page = page;     
        this.lblProductItems = page.locator('.inventory_item');
        this.btnCart = page.locator('#shopping_cart_container');
        this.lblProductInCart = page.locator('.cart_item');
        this.btnContinueShopping = page.locator('#continue-shopping');
        this.lblproductNameinList = page.locator('.inventory_item_name')
        this.productDetails = page.locator('#inventory_item_container');
        this.imgProductImage = page.locator('.inventory_details_img_container');
        this.lblProductName = page.locator('.inventory_details_name.large_size');
        this.lblProductDescription = page.locator('.inventory_details_desc.large_size');
        this.lblProductprice = page.locator('.inventory_details_price');  
        this.ddSort = page.locator('.product_sort_container');  
    }

    async addItemToCart(selectedProduct: string){
        const product = this.lblProductItems.filter( {hasText: selectedProduct});
        const button = product.locator('button');
        await button.click();
        await expect(button).toHaveText("Remove");
    }

    async verifyCartIcon(){
        await expect(this.btnCart).toHaveText("1");
    }

    async verifyAddedItemInCart(selectedProduct: string){
        await this.btnCart.click();
        await expect(this.lblProductInCart).toContainText(selectedProduct);
        await this.btnContinueShopping.click();
    }

    async goToProductDetails(selectedProduct: string){
        const item = this.lblproductNameinList.filter( {hasText: selectedProduct});
        await item.click();
    }

    async validateProductDetailsVisible() {
    await expect(this.productDetails).toBeVisible();
    }

    async verifyProductDetails(productName: string, productDescription: string, productPrice: string){
        await expect(this.lblProductName).toContainText(productName);
        await expect(this.lblProductDescription).toContainText(productDescription);
        await expect(this.lblProductprice).toContainText(productPrice);
        await expect(this.productDetails.locator('button')).toBeVisible;
    }

    async selectSortingMethod(selectedSort: string){
        //await this.ddSort.click();
        await this.ddSort.selectOption({value: selectedSort});
        await this.page.waitForTimeout(3000);
        const productlist = await this.lblproductNameinList.allTextContents();
        console.log(productlist)
        
        if (selectedSort === 'az'){
            const sortedProductlist = [...productlist].sort((a,b)=>a.localeCompare(b))
            console.log(sortedProductlist);
            expect(productlist).toEqual(sortedProductlist);
        }

        else if (selectedSort === 'za'){
            const sortedProductlist = [...productlist].sort((a,b)=>b.localeCompare(a))
            console.log(sortedProductlist);
            expect(productlist).toEqual(sortedProductlist);
        }

        else if (selectedSort === 'za'){
            const sortedProductlist = [...productlist].sort((a,b)=>b.localeCompare(a))
            console.log(sortedProductlist);
            expect(productlist).toEqual(sortedProductlist);
        }
        
        
    }
    
    
}
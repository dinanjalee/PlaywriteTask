import { Page, Locator, expect } from '@playwright/test';

export class ProductListPage{
    readonly page: Page;
    readonly lblProductItems: Locator;
    readonly btnCart: Locator;
    readonly lblProductInCart: Locator;
    readonly btnContinueShopping: Locator;
    readonly lblProductNameinList: Locator;
    readonly lblPriceinProductList: Locator;
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
        this.lblProductInCart = page.locator('.cart_list');
        this.btnContinueShopping = page.locator('#continue-shopping');
        this.lblProductNameinList = page.locator('.inventory_item_name');
        this.lblPriceinProductList = page.locator(".inventory_item_price");
        this.productDetails = page.locator('.inventory_details_container');
        this.imgProductImage = page.locator('.inventory_details_img');
        this.lblProductName = page.locator('.inventory_details_name');
        this.lblProductDescription = page.locator('.inventory_details_desc');
        this.lblProductprice = page.locator('.inventory_details_price');  
        this.ddSort = page.locator('.product_sort_container');  
    }

    /*
    //Add selected item to the cart and validate the button behaviour
    async addItemToCartandVerifyTheButton(selectedProduct: string){
        const product = this.lblProductItems.filter( {hasText: selectedProduct});
        const button = product.locator('button');
        if (await button.innerText() === "Add to cart"){
            await button.click();
            await expect(button).toHaveText("Remove");
            await this.page.waitForTimeout(3000);
        } else {
            console.log("Product is already added to the cart");
        }    
    }
    */
    //Verify count of the added item display in the cart icon
    async verifyItemCountDisplayInCartIcon(countOfItem: number){
        await expect(this.btnCart).toHaveText(countOfItem.toString());
    }
    
    //Add selected item/items to the cart and verify the button behaviour
    async addItemListToCart(productList: string[]){
        let addedProductCount = 0;
        for(const selectedproduct of productList){
            const product = this.lblProductItems.filter({hasText: selectedproduct});
            const button = product.locator('button')
                if (await button.innerText() === "Add to cart"){
                    await button.click();
                    await expect(button).toHaveText("Remove");
                    addedProductCount++;
                } else {
                    console.log("Product is already added to the cart");
                }
        }
        await this.verifyItemCountDisplayInCartIcon(addedProductCount);
    }
    
    //Navigate to Cart Page
    async navigateToCartPage(){
        await this.btnCart.click();
    }

    //Verify added items in the cart
    async verifyAddedItemListInCart(productList: string[]){
        let addedProductCount = 0;
        for (const product of productList){
            await expect(this.lblProductInCart).toContainText(product)
            console.log(product);
            addedProductCount++;
        }
    }

    //Navigate back to continue shopping
    async navigateBackToContinueShopping(){
        await this.btnContinueShopping.click();
    }

    //Navigate to product detail page
    async goToProductDetails(selectedProduct: string){
        const item = this.lblProductNameinList.filter( {hasText: selectedProduct});
        await item.click();
    }

    //Verify available product details 
    async verifyProductDetails(productName: string, productDescription: string, productPrice: string){
        await expect(this.lblProductName).toContainText(productName);
        await expect(this.lblProductDescription).toContainText(productDescription);
        await expect(this.lblProductprice).toContainText(productPrice);
        await expect(this.productDetails.locator('button')).toBeVisible();
        await expect(this.imgProductImage).toBeVisible();
    }

    async verifyProductDetailsinDetailPage(productDetails: string[]){

    }

    //seperate soritng method
    async sortproductListAndVerifySortBehaviour(selectedSort: string){
        await this.ddSort.selectOption({value: selectedSort});
        
        await this.page.waitForTimeout(3000);
        const productlist = await this.lblProductNameinList.allTextContents();

        const pricelist = await this.lblPriceinProductList.allTextContents();
        const numericpricelist = pricelist.map(price => parseFloat(price.replace('$','')));
        
        
        if (selectedSort === 'az'){
            console.log(productlist);
            const azsortedProductlist = [...productlist].sort((a,b)=>a.localeCompare(b))
            console.log(azsortedProductlist);
            expect(productlist).toEqual(azsortedProductlist);
        }
    
        else if (selectedSort === 'za'){
            console.log(productlist);
            const zasortedProductlist = [...productlist].sort((a,b)=>b.localeCompare(a))
            console.log(zasortedProductlist);
            expect(productlist).toEqual(zasortedProductlist);
        }

        else if (selectedSort === 'lohi'){
            console.log(pricelist);   
            const lohisortedPricelist = [...numericpricelist].sort((a,b)=>a-b)
            console.log(lohisortedPricelist);
            expect(numericpricelist).toEqual(lohisortedPricelist);
        }

        else if (selectedSort === 'hilo'){
            console.log(pricelist);   
            const lohisortedPricelist = [...numericpricelist].sort((a,b)=>b-a)
            console.log(lohisortedPricelist);
            expect(numericpricelist).toEqual(lohisortedPricelist);
        }

    }
    
    
}
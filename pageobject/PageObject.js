import { Page } from "@playwright/test";
import { HomeLocator } from "../pages/HomePage";
import ProductLocator from "../pages/ProductPage";

export class PageObject{
    constructor(page) {
        this.page=page;
        this.homeObj = new HomeLocator(page);
        this.productObj=new ProductLocator(page);
    }
    
}
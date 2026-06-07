import { expect } from '@playwright/test';
import {test} from '../fixtures/auth.fixtures'

test.describe.serial('User able to filter and add a item to cart', ()=>{
 test('Filter the items by price', async ({homePage})=>{
    await homePage.isLoggedIn();
    await homePage.filterItemByMinMax('0', '11500');
    expect(await homePage.getAllItemsCount()).toBe(2)
    await homePage.addToCart('ZARA COAT 3')
 })
})
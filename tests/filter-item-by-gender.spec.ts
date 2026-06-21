import {test} from '../fixtures/auth.fixtures'
import {expect} from '@playwright/test'


test.describe('Filter Item by gender', async()=>{
    test('Filter', async({homePage})=>{
        await test.step('Filter by gender Men', async()=>{
            await homePage.isLoggedIn();
            await homePage.checkFilterMen();
            await homePage.expectNoProductsFound();
            expect(await homePage.getAllItemsCount()).toBe(0)
            
        })

        await test.step('Filter by gender Women', async()=>{
            await homePage.isLoggedIn();
            await homePage.checkFilterWomen();
            await expect.poll(async () => await homePage.getAllItemsCount()).not.toBe(0);

    })
})
})
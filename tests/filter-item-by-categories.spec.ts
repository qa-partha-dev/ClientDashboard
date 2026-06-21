import {test} from '../fixtures/auth.fixtures'
import {expect} from '@playwright/test'

test.describe('Filter by Categories', async() => {
    test('Filter by Fashion', async({homePage}) => {
        await test.step('login', async()=>{
            await homePage.isLoggedIn();
        })
        await test.step('Check categories Fashion', async()=>{
        await homePage.checkFilterFashion();
        await homePage.expectNoProductsFound();
        expect.poll(async () => await homePage.getAllItemsCount()).not.toBe(0);
        })
})
})
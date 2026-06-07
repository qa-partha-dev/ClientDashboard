import {test} from '../fixtures/auth.fixtures'

test.describe.serial('', async ()=>{
    test.beforeEach('HomePage is displayed', async ({homePage})=>{
        homePage.isLoggedIn();
    })

    test('Search an item', async ({homePage})=>{
        await homePage.searchItemByName('ZARA COAT 3')
    })
})
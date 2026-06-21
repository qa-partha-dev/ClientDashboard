# Context: Buy Item Checkout Flow

## Locators Discovered
- **Place Order Button**: `.action__submit`
- **Success Message Panel**: `.hero-primary` (Expected text: "THANKYOU FOR THE ORDER.")
- **Order ID Locator**: `.em-spacer-1 .ng-star-inserted` (Format is `| 6a24e6c317ee3e78bac2423d |`)
- **Orders Dashboard Link**: `button[routerlink*='myorders']`
- **Orders Table**: `tbody tr` (Match ID in text, button text "View")
- **Order Details Page Check**: URL contains `/dashboard/order?prop=`
- **Order Details Items**: `.title`
# Plan: Complete "Checkout and buy two products"

1. **Submit Order**: 
   - Click the "Place Order" button (`.action__submit`).
2. **Verify Order Status**:
   - Wait for the `.hero-primary` text block to display "THANKYOU FOR THE ORDER.".
3. **Capture Order ID**:
   - Extract the generated Order ID text from `.em-spacer-1 .ng-star-inserted`.
   - Trim and strip the pipe characters (`|`).
4. **Navigate to Order History**:
   - Click the "Orders" dashboard link (`button[routerlink*='myorders']`).
   - Wait for `tbody tr` items to load.
5. **Verify Order in Dashboard**:
   - Filter rows by the extracted Order ID.
   - Assert the row is visible.
   - Click "View" on the matched row.
6. **Verify Order Details**:
   - Assert page transitions to `/dashboard/order?prop=...` structure.
   - Assert the items added initially appear in `.title` nodes on the details page.
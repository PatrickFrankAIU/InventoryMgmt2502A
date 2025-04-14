![image](https://github.com/PatrickFrankAIU/GradeManagerProject/assets/134087916/b5d814bf-e38f-456f-8f9c-cb5a98fb52fa)

# InventoryMgmt2502A
Inventory Manager project for ITWEB 220 students, term 2502A. 

This page is hosted on GitHub Pages. To view the page, click here:
https://patrickfrankaiu.github.io/InventoryMgmt2502A/

Results from Last Term: 
https://github.com/PatrickFrankAIU/InventoryMgmt2501A

Here's an image showing the completed page without CSS: 
![image](https://github.com/user-attachments/assets/7df5e498-9b7c-40e0-888d-7ab86f6b1481)


V1.0 -- Added these global variables as const's:

const categoryMenu = document.getElementById('categoryInput');
const productMenu = document.getElementById('productInput');
const inventoryDisplay = document.getElementById('inventoryDisplay');
const shipmentDisplay = document.getElementById('shipmentDisplay');
const orderDisplay = document.getElementById('orderDisplay');
const newCategoryInput = document.getElementById('newCategoryInput');
const quantityInput = document.getElementById('quantityInput');

V1.1

-added min and max to quantity input in html (doesn't work yet)
-added pattern to new category input in html (doesn't work yet)
-added check to javascript for quantity input to check if a positive number is added and to alert if not
-added check to javascript to check if sufficient quantities are available in inventory when an order amount is entered and to alert if the stock is insufficient to prevent negative product quantities
-shortened functions that had getElementById with the corresponding global variables

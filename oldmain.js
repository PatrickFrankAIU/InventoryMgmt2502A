let inventory = [
    {
        category: 'Fruits',
        products: [
            { product: 'Apples', quantity: 10 },
            { product: 'Bananas', quantity: 5 },
            { product: 'Oranges', quantity: 8 },
        ]
    },
    {
        category: 'Vegetables',
        products: [
            { product: 'Tomatoes', quantity: 15 },
            { product: 'Carrots', quantity: 12 },
            { product: 'Peppers', quantity: 9 },
        ]
    }
];
// IT MIGHT BE CLEARER TO GIVE THESE VARIABLES THE SAME NAMES AS THE IDs
// global variables
let categoryMenu = document.getElementById('categoryInput');
let productMenu = document.getElementById('productInput');
let shipment = [];
let order = [];

// display the inventory 
function displayInventory() {
    // get inventory display HTML element and store it in a variable
    let inventoryDisplay = document.getElementById('inventoryDisplay');
    inventoryDisplay.innerHTML = '';

    // iterate through inventory and create HTML to display
    inventory.forEach(category => {
        // itemGroup contains ONE category and its item list
        let itemGroup = document.createElement('div'); 
        itemGroup.innerHTML = "<strong>" + category.category + ":" + "</strong>";
        category.products.forEach(product => {
            //itemGroup.innerHTML += "<div>" + product.product + "</div>";
            itemGroup.innerHTML += "<div>" + product.product + ": " + product.quantity + "</div>";
        });
        inventoryDisplay.appendChild(itemGroup);
    });
}

// RAY  THE CATEGORY FUNCTION WORKS. HOWEVER IT IS MORE OF A PRODUCT LEVEL ITEM THAT FUNCTIONS AS A CATEGORY. IT HAS NO ACCOCIATED KEY: VALUES, SO IT DOESN'T FIT WITH THIS MENU. SUGGEST REMOVING IT OR CREATE WAY TO ADD KEY: VALUES.

function createCategories() {
    // this function populates the Category drop-down
    // works by building a collection of <option> tags for the products
    inventory.forEach(category => {
        let categoryOption = document.createElement("option");
        categoryOption.value = category.category;
        categoryOption.textContent = category.category;
        categoryMenu.appendChild(categoryOption);
    });
    
}

function createProducts() {
    productMenu.innerHTML = '';
    let selectedCategory = inventory.find(category => category.category === categoryMenu.value);
    if (selectedCategory) {
        selectedCategory.products.forEach(product => {
            let productOption = document.createElement('option');
            productOption.value = product.product;
            productOption.textContent = product.product;
            productMenu.appendChild(productOption);
        });
    }
}
categoryMenu.addEventListener('change', createProducts);

// RAY  AGAIN, THE LACK OF PRODUCTS HERE IS A LITTLE ODD FOR THE USER



// RAY  WE SHOULD PREVENT NUMBERS GOING TO NEGATIVE, OR AT LEAST ADD AN ALERT.

// RAY  AGREED, THIS FUNCTION ADDS CATEGORY BUT NOT PRODUCT. CONFUSING. WE LIKELY NEED TO ADD A 'NEW PRODUCT' FIELD IF WE WANT THIS SYSTEM TO WORK.

function addNewCategory() {
    // this function adds a new category to the inventory (but not products)
    let newCategoryInput = document.getElementById('newCategoryInput').value;
    if (newCategoryInput) {
        inventory.push({
            category: newCategoryInput,
            products: []
        });
        // the code below adds the new category to the category dropdown list 
        let categoryOption = document.createElement('option');
        categoryOption.value = newCategoryInput;
        categoryOption.textContent = newCategoryInput;
        categoryMenu.appendChild(categoryOption);
        document.getElementById('newCategoryInput').value = '';
        displayInventory();
    }
}
document.getElementById('addCategoryButton').addEventListener('click', addNewCategory);

function addShipment() {
    // this code adds a shipment (incoming new inventory)
    // do we really need these first two variables? (same as the globals but with .value)

    // RAY  AGREED, USE GLOBAL VARIABLES, BUT WITH THOSE RENAMED TO THE IDs

    let categoryInput = document.getElementById('categoryInput').value;
    let productInput = document.getElementById('productInput').value;
    let quantityInput = parseInt(document.getElementById('quantityInput').value); // for qty

    let category = inventory.find(cat => cat.category === categoryInput);

// RAY  AGREED, SINCE THE CATEGORY IS A DROPDOWN, (!category) WILL NEVER BE UNDEFINED

    if (!category) { // check: Why is this "not"? 
        category = { category: categoryInput, products: [] };
        inventory.push(category);
    }

    let product = category.products.find(prod => prod.product === productInput);
    if (product) {
        product.quantity += quantityInput;
    } else {

// RAY  THIS LINE HAS A SMALL ERROR FOR QUANTITY. IT NEEDS TO BE 'QUANTITY: QUANTITYINPUT'. THIS FIXES THE FOLLOWING ISSUE:
//RAY  WHEN WE CREATE A CATEGORY, AND THEN SELECT IT WITH THE CATEGORY DROPDOWN AND ADD A QUANTITY, WE ARE NOT ABLE TO ADD IT TO THE SHIPMENT LIST DIRECTLY, ONLY TO ORDERS. HOWEVER, WE NEED TO HAVE IT SHIPPED IN BEFORE PEOPLE CAN ORDER IT. ALSO, AFTER THE USER PRESSES THE ADD ORDER BUTTON, THEN THE SHIPMENT BUTTON WORKS FOR ADDED CATEGORIES.
        category.products.push({ product: productInput, quantity, quantityInput });
    }

    let shipCategory = shipment.find(cat => cat.category === categoryInput);
    if (!shipCategory) {
        shipCategory = { category: categoryInput, products: [] };
        shipment.push(shipCategory);
    }

    let shipProduct = shipCategory.products.find(prod => prod.product === productInput);
    if (shipProduct) {
        shipProduct.quantity += quantityInput;
    } else {
        shipCategory.products.push({ product: productInput, quantity: quantityInput });
    }

    displayInventory();
    displayShipment();
}

function displayShipment() {
    let shipmentDisplay = document.getElementById('shipmentDisplay');
    shipmentDisplay.innerHTML = '';
    shipment.forEach(category => {
        let categoryEl = document.createElement('div');
        categoryEl.innerHTML = "<strong>" + category.category + ": " + "</strong>";
        category.products.forEach(product => {
            categoryEl.innerHTML += "<div>" + product.product + ": " +
                product.quantity + "</div>";
        });
        shipmentDisplay.appendChild(categoryEl);
    });
}

function addOrder() {
    let categoryInput = document.getElementById('categoryInput').value;
    let productInput = document.getElementById('productInput').value;
    let quantityInput = parseInt(document.getElementById('quantityInput').value);

    let category = inventory.find(cat => cat.category === categoryInput);
    if (!category) {
        category = {category: categoryInput, products: []};
    }

    let product = category.products.find(prod => prod.product === productInput);
    if (product) {
        product.quantity -= quantityInput;
    } else {

    // RAY  WE SHOULD DO MORE THAN DISPLAY THE NEAGATIVE QUANTITY. PERHAPS ADD ALERT. PERHAPS PREVENT: ORDERS > SHIPMENTS.


        category.products.push({product: productInput, quantity: -quantityInput});
    }

    let orderCategory = order.find(cat => cat.category === categoryInput);
    if (!orderCategory) {
        orderCategory = {category: categoryInput, products: []};
        order.push(orderCategory);
    }

    let orderProduct = orderCategory.products.find(prod => prod.product === productInput);
    if (orderProduct) {
        orderProduct.quantity += quantityInput;
    } else {
        orderCategory.products.push({product: productInput, quantity: quantityInput});
    }

    displayInventory();
    displayOrder();
}


function displayOrder() {
    let orderDisplay = document.getElementById('orderDisplay');
    orderDisplay.innerHTML = '';
    order.forEach(category => {
        let categoryEl = document.createElement('div');
        categoryEl.innerHTML = "<strong>" + category.category + "</strong>";
        category.products.forEach(product => {
            categoryEl.innerHTML += "<div>" + product.product + ": " + product.quantity + "</div>";
        });
        orderDisplay.appendChild(categoryEl);
    });
}


displayInventory();
createCategories();

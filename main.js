// array that holds the inventory data
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

// global variables
// rename instances of category to "productCategory"
// rename instances of productMenu to "productsMenu"
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
        itemGroup.innerHTML += "<div>" + product.product + ": " + product.quantity + "</div>";
        });
        inventoryDisplay.appendChild(itemGroup);
    });
}

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
    // this function populates the Product drop-down
    // works by building a collection of <option> tags for the products
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

function addNewCategory() {
    // this function adds a new category to the inventory (but not products)
    let newCategoryInput = document.getElementById('newCategoryInput').value;
    if (newCategoryInput) {
        inventory.push({
            category: newCategoryInput,
            products: []
        });
        // the code below adds the new category to the category dropdown list
        // from a user perspective, they may think of the product first and category 2nd. Change this to add a new product and then prompt them to add to an existing category or add the new product under a new category 
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
        //remove first two variables and replace with instances of categoryInput and productInput with categoryInput.value and productInput.value
        // make quantityInput a global value and replace instances of quantityInput with quantityInput.value
        // quantityInput must also accept positive whole numbers as well and display an error message to provide a number if a number is not the input
        // if the user doesn't alter the quantity, nan will output to inventory, order total, and shipment total
    let categoryInput = document.getElementById('categoryInput').value;
    let productInput = document.getElementById('productInput').value;
    let quantityInput = parseInt(document.getElementById('quantityInput').value); // for qty

    // this searches the inventory array to ensure the object has a category property that matches the categoryInput. If found it returns it to the category variable. 
    let category = inventory.find(cat => cat.category === categoryInput);
    // this appears to provide a way to add a new category if it's not found but we already have this fuction separately and isn't possible to do through the dropdown.
    if (!category) { // check: Why is this "not"? 
        category = { category: categoryInput, products: [] };
        inventory.push(category);
    }

    // this searches the products array to ensure the object has a category property that matches the productInput and if it does,lets you add the amount of product the user specifies through quantityInput
    let product = category.products.find(prod => prod.product === productInput);
    if (product) {
        product.quantity += quantityInput;
    } else {
        // may be redundant if adding product is done in another function. or if this is still used, modify with 
        // quantity: quantityInput instead
        category.products.push({ product: productInput, quantity, quantityInput });
    }
      // this searches the shipment array to ensure the object has a category property that matches the categoryInput. If found it returns it to the category variable. 
    let shipCategory = shipment.find(cat => cat.category === categoryInput);
    if (!shipCategory) { // if the category isn't found it creates a new category object and adds it (may be redundant)
        shipCategory = { category: categoryInput, products: [] };
        shipment.push(shipCategory);
    }

      // this searches the products array to ensure the object has a product property that matches the productInput and if it does,lets you add the amount of product the user specifies through quantityInput that affects the shipment array
    let shipProduct = shipCategory.products.find(prod => prod.product === productInput);
    if (shipProduct) {
        shipProduct.quantity += quantityInput;
    } else {
        shipCategory.products.push({ product: productInput, quantity: quantityInput });
    }

    displayInventory();
    displayShipment();
}

// this outputs the shipments displayed as products associated with categories and the quantities selected each time the add shipment button is clicked and will continue to update the quantity, categories, and products added.
// there is no method to remove or cancel shipments
// differentiate categories in the output through color or other display method
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

// this function combines the selected values from the product array and quantity input to place outgoing orders
// if there is nothing selected in the category dropdown, it adds a NAN under fruits category
function addOrder() {
    // make these global variables
    let categoryInput = document.getElementById('categoryInput').value;
    let productInput = document.getElementById('productInput').value;
    let quantityInput = parseInt(document.getElementById('quantityInput').value);

    // the code here does that same thing as addShipment but with effects to the order array instead
    let category = inventory.find(cat => cat.category === categoryInput);
    if (!category) { //replace with a createNewProduct function
        category = { category: categoryInput, products: [] };
    }

    let product = category.products.find(prod => prod.product === productInput);
    if (product) {
        product.quantity -= quantityInput;
    } else { //replace with a createNewProduct function
        category.products.push({ product: productInput, quantity: -quantityInput });
    }

    let orderCategory = order.find(cat => cat.category === categoryInput);
    if (!orderCategory) { //replace with a createNewProduct function
        orderCategory = { category: categoryInput, products: [] };
        order.push(orderCategory);
    }

    let orderProduct = orderCategory.products.find(prod => prod.product === productInput);
    if (orderProduct) {
        orderProduct.quantity += quantityInput;
    } else { //replace with a createNewProduct function
        orderCategory.products.push({ product: productInput, quantity: quantityInput });
    }

    displayInventory();
    displayOrder();
}

// does the same thing as displayShipment but in a different div that shows under "Orders"
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

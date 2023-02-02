let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'long Logo 1 with no background',
        tag: 'longlogo1',
        price: 1500,
        inCart: 0
    },
    {
        name: 'long Logo 2 with no background too meheehehe',
        tag: 'longlogo2',
        price: 1300,
        inCart: 0
    },
    {
        name: 'Logo 3 with no background also',
        tag: 'longlogo3',
        price: 1800,
        inCart: 0
    },
    {
        name: 'Logo 4 with no background again hehehe',
        tag: 'longlogo4',
        price: 1900,
        inCart: 0
    }
]


for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else  {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    
    let cartItems =localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are", cartItems);
    
    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1;
    } else {
        product.inCart = 1;

        cartItems ={
            [product.tag]: product
        }
    }


    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log("The product price is", product.price);
    
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is ",  cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}



function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");

    let cartCost = localStorage.getItem('totalCost');

    


    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <i class="bi bi-trash3-fill"></i>
                    <img src=${item.tag}.png>
                    <span>${item.name}</span>
                </div>

                <div class="price">$${item.price}.00</div>

                <div class="quantity"> 
                    <i class="bi bi-caret-left-square"></i>
                    <span>${item.inCart}</span>

                    <i class="bi bi-caret-right-square"></i>

                </div>

                <div class="total">
                    $${item.inCart * item.price}.00
                </div>
            `;

           

        });

 
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Cart Total
                </h4>
                <h4 class="basketTotal">
                    $ ${cartCost}.00
                </h4>
            </div>
        `;  
        


    }

    

}

onLoadCartNumbers();
displayCart();
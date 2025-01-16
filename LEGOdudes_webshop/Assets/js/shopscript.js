console.log(products)

//Gå gjennom alle producter, generere HTML for hvert produkt, skrive dette til index.html

//En variabel som kan holde på HTML-en for produktene
let productHTML = ""

products.map((product, index) => productHTML += 
            `<article class="product-card">
                <img src="Assets/website_images/PROD_${product.imagefile}" alt="PRODUKTTITTEL" />
                <a href="#KATEGORISIDE">Ninjago</a>
                <h3>${product.title}</h3>
                <p>Kr. ${product.price},-</p>
                <button onclick="addProductToCart(${product.prodid})">Legg i handlekurv</button>
            </article>`)

//Finn #productlist, og fyll den med verdiene i variabelen productHTML
document.getElementById("productlist").innerHTML = productHTML

// LAge toggel funksjonalitet for handlevogn
document.getElementById("shoppingcart").addEventListener("click", function(){
    document.getElementById("cart").classList.toggle("visible");

})

// Lage addProductToCart
function addProductToCart(prodid){
    console.log("Du vil legge til productid " + prodid)
    // bruk .some for å skjekke om productid allerede finnes i cart
    const idExistes = cart.some(cartprod => cartprod.cartprodid === prodid) // gir resutat true eller false
    if(idExistes){
        // Oppdatere dette produktetes quentity
        // Først finne indexen til denne ID-en
        const index = cart.findIndex(p => p.cartprodid === prodid)
        // Så: Oppdatere riktig quentity
        cart[index].quantity++;
    }else{
        cart.push({cartprodid: prodid, quantity: 1})
    }
    printCart();
    console.log(cart)
}

// LAge en funksjon som skriver ut oppdatert version av handlevogn
function printCart() {
    // Starte me en tom variable vi kan fylle med HTML
    let cartHTML = ""
    // Gå gjennom cart-arrayen og generer HTML for hvert produkt:

    //LAg klar variable for pris:
    let cartTotal = 0;
    // LAg variable for antall produkter
    let cartNummer = 0;
    cart.map((cartprod, index) => {
        const currentProduct = products.findIndex(p => p.prodid === cartprod.cartprodid);
        const currentProductInfo = products[currentProduct]
        cartHTML += `<article class="cart-product">
                    <span class="title">${currentProductInfo.title}</span>
                    <span class="price">${currentProductInfo.price}</span>
                    <span class="quantity">x<span class="quantity-number">${cartprod.quantity}</span></span>
                    <button class="delete">x</button>
                </article>`
            //Regn ut totalsum:
            cartTotal += currentProductInfo.price * cartprod.quantity;
            // Regn ut abtall producter:
            cartNummer += cartprod.quantity
    })
    // Skrive ut generert HTML til index-file:
    document.getElementById("cart-products").innerHTML = cartHTML
    // Skrive ut totalpris:
    document.getElementById("cart-total").innerHTML = cartTotal;
    // Skriv ut antall producter
    document.getElementById("cartcount").innerHTML = cartNummer
 } 
 printCart();
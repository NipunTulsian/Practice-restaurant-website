if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready();
}

function ready() {
    updateCartTotal();

    var removebutton = document.getElementsByClassName("remove-button");
    for (let i = 0; i < removebutton.length; i++) {
        let currbutton = removebutton[i];
        currbutton.addEventListener("click", removeRow);
    }

    var formbutton = document.getElementsByClassName("cart-input-form");
    for (let i = 0; i < formbutton.length; i++) {
        let currbutton = formbutton[i];
        currbutton.addEventListener("change", changeform);
    }

    var addbutton = document.getElementsByClassName("addtocart-button");
    for (let i = 0; i < addbutton.length; i++) {
        var currbutton = addbutton[i];
        currbutton.addEventListener('click', addtocartClicked);
    }

    var purchaseButton=document.getElementsByClassName("purchase")[0];
    purchaseButton.addEventListener("click",purchasefunction);

}
function purchasefunction(){
    let cart = document.getElementsByClassName("cart")[0];
    let cartTable = cart.getElementsByTagName("table")[0];
    if(cartTable.rows.length==1){
        alert("Please put items in cart");
        return;
    }
    let productArray=[];
    let priceArray=[];
    let srcArray=[];
    let quantityArray=[];
    let cartRows=cartTable.getElementsByTagName("tr");
    for(let i=1;i<cartRows.length;i++)
    {
        let src_product=(cartRows[i].getElementsByTagName("img")[0]).src;
        let quantity_product=(cartRows[i].getElementsByClassName("cart-input-form")[0]).value;
        let price_product=(cartRows[i].getElementsByClassName("item-price")[0]).innerText;
        let title_product=(cartRows[i].getElementsByClassName("item-title")[0]).innerText;
        productArray.push(title_product);
        priceArray.push(price_product);
        srcArray.push(src_product);
        quantityArray.push(quantity_product);
    }
    let totalPrice=(document.getElementsByClassName("totalPrice")[0]).innerText;
    let object={
        "products":productArray,
        "src_product":srcArray,
        "quantity_product":quantityArray,
        "price_product":priceArray,
        "totalPrice":totalPrice
    }
    alert("Thank you for Shoping");
    while(cartTable.rows.length>1){

        cartTable.deleteRow(1);
    }
    updateCartTotal();
}

function addtocartClicked(e) {
    let addbuttonclicked = e.target;
    let parent = addbuttonclicked.parentElement.parentElement;

    let image = (parent.parentElement.getElementsByClassName("card-img-top")[0]).src;
    let title = (parent.getElementsByClassName("card-title")[0]).innerText;
    let price = (parent.getElementsByClassName("product-price")[0]).innerText;
    addtocart(image, title, price);
}

function addtocart(image, title, price) {
    let cart = document.getElementsByClassName("cart")[0];
    let cartTable = cart.getElementsByTagName("table")[0];
    let cartRows= cartTable.getElementsByTagName("tr");
    for(let i=1;i<cartRows.length;i++)
    {
        let currRow=cartRows[i];
        let infoElement=currRow.getElementsByClassName("cart-info")[0];
        let titleElement=(infoElement.getElementsByTagName("p")[0]).innerText;
        if(titleElement==title)
        {
            alert("Item already added to cart");
            return;
        }
    }
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    cell1.innerHTML = `<div class="cart-img flex">
                        <img src="${image}">
                        <div class="cart-info">
                            <p class="item-title">${title}</p>
                            <p class="item-price"style="opacity:0.8;">Price: ${price}</p>
                        </div>
                    </div>`;
    cell2.innerHTML = `<input class="cart-input-form"type="number" value="1">
                    <button class="remove-button"> Remove</button>`;
    cell2.classList.add("quantity");
    cell3.innerHTML = `${price}`;
    cell3.classList.add("subtotal");
    row.append(cell1)
    row.append(cell2);
    row.append(cell3);
    cartTable.append(row);
    updateCartTotal();
    (row.getElementsByClassName("remove-button")[0]).addEventListener("click",removeRow);
    (row.getElementsByClassName("cart-input-form")[0]).addEventListener("change",changeform);
}


function changeform(e) {
    var formchanged = e.target;
    if (formchanged.value == "") {
        console.log("aaa");
        formchanged.value = 1;
        alert("Enter a Valid Number");
    }
    else if (parseFloat(formchanged.value) <= 0) {
        formchanged.parentElement.parentElement.remove();
    }
    else {
        updateCartTotal();
    }
}

function removeRow(e) {
    console.log("aaaa");
    var buttonclicked = e.target;
    buttonclicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal() {
    var cart = document.getElementsByClassName("cart")[0];
    var cartRow = cart.getElementsByTagName("tr");
    let subtotalPrice = 0, totalQuantity = 0;
    for (let i = 1; i < cartRow.length; i++) {
        let currRow = cartRow[i];
        var priceElement = currRow.getElementsByClassName("item-price")[0];
        var price = parseFloat(priceElement.innerText.replace("Price: $", ""));
        var quantityElement = currRow.getElementsByClassName("quantity")[0];
        quantityElement = quantityElement.getElementsByTagName("input")[0];
        var quantity = parseFloat(quantityElement.value);
        totalQuantity += quantity;
        subtotalPrice += (price * quantity);
        (currRow.getElementsByClassName("subtotal")[0]).innerHTML = '$' + (price * quantity);
    }

    let tax = 0.1 * subtotalPrice;
    let totalPrice = tax + subtotalPrice;
    let subtotalElement = document.getElementsByClassName("subtotalCart")[0];

    subtotalElement.innerHTML = '$' + subtotalPrice;
    let taxElement = document.getElementsByClassName("tax")[0];
    taxElement.innerHTML = '$' + tax;
    let totalElement = document.getElementsByClassName("totalPrice")[0];
    totalElement.innerHTML = '$' + totalPrice;
    let navbarCarttotal = document.getElementById("navbar-cart");

    navbarCarttotal.innerHTML = totalQuantity + " Items - " + "($" + totalPrice + ")";
}

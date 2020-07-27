if(document.readyState == "loading"){
	document.addEventListener("DOMContentLoaded", ready)
}else{
	ready()
}

function ready(){
	var removeCartItem = document.getElementsByClassName("btn-danger")
	for(var i = 0; i < removeCartItem.length; i++){
		var button = removeCartItem[i]
		button.addEventListener('click', function(event){
			var buttonClicked = event.target
			buttonClicked.parentElement.parentElement.remove()
			updateCartTotal()
		})
	}

	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for (var i = 0; i < quantityInputs.length; i++){
		var input = quantityInputs[i].addEventListener('change', quantityChanged)
	}

	var addTOCartButtons = document.getElementsByClassName('fa fa-shopping-cart')
	for (var i = 0; i < addTOCartButtons.length; i++){
		var button = addTOCartButtons[i]
		button.addEventListener('click', addToCartClicked)
	}

	document.getElementsByClassName("btn-purchase")[0].addEventListener('click', purchaseCLicked)
}

function purchaseCLicked(){
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	var total = 0
	var s,t,q = 0;
	for (var i = 0; i < cartRows.length; i++){
		var cartRow = cartRows[i]
		var priceE = cartRow.getElementsByClassName("cart-price")[0]
		var quantityE = cartRow.getElementsByClassName("cart-quantity-input")[0]
		var size = cartRow.getElementsByClassName('cart-size-input')[0]
		var tit = cartRow.getElementsByClassName('cart-item-title')[0]

		s = size.value
		t = tit.innerText
		q = quantityE.value

		var price = parseFloat(priceE.innerText.replace("Rs. ", ""))
		var quantity = quantityE.value
		total = total + (price * quantity)
	}
	total = Math.round(total)
	alert("You have ordered " + q + " " + t + " of size " + s + " and the total is Rs. " + total)
	var cartItems = document.getElementsByClassName('cart-items')[0]
	while (cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartTotal()
}

function quantityChanged(event){
	var input = event.target
	if (isNaN(input.value) || input.value <= 0){
		input.value = 1
	}
	updateCartTotal()
}

function addToCartClicked(event){
	var button = event.target
	var shopItem = button.parentElement.parentElement.parentElement
	var title = shopItem.getElementsByClassName("prod-name")[0].innerText
	var price = shopItem.getElementsByClassName("prod-cost")[0].innerText
	var imageSrc = shopItem.getElementsByClassName("prod-image")[0].src
	console.log(title, price, imageSrc)
	addItemToCart(title, price, imageSrc)
	updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
	var cartRow = document.createElement("div")
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName("cart-items")[0]
	var cartItemnames = cartItems.getElementsByClassName("cart-item-title")
	for (var i = 0; i < cartItemnames.length; i++){
		if(cartItemnames[i].innerText == title){
			alert("This item is already added to the cart")
			return
		}
	}
	var cartRowContents = `
		<div class="cart-item cart-column">
			<img class="cart-item-image" src = "${imageSrc}" width="100" height="100">
			<span class="cart-item-title">${title}</span>
		</div>
		<span class="cart-item cart-column">
			<input class="cart-size-input" type="text">
	  	</div>
		</span>
		<span class="cart-price cart-column">${price}</span>
		<div class="cart-quantity cart-column">
			<input class="cart-quantity-input" type="number" value="1">
			<button class="btn btn-danger" type="button">REMOVE</button>
		</div>`
	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName("btn-danger")[0].addEventListener('click', function(event){
		var buttonClicked = event.target
		buttonClicked.parentElement.parentElement.remove()
		updateCartTotal()
	})
	cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('click', quantityChanged)
}

function updateCartTotal(){
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	var total = 0
	for (var i = 0; i < cartRows.length; i++){
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName("cart-price")[0]
		var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
		
		var price = parseFloat(priceElement.innerText.replace("Rs. ", ""))
		var quantity = quantityElement.value
		total = total + (price * quantity)
	}
	total = Math.round(total)
	document.getElementsByClassName('cart-total-price')[0].innerText = "Rs. " + total
}
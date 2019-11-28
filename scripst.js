function getByValue(arr, value) {

	for (var i = 0, iLen = arr.length; i < iLen; i++) {

		if (arr[i].name == value) return arr[i];
	}
}
function getIndex(arr, value) {

	for (var i = 0, iLen = arr.length; i < iLen; i++) {

		if (arr[i].name == value) return i;
	}
}
var click = 0;
var cart_index = 0;
var goods_arr = [];
var $cart_item = {};
var total = 0;
var total_price = $(`<div class = 'total-price'></div>`);
var total_currency = $(`<div class = 'total-currency'>UAH</div>`);
$(document).ready(function () {
	$(".basket-img").click(function () {
		$(".goods-cart").toggle(function () {
			$(".goods-cart").animate({
				opacity: 1
			}, 500);
		});
	});
	$(".dropdown-menu").each(function () {
		var $dropdown = $(this);

		$(".drop-button", $dropdown).click(function (e) {
			var $div = $(".dropdown-content", $dropdown);
			$div.toggle();
			$(".dropdown-content").not($div).hide();
		});
	});
	$(document).click(function (e) {
		if (!e.target.matches(".drop-button")) {
			$(".dropdown-content").hide();

		}
	});

	$(".buy-button").click(function () {
		// $(".goods-cart").css("display"," block");
		$(".cart-wrapper").css("display", "none");
		$(".cart-total-price").css("display", "flex");
		$(".cart-total-price").append(total_price);
		$(".cart-total-price").append(total_currency);
		click++;
		$(".counter").css("display", "block").text(click);


		//create an object which will contains good information; 
		$cart_item = new Object();

		var name = $(this).siblings(".goods-name").text();
		var price = parseInt($(this).siblings(".goods-price").children(".price").text());
		//we check if the good is already present in the busket. If it not exist we add it to a basket
		//if it already present, we inc the quantity of this good
		console.log(getByValue(goods_arr, name));
		if (getByValue(goods_arr, name) == undefined) {
			$cart_item = {
				name: name,
				price: price,
				quantity: 1
			};

			//create the new cart for a new good in the busket;
			var $cart = $('<div class = "cart_item"></div>');
			var inc_btn = $('<div class="inc-btn">+</div>');
			var dec_btn = $('<div class="dec-btn">-</div>');
			var item_quantity = $('<input class="item-count" ></input>');
			var rem_icon = $('<a class="remove-btn"> <div class="rem-img"></div> </a>');
			var pr_cont = $("<div class='cont'></div>");
			pr_cont.append(inc_btn);
			pr_cont.append(item_quantity);
			pr_cont.append(dec_btn);
			item_quantity.attr("value", $cart_item.quantity)
			//push this object to array if it doesn't exist in array
			goods_arr.push($cart_item);
			// var cart_index = getIndex(goods_arr, name);
			//append a div, which will contain good properties;
			//append good properties to a cart in the busket
			$(this).parent().siblings(".goods-image").children().clone().removeClass("tile-img").addClass("cart-img").appendTo($cart);
			$(this).siblings(".goods-name").clone().addClass("cart-goods-name").appendTo($cart);
			$(this).siblings(".goods-price").children(".price").clone().addClass("cart-goods-price").appendTo(pr_cont);
			$(this).siblings(".goods-price").children(".currency").clone().addClass("cart-goods-currency").appendTo(pr_cont);
			pr_cont.append(rem_icon);
			pr_cont.appendTo($cart);
			$(".goods-container").append($cart);
			// inc_btn.appendTo($cart);
			// document.body.appendChild(inc_btn);
			// dec_btn.appendTo($cart);

		} else {
			cart_index = getIndex(goods_arr, name);
			getByValue(goods_arr, name).quantity++;
			$(".item-count").eq(cart_index).val(getByValue(goods_arr, name).quantity);
			// price *= getByValue(goods_arr, name).quantity;
			$(".cart-goods-price").eq(cart_index).text(price * getByValue(goods_arr, name).quantity);
		}
		// item_price.push(parseInt($(".cart-goods-price").eq(cart_index).text()));
		total += price;
		$(".total-price").text(total);
	});





	$(".goods-cart").on("click", ".inc-btn", function (event) {
		click++;
		$(".counter").text(click);
		var name = $(this).parent().siblings(".goods-name").text();
		var price = parseInt(getByValue(goods_arr, name).price);
		getByValue(goods_arr, name).quantity++;
		$(this).siblings(".item-count").val(getByValue(goods_arr, name).quantity);
		$(this).siblings(".cart-goods-price").text(price * getByValue(goods_arr, name).quantity);
		total += price;
		$(".total-price").text(total);
		console.log(goods_arr);

	});

	$(".goods-cart").on("click", ".dec-btn", function (event) {
		var name = $(this).parent().siblings(".goods-name").text();
		var price = parseInt(getByValue(goods_arr, name).price);
		var a = getByValue(goods_arr, name).quantity + 1;
		if (getByValue(goods_arr, name).quantity > 1) {
			click--;
			getByValue(goods_arr, name).quantity--;

		}
		$(".counter").text(click);
		$(this).siblings(".item-count").val(getByValue(goods_arr, name).quantity);
		$(this).siblings(".cart-goods-price").text(price * getByValue(goods_arr, name).quantity);
		if(a>2){
		total -= price;
		total_price.text(total);
		}

	});
	$(".goods-cart").on("blur", ".item-count", function () {
		var name = $(this).parent().siblings(".goods-name").text();
		var price = parseInt(getByValue(goods_arr, name).price);
		var input_value = parseInt($(this).val());
		if(input_value>=1){
		click -= getByValue(goods_arr, name).quantity;
		click += input_value;
		$(".counter").text(click);
		total -= price * getByValue(goods_arr, name).quantity;
		getByValue(goods_arr, name).quantity = input_value;
		$(this).siblings(".cart-goods-price").text(price * input_value);
		total += input_value * price;
		total_price.text(total);
		} else{
			input_value = 1;
			$(this).val(1);
			click -= getByValue(goods_arr, name).quantity;
			click++;
			$(".counter").text(click);
			total -= price * getByValue(goods_arr, name).quantity;
			getByValue(goods_arr, name).quantity = 1;
			$(this).siblings(".cart-goods-price").text(price * input_value);
			total += input_value * price;
			total_price.text(total);

		}
		
	})

	$(".goods-cart").on("click", ".remove-btn", function () {
		var name = $(this).parent().siblings(".goods-name").text();
		var cart_index = getIndex(goods_arr, name);
		var price = parseInt($(this).siblings(".cart-goods-price").text());
		var input_value = parseInt($(this).siblings(".item-count").val());
		click -= input_value;
		$(".counter").text(click);
		total -= price;
		total_price.text(total);
		$(this).parents(".cart_item").remove();
		goods_arr.splice(cart_index, 1);
		if (goods_arr.length == 0) {
			$(".cart-wrapper").css("display", "block");
			$(".cart-total-price").css("display", "none");
			$(".counter").css("display", "none");
		}


	})
});
function goToPage(page) {
  switch (page) {
    case 1:
      var url = "main.html";
      break;
    case 2:
      var url = "page2.html";
      break;
    case 3:
      var url = "page3.html";
      break;
    case 4:
      var url = "page4.html";
      break;
    case 5:
      var url = "page5.html";
      break;
    default:
      break;
  }
  
  console.log("Navigating to URL: " + url); // Add this line to print the target URL to the console
  
  window.location.href = url;
}


function prevPage() {
  // Get the current page number from the active button
  var currentPage = parseInt(document.querySelector(".pagination-button.active").textContent);
  console.log("Current Page: " + currentPage); // Add this line to print the current page to the console

  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function nextPage() {
  // Get the current page number from the active button
  var currentPage = parseInt(document.querySelector(".pagination-button.active").textContent);
  console.log("Current Page: " + currentPage); // Add this line to print the current page to the console

  if (currentPage < 5) { // Replace 5 with the total number of pages
    goToPage(currentPage + 1);
  }
}

// Map address
function initMap() {
  // Specify the map center using the latitude and longitude values from the link
  var center = {lat: 42.38638847763318, lng: 69.62006955119676};

  // Create a new map object centered on the specified location
  var map = new google.maps.Map(document.getElementById('map-container'), {
      center: center,
      zoom: 15
  });

  // Add a marker to the map at the specified location
  var marker = new google.maps.Marker({
      map: map,
      position: center
  });
}

/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}
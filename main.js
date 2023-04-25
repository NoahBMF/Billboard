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
  
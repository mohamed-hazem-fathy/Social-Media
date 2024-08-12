// This is the current page and last page variables used for infinite scroll pagination
let currentPage = 1;
let lastPage = 1;

//===== INFINITE SCROLL =======//
// Event listener for scrolling to trigger infinite scroll pagination
// window.addEventListener("scroll", function(){
//     // Check if the end of the page is reached
//     const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

//     // If the end of the page is reached and there are more pages to load
//     if(endOfPage && currentPage < lastPage) {
//       currentPage = currentPage + 1;
//       getPosts(false, currentPage); // Fetch posts for the next page
//     }
//   });
  //=====// INFINITE SCROLL //=======//



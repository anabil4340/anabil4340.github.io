/* Show a button to return to the top of the page. */
const backToTop = document.getElementById("back-to-top");

/* Display the button after scrolling down. */
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

/* Return to the top when the button is clicked. */
backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

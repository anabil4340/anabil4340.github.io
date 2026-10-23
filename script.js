/*
  Author: Abdur Nabil
  Project: Software Developer Portfolio
  Description: Handles interactive features of the portfolio website.
  Date: October 2026
*/

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

/* Mini hacker navigation animation */
const navBuilder = document.getElementById("nav-builder");
const navLogo = document.getElementById("mascot-logo");

if (navBuilder && navLogo) {
  const jumpFrames = [
    "sprites/jump_01.png",
    "sprites/jump_02.png",
    "sprites/jump_03.png",
    "sprites/jump_04.png",
    "sprites/jump_05.png",
    "sprites/jump_06.png",
  ];

  const frameDelay = 90;
  let jumpFrameIndex = 0;

  /**
   * Displays the next jumping frame as the character
   * moves away from the navigation logo.
   */
  function animateJump() {
    if (jumpFrameIndex >= jumpFrames.length) {
      return;
    }

    const logoRect = navLogo.getBoundingClientRect();
    const navRect = navBuilder.parentElement.getBoundingClientRect();

    const startX = logoRect.left - navRect.left;
    const progress = jumpFrameIndex / (jumpFrames.length - 1);

    const horizontalMovement = progress * 65;
    const verticalMovement = Math.sin(progress * Math.PI) * 35;

    navBuilder.src = jumpFrames[jumpFrameIndex];
    navBuilder.style.opacity = "1";
    navBuilder.style.transform = `translate(
      ${startX + horizontalMovement}px,
      ${-verticalMovement}px
    )`;

    jumpFrameIndex++;
    setTimeout(animateJump, frameDelay);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animateJump();
  }
}

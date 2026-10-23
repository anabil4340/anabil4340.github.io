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

  const runFrames = [
    "sprites/run_01.png",
    "sprites/run_02.png",
    "sprites/run_03.png",
    "sprites/run_04.png",
    "sprites/run_05.png",
    "sprites/run_06.png",
    "sprites/run_07.png",
    "sprites/run_08.png",
  ];

  const aboutLink = document.querySelector('.nav-links a[href="#about"]');

  const runSpeed = 15;
  const runFrameDelay = 60;

  const frameDelay = 90;
  let jumpFrameIndex = 0;

  /**
   * Runs the character toward the About link and back
   * to its starting position.
   */
  function animateRun() {
    if (!aboutLink) {
      return;
    }

    const navRect = navBuilder.parentElement.getBoundingClientRect();
    const aboutRect = aboutLink.getBoundingClientRect();

    const startPosition = Number.parseFloat(
      navBuilder.dataset.position || "65",
    );

    const destination = aboutRect.left - navRect.left - 48;

    let position = startPosition;
    let direction = 1;
    let frameIndex = 0;

    const runTimer = setInterval(() => {
      position += runSpeed * direction;

      if (position >= destination) {
        position = destination;
        direction = -1;
      }

      if (position <= startPosition && direction === -1) {
        position = startPosition;
        clearInterval(runTimer);
      }

      navBuilder.src = runFrames[frameIndex];
      navBuilder.style.transform = `translateX(${position}px) scaleX(${direction})`;
      navBuilder.dataset.position = position;

      frameIndex = (frameIndex + 1) % runFrames.length;
    }, runFrameDelay);
  }

  /**
   * Displays the next jumping frame as the character
   * moves away from the navigation logo.
   */
  function animateJump() {
    if (jumpFrameIndex >= jumpFrames.length) {
      animateRun();
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

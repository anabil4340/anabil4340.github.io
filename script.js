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

  //Grab Frames
  const grabFrames = ["sprites/grab_01.png", "sprites/grab_02.png"];

  //Throw Frames
  const throwFrames = ["sprites/throw_01.png", "sprites/throw_02.png"];

  //Catch Frames
  const catchFrames = [
    "sprites/catch_01.png",
    "sprites/catch_02.png",
    "sprites/catch_03.png",
    "sprites/catch_04.png",
    "sprites/catch_05.png",
  ];

  const aboutLink = document.querySelector('.nav-links a[href="#about"]');

  const runSpeed = 15;
  const runFrameDelay = 60;

  const frameDelay = 90;
  const pauseDuration = 2000;
  const jumpDistance = 65;

  let jumpFrameIndex = 0;
  let navigationRequested = false;
  let selectedNavLink = null;

  /**
   * Detects navigation clicks and requests an interruption
   * of the character's normal patrol.
   */
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navigationRequested = true;
      selectedNavLink = link;
    });
  });

  /**
   * Plays the grabbing animation when the character
   * reaches a selected navigation link.
   */
  function animateGrab() {
    let frameIndex = 0;

    const grabTimer = setInterval(() => {
      navBuilder.src = grabFrames[frameIndex];

      frameIndex++;

      if (frameIndex >= grabFrames.length) {
        clearInterval(grabTimer);
        animateThrow();
      }
    }, 150);
  }

  /**
   * Plays the throwing animation and temporarily hides
   * the selected navigation link's text.
   */
  function animateThrow() {
    if (!selectedNavLink) {
      return;
    }

    let frameIndex = 0;

    const throwTimer = setInterval(() => {
      navBuilder.src = throwFrames[frameIndex];

      frameIndex++;

      if (frameIndex >= throwFrames.length) {
        clearInterval(throwTimer);

        selectedNavLink.style.color = "transparent";
        animateFlyingText();
      }
    }, 150);
  }

  /**
   * Animates the selected navigation text toward its page section
   * and restores the original navigation link afterward.
   */
  function animateFlyingText() {
    if (!selectedNavLink) {
      return;
    }

    const link = selectedNavLink;
    const section = document.querySelector(link.getAttribute("href"));

    if (!section) {
      link.style.color = "";
      return;
    }

    const linkRect = link.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    const flyingText = document.createElement("span");
    flyingText.textContent = link.textContent.trim();

    Object.assign(flyingText.style, {
      position: "fixed",
      left: `${linkRect.left}px`,
      top: `${linkRect.top}px`,
      font: window.getComputedStyle(link).font,
      color: "#a855f7",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: "1000",
    });

    document.body.appendChild(flyingText);

    const targetX = sectionRect.left + sectionRect.width / 2;
    const targetY = Math.max(100, sectionRect.top + 100);

    const animation = flyingText.animate(
      [
        {
          transform: "translate(0, 0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translate(${targetX - linkRect.left}px, ${
            targetY - linkRect.top
          }px) rotate(360deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 900,
        easing: "ease-in-out",
        fill: "forwards",
      },
    );

    animation.addEventListener("finish", () => {
      flyingText.remove();
      link.style.color = "";
      animateCatch();
    });
  }

  /**
   * Plays the character's catching animation after
   * the navigation text reaches its destination.
   */
  function animateCatch() {
    let frameIndex = 0;

    const catchTimer = setInterval(() => {
      navBuilder.src = catchFrames[frameIndex];

      frameIndex++;

      if (frameIndex >= catchFrames.length) {
        clearInterval(catchTimer);
      }
    }, 120);
  }

  /**
   * Runs the character toward the selected navigation link.
   *
   * @param {HTMLElement} link - The navigation link that was clicked.
   */
  function runToNavLink(link) {
    const navRect = navBuilder.parentElement.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    const destination =
      linkRect.left - navRect.left - navBuilder.offsetWidth + 10;

    let position = Number.parseFloat(
      navBuilder.dataset.position ||
        String(
          navLogo.getBoundingClientRect().left - navRect.left + jumpDistance,
        ),
    );

    let frameIndex = 0;

    const navigationTimer = setInterval(() => {
      const direction = destination >= position ? 1 : -1;

      position +=
        Math.min(runSpeed, Math.abs(destination - position)) * direction;

      navBuilder.src = runFrames[frameIndex];
      navBuilder.style.transform = `translateX(${position}px) scaleX(${direction})`;

      navBuilder.dataset.position = position;

      frameIndex = (frameIndex + 1) % runFrames.length;

      if (position === destination) {
        clearInterval(navigationTimer);
        animateGrab();
      }
    }, runFrameDelay);
  }

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

    const logoRect = navLogo.getBoundingClientRect();
    const startPosition = logoRect.left - navRect.left + jumpDistance;
    const destination = aboutRect.left - navRect.left - 48;

    let position = startPosition;
    let direction = 1;
    let frameIndex = 0;

    const runTimer = setInterval(() => {
      if (navigationRequested) {
        clearInterval(runTimer);
        navigationRequested = false;

        if (selectedNavLink) {
          runToNavLink(selectedNavLink);
        }

        return;
      }

      position += runSpeed * direction;

      if (position >= destination) {
        position = destination;
        direction = -1;
      }

      if (position <= startPosition && direction === -1) {
        position = startPosition;
        clearInterval(runTimer);
        animateReturnJump();
        return;
      }

      navBuilder.src = runFrames[frameIndex];
      navBuilder.style.transform = `translateX(${position}px) scaleX(${direction})`;
      navBuilder.dataset.position = position;

      frameIndex = (frameIndex + 1) % runFrames.length;
    }, runFrameDelay);
  }

  /**
   * Jumps back into the navigation logo and restarts
   * the patrol after a short pause.
   */
  function animateReturnJump() {
    const logoRect = navLogo.getBoundingClientRect();
    const navRect = navBuilder.parentElement.getBoundingClientRect();

    const logoPosition = logoRect.left - navRect.left;
    const startPosition = logoPosition + jumpDistance;

    let frameIndex = 0;

    const returnTimer = setInterval(() => {
      const progress = frameIndex / (jumpFrames.length - 1);

      const position = startPosition - progress * (jumpDistance + 45);
      const height = Math.sin(progress * Math.PI) * 35;

      navBuilder.src = jumpFrames[frameIndex];
      navBuilder.style.transform = `translate(${position}px, ${-height}px) scaleX(-1)`;

      frameIndex++;

      if (frameIndex >= jumpFrames.length) {
        clearInterval(returnTimer);

        navBuilder.style.opacity = "0";

        setTimeout(() => {
          jumpFrameIndex = 0;
          animateJump();
        }, pauseDuration);
      }
    }, frameDelay);
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

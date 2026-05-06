function initCursor() {
  const cursor = document.getElementById("cursor");
  const trail = document.getElementById("trail");

  if (!cursor || !trail) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let trailX = 0;
  let trailY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateCursor() {
    requestAnimationFrame(animateCursor);
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
  }

  animateCursor();
}

function initScrollTopButton() {
  const scrollBtn = document.getElementById("scrollTopBtn");

  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

initCursor();
initScrollTopButton();

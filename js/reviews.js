/* Denne kode er genereret med hjælp fra ChatGPT, tjek /aiprompts/mads-aiprompts.pdf */ 

(function () {

  const carousel = document.querySelector("#carousel");
  const track = carousel.querySelector(".carousel__track");
  const nextBtn = carousel.querySelector(".carousel__button--next");
  const prevBtn = carousel.querySelector(".carousel__button--prev");

  let index = 0;
  let slideWidth = 0;

  let autoplay;
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  /* =========================
     SIZE
  ========================= */

  function getSlideWidth() {
    return track.querySelector(".carousel__slide").getBoundingClientRect().width;
  }

  function updateSize() {
    slideWidth = getSlideWidth();
    setPosition(false);
  }

  window.addEventListener("resize", function () {
    requestAnimationFrame(updateSize);
  });

  updateSize();

  /* =========================
     POSITION
  ========================= */

  function setPosition(animate = true) {
    track.style.transition = animate ? "transform 0.5s ease" : "none";
    track.style.transform = "translateX(" + (-index * slideWidth) + "px)";
  }

  /* =========================
     TRUE INFINITE LOOP
  ========================= */

  function moveNext() {

    track.style.transition = "transform 0.5s ease";

    index++;
    setPosition(true);

    track.addEventListener("transitionend", onNextEnd);
  }

  function onNextEnd() {

    track.removeEventListener("transitionend", onNextEnd);

    // move first slide to end
    track.appendChild(track.firstElementChild);

    track.style.transition = "none";

    index--;
    setPosition(false);
  }

  function movePrev() {

    // move last slide to beginning
    track.insertBefore(track.lastElementChild, track.firstElementChild);

    track.style.transition = "none";

    index++;
    setPosition(false);

    requestAnimationFrame(function () {

      track.style.transition = "transform 0.5s ease";

      index--;
      setPosition(true);

    });
  }

  /* =========================
     BUTTONS
  ========================= */

  function onNextClick() {
    moveNext();
  }

  function onPrevClick() {
    movePrev();
  }

  nextBtn.addEventListener("click", onNextClick);
  prevBtn.addEventListener("click", onPrevClick);

  /* =========================
     AUTOPLAY
  ========================= */

  function startAutoplay() {

    autoplay = setInterval(function () {
      moveNext();
    }, 3000);

  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  startAutoplay();

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  /* =========================
     SWIPE
  ========================= */

  function onTouchStart(e) {

    dragging = true;
    startX = e.touches[0].clientX;

    stopAutoplay();
  }

  function onTouchMove(e) {

    if (!dragging) return;

    currentX = e.touches[0].clientX;
  }

  function onTouchEnd() {

    dragging = false;

    const diff = currentX - startX;

    if (diff < -50) moveNext();
    if (diff > 50) movePrev();

    startAutoplay();
  }

  track.addEventListener("touchstart", onTouchStart, { passive: true });
  track.addEventListener("touchmove", onTouchMove, { passive: true });
  track.addEventListener("touchend", onTouchEnd);

})();
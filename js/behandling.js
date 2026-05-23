const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {

  header.addEventListener("click", () => {

    const content = header.parentElement.nextElementSibling
      || header.closest(".accordion-item").querySelector(".accordion-content");

    const isOpen = header.getAttribute("aria-expanded") === "true";



    // Luk alle først
    headers.forEach(item => {

      item.setAttribute("aria-expanded", "false");

      const itemContent =
        item.closest(".accordion-item").querySelector(".accordion-content");

      itemContent.style.maxHeight = null;
      itemContent.setAttribute("aria-hidden", "true");

    });



    // Åbn kun den klikkede hvis den ikke allerede var åben
    if (!isOpen) {

      header.setAttribute("aria-expanded", "true");

      content.setAttribute("aria-hidden", "false");



      // VIGTIG: reset først før vi måler højde
      content.style.maxHeight = "0px";



      // næste frame sikrer korrekt måling
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      });

    }

  });

});
/* Denne kode er genereret med hjælp fra ChatGPT, tjek /aiprompts/mads-aiprompts.pdf */ 

const headers = document.querySelectorAll(".accordion-header");

headers.forEach(function(header) {

    header.addEventListener("click", function() {

        const content =
            header.closest(".accordion-item")
            .querySelector(".accordion-content");

        const isOpen =
            header.getAttribute("aria-expanded") === "true";



        /* Luk alle accordions */

        headers.forEach(function(item) {

            item.setAttribute("aria-expanded", "false");

            const itemContent =
                item.closest(".accordion-item")
                .querySelector(".accordion-content");

            itemContent.style.maxHeight = null;

            itemContent.setAttribute("aria-hidden", "true");

        });



        /* Åbn kun hvis den var lukket */

        if (!isOpen) {

            header.setAttribute("aria-expanded", "true");

            content.setAttribute("aria-hidden", "false");



            content.style.maxHeight = "0px";



            requestAnimationFrame(function() {

                content.style.maxHeight =
                    content.scrollHeight + "px";

            });

        }

    });

});
// Vi venter én gang på, at hele HTML'en er indlæst
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. PARALLAX EFFEKT (Til knapperne)
       ========================================= */
    const parallaxImages = document.querySelectorAll('.services-nav__image');

    // Sørger for at parallax-koden kun kører, hvis billederne faktisk findes på siden
    if (parallaxImages.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxImages.forEach(image => {
                const cardRect = image.parentElement.getBoundingClientRect();
                
                if (cardRect.bottom < 0 || cardRect.top > window.innerHeight) return; 

                const yPos = (cardRect.top * 0.05);
                image.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    /* =========================================
       2. TOGGLE SWITCH (Symptomer / Årsager)
       ========================================= */
    const toggleButtons = document.querySelectorAll('.conditions__toggle-btn');
    const contentBoxes = document.querySelectorAll('.conditions__box');

    // Sørger for at koden kun kører, hvis knapperne findes på siden
    if (toggleButtons.length > 0) {
        toggleButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                
                // Nulstil alt
                toggleButtons.forEach(b => b.classList.remove('conditions__toggle-btn--active'));
                contentBoxes.forEach(box => box.classList.remove('conditions__box--active'));

                // Aktiver den valgte
                btn.classList.add('conditions__toggle-btn--active');
                contentBoxes[index].classList.add('conditions__box--active');
            });
        });
    }

});
// Vi venter én gang på, at hele HTML'en er indlæst
document.addEventListener('DOMContentLoaded', () => {

/* =========================================
       1. PARALLAX EFFEKT (Skudsikker og matematisk bunden)
       ========================================= */
    const parallaxImages = document.querySelectorAll('.services-nav__image');

    if (parallaxImages.length > 0) {
        
        function runParallax() {
            parallaxImages.forEach(image => {
                const card = image.parentElement;
                const cardRect = card.getBoundingClientRect();
                
                // Kør kun matematikken, hvis kortet faktisk kan ses på skærmen
                if (cardRect.bottom < 0 || cardRect.top > window.innerHeight) return; 

                // 1. Udregner kortets "rejse" over skærmen som et kommatal mellem 0 og 1.
                // (0 = kortet er i bunden af skærmen, 1 = kortet er i toppen)
                const totalDistance = window.innerHeight + cardRect.height;
                const distanceScrolled = window.innerHeight - cardRect.top;
                const progress = distanceScrolled / totalDistance;

                // 2. Mapper rejsen om til procenter. 
                const yPos = (progress - 0.5) * 30; 
                
                // Flyt billedet i procenter i stedet for pixels
                image.style.transform = `translateY(${yPos}%)`;
            });
        }

        window.addEventListener('scroll', runParallax);
        runParallax();
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
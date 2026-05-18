// Vent på at HTML'en er indlæst
document.addEventListener('DOMContentLoaded', () => {
    
    // Find alle parallax-billeder på siden
    const parallaxImages = document.querySelectorAll('.services-nav__image');

    // Lyt efter at brugeren scroller
    window.addEventListener('scroll', () => {
        
        // Kør koden for hvert billede
        parallaxImages.forEach(image => {
            
            // Få fat i forældre-elementet (.services-nav__card) og find ud af, hvor det er på skærmen
            const cardRect = image.parentElement.getBoundingClientRect();
            
            // Hvis kortet slet ikke er synligt på skærmen, springer vi over for at spare på computerkræfterne
            if (cardRect.bottom < 0 || cardRect.top > window.innerHeight) {
                return; 
            }

            // Måler hvor meget kortet har bevæget sig i forhold til vinduet
            // Vi ganger med 0.15 for at bremse hastigheden. Et lavere tal = langsommere bevægelse.
            const yPos = (cardRect.top * 0.05);

            // Flyt billedet på Y-aksen (op/ned)
            image.style.transform = `translateY(${yPos}px)`;
        });
    });
});
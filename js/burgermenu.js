/* Denne kode er genereret med hjælp fra Gemini, tjek /aiprompts/justine-aiprompts.pdf */ 
document.addEventListener('DOMContentLoaded', function() {
    
    const burgerBtn = document.querySelector('.header__burger');
    const navMenu = document.querySelector('.header__nav');

    // --- BURGER KLIK ---
    burgerBtn.addEventListener('click', function() {
        navMenu.classList.toggle('is-open');
        burgerBtn.classList.toggle('is-open');

        const isOpen = navMenu.classList.contains('is-open');
        burgerBtn.setAttribute('aria-label', isOpen ? 'Luk menu' : 'Åbn menu');
    });

    // --- ARRAY & LOOP HER ---
    
    // 1. Vi finder alle links og omdanner dem til et ægte Array ved hjælp af Array.from()
    const menuLinksArray = Array.from(document.querySelectorAll('.header__menu-link'));

    // 2. Vi bruger et loop (forEach) til at køre igennem hvert enkelt link i vores array
    menuLinksArray.forEach(function(link) {
        
        // 3. For HVERT link i loopet, lytter vi efter et klik
        link.addEventListener('click', function() {
            // Luk menuen når der klikkes
            navMenu.classList.remove('is-open');
            burgerBtn.classList.remove('is-open');
            burgerBtn.setAttribute('aria-label', 'Åbn menu');
        });
        
    });
});
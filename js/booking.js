/* --- Carl Emils JS kode.
        Koden er genereret med hjælp fra Gemini. Se /aiprompts/carlemil-aiprompts.pdf for at se specifikke instruktioner givet til Gemini.
        Jeg har slev ændre lidt i den og gået den iggenem for at forstå hvorda nden virker. --- */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. DATA: VORES BEHANDLINGER --- */
    // Behandlingerne bliver gemt i et objekt og opdelt i 'yes' (Første gang) og 'no' (Ikke første gang)
    const treatmentsData = {
        yes: [
            { id: 1, title: 'Kort første konsultation', time: '45 min', price: '500 kr.' },
            { id: 2, title: 'Standard første konsultation', time: '60 min', price: '650 kr.' },
            { id: 3, title: 'Lang første konsultation', time: '90 min', price: '850 kr.' },
            { id: 4, title: 'Ekstra lang første konsultation', time: '120 min', price: '1100 kr.' }
        ],
        no: [
            { id: 5, title: 'Lyn behandling', time: '15 min', price: '225 kr.' },
            { id: 6, title: 'Ekstra kort behandling', time: '30 min', price: '400 kr.' },
            { id: 7, title: 'Kort behandling', time: '45 min', price: '500 kr.' },
            { id: 8, title: 'Standard behandling (Anbefalet)', time: '60 min', price: '650 kr.' },
            { id: 9, title: 'Lang behandling', time: '90 min', price: '850 kr.' },
            { id: 10, title: 'Ekstra lang behandling', time: '120 min', price: '1100 kr.' }
        ]
    };

    /* --- 2. VARIABLER TIL AT STYRE FLOWET --- */
    let currentStep = 1;      // Vi starter på step 1
    const totalSteps = 5;     // Der er 5 steps i alt
    let skipStep4 = false;    // Denne holder styr på, om vi har logget ind og skal hoppe over step 4

    /* --- 3. HENT HTML ELEMENTER --- */
    const steps = document.querySelectorAll('.booking-step');
    const progressSteps = document.querySelectorAll('.booking-progress__step');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const treatmentList = document.getElementById('treatment-list');

    
    /* --- 4. FUNKTION: OPDATER SKÆRMEN (UPDATE UI) --- */
    // Denne funktion køres hver gang vi skifter side. Den sørger for at vise det rigtige.
    function updateUI() {
        
        // A. Skjul alle steps, og vis kun det aktuelle
        steps.forEach(step => {
            step.classList.remove('booking-step--active');
            // Hvis steppets data-step attribut matcher currentStep, gør vi den aktiv
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('booking-step--active');
            }
        });

        // B. Opdater Progress Baren (Farv cirklerne)
        progressSteps.forEach(progress => {
            progress.classList.remove('booking-progress__step--active');
            // Gør alle cirkler op til og med vores nuværende step aktive
            if (parseInt(progress.dataset.progress) <= currentStep) {
                progress.classList.add('booking-progress__step--active');
            }
        });

        // C. Skjul/Vis knapperne i bunden
        // Skjul "Tilbage" på side 1, og skjul "Næste" på sidste side (Tak-siden)
        btnPrev.style.display = (currentStep === 1 || currentStep === totalSteps) ? 'none' : 'block';
        btnNext.style.display = (currentStep === totalSteps) ? 'none' : 'block';
    }


    /* --- 5. HÅNDTER NÆSTE/TILBAGE KNAPPERNE --- */
    btnNext.addEventListener('click', () => {
        // Logik for Step 3: Hvis vi trykker næste fra step 3, og vi er logget ind (skipStep4 er true),
        // så hopper vi direkte til step 5.
        if (currentStep === 3 && skipStep4 === true) {
            currentStep = 5;
        } else if (currentStep < totalSteps) {
            currentStep++; // Gå en side frem
        }
        updateUI();
    });

    btnPrev.addEventListener('click', () => {
        // Samme logik baglæns. Er vi på step 5 og har sprunget step 4 over, gå tilbage til step 3.
        if (currentStep === 5 && skipStep4 === true) {
            currentStep = 3;
        } else if (currentStep > 1) {
            currentStep--; // Gå en side tilbage
        }
        updateUI();
    });


    /* --- 6. SPØRGSMÅL (JA/NEJ) OG GENERERING AF BEHANDLINGER --- */
    // Vi finder alle de nye radio-inputs i stedet for knapperne
    const radioInputs = document.querySelectorAll('.booking-radio__input');
    
    radioInputs.forEach(radio => {
        // Vi lytter efter 'change' (når prikken flyttes) frem for 'click'
        radio.addEventListener('change', (e) => {
            
            // Vi henter værdien fra det input, der lige er blevet valgt (enten 'yes' eller 'no')
            const answer = e.target.value; 
            
            // Hent den rigtige liste fra vores data-objekt
            const treatmentsToShow = treatmentsData[answer];

            // Tøm html'en i listen, så den er klar til de nye kort
            treatmentList.innerHTML = '';

            // Byg HTML-kortene for behandlingerne
            treatmentsToShow.forEach(treatment => {
                const cardHtml = `
                    <div class="treatment-card">
                        <div class="treatment-card__title">${treatment.title}</div>
                        <div class="treatment-card__time">${treatment.time}</div>
                        <div class="treatment-card__price">${treatment.price}</div>
                    </div>
                `;
                treatmentList.innerHTML += cardHtml;
            });
            
        });
    });


    /* --- 7. ACCORDIONS (LOGIN / OPRET PROFIL) --- */
    const accordionHeaders = document.querySelectorAll('.booking-accordion__header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Find den boks der ligger lige efter knappen (content boksen)
            const content = this.nextElementSibling;
            
            // Luk alle accordions først for at holde det pænt
            document.querySelectorAll('.booking-accordion__content').forEach(box => {
                if (box !== content) box.classList.remove('booking-accordion__content--active');
            });

            // Åbn/luk den vi lige har trykket på (toggle)
            content.classList.toggle('booking-accordion__content--active');
        });
    });


    /* --- 8. HÅNDTER LOGIN / GÆST VALG PÅ STEP 3 --- */
    const authBtns = document.querySelectorAll('.booking-auth-btn');
    
    authBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const authType = e.target.dataset.auth; // 'login', 'create', eller 'guest'

            if (authType === 'login' || authType === 'create') {
                // Hvis de logger ind eller opretter, sætter vi flaget til at skippe step 4
                skipStep4 = true;
                currentStep = 5; // Hop direkte til step 5
            } else if (authType === 'guest') {
                // Hvis de er gæst, skal vi ikke skippe step 4
                skipStep4 = false;
                currentStep = 4; // Gå normalt videre til step 4
            }
            
            updateUI(); // Opdater skærmen med vores nye currentStep
        });
    });

    /* --- 9. HÅNDTER VALG AF BEHANDLING (TILFØJ SELECTED) --- */
    // Fordi behandlingskortene bliver slettet og skabt på ny når man trykker ja/nej, 
    // lytter vi på selve 'treatmentList' kassen i stedet for de enkelte kort.
    treatmentList.addEventListener('click', (e) => {
        // Tjek om det, vi klikkede på, er et behandlingskort (eller tekst indeni det)
        const clickedCard = e.target.closest('.treatment-card');
        
        if (clickedCard) {
            // 1. Find alle kort og fjern 'selected' klassen fra dem
            const allCards = treatmentList.querySelectorAll('.treatment-card');
            allCards.forEach(card => card.classList.remove('selected'));
            
            // 2. Tilføj 'selected' til det specifikke kort, vi lige har klikket på
            clickedCard.classList.add('selected');
        }
    });


    /* --- 10. HÅNDTER VALG AF TIDSPUNKT (TILFØJ SELECTED) --- */
    const timeButtons = document.querySelectorAll('.booking-time-btn');
    
    timeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 1. Fjern 'selected' fra alle andre tids-knapper
            timeButtons.forEach(b => b.classList.remove('selected'));
            
            // 2. Tilføj 'selected' til den knap, vi lige har klikket på
            e.currentTarget.classList.add('selected');
        });
    });

    // Kør funktionen én gang når siden loader for at sætte det hele rigtigt op fra start
    updateUI();
});
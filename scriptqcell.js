document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const loadingScreen = document.getElementById('loading-screen');
    const navContainer = document.querySelector('.main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');

    // --- LOADING SCREEN ---
    window.addEventListener('load', () => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });



    // --- MOBILE MENU TOGGLE ---
    if (mobileMenuBtn && navContainer) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navContainer.classList.toggle('active');
        });
    }

    // --- CARD MODAL & LINK LOGIC ---
    const clickableCards = document.querySelectorAll('.card[data-fulltext], .card[data-gform-link]');
    const modalOverlay = document.getElementById('blog-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    if (modalOverlay) {
        clickableCards.forEach(card => {
            card.addEventListener('click', () => {
                const gformLink = card.dataset.gformLink;
                const fullText = card.dataset.fulltext;
                const title = card.querySelector('h3').textContent;

                if (gformLink) { window.open(gformLink, '_blank'); }
                else if (fullText && title) {
                    modalTitle.textContent = title;
                    modalText.textContent = fullText;
                    modalOverlay.classList.remove('hidden');
                }
            });
        });

        function closeModal() { modalOverlay.classList.add('hidden'); }
        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) { closeModal(); } });
    }

    // --- COORDINATOR CARD SLIDE-UP LOGIC ---
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) { card.classList.remove('active'); }
            else {
                memberCards.forEach(otherCard => { otherCard.classList.remove('active'); });
                card.classList.add('active');
            }
        });
    });

    // --- COUNTDOWN TIMER (QPL 2026) ---
    const countdownDate = new Date("Aug 15, 2026 10:00:00").getTime();
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    }

    // --- TRIVIA QUIZ (100 QUESTIONS POOL - 5 RANDOM QUESTIONS PER TEST) ---
    const quizDataPool = [
        // Science & Nature
        { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },
        { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"], answer: "Harper Lee" },
        { question: "What is the chemical symbol for Gold?", options: ["Ag", "Au", "Fe", "Gd"], answer: "Au" },
        { question: "What is the hardest natural substance on Earth?", options: ["Quartz", "Diamond", "Corundum", "Topaz"], answer: "Diamond" },
        { question: "Which gas is essential for human respiration?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Oxygen" },
        { question: "What is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], answer: "Jupiter" },
        { question: "What is the approximate speed of light in vacuum?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "30,000 km/s"], answer: "300,000 km/s" },
        { question: "What is the fundamental unit of life?", options: ["Atom", "Cell", "Tissue", "Organ"], answer: "Cell" },
        { question: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], answer: "Mitochondria" },
        { question: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], answer: "Hydrogen" },
        { question: "What is the boiling point of water at sea level?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
        { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury" },
        { question: "Which gas makes up the majority of Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], answer: "Nitrogen" },
        { question: "Which human organ is primarily responsible for filtering blood?", options: ["Liver", "Kidneys", "Heart", "Lungs"], answer: "Kidneys" },
        { question: "What process do plants use to synthesize food using sunlight?", options: ["Photosynthesis", "Respiration", "Fermentation", "Transpiration"], answer: "Photosynthesis" },
        { question: "What pigment gives plants their green color?", options: ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"], answer: "Chlorophyll" },
        { question: "Which star is closest to Earth after the Sun?", options: ["Proxima Centauri", "Sirius", "Alpha Centauri A", "Betelgeuse"], answer: "Proxima Centauri" },
        { question: "What is the SI unit of electric current?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ampere" },
        { question: "What electric charge does a neutron possess?", options: ["Positive", "Negative", "Neutral", "Variable"], answer: "Neutral" },

        // History & Culture
        { question: "Who was the first human in space?", options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "John Glenn"], answer: "Yuri Gagarin" },
        { question: "Who was the first person to step on the Moon?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], answer: "Neil Armstrong" },
        { question: "In which year did World War II end?", options: ["1943", "1944", "1945", "1948"], answer: "1945" },
        { question: "Which ancient wonder of the world is located in Egypt?", options: ["Hanging Gardens", "Great Pyramid of Giza", "Colossus of Rhodes", "Lighthouse of Alexandria"], answer: "Great Pyramid of Giza" },
        { question: "Which famous ocean liner sank in 1912 on its maiden voyage?", options: ["Titanic", "Britannic", "Lusitania", "Olympic"], answer: "Titanic" },
        { question: "Which ancient empire built the Colosseum in Rome?", options: ["Greek Empire", "Roman Empire", "Ottoman Empire", "Byzantine Empire"], answer: "Roman Empire" },
        { question: "Who was known as the 'Iron Lady' of British politics?", options: ["Margaret Thatcher", "Theresa May", "Queen Elizabeth II", "Indira Gandhi"], answer: "Margaret Thatcher" },
        { question: "Who discovered Penicillin in 1928?", options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Robert Koch"], answer: "Alexander Fleming" },
        { question: "Which country gifted the Statue of Liberty to the USA?", options: ["France", "United Kingdom", "Germany", "Italy"], answer: "France" },
        { question: "Which civilization built the citadel of Machu Picchu?", options: ["Inca", "Maya", "Aztec", "Olmec"], answer: "Inca" },
        { question: "What is the official currency of Japan?", options: ["Yuan", "Yen", "Won", "Ringgit"], answer: "Yen" },
        { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
        { question: "Which is the largest ocean on Earth?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: "Pacific" },
        { question: "Which is the smallest country in the world by land area?", options: ["Monaco", "Vatican City", "Nauru", "San Marino"], answer: "Vatican City" },
        { question: "Which country currently has the largest population in the world?", options: ["China", "India", "USA", "Indonesia"], answer: "India" },

        // Geography & Landmarks
        { question: "What is the capital of Canada?", options: ["Toronto", "Ottawa", "Vancouver", "Montreal"], answer: "Ottawa" },
        { question: "What is the highest mountain peak above sea level?", options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], answer: "Mount Everest" },
        { question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"], answer: "Brasília" },
        { question: "Which country is nicknamed 'Land of the Rising Sun'?", options: ["China", "Japan", "South Korea", "Thailand"], answer: "Japan" },
        { question: "Which is the largest desert in the world (including polar areas)?", options: ["Sahara", "Antarctic Desert", "Arabian Desert", "Gobi Desert"], answer: "Antarctic Desert" },
        { question: "What is the capital of South Korea?", options: ["Busan", "Seoul", "Incheon", "Daegu"], answer: "Seoul" },
        { question: "Which strait separates Russia and Alaska?", options: ["Bering Strait", "Gibraltar Strait", "Malacca Strait", "Dardanelles"], answer: "Bering Strait" },
        { question: "Which island nation is famous as the birthplace of Reggae music?", options: ["Cuba", "Jamaica", "Bahamas", "Haiti"], answer: "Jamaica" },
        { question: "Which continent has the most recognized countries?", options: ["Asia", "Africa", "Europe", "South America"], answer: "Africa" },
        { question: "What is the capital of Germany?", options: ["Munich", "Berlin", "Frankfurt", "Hamburg"], answer: "Berlin" },

        // Arts, Literature & Entertainment
        { question: "Who wrote '1984' and 'Animal Farm'?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Ernest Hemingway"], answer: "George Orwell" },
        { question: "Who wrote the play 'Romeo and Juliet'?", options: ["William Shakespeare", "Christopher Marlowe", "John Milton", "Oscar Wilde"], answer: "William Shakespeare" },
        { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], answer: "Leonardo da Vinci" },
        { question: "How many keys are on a standard acoustic piano?", options: ["76", "88", "92", "80"], answer: "88" },
        { question: "Which fictional wizard has a lightning-shaped scar?", options: ["Gandalf", "Harry Potter", "Merlin", "Dumbledore"], answer: "Harry Potter" },
        { question: "What is the fictional city where Batman operates?", options: ["Metropolis", "Gotham City", "Star City", "Central City"], answer: "Gotham City" },
        { question: "Which superhero is known as the 'Man of Steel'?", options: ["Iron Man", "Superman", "Captain America", "Thor"], answer: "Superman" },
        { question: "Which animated Disney movie features the song 'Let It Go'?", options: ["Moana", "Frozen", "Tangled", "Brave"], answer: "Frozen" },
        { question: "Which movie is currently the highest-grossing film of all time?", options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars VII"], answer: "Avatar" },
        { question: "Who created the detective character Sherlock Holmes?", options: ["Arthur Conan Doyle", "Agatha Christie", "Edgar Allan Poe", "Ian Fleming"], answer: "Arthur Conan Doyle" },

        // Technology & Physics
        { question: "Which programming language was originally primary for Android development?", options: ["Swift", "Java", "Python", "C#"], answer: "Java" },
        { question: "What does 'HTTP' stand for?", options: ["Hypertext Transfer Protocol", "High Transfer Text Protocol", "Hyperlink Text Program", "Hosted Text Protocol"], answer: "Hypertext Transfer Protocol" },
        { question: "Which tech company created the Windows Operating System?", options: ["Apple", "Microsoft", "IBM", "Google"], answer: "Microsoft" },
        { question: "Who co-founded Apple Inc. with Steve Wozniak in 1976?", options: ["Bill Gates", "Steve Jobs", "Jeff Bezos", "Mark Zuckerberg"], answer: "Steve Jobs" },
        { question: "What is the basic unit of digital computer data storage?", options: ["Bit", "Byte", "Pixel", "Hertz"], answer: "Byte" },
        { question: "What does 'CPU' stand for?", options: ["Central Processing Unit", "Computer Program Utility", "Core Process Unit", "Central Program Utility"], answer: "Central Processing Unit" },
        { question: "Who is credited with inventing the World Wide Web in 1989?", options: ["Tim Berners-Lee", "Alan Turing", "Ada Lovelace", "Bill Gates"], answer: "Tim Berners-Lee" },
        { question: "Which atomic subparticle has a positive electrical charge?", options: ["Electron", "Neutron", "Proton", "Photon"], answer: "Proton" },
        { question: "Which device is used to measure atmospheric pressure?", options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"], answer: "Barometer" },
        { question: "Newton's 3rd Law: For every action, there is an equal and opposite...?", options: ["Friction", "Reaction", "Momentum", "Gravity"], answer: "Reaction" },
        { question: "What is absolute zero temperature in degrees Celsius?", options: ["-273.15°C", "0°C", "-100°C", "-459.67°C"], answer: "-273.15°C" },
        { question: "Which fundamental force holds planets in orbit around stars?", options: ["Electromagnetism", "Gravity", "Strong Nuclear Force", "Weak Nuclear Force"], answer: "Gravity" },

        // Biology & Earth Science
        { question: "Which mammal is capable of true sustained flight?", options: ["Bat", "Flying Squirrel", "Sugar Glider", "Flying Lemur"], answer: "Bat" },
        { question: "What is the largest living animal in the world?", options: ["African Elephant", "Blue Whale", "Colossal Squid", "Giraffe"], answer: "Blue Whale" },
        { question: "How many hearts does an octopus have?", options: ["1", "2", "3", "4"], answer: "3" },
        { question: "Which land mammal is famously unable to jump?", options: ["Rhino", "Elephant", "Hippo", "Sloth"], answer: "Elephant" },
        { question: "Which vitamin is synthesized by human skin when exposed to sunlight?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], answer: "Vitamin D" },
        { question: "What is the hardest tissue in the human body?", options: ["Femur Bone", "Tooth Enamel", "Skull", "Knee Cartilage"], answer: "Tooth Enamel" },
        { question: "What is the approximate normal resting body temperature for humans?", options: ["37°C", "35°C", "40°C", "39°C"], answer: "37°C" },
        { question: "Which blood type is considered the universal red cell donor?", options: ["AB Positive", "O Negative", "A Positive", "O Positive"], answer: "O Negative" },
        { question: "Which gases predominantly compose Saturn and Jupiter?", options: ["Oxygen & Nitrogen", "Hydrogen & Helium", "Methane & Ozone", "Carbon & Argon"], answer: "Hydrogen & Helium" },
        { question: "Which planet appears brightest in Earth's night sky?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Venus" },

        // Space & Nature
        { question: "What light display phenomenon occurs near Earth's magnetic poles?", options: ["Eclipse", "Aurora", "Zenith", "Mirage"], answer: "Aurora" },
        { question: "What is the name of our spiral galaxy containing the Solar System?", options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"], answer: "Milky Way" },
        { question: "How often are the Summer Olympic Games held?", options: ["Every 2 years", "Every 4 years", "Every 3 years", "Every 5 years"], answer: "Every 4 years" },
        { question: "Which nation won the first FIFA World Cup in 1930?", options: ["Uruguay", "Argentina", "Brazil", "Italy"], answer: "Uruguay" },
        { question: "How many holes are played in a standard full round of golf?", options: ["9", "12", "18", "24"], answer: "18" },
        { question: "Which grand slam tennis tournament is played on grass courts?", options: ["US Open", "French Open", "Wimbledon", "Australian Open"], answer: "Wimbledon" },
        { question: "How many players are on the field for a standard cricket team?", options: ["10", "11", "12", "9"], answer: "11" },
        { question: "Which country invented paper around 100 AD?", options: ["Egypt", "China", "Greece", "India"], answer: "China" },
        { question: "What is the currency of the United Kingdom?", options: ["Euro", "Pound Sterling", "Dollar", "Franc"], answer: "Pound Sterling" },
        { question: "What is the capital of France?", options: ["Lyon", "Paris", "Marseille", "Nice"], answer: "Paris" },
        { question: "What is the deepest known location in Earth's oceans?", options: ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Tonga Trench"], answer: "Mariana Trench" },
        { question: "Which country has the highest total number of natural lakes?", options: ["Canada", "Russia", "USA", "Brazil"], answer: "Canada" },
        { question: "Which is the largest island in the world?", options: ["Greenland", "New Guinea", "Borneo", "Madagascar"], answer: "Greenland" },
        { question: "What is the chemical symbol for Sodium?", options: ["So", "Na", "Sd", "Nm"], answer: "Na" },
        { question: "Which element is commonly added to table salt to prevent goiter?", options: ["Iodine", "Chlorine", "Fluorine", "Calcium"], answer: "Iodine" },
        { question: "Which metal remains liquid at standard room temperature?", options: ["Mercury", "Lead", "Tin", "Gallium"], answer: "Mercury" },
        { question: "Which gas gives carbonated beverages their fizz?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: "Carbon Dioxide" },
        { question: "Which scale measures earthquake intensity/magnitude?", options: ["Richter Scale", "Kelvin Scale", "Mohs Scale", "Beaufort Scale"], answer: "Richter Scale" },
        { question: "Who formulated the Laws of Planetary Motion?", options: ["Isaac Newton", "Johannes Kepler", "Galileo Galilei", "Copernicus"], answer: "Johannes Kepler" },
        { question: "Which branch of science studies fungi?", options: ["Botany", "Mycology", "Zoology", "Virology"], answer: "Mycology" },
        { question: "What is the official quiz club of IISER Berhampur?", options: ["Qcell", "Quizzeria", "ThinkTank", "BrainWave"], answer: "Qcell" }
    ];

    let currentTestQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    const questionTrackerEl = document.getElementById('question-tracker');
    const scoreTrackerEl = document.getElementById('score-tracker');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const resultEl = document.getElementById('quiz-result');
    const nextBtn = document.getElementById('next-question-btn');
    const miniQuizContainer = document.getElementById('mini-quiz-container');

    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function startNewQuizTest() {
        if (!miniQuizContainer) return;
        
        // Pick 5 random unique questions from 100 question pool
        const shuffledPool = shuffleArray(quizDataPool);
        currentTestQuestions = shuffledPool.slice(0, 5);
        currentQuestionIndex = 0;
        score = 0;

        // Reset Container HTML if score card was showing
        miniQuizContainer.innerHTML = `
            <div class="quiz-header-bar">
                <span id="question-tracker">Question 1 of 5</span>
                <span id="score-tracker">Score: 0 / 5</span>
            </div>
            <h1>Quick Trivia</h1>
            <p id="quiz-question">Loading question...</p>
            <div id="quiz-options" class="quiz-options"></div>
            <p id="quiz-result"></p>
            <button id="next-question-btn" class="hidden">Next Question</button>
        `;

        // Re-bind DOM element references
        const qTracker = document.getElementById('question-tracker');
        const sTracker = document.getElementById('score-tracker');
        const qEl = document.getElementById('quiz-question');
        const optEl = document.getElementById('quiz-options');
        const resEl = document.getElementById('quiz-result');
        const nBtn = document.getElementById('next-question-btn');

        loadCurrentQuestion(qTracker, sTracker, qEl, optEl, resEl, nBtn);
    }

    function loadCurrentQuestion(qTracker, sTracker, qEl, optEl, resEl, nBtn) {
        const currentQ = currentTestQuestions[currentQuestionIndex];
        
        if (qTracker) qTracker.textContent = `Question ${currentQuestionIndex + 1} of 5`;
        if (sTracker) sTracker.textContent = `Score: ${score} / 5`;
        if (resEl) resEl.textContent = '';
        if (nBtn) {
            nBtn.classList.add('hidden');
            nBtn.textContent = (currentQuestionIndex === 4) ? "See Final Score" : "Next Question";
            
            // Reattach click handler for next question
            nBtn.onclick = () => {
                if (currentQuestionIndex < 4) {
                    currentQuestionIndex++;
                    loadCurrentQuestion(qTracker, sTracker, qEl, optEl, resEl, nBtn);
                } else {
                    renderQuizSummary();
                }
            };
        }

        if (qEl) qEl.textContent = currentQ.question;
        if (optEl) {
            optEl.innerHTML = '';
            // Shuffle option choices so answer position varies
            const shuffledOptions = shuffleArray(currentQ.options);
            shuffledOptions.forEach(optionText => {
                const btn = document.createElement('button');
                btn.textContent = optionText;
                btn.classList.add('quiz-option');
                btn.addEventListener('click', () => handleOptionSelection(optionText, currentQ.answer, optEl, resEl, nBtn, sTracker));
                optEl.appendChild(btn);
            });
        }
    }

    function handleOptionSelection(selectedOption, correctAnswer, optEl, resEl, nBtn, sTracker) {
        const optionButtons = optEl.querySelectorAll('.quiz-option');
        
        // Disable all buttons once selected
        optionButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });

        if (selectedOption === correctAnswer) {
            score++;
            if (resEl) {
                resEl.textContent = "Correct! 🎉";
                resEl.style.color = "#4CAF50";
            }
        } else {
            optionButtons.forEach(btn => {
                if (btn.textContent === selectedOption) {
                    btn.classList.add('incorrect');
                }
            });
            if (resEl) {
                resEl.textContent = `Incorrect! Correct answer: ${correctAnswer}`;
                resEl.style.color = "#F44336";
            }
        }

        if (sTracker) sTracker.textContent = `Score: ${score} / 5`;
        if (nBtn) nBtn.classList.remove('hidden');
    }

    function renderQuizSummary() {
        let badge = "";
        let feedbackMessage = "";

        if (score === 5) {
            badge = "🏆 Quiz Master!";
            feedbackMessage = "Flawless score! You truly know your trivia!";
        } else if (score >= 3) {
            badge = "🌟 Great Job!";
            feedbackMessage = "Impressive performance! Keep expanding your knowledge!";
        } else {
            badge = "📚 Good Try!";
            feedbackMessage = "Nice attempt! Try another test to sharpen your score!";
        }

        miniQuizContainer.innerHTML = `
            <div class="quiz-summary-card">
                <h2>${badge}</h2>
                <div class="score-display">${score} / 5</div>
                <p>${feedbackMessage}</p>
                <button id="restart-quiz-btn" class="restart-quiz-btn">Try 5 New Questions 🔄</button>
            </div>
        `;

        document.getElementById('restart-quiz-btn').addEventListener('click', startNewQuizTest);
    }

    // --- SOCIAL LINKS TOGGLE ---
    const socialLinksContainer = document.querySelector('.social-links');
    const socialToggleBtn = document.querySelector('.social-toggle-btn');

    if (socialToggleBtn) {
        socialToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            socialLinksContainer.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (socialLinksContainer && !socialLinksContainer.contains(e.target)) {
            socialLinksContainer.classList.remove('active');
        }
    });

    // --- INITIALIZATION ---
    if (document.getElementById('mini-quiz-container')) {
        startNewQuizTest();
    }

    // --- GALLERY LIGHTBOX ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (galleryItems.length && lightbox) {
        let currentIndex = 0;
        const items = Array.from(galleryItems);

        function openLightbox(index) {
            currentIndex = index;
            const item = items[currentIndex];
            lightboxImg.src = item.dataset.src || item.querySelector('img').src;
            lightboxCaption.textContent = item.dataset.caption || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            openLightbox(currentIndex);
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % items.length;
            openLightbox(currentIndex);
        }

        items.forEach((item, idx) => {
            item.addEventListener('click', () => openLightbox(idx));
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', showPrev);
        lightboxNext.addEventListener('click', showNext);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    }

});
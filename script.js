// Shared audio instance for birthday song
let birthdayAudio = null;

// Array of songs to choose from (place your mp3 files in the project folder)
const songs = [
    'aud/song01.m4a',
    'aud/song02.m4a',
    'aud/song03.m4a',
    'aud/song04.m4a',
    'aud/song05.m4a',
    'aud/song06.m4a',
    'aud/song07.m4a',
    'aud/song08.m4a',
    'aud/song09.m4a',
    'aud/song10.m4a',
    'aud/song11.m4a',
    'aud/song12.m4a',
    'aud/song13.m4a',
    'aud/song14.m4a',
    'aud/song15.m4a',
    'aud/song16.m4a',
    'aud/song17.m4a'
];

function getRandomSong() {
    return songs[Math.floor(Math.random() * songs.length)];
}



window.onload = function () {
    const message = new SpeechSynthesisUtterance(
      "\nHappy Birthday to you! Wishing you a day filled with love, joy, and all your favorite things. May this year bring you endless happiness and unforgettable memories. Enjoy your special day!"
    );

    message.lang = "en-US";
    message.rate = 1;   // speed (0.5–2)
    message.pitch = 2; // voice pitch
    message.volume = 1;

    speechSynthesis.speak(message);
  };

// Create sparkles on page load
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// Create confetti pieces
function createConfetti(x, y) {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#FF6B6B','#34D399','#FFD166','#CDB4DB','#7DD3FC','#FF85B3','#FBBF24','#8B5CF6'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        confetti.style.left = (x - 50 + Math.random() * 100) + 'px';
        confetti.style.top = (y - 50 + Math.random() * 100) + 'px';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Create sparkle burst
function createSparklesBurst(x, y) {
    const sparklesContainer = document.getElementById('sparkles');
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.background = ['#ffd700', '#ffed4e', '#ffa500'][Math.floor(Math.random() * 3)];
        sparkle.style.width = Math.random() * 6 + 4 + 'px';
        sparkle.style.height = sparkle.style.width;
        
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        sparkle.style.animation = `none`;
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.style.transition = 'all 1s ease-out';
            sparkle.style.transform = `translate(${tx}px, ${ty}px)`;
            sparkle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => sparkle.remove(), 1500);
    }
}

// Celebrate button click handler
function celebrateClick() {
    const card = document.querySelector('.birthday-card');
    const container = document.querySelector('.container') || document.body;

    // Try to get the event target safely
    const btn = (window.event && window.event.target) || document.querySelector('.btn');
    const rect = btn && btn.getBoundingClientRect ? btn.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2, width: 0, height: 0 };
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Full-page overlay
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1900);

    // Add gentle page pulse
    container.classList.add('celebrate-scale');
    setTimeout(() => container.classList.remove('celebrate-scale'), 1000);

    // Create multiple bursts across the viewport for a whole-page feel
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const rx = Math.random() * window.innerWidth;
            const ry = Math.random() * window.innerHeight;
            createConfetti(rx, ry);
            createSparklesBurst(rx, ry);
        }, i * 200);
    }

    // Central bursts near the button as well
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createConfetti(x + (Math.random()-0.5)*200, y + (Math.random()-0.5)*120);
            createSparklesBurst(x + (Math.random()-0.5)*200, y + (Math.random()-0.5)*120);
        }, 100 + i * 180);
    }

    // Card shake for emphasis
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'shake 0.7s ease-in-out';
    }, 10);

    //pause previous speech
    speechSynthesis.cancel();

    // Play sound
    playSound();
}

// Play happy birthday song - pause previous and restart from beginning
function playSound() {
    try {
        // Create audio instance if it doesn't exist
        if (!birthdayAudio) {
            birthdayAudio = new Audio();
            birthdayAudio.preload = 'auto';
            birthdayAudio.volume = 1.0;
        }

        // Choose a random song and play it from the start
        const chosen = getRandomSong();
        birthdayAudio.pause();
        birthdayAudio.src = chosen;
        birthdayAudio.currentTime = 0;
        birthdayAudio.play().catch(error => {
            console.log('Audio playback error:', error);
        });
    } catch (err) {
        console.log('Audio error:', err);
    }
}

// Add shake animation to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateY(-50%) rotate(0deg); }
        25% { transform: translateY(-50%) rotate(2deg); }
        75% { transform: translateY(-50%) rotate(-2deg); }
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('load', () => {
    createSparkles();
});

// Create random sparkles continuously
setInterval(() => {
    if (Math.random() > 0.7) {
        const sparklesContainer = document.getElementById('sparkles');
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.animationDelay = '0s';
        sparklesContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }
}, 1000);


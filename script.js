// Game configuration with CSUN campus locations
const gameConfig = {
    // CSUN Campus Center coordinates
    centerLat: 34.2408,
    centerLng: -118.5270,
    initialZoom: 17,
    
    // Location bounds for quiz
    locations: [
        {
            name: "Cypress Hall—D1",
            bounds: {
                north: 34.23731929913375,
                south: 34.23571929913375,
                east: -118.52888707527698,
                west: -118.53048707527698
            }
        },
        {
            name: "Bookstore",
            bounds: {
                north: 34.23821860069431,
                south: 34.23661860069431,
                east: -118.52736624914989,
                west: -118.52896624914989
            }
        },
        {
            name: "Library",
            bounds: {
                north: 34.240849301648,
                south: 34.239249301648,
                east: -118.52772034079132,
                west: -118.53092034079132
            }
        },
        {
            name: "Bayramian Hall",
            bounds: {
                north: 34.24117578340211,
                south: 34.23957578340211,
                east: -118.53051057124398,
                west: -118.53211057124398
            }
        },
        {
            name: "Student Recreational Center",
            bounds: {
                north: 34.24071324004192,
                south: 34.23911324004192,
                east: -118.52411182384125,
                west: -118.52571182384125
            }
        }
    ]
};

// Current game state
let gameState = {
    map: null,
    currentLocationIndex: 0,
    score: 0,
    answeredQuestions: [],
    isAnswered: false,
    rectangles: {
        correct: null,
        user: null
    },
    infoWindow: null,
    totalQuestions: 5
};

// Initialize the Google Map with event listeners
function initMap() {
    // Create map centered on CSUN
    gameState.map = new google.maps.Map(document.getElementById('map'), {
        zoom: gameConfig.initialZoom,
        center: {
            lat: gameConfig.centerLat,
            lng: gameConfig.centerLng
        },
        // Disable panning and zooming to prevent cheating
        draggable: false,
        scrollwheel: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        // Hide all map labels to prevent spoilers
        styles: [
            {
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'poi.business',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'transit.station',
                stylers: [{visibility: 'off'}]
            }
        ]
    });

    gameState.infoWindow = new google.maps.InfoWindow();
    gameState.map.addListener('dblclick', handleMapDoubleClick);
    promptNextLocation();
}

// Prompt next location or end quiz if complete
function promptNextLocation() {
    if (gameState.currentLocationIndex >= gameConfig.locations.length) {
        endQuiz();
        return;
    }

    // Reset state for new question
    gameState.isAnswered = false;
    clearRectangles();

    const location = gameConfig.locations[gameState.currentLocationIndex];
    document.getElementById('current-location').textContent = location.name;
    document.getElementById('bottom-instruction').textContent = '🎯 Double-click on the map to find this location';

    // Update progress
    updateProgress();
}

// Update progress bar and score display
function updateProgress() {
    const progressPercent = (gameState.currentLocationIndex / gameConfig.locations.length) * 100;
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    document.getElementById('current-score').textContent = `${gameState.score}/${gameConfig.locations.length}`;
}

// Handle double-click on map - check if answer is correct
function handleMapDoubleClick(event) {
    // Prevent multiple answers for same question
    if (gameState.isAnswered) {
        return;
    }

    gameState.isAnswered = true;

    const clickLat = event.latLng.lat();
    const clickLng = event.latLng.lng();
    const currentLocation = gameConfig.locations[gameState.currentLocationIndex];

    // Check if click is within correct bounds
    const isCorrect = isClickInBounds(
        clickLat,
        clickLng,
        currentLocation.bounds
    );

    // Create rectangles for user's answer and correct location
    const userRectangle = new google.maps.Rectangle({
        bounds: {
            north: clickLat + 0.0005,
            south: clickLat - 0.0005,
            east: clickLng + 0.0007,
            west: clickLng - 0.0007
        },
        map: gameState.map,
        fillColor: isCorrect ? '#00ff88' : '#ff6b6b',
        fillOpacity: 0.35,
        strokeColor: isCorrect ? '#00cc6a' : '#ff4757',
        strokeWeight: 3,
        clickable: false
    });

    gameState.rectangles.user = userRectangle;

    const correctRectangle = new google.maps.Rectangle({
        bounds: currentLocation.bounds,
        map: gameState.map,
        fillColor: isCorrect ? '#00ff88' : '#ff6b6b',
        fillOpacity: 0.15,
        strokeColor: isCorrect ? '#00cc6a' : '#ff4757',
        strokeWeight: 3,
        clickable: false
    });

    gameState.rectangles.correct = correctRectangle;

    // Update score and show feedback
    if (isCorrect) {
        gameState.score++;
        showCelebration();
        showFeedback('🎉 CORRECT! 🎉', true);
    } else {
        showFeedback('❌ WRONG LOCATION ❌', false);
    }

    gameState.answeredQuestions.push({
        index: gameState.currentLocationIndex,
        correct: isCorrect
    });

    // Move to next question after delay
    setTimeout(() => {
        gameState.currentLocationIndex++;
        promptNextLocation();
    }, 2500);
}

// Check if click is within location bounds
function isClickInBounds(lat, lng, bounds) {
    return (
        lat >= bounds.south &&
        lat <= bounds.north &&
        lng >= bounds.west &&
        lng <= bounds.east
    );
}

// Display feedback popup with animation
function showFeedback(message, isCorrect) {
    const popup = document.getElementById('feedback-popup');
    popup.textContent = message;
    popup.className = `feedback-popup ${isCorrect ? 'correct' : 'incorrect'}`;
    popup.style.display = 'block';

    if (isCorrect) {
        popup.classList.add('bounce');
    }

    setTimeout(() => {
        popup.style.display = 'none';
        popup.classList.remove('bounce');
    }, 2000);
}

// Animate celebratory confetti on correct answer
function showCelebration() {
    const container = document.getElementById('confetti-container');
    const colors = ['#00ff88', '#00d4ff', '#667eea', '#764ba2', '#ff6b6b'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '0';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.opacity = '1';

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Remove rectangles from map
function clearRectangles() {
    if (gameState.rectangles.correct) {
        gameState.rectangles.correct.setMap(null);
        gameState.rectangles.correct = null;
    }
    if (gameState.rectangles.user) {
        gameState.rectangles.user.setMap(null);
        gameState.rectangles.user = null;
    }
}

// Display final score modal or restart game
function endQuiz() {
    const finalScoreText = document.getElementById('final-score-text');
    const correct = gameState.score;
    const incorrect = gameConfig.locations.length - gameState.score;

    if (correct === gameConfig.locations.length) {
        finalScoreText.innerHTML = `🏆 PERFECT! 🏆<br>${correct}/${gameConfig.locations.length} Correct`;
    } else {
        finalScoreText.innerHTML = `${correct} Correct<br>${incorrect} Incorrect`;
    }

    document.getElementById('score-modal').style.display = 'flex';
    clearRectangles();
}

// Reset game state and start over
function restartQuiz() {
    gameState = {
        map: gameState.map,
        currentLocationIndex: 0,
        score: 0,
        answeredQuestions: [],
        isAnswered: false,
        rectangles: {
            correct: null,
            user: null
        },
        infoWindow: gameState.infoWindow,
        totalQuestions: 5
    };

    document.getElementById('score-modal').style.display = 'none';
    document.getElementById('current-score').textContent = '0/5';
    document.getElementById('progress-fill').style.width = '0%';
    promptNextLocation();
}

// Initialize game once the page and Google Maps API are ready
function startGame() {
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
    initMap();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startGame);
} else {
    startGame();
}

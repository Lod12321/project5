(function loadGoogleMaps() {
    const apiKey = window.GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        console.error('Missing Google Maps API key. Create config.js from config.example.js.');
        return;
    }

    const mapsScript = document.createElement('script');
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    mapsScript.onload = function loadGameScript() {
        const gameScript = document.createElement('script');
        gameScript.src = 'script.js';
        document.body.appendChild(gameScript);
    };
    document.body.appendChild(mapsScript);
})();

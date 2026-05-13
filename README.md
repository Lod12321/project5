# Project 5: Google Maps Quiz

Live Pages Link: https://lod12321.github.io/project5/
Github Link: https://github.com/Lod12321/project5.git

## Deliverables

- `index.html`: Page structure and Google Maps API script.
- `style.css`: Layout, colors, feedback popup, modal, and responsive styling.
- `script.js`: Game logic, map setup, location bounds, answer checking, scoring, and quiz reset.
- `maps-loader.js`: Loads the Google Maps JavaScript API using the local API key config.
- `config.example.js`: Example config file showing where the API key goes.
- `README.md`: Project summary, requirements, and Google Maps features used.

## Requirements 

- The app displays a Google Map centered on CSUN.
- The user is prompted to find a specific campus location.
- The user answers by double-clicking on the map.
- The app checks whether the double-click is inside the correct location bounds.
- A correct answer shows the selected area in green.
- An incorrect answer shows the correct location area in red.
- The game includes five total locations: one instructor-specified location and four student-chosen locations.
- The final score is shown after all five questions.
- Map panning and zooming are disabled.
- The page renders in Chrome using HTML, CSS, and JavaScript.

## What Was Added

- A score counter and progress bar.
- A restart button and final score modal.
- Animated feedback for correct and incorrect answers.
- Confetti-style celebration when the user answers correctly.
- Hidden map labels so location names do not appear on the map.
- Custom rectangular answer areas for each campus location.

## Locations Used

1. Cypress Hall D1
2. Bookstore
3. Library
4. Bayramian Hall
5. Student Recreational Center

## Two Unique Google Maps Features

### Map Class

Documentation: https://developers.google.com/maps/documentation/javascript/reference/map#Map

The `Map` class is used in `script.js` inside the `initMap()` function:

```js
gameState.map = new google.maps.Map(document.getElementById('map'), {
```

This creates the Google Map inside the HTML element with the id `map`. The map is configured with a starting zoom level, CSUN center coordinates, disabled controls, and custom label-hiding styles.

### LatLng Methods: lat() and lng()

Documentation: https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng

The `lat()` and `lng()` methods are used in `script.js` inside the `handleMapDoubleClick(event)` function:

```js
const clickLat = event.latLng.lat();
const clickLng = event.latLng.lng();
```

When the user double-clicks the map, Google Maps provides the clicked position as a `LatLng` object. The app uses `lat()` and `lng()` to read the clicked latitude and longitude, then compares those values with the current location bounds.

## How to Run

1. Clone or download the repository.
2. Create a Google Maps API key in Google Cloud Console.
3. Enable the Maps JavaScript API for that key.
4. Copy `config.example.js` and rename the copy to `config.js`.
5. Replace `YOUR_API_KEY_HERE` in `config.js` with your own API key.
6. Open `index.html` in Chrome.
7. Read the location name shown at the bottom of the page.
8. Double-click where you think the location is on the map.
9. Continue until all five questions are completed.

Example `config.js`:

```js
window.GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';
```

## API Key Setup

The API key is not hardcoded in `index.html`. The project uses a local ignored file for the real key:

- `config.js`

`config.js` is listed in `.gitignore` so the real key is not committed with the project. The repository includes `config.example.js` as a safe template.

Because this is a browser-based Google Maps project, the API key is still visible to the browser when the map loads. The correct way to protect it is to restrict the key in Google Cloud Console by allowed websites and enabled APIs.

Recommended key restrictions:

- Application restriction: Websites
- Allowed websites for local testing: `http://localhost/*` and `http://127.0.0.1/*`
- API restriction: Maps JavaScript API only

If the project is deployed with GitHub Pages, add the GitHub Pages URL to the allowed websites list.

## If the Map Does Not Load

- Confirm that `config.js` exists in the project folder.
- Confirm that `config.js` contains a real Google Maps API key.
- Confirm that the Maps JavaScript API is enabled for the key.
- Check that the key's website restrictions allow the page URL you are using.

## Notes

This project uses the Google Maps JavaScript API for the map display, user interaction, and location-based coordinate handling. The game logic is written in plain JavaScript.

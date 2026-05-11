# Project 5: Google Maps Quiz

Live Link:
Github Link:

## Deliverables

- `index.html`: Page structure and Google Maps API script.
- `style.css`: Layout, colors, feedback popup, modal, and responsive styling.
- `script.js`: Game logic, map setup, location bounds, answer checking, scoring, and quiz reset.
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

1. Open `index.html` in Chrome.
2. Read the location name shown at the bottom of the page.
3. Double-click where you think the location is on the map.
4. Continue until all five questions are completed.

## Notes

This project uses the Google Maps JavaScript API for the map display, user interaction, and location-based coordinate handling. The game logic is written in plain JavaScript.

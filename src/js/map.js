"use strict";

//Skapar en leaflet-karta
let map = L.map('map').setView([59.6099, 16.5448], 13);

//Lägg till ett OpenStreetMap-lager till kartan
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Skapa en marker för att visa platsen
let marker = L.marker([59.6099, 16.5448]).addTo(map);

//Funktion för att hämta platsinformation och uppdatera kartan samt platsmarkören
async function searchLocation(place) {
    try {
        //Fetch-anrop
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${place}&format=json`);
        const data = await response.json();

        //Om data finns, uppdatera kartan och markera platsen
        if (data.length > 0) {
            let lat = parseFloat(data[0].lat);
            let lng = parseFloat(data[0].lon);
            map.setView([lat, lng], 13);
            marker.setLatLng([lat, lng]);
        } else {
            alert("Platsen kunde inte hittas.");
        }
    } catch {
        document.getElementById("error2").innerHTML = "<p>Något gick fel, prova igen senare.</p>"
    }
}

//Variabler för sökfunktion
const searchBtnEl = document.getElementById("searchBtn");
const searchInputEl = document.getElementById("searchInput");

//Händelselyssnare och funktion för sökfunktion
searchBtnEl.addEventListener("click", async function () {
    let place = searchInputEl.value;
    if (place.trim() !== " ") {
        await searchLocation(place);
    } else {
        alert("Skriv in en plats.");
    }
});

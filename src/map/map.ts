import mapboxgl from "mapbox-gl";
import { type Antena } from "../types/antenna.type";
mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmVzeGF2aWVyOTkiLCJhIjoiY20zbWUyMWdqMTFzZDJrcHhidjlhZjFwaCJ9.JxyJSYQBmQI77epaw4xUaQ";

let map: mapboxgl.Map;
const activeMarkers: { [key: string]: mapboxgl.Marker } = {};

console.log("inicio", activeMarkers);

export function initMap(): void {
    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-79.8875, - 2.1900],
        zoom: 8,
    });
}

export function showAntennaOnMap(antena: Antena): void {

    if (activeMarkers[antena.id]) {
        map.flyTo({ center: [antena.longitude, antena.latitude], zoom: 16 });
        return;
    }
    //console.log("inicio", activeMarkers);
    const marker = new mapboxgl.Marker({ color: '#f72e13' })
        .setLngLat([antena.longitude, antena.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`
        <div style="color: black;">
            <b>Name:</b> ${antena.name}<br>
            <b>Operator:</b> ${antena.operator}<br>
            <b>Type:</b> ${antena.type}<br>
            <b>Status:</b> ${antena.status}<br>
            <b>Powe (Kw):</b> ${antena.powerKw}<br>
            <b>Neighborhood:</b> ${antena.neighborhood}<br>
        </div>
    `))
        .addTo(map);

    activeMarkers[antena.id] = marker;

    map.flyTo({
        center: [antena.longitude, antena.latitude],
        zoom: 16,
        essential: true
    });
}

export function hideAntennaFromMap(id: string): void {
    let marker = activeMarkers[id]
    if (marker) {
        marker.remove();
        delete activeMarkers[id];
    }
    // map.flyTo({ center:[-79.8875, - 2.1900], zoom: 10 });
}

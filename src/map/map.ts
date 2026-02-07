import mapboxgl from "mapbox-gl";
import { type Antena } from "../types/antenna.type";
mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmVzeGF2aWVyOTkiLCJhIjoiY20zbWUyMWdqMTFzZDJrcHhidjlhZjFwaCJ9.JxyJSYQBmQI77epaw4xUaQ";

let map: mapboxgl.Map;
const activeMarkers: { [key: string]: mapboxgl.Marker } = {};

export function initMap(): void {
    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-79.8875, - 2.1900],
        zoom: 8,
    });
}

export function showAntennaLocation(antena: Antena): void { 

    if (activeMarkers[antena.id]) {
        map.flyTo({ center: [antena.longitude, antena.latitude], zoom: 16 });
        return;
    }
    let marker = new mapboxgl.Marker({ color: '#f72e13' })
        .setLngLat([antena.longitude, antena.latitude])
        .addTo(map);

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    })


    let infoPopup: string = `<div style="color: black;">
            <b>Name:</b> ${antena.name}<br>
            <b>Operator:</b> ${antena.operator}<br>
            <b>Type:</b> ${antena.type}<br>
            <b>Status:</b> ${antena.status}<br>
            <b>Powe (Kw):</b> ${antena.powerKw}<br>
            <b>Neighborhood:</b> ${antena.neighborhood}<br>
        </div>`;

    marker.getElement().addEventListener("mouseenter", () => {
        map.getCanvas().style.cursor = 'pointer';
        popup.setLngLat([antena.longitude, antena.latitude]).setHTML(infoPopup).addTo(map);
    });

    marker.getElement().addEventListener("mouseleave", () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    //console.log(activeMarkers);
    activeMarkers[antena.id] = marker;
    map.flyTo({
        center: [antena.longitude, antena.latitude],
        zoom: 12,
        essential: true
    });
}

export function hideAntennaLocation(id: string): void {
    let marker = activeMarkers[id]
    if (marker) {
        marker.remove();
        delete activeMarkers[id];
    }
    // map.flyTo({ center:[-79.8875, - 2.1900], zoom: 10 });
}

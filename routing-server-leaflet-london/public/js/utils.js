import ApiClient from "./apiClient.js";

export const map = L.map('map', {
    zoomControl: false
}).setView([6.673175, -1.565423], 16);

L.control.scale({
    position: 'topleft'
}).addTo(map);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

L.control.sidepanel('mySidepanelLeft', {
    tabsPosition: 'left',
    startTab: 'tab-1'
}).addTo(map);

L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

const clearButton = L.control({position: 'topright'});
const markersContainer = [];
let userX = null;
let userY = null;
let polyline = null;

function clearMarkers() {
    for (let m of markersContainer) {
        map.removeLayer(m);
    }
    markersContainer.length = 0; // Clear the array of markers

    if (polyline) {
        map.removeLayer(polyline); // Remove the polyline from the map
        polyline = null; // Reset the polyline variable
    }
}

clearButton.onAdd = () => {
    const div = L.DomUtil.create('div');
    div.innerHTML = '<button class="btn btn-danger clear-button">Clear</button>';

    div.querySelector('.clear-button').addEventListener('click', clearMarkers);

    return div;
};

clearButton.addTo(map);

function onMapClick(e) {
    clearMarkers(); // Clear existing markers
    const marker = L.marker(e.latlng).addTo(map);
    markersContainer.push(marker);

    // Set the coordinates in the search bar
    const searchBarFrom = document.getElementById('searchInputFrom');
    searchBarFrom.value = 'My Location';

    // If you need the coordinates, you can use e.latlng.lat and e.latlng.lng
    console.log(`Clicked location: Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
    const [x, y] = [e.latlng.lng, e.latlng.lat];
    userX = x
    userY = y
}

map.on('click', onMapClick);

export const onSubmitForm = (routeUrl, formID) => {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById(formID);
        const spinner = document.getElementById('spinner');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            spinner.style.display = 'flex';

            const formData = new FormData(form);
            const jsonData = Object.fromEntries(formData.entries());
            if (jsonData.from === "My Location") {
                jsonData.from_location = `POINT(${userX} ${userY})`
            }

            const data = JSON.stringify(jsonData);

            ApiClient(routeUrl, 'POST', data, result => {
                    spinner.style.display = 'none';
                    const data = result.paths.map(res => res.geom_geographic);
                    const distance = result.distance;
                    drawPath(data, distance);
                },
                error => console.log(error));
        });
    });
};

export const searchFilter = (searchInputID, dropdownListID, data) => {
    const searchInput = document.getElementById(searchInputID);
    const dropdownList = document.getElementById(dropdownListID);

    searchInput.addEventListener("input", function () {
        const value = searchInput.value.toLowerCase();
        dropdownList.innerHTML = "";

        const filteredData = data.filter(item => item.toLowerCase().includes(value));

        filteredData.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("dropdown-item");
            li.textContent = item;
            li.setAttribute("role", "button");
            dropdownList.appendChild(li);

            li.addEventListener("click", () => {
                searchInput.value = item;
                dropdownList.classList.remove("show");
            });
        });

        if (value === '' || filteredData.length === 0) {
            dropdownList.classList.remove("show");
        } else {
            dropdownList.classList.add("show");
        }
    });
};

function drawPath(data, distance) {
    const polylineCoordinates = [];

    data.forEach((wktStr, index) => {
        let wkt = new Wkt.Wkt();
        wkt.read(wktStr);

        let latLng = wkt.toObject().getLatLng();
        let leafletObj = L.circleMarker(latLng, {
            radius: 3,
            fillColor: '#3889bc',
            color: '#3889bc',
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.8,
        });

        polylineCoordinates.push(latLng);
        markersContainer.push(leafletObj);
        leafletObj.addTo(map);

        if (index === 0) {
            map.flyTo(leafletObj.getLatLng(), 15, {duration: 100});
        }
    });

    if (polyline) {
        map.removeLayer(polyline); // Remove the existing polyline if it exists
    }

    const options = {color: '#198754', weight: 2, delay: "1000"};
    polyline = new L.Polyline.AntPath(polylineCoordinates, options);
    polyline.addTo(map);

    const group = L.featureGroup(markersContainer);
    map.fitBounds(group.getBounds(), {padding: [10, 10]});

    if (polylineCoordinates.length > 0) {
        var lastPoint = polylineCoordinates[polylineCoordinates.length - 1];
        var distancePopup = L.popup()
            .setLatLng(lastPoint)
            .setContent(`<div style="font-size: 16px; font-weight: bold; color: #333;">Approximately ${parseInt(distance)}m walk</div>`)
            .openOn(map);
    }
}

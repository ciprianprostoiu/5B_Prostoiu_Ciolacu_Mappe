export const createMap = () =>{
    let zoom = 12;
    let maxZoom = 19;
    let map = L.map('map').setView([45.48760768, 9.2038215], zoom);
    let places = [];
     return{
        add: (element,conf,Map) =>{
            let url="https://us1.locationiq.com/v1/search?key=%TOKEN &q=%NOME &format=json&"
            url = url.replace("%TOKEN",conf.token)
            url = url.replace("%NOME",element)
            fetch(url)
            .then(r => r.json())
            .then(data => {
                const dato ={
                    name: element,
                    coords: [data[0].lat, data[0].lon]
                }
                places.push(dato);
                console.log(places);
                Map.render()
            })
        },
        render: () => {
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
               maxZoom: maxZoom,
               attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            places.forEach((place) => {
               const marker = L.marker(place.coords).addTo(map);
               marker.bindPopup(`<b>${place.name}</b>`);
            });
     }
    }
}
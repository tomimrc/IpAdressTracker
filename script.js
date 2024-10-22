const input = document.getElementById("input")
const btn = document.getElementById("btn")
const textLocation  = document.getElementById("textLocation")
const textIsp = document.getElementById("textIsp")
const textTimezone = document.getElementById("textTimezone")
const textIp = document.getElementById("textIp")
const form = document.getElementById("form")
var map = null



const fetchear = async (e) => {
    
    try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_iDFjKXYijcKYpafP1Xg3ZzbZsX9o2&ipAddress=`)
        const parsed = await res.json()
        console.log(parsed);
        
        
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        
        else{
            const {ip,location,isp} = parsed
            textLocation.innerText = location.region
            textTimezone.innerText = location.timezone
            textIp.innerText = ip
            textIsp.innerText = isp
            map = L.map('map').setView([location.lat, location.lng], 16);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 250,
            }).addTo(map);
            var marker = L.marker([location.lat, location.lng]).addTo(map);
            }
            
    } catch (error) {
        console.log(error);
        
    }
    
}   

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

document.addEventListener("DOMContentLoaded", fetchear)


const buscar = async (e) => {      
    e.preventDefault()
    try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_iDFjKXYijcKYpafP1Xg3ZzbZsX9o2&ipAddress=${input.value}`)
        const parsed = await res.json()
        
        if (!res.ok) {

            throw new Error(`Response status: ${res.status}`);
        }
        
        else{
            const {ip,location,isp} = parsed
            textLocation.innerText = location.region
            textTimezone.innerText = location.timezone
            textIp.innerText = ip
            textIsp.innerText = isp
            console.log(map);
            if (map != undefined) {
                    map.remove()
                    console.log("ME ESTOY EJECUTANDOOOOO")
                    // map.setView(location.lat, location.lng);
                    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    //     maxZoom: 250,
                    // }).addTo(map);
                    map = L.map('map').setView([location.lat, location.lng], 13);
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 250,
                    }).addTo(map);
                    var marker = L.marker([location.lat, location.lng]).addTo(map);
                    
                }            
    }} catch (error) {
        console.log(error);
        
    }

}
// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);

// const submit = (e) => {
//     e.preventDefault()
    
//     if(!input.value){
//         return  console.log('error')
//     }else{
//         fetchear()
//     }
// }

form.addEventListener("submit", buscar)
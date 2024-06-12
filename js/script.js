let maindiv = document.createElement("div");
maindiv.classList.add("container");

let body = document.querySelector("#body");
body.appendChild(maindiv);

let title = document.createElement("h1");
title.classList.add("text-center");
title.innerText = "REST countries and Weather APIs";
title.id = "title";
maindiv.appendChild(title);

let desc = document.createElement("p");
desc.classList.add("text-center");
desc.innerText = "rest countries and weather API fetching using DOM";
desc.id = "description";
maindiv.appendChild(desc);

let row = document.createElement("div");
row.classList.add("row");
row.id = "row";
maindiv.appendChild(row);

// let weathercard = document.createElement("div");
// weathercard.classList.add("card","position-sticky","container","col-6","top-50","right-50");
// row.appendChild(weathercard);
// let weathercardHeader = document.createElement("div");
// weathercardHeader.classList.add("card-Header");
// weathercard.appendChild(weathercardHeader);
// let weathercardBody = document.createElement("div");
// weathercardBody.classList.add("card-body");
// weathercard.appendChild(weathercardBody);
// weathercard.style.display = "none"

let resturl = "https://restcountries.com/v3.1/all";

async function fetchrest(){
    let restresponse = await fetch(resturl);
    let restdata = await restresponse.json();
    return restdata;
}
fetchrest().then(res => {
    console.log(res);
    res.forEach(country => {
        let carddiv = document.createElement("div");
        carddiv.classList.add("col-sm-6","col-md-4","col-lg-4","col-xl-4","my-3");

        let card = document.createElement("div")
        card.classList.add("card","h-100");
        carddiv.appendChild(card);

        let cardhead = document.createElement("div");
        cardhead.classList.add("card-header","text-white","text-center","bg-dark");
        cardhead.innerText = country.name.common.toUpperCase();
        card.appendChild(cardhead);

        let cardimg = document.createElement("img");
        cardimg.classList.add("card-img-top","h-100","img-fluid");
        cardimg.src = country.flags.svg;
        card.appendChild(cardimg);

        let cardbody = document.createElement("div");
        cardbody.classList.add("card-body");
        let cardtext = document.createElement("div");
        cardtext.classList.add("card-text","text-center");
        cardtext.innerHTML = `<p id="capital">capital : ${country.capital}</p> <p id="region">Region : ${country.region}</p> <p id="code"> country code : ${country.cca3}</p>`;
        
        let weatherbtn = document.createElement("div");
        weatherbtn.classList.add("btn","btn-secondary");
        weatherbtn.id = country.name.common;
        weatherbtn.innerText = "click for weather";

        weatherbtn.addEventListener('click',() => {
            console.log((country.latlng)[0]);
            async function fetchweather() {
                let weatherresponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${(country.latlng)[0]}&lon=${(country.latlng)[1]}&appid=be97b5a6031117c9213cc8fb2ae49124`)
                let weatherjson = await weatherresponse.json();
                return weatherjson;
            }
            fetchweather().then(res => {
                console.log((res.weather)[0].description);
            })
        })

        cardtext.appendChild(weatherbtn);
        cardbody.appendChild(cardtext);
        card.appendChild(cardbody);

        row.appendChild(carddiv);
    });
})
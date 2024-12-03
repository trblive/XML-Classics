function loadContent(page) {
    'use strict';

    const file = page === "home" ? "/XML-Classics/resources/home.html" : "/XML-Classics/resources/cars.html";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", file, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = xhr.responseText;

            if (page === "cars") {
                fetchCarsData();
            }
        }
    };

    xhr.send();
}

function navigateTo(page) {
    'use strict';

    // update the URL without reloading the page
    const url = page === "home" ? "/XML-Classics" : "/XML-Classics/cars";
    history.pushState({ page: page }, null, url);

    loadContent(page);
}

function fetchCarsData() {
    'use strict';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/XML-Classics/resources/classicCars.xml', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            displayCars(xhr.responseXML);
        }
    };

    xhr.send();
}

function displayCars(xml) {
    'use strict';
    
    const carList = document.getElementById('car-list');
    const cars = xml.getElementsByTagName('car');

    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        const name = car.getElementsByTagName('name')[0].textContent;
        const model = car.getElementsByTagName('model')[0].textContent;
        const country = car.getElementsByTagName('country')[0].textContent;
        const company = car.getElementsByTagName('company')[0].textContent;
        const price = car.getElementsByTagName('price')[0].textContent;
        const year = car.getElementsByTagName('year')[0].textContent;
        const image = car.getElementsByTagName("image")[0].textContent;

        const carItem = document.createElement('div');
        carItem.className = 'car-item';

        carItem.innerHTML = `
            <img src="images/${image}" alt="${name} ${model}" class="car-image">
            <div class="car-meta">
                  <h2>${name} (${model})</h2>
                  <p><span>Company</span> ${company}</p>
                  <p><span>Country</span> ${country}</p>
                  <p><span>Price</span> ${price}</p>
                  <p><span>Year</span> ${year}</p>
            </div>`;

        carList.appendChild(carItem);
    }
}

function init() {
    'use strict';

    // add event listeners to navigation links
    document.getElementById("home-link").addEventListener("click", () => navigateTo("/XML-Classics"));
    document.getElementById("sale-link").addEventListener("click", () => navigateTo("/XML-Classics/cars"));

    // add the event listener to the rendered button
    if (document.getElementById("sale-btn")) {
        this.addEventListener("click", () => navigateTo("/cars"));
    }

    // handle initial page load and forward/back navigation
    window.onpopstate = function (event) {
        if (event.state && event.state.page) {
            loadContent(event.state.page);
        } else {
            loadContent("home"); // Default to home
        }
    };

    // load the correct content based on the URL
    const initialPage = window.location.pathname === "/XML-Classics/cars" ? "cars" : "home";
    navigateTo(initialPage);
}

window.onload = init;
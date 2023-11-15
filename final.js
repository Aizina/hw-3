function makeRequest() {
    let pageNumberInput = document.getElementById("pageNumber");
    let limitInput = document.getElementById("limit");
    let resultDisplay = document.getElementById("result");

    let pageNumber = parseInt(pageNumberInput.value, 10);
    let limit = parseInt(limitInput.value, 10);

    if ((!isInRange(pageNumber, 1, 10) || isNaN(pageNumber)) && (!isInRange(limit, 1, 10) || isNaN(limit))) {
        resultDisplay.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
    } else if (!isInRange(pageNumber, 1, 10) || isNaN(pageNumber)) {
        resultDisplay.textContent = "Номер страницы вне диапазона от 1 до 10";
    } else if (!isInRange(limit, 1, 10) || isNaN(limit)) {
        resultDisplay.textContent = "Лимит вне диапазона от 1 до 10";
    } else {
        let xhr = new XMLHttpRequest();
        let url = `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limit}`;
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);

                // Display images on the page
                displayImages(data);

                // Store the successful request data in localStorage
                localStorage.setItem('lastRequestData', JSON.stringify(data));
            }
        };

        xhr.send();
    }
    // НЕ Смогла понять как сделать так, чтобы при перезагрузке все сохранялось
    let storedData = localStorage.getItem('lastRequestData');
    if (storedData) {
    displayImages(JSON.parse(storedData));
}
}

function isInRange(value, min, max) {
    return parseInt(value) >= min && parseInt(value) <= max;
}

function displayImages(data) {
    // Assuming there is an element with the id "result" where you want to display images
    let resultDisplay = document.getElementById("result");
    resultDisplay.innerHTML = ""; // Clear previous content

    data.forEach(photo => {
        let img = document.createElement("img");
        img.src = photo.url;
        resultDisplay.appendChild(img);
    });
}

// Check if there is previously stored data and display it


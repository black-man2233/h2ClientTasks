"use strict";
const apiBaseUrl = "https://cityinfo.buchwaldshave34.dk/api/";
const apiEndpoints = {
    city: "City",
    country: "Country",
    cityLanguage: "CityLanguage",
    language: "Language",
};
function addCity() {
    // Get the values from the form
    const countrySelect = document.getElementById("country");
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    if (nameInput.value === "" || countrySelect.value === "" || descriptionInput.value === "") {
        // Handle the case where one of the inputs is null
        return;
    }
    const name = nameInput.value;
    const country = countrySelect.value;
    const description = descriptionInput.value;
    // Create a new city object
    const city = new City(name, country, description);
    console.log(city);
}
class City {
    constructor(name, country, description) {
        this.Name = name;
        this.Country = country;
        this.Description = description;
    }
}

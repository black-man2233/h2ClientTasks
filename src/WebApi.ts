const apiBaseUrl = "https://cityinfo.buchwaldshave34.dk/api/";
const apiEndpoints = {
  city: "City",
  country: "Country",
  cityLanguage: "CityLanguage",
  language: "Language",
};

function addCity() {
  // Get the values from the form
  const countrySelect = document.getElementById("country") as HTMLSelectElement;
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "description"
  ) as HTMLInputElement;

  if (nameInput.value === "" || countrySelect.value === ""  || descriptionInput.value === "") {
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
  Name: any;
  Country: any;
  Description: any;
  Language: any;

  constructor(name: any, country: any, description: any) {
    this.Name = name;
    this.Country = country;
    this.Description= description;
  }
}

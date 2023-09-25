const apiBaseUrl = "https://cityinfo.buchwaldshave34.dk/api/";
let cities = [];
let cityLanguages = [];
let countries = {};
let languages = {};

const userName = "?UserName=UserKevin";
const apiEndpoints = {
  city: "City",
  country: "Country",
  cityLanguage: "CityLanguage",
  language: "Language",
};

function fetchData(apiEndpoints) {
  return fetch(apiBaseUrl + apiEndpoints + userName).then((response) =>
    response.json()
  );
}

// Get Data
function getData() {
  Promise.all([
    fetchData(apiEndpoints.city),
    fetchData(apiEndpoints.cityLanguage),
    fetchData(apiEndpoints.country),
    fetchData(apiEndpoints.language),
  ])

    .then(([cityData, cityLanguageData, CountryData, languageData]) => {
      cities = cityData;
      cityLanguages = cityLanguageData;
      languages = {};
      countries = {};

      CountryData.forEach((country) => {
        countries[country.countryID] = country.countryName;
      });

      languageData.forEach((language) => {
        languages[language.languageId] = language.languageName;
      });

      displayItem(cities);
    })
    .catch((error) => console.error("Unable to get items.", error));
}

// Add new Item
function addItem() {
  const nameTextbox = document.getElementById("add-name");
  const descTextbox = document.getElementById("add-desc");
  const conIdTextbox = document.getElementById("add-conId");

  const item = {
    name: nameTextbox.value.trim(),
    description: descTextbox.value.trim(),
    countryID: conIdTextbox.value.trim(),
  };

  fetch(apiBaseUrl + apiEndpoints.apiCity + userName, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => {
      getData();
      nameTextbox.value = "";
      descTextbox.value = "";
      conIdTextbox.value = "";
    })
    .catch((error) => console.error("Unable to add item.", error));
}

//Update Item
function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        cityId: parseInt(itemId, 10),
        description: document.getElementById('edit-desc').value.trim(),
        countryID: document.getElementById('edit-conId').value.trim(),
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${apiBaseUrl + apiEndpoints.apiCity}/${itemId}` + ThisUserName, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getData())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();
    return false;
}

// Delete Item
function deleteItem(cityId) {
    fetch(apiBaseUrl + apiEndpoints.city + userName + "/" + cityId, {
      method: "DELETE",
    })
      .then(() => getData())
      .catch((error) => console.error("Unable to delete item.", error));
  }  

// Display Item in tables
function displayItem(data) {
  const tBody = document.getElementById("table");
  tBody.innerHTML = "";

  data.forEach((item) => {
    let tr = tBody.insertRow();

    addCell(tr, CountryIdToName(item.countryID));
    addCell(tr, item.name);
    addCell(tr, item.description);
    const cLang = item.cityLanguages
      .map((langs) => langs.languageName)
      .join(", ");
    addCell(tr, cLang);

    addBtnCell(tr, "Edit", () => displayEditForm(item.cityId));
    addBtnCell(tr, "Delete", () => deleteItem(item.cityId));
  });
}

// Display Edit form
function displayEditForm(cityId) {
  const item = cities.find((c) => c.cityId === cityId);
  document.getElementById("edit-id").value = item.cityId;
  document.getElementById("edit-name").value = item.name;
  document.getElementById("edit-desc").value = item.description;

  for (const countyID in countries) {
    const option = document.createElement("option");
    option.value = countyID;
    option.innerText = countries[countyID];
    document.getElementById("edit-coid").appendChild(option);
  }
}



//counry Id ToName
function CountryIdToName(countryId) {
  return countries[countryId] || "";
}

// Appending Cell
function addCell(tableRow, text) {
  const cell = tableRow.insertCell();
  cell.appendChild(document.createTextNode(text));
}

// Appending buttons to Cell
function addBtnCell(tableRow, text, clickHandler) {
  const cell = tableRow.insertCell();
  const btn = document.createElement("button");

  btn.innerText = text;
  btn.onclick = clickHandler;
  cell.appendChild(btn);
}

// Cleaaaaan LEEEEEEAN
function closeInput() {
  document.getElementById("editForm").style.display = "none";
}

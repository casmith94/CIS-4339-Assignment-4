const countriesList = document.getElementById("countries");
let countries;
const url = "https://restcountries.eu/rest/v2/all"

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}


async function loadapi(api_url){
  const response = await fetch(api_url);
  var data = await response.json();
  return data
}

loadapi(url).then(data=>{
  initialize(data);
  dropdown(data);
})

 function initialize(countriesData) {
  countries = countriesData;
  let options = "";
 
  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);

  countriesList.innerHTML = options;

  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

  function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("region").innerHTML = countryData.region;
}

function dropdown(data){
  const regions = document.getElementById("regions");
  region_list = data;
  let options = "";
  let regArr = [];
  region_list.forEach(reg => regArr.push(reg.region));

  let regs = regArr.filter((item, i, ar) => ar.indexOf(item) == i)
  defArr = regs.reverse();
  for(i = 0; i<defArr.length; i++){
    options += `<option value="${defArr[i]}">${defArr[i]}</option>`
  }
  regions.innerHTML = options;
}

  function displayRegion(){
    var r = document.getElementById("regions")
    var txt = r.options[r.selectedIndex].text;
    let url = "https://restcountries.eu/rest/v2/region/" + txt;
    loadapi(url).then(data=> {
      displayRegionInfo(data);
    })
  }

    function displayRegionInfo(data){
      var r = document.getElementById("regions")
      var txt = r.options[r.selectedIndex].text;
      const rgIn = document.getElementById("regCC")
      let regInfo = ""
      data.forEach(set => regInfo+= `<b>Country:</b> ${set.name} <b>Capital:</b> ${set.capital}<br>`)
      rgIn.innerHTML = regInfo;
    }
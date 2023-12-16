const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput =document.querySelector('.search-container input');
const themeChanger =document.querySelector('.theme')
let allCountriesData;



fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data);
        allCountriesData = data;

    })


filterByRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
    })
})

function renderCountries(data){
    countriesContainer.innerHTML = '';

        data.forEach((country) => {

            const countryCard = document.createElement('a');

            countryCard.classList.add('country-card')
            countryCard.href = `/country.html?name=${country.name.common}`

            const cardHtml = `
                <img src="${country.flags.svg}" alt="${country.name.common} flag">
                <div class="card-text">
                    <h3 class="card-title">${country.name.common}</h3>
                    <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region:</b> ${country.region}</p>
                    <p><b>Capital:</b> ${country.capital?.[0]}</p>
                </div>
            `

            countryCard.innerHTML = cardHtml

            countriesContainer.append(countryCard)
        })
}

searchInput.addEventListener('input', (e) => {
    const filterCountries = allCountriesData.filter((country) => {
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    })
    renderCountries(filterCountries)
})


let theme = localStorage.getItem('theme') || 'white';

themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle (`dark`)

    if(document.body.classList.contains('dark')){
        localStorage.setItem('theme','dark')
        themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`
    }else{ 
        localStorage.setItem('theme','white')
        themeChanger.innerHTML = `<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Dark Mode`
    }
})

window.addEventListener('load',()=>{
    document.body.classList.add(`${theme}`)
})




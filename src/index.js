import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from "notiflix";
import onFetchData from "./fetch-api";
const DEBOUNCE_DELAY = 300;

// Notiflix
const refs = {
    inputEl: document.querySelector('#search-box'),
    searchCountryListEl: document.querySelector('.country-list')

}

refs.inputEl.addEventListener('input',debounce(onEntering,DEBOUNCE_DELAY))
function onEntering(e) {
    const inputValue = e.target.value.trim();
    console.log();
    onFetchData(inputValue).then(data => {
   checkArrLength(data)
})
}

console.log('one');


function checkArrLength(data) {
    if (data.length > 10) {
        console.log(data.length);
       return Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.")
    }
    // // else if (!!~data.length) {
        
    //    return Notiflix.Notify.failure("Oops, there is no country with that name")
    // }
     return createMarkup(data);
    }
   

function createMarkup(data) {
    const markup = data.map(el => `
    <li><img src="${el.flags.svg}" width="35px" height="50px" alt="flag of ${el.name.common} "><span>${el.name.common}</span></li>`)
        .join('');
    refs.searchCountryListEl.innerHTML = markup;
}
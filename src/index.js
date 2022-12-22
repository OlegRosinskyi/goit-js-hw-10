import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const inputEl = document.querySelector('#search-box');
//const divEl = document.querySelector('.country-info');
const ulEl = document.querySelector('.country-list');

const articleElement = articls => {
  return articls
    .map(({ name, capital, population, flags, languages, cca3 }, index) => {
      return `<li> Country - ${index + 1} <div class="country-info">
   
   <ul>
    <li>  <p>name: ${name.official}  </p> </li>
    <li> <p>capital: ${capital} </p> </li>
    <li> <p>population: ${population} </p></li> 
    <li> flags: <img src="${flags.svg}" width="100px"alt="flag"> </li>
    <li> <p>languages: ${cca3}</p>
    
    </ul>
    </div>
    </li>`;
    })
    .join('');
};
//name.cca3.toLowerCase() languages
console.log(inputEl);
const DEBOUNCE_DELAY = 300;

const onInput = event => {
  fetchCountries(event.target.value)
    .then(
      Response => Response.json()
      //let resultList = Response.json();
    )
    .then(articls => {
      console.log(articls);
      if (articls.status === 404) {
        ulEl.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else {
        // console.log(articls[0].cca3.toLowerCase());
        //const lang = articls[0].cca3.toLowerCase();
        if (articls.length > 10) {
          ulEl.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          console.log(articls);
          ulEl.innerHTML = articleElement(articls);
        }
      }
    })
    .catch(err => {
      console.log(err);
      ulEl.innerHTML = '';
    });
};

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

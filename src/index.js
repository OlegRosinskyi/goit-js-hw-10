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
      if (articls.length === 1) {
        return `<li> <div class="country-info">
   
   <ul class="list">
    <li> <ul class="all_list list">
    <li class="list__item"><img src="${flags.svg}" width="20px"alt="flag"> </li>
    <li class="list__item">  <h1  class="item_text_h" >${
      name.common
    }</h1> </li> 
    </ul> </li>
    <li> <ul class="all_list list">
    <li ><h3 class="item_text_S"> Capital:  </h3> </li>
    <li> <p class="item_text_on"> ${capital} </p> </li> 
    </ul> </li>
    <li> <ul class="all_list list">
    <li ><h3 class="item_text_S"> Population:  </h3> </li>
    <li> <p class="item_text_on"> ${population} </p> </li> 
    </ul> </li>
    <li> <ul class="all_list list">
    <li ><h3 class="item_text_S"> Languages: </h3> </li>
    <li> <p class="item_text_on"> ${Object.values(languages)} </p> </li> 
    </ul> </li>

    </ul>
    </div>
    </li>`;
      } else {
        return `<li> <div class="country-info">
   
   <ul class="all_list list">
    <li class="list__item"><img src="${flags.svg}" width="20px"alt="flag"> </li>
    <li class="list__item">  <p  class="item_text" >${name.common}</p> </li> 
    </ul>
    </div>
    </li>`;
      }
    })
    .join('');
};
//name.cca3.toLowerCase() languages
console.log(inputEl);
const DEBOUNCE_DELAY = 300;

const onInput = event => {
  fetchCountries(event.target.value.trim())
    .then(Response => Response.json())
    .then(articls => {
      console.log(articls);
      if (articls.status === 404) {
        ulEl.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else {
        console.log(articls[0].languages[0]);
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

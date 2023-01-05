import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const inputEl = document.querySelector('#search-box');
//const divEl = document.querySelector('.country-info');
const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

const articleElement = articls => {
  return articls
    .map(({ name, capital, population, flags, languages }, index) => {
      if (articls.length === 1) {
        return `
   
   <ul class="country-list list">
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
    </ul> 

    </ul>
   `;
      } else {
        return `
   <li class="list__item">
   <ul class="all_list list">
    <li class="list__item"><img src="${flags.svg}" width="20px"alt="flag"> </li>
    <li class="list__item">  <p  class="item_text" >${name.common}</p> </li> 
    </ul>
    </li>
    `;
      }
    })
    .join('');
};
//name.cca3.toLowerCase() languages
console.log(inputEl);
const DEBOUNCE_DELAY = 300;

const onInput = event => {
  console.log(event.target.value.length);
  const valuelongth = event.target.value.length;
  const valuesString = event.target.value;
  let element = '';
  for (let index = 0; index < valuelongth; index++) {
    element = element + ' ';
    //console.log(element);
  }
  //console.log(event.target.value === element);
  if (event.target.value === element) return;
  else {
    fetchCountries(event.target.value.trim())
      .then(Response => Response.json())
      .then(articls => {
        console.log(articls);
        if (articls.status === 404) {
          ulEl.innerHTML = '';
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else {
          //console.log(articls[0].languages[0]);
          //const lang = articls[0].cca3.toLowerCase();
          if (articls.length > 10) {
            ulEl.innerHTML = '';
            divEl.innerHTML = '';
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else {
            if (articls.length > 1) {
              divEl.innerHTML = '';
              ulEl.innerHTML = articleElement(articls);
            } else {
              ulEl.innerHTML = '';
              divEl.innerHTML = articleElement(articls);
            }
          }
        }
      })
      .catch(err => {
        console.log(err);
        ulEl.innerHTML = '';
        divEl.innerHTML = '';
      });
  }
};

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

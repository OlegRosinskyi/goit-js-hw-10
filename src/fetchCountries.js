export default function fetchCountries(name) {
  //return fetch(`https:restcountries.com/v3.1/name/${country}`);
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  );
}
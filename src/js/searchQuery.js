import countryTemplate from '../templates/country.hbs';
import './creatNotify.js';
import { error } from '@pnotify/core';

import refs from './refs.js';
const { input, list, countryContainer } = refs;

import fetchCountries from './fetchCountries.js';

const debounce = require('lodash.debounce');
input.addEventListener('input', debounce(onSearch, 500))

function onSearch() {
    list.innerHTML = '';
    countryContainer.innerHTML = '';
    let searchQuery = input.value;
    if (!input.value) {
        return
    };
    fetchCountries(searchQuery).then(data => {
        creatMarkup(data);
    });
    
}

function creatMarkup(data) {
    if (data.length > 10) {
        error();
    }
    if (data.length >= 2 && data.length <= 10) {
    const markup = data.map(elem => {
    return `<li>${elem.name}</li>`
  })
        .join('')
        list.insertAdjacentHTML('beforeend', markup)
    }
    if (data.length === 1) {
        const markup = countryTemplate(data);
        countryContainer.insertAdjacentHTML('beforeend', markup);
        input.value = "";
    }
}
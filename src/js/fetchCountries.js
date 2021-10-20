//Есть файл fetchCountries.js с дефолтным экспортом 
//функции fetchCountries(searchQuery), 
//возвращающей промис с массивом стран, результат 
//запроса к API.

import { error } from '@pnotify/core';

export default function fetchCountries(searchQuery) {
  const BASE_URL = 'https://restcountries.com/v2/name';
  let url = `${BASE_URL}/${searchQuery}`;
    return fetch(url)
        .then(response => response.json())
        .then((data) => {
            if (data.message) {
                error({
                    text: data.message
                })
            }
            return data;
        })
        .catch(error => {
            console.log('this is error', error)
  });
}
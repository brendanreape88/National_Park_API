'use strict';

const apiKey = 'zYh3yau6EMhATDK2Jf8mA8dC4MOhEvYX0W7asnHu';
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {

  console.log(responseJson);
  $('#results-list').empty();

  if(responseJson.total === '0'){
    $('#js-error-message').text('No parks found'); 
  } else {

  for (let i = 0; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
      </li>`
    )};
  }
  $('#results').removeClass('hidden');
};

function getParkInfo(searchTerm, limit){
  const params = {
    api_key: apiKey,
    stateCode: searchTerm,
    limit,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('js-error-message').text(`Something went wrong: ${err.message}`)
    });
}

function watchForm(){
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val().join(',');
    const limit = $('#js-max-results').val();
    getParkInfo(searchTerm, limit);
  });
}

$(watchForm);
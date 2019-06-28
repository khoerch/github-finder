'use strict';

function displayResults(response) {
    //Remove the hidden class to the results section and append the information from github as list elements
    console.log(response);
    $('.results').removeClass('hidden');
    $('.list-results').empty();
    for (let i=0; i < response.length; i++) {
        let projectName = response[i].name;
        let projectLink = response[i].url;
        
        $('.list-results').append(`
            <li>
                <p>${projectName}</p>
                <a href="${projectLink}">${projectLink}</a>
            </li>
        `)
    };
}

function getResults(name) {
    //Call on the github API based on the search input to retrieve the corresponding repo information
    console.log(name);
    let url = `https://api.github.com/users/${name}/repos`;
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
            $('#js-error-message').text(`Please check your internet connection and try again. Error: ${err.message}`);
        })
}

function watchForm() {
    //Watches for the form to be submitted by the user
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#js-username').val();
        getResults(username);
    })
}

$(watchForm);


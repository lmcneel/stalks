// This file goes in the client/src/utils folder

import axios from 'axios';

export default {

    buyShares: function(buyData) {
        return axios.post(`/api/trading/buy/`, buyData);
    },
    sellShares: function(sellData) {
        return axios.post(`/api/trading/sell/`, sellData);
    },
    findQuotes: function(data) {
        console.log(data);
        return axios.get(`/api/trading/quote/${data.ticker}`);
    },
    getPortfolioValue: function() {
        return axios.get('api/petfolio/portfolio');
    },
    getBankValue: function() {
        return axios.get('api/petfolio/bank');
    },

    // Saves an article to the database
    login: function (loginData) {
        return axios.post('/api/login', loginData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    // Saves an article to the database
    signup: function (signupData) {
        return axios.post('/api/signup', signupData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

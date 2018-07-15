// This file goes in the client/src/utils folder
// axios is like jquery; make requests from within app

import axios from 'axios';

export default {

    buyShares: function(buyData) {
        return axios.post('/api/trading/buy', buyData);
    },
    sellShares: function(sellData) {
        return axios.post('/api/trading/sell', sellData);
    },
    findQuotes: function(symbol) {
        return axios.get('/api/trading/quote', symbol);
    },
    // login axios call
    signin: function(signinData) {
        return axios.post('/api/signin', signinData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    // Saves an article to the database
    signout: function (signoutData) {
        return axios.post('/api/signout', signoutData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    // Saves an user to the database
    signup: function(signupData) {
        return axios.post('/api/signup', signupData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    // getPortfolioValue: function() {
    //     return axios.get('api/petfolio/portfolio');
    // },
    // getBankValue: function() {
    //     return axios.get('api/petfolio/bank');
     },
    getPetInfo: function() {
        return axios.get('/api/petfolio/pets');
    },
    getTickerText: function() {
        console.log('here in api.js');
        return axios.get('/api/petfolio/ticker');
    },
    getDocs: function() {
        return axios.get('/api/docs');
    },
    getMyStocks: function(portfolio) {
        return axios.get(`api/trading/mystocks/${portfolio}`);
    },
};

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
    login: function(loginData) {
        return axios.post('/api/login', loginData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    // signup axios call
    signup: function(signupData) {
        return axios.post('/api/signup', signupData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    findQuotes: function(data) {
        // console.log(data);
        return axios.get(`/api/trading/quote/${data.ticker}`);
    },

    userQuotes: function(data) {
        // console.log(data);
        return axios.get(`/api/trading/slimquote/${data.ticker}`);
    },
    // getInitialCash: function() {
    //     return axios.get('api/ptfolio/initialcash');
    // },
    getMyPortfolio: function(portfolio) {
        return axios.get(`/api/trading/myportfolio/${portfolio}`);
    },
    getPetInfo: function() {
        return axios.get('/api/petfolio/pets');
    },
    getTickerText: function() {
        return axios.get('/api/petfolio/ticker');
    },

    // Saves an article to the database
    login: function(loginData) {
        return axios.post('/api/login', loginData)
    // Saves an article to the database
    logout: function (logoutData) {
        return axios.post('/api/logout', logoutData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    // Saves an article to the database
    signup: function(signupData) {
        return axios.post('/api/signup', signupData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        getDocs: function() {
            return axios.get('/api/docs');
        }
        getMyStocks: function(portfolio) {
            return axios.get(`api/trading/mystocks/${portfolio}`);
        }
        addNewTicker: function() {
            return axios.post('/api/petfolio/addTicker');
        }
        removeExistingTicker: function() {
            return axios.delete('/api/petfolio/removeTicker');
        }
        getComments: function() {
            console.log('hit API.js');
            return axios.get('/api/forum/');
        }
    };

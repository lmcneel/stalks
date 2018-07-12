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
    // Saves an article to the database
    logout: function(logoutData) {
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
        },
        getDocs: function() {
            return axios.get('/api/docs');
        },
        getMyStocks: function(portfolio) {
            return axios.get(`api/trading/mystocks/${portfolio}`);
        },
    };

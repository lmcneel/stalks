// This file goes in the client/src/utils folder
// axios is like jquery; make requests from within app

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

    userQuotes: function(data) {
        console.log(data);
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
        console.log('here in api.js');
        return axios.get('/api/petfolio/ticker');
    },
    getDocs: function() {
        return axios.get('/api/docs');
    },
    getMyStocks: function(portfolio) {
        return axios.get(`/api/trading/mystocks/${portfolio}`);
    },
    // Gets all watchlists
    getwatchlist: function(data) {
        return axios.get(`/api/watchlist/${data}`);
    },
    // Gets all watchlists
    getWatchListItem: function(data) {
        return axios.get(`/api/watchlist/${data.ticker}`);
    },
    // adds a ticker to the watchlist
    addWatchListItem: function(data) {
        return axios.create(`/api/watchlist/${data.ticker}`);
    },
    // removes a ticker from the watchlist
    removeWatchListItem: function(data) {
        return axios.delete(`/api/watchlist/${data.ticker}`);
    },
};

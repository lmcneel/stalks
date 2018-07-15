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
    getWatchPrices: function(data) {
        if (!Array.isArray(data)) {
            console.log(data);
            throw new Error('Data needs to be of type array');
        }
        return axios
                .get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${data.join(',')}&types=price`);
    },
    getDocs: function() {
        return axios.get('/api/docs');
    },
    getMyStocks: function(portfolio) {
        return axios.get(`/api/trading/mystocks/${portfolio}`);
    },
    addNewTicker: function() {
        return axios.post('/api/petfolio/addTicker');
    },
    removeExistingTicker: function() {
        return axios.delete('/api/petfolio/removeTicker');
    },
};

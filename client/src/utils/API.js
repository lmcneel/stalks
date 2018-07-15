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
    // getPortfolioValue: function() {
    //     return axios.get('api/petfolio/portfolio');
    // },
    // getBankValue: function() {
    //     return axios.get('api/petfolio/bank');
    // },
    getPetInfo: function() {
        return axios.get('/api/petfolio/pets');
    },
    getTickerText: function() {
        return axios.get('/api/petfolio/ticker');
    },
    getDocs: function() {
        return axios.get('/api/docs');
    },
    getMyStocks: function(portfolio) {
        return axios.get(`api/trading/mystocks/${portfolio}`);
    },
    getPurchasedAccessories: () => {
        return axios.get('/api/pets/useraccessories/12')
    },
    displayPurchasedFoodAndToys: () => {
        return axios.get('/api/pets/userfoodandtoys/12')
    },
    
    getStoreAccessories: () => {
        return axios.get('/api/pets/storeaccessories')
    },
    
    displayStoreFoodAndToys: () => {
        return axios.get('/api/pets/storefoodandtoys')
    }
};

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
<<<<<<< HEAD
    updatePetInfo: function(pet) {
        return axios.post('/api/pets/' + pet.petId, pet);
    },
    getPetInfo: function(petId) {
        return axios.get('/api/pets/' + petId);
=======
    getMyPortfolio: function(portfolio) {
        return axios.get(`/api/trading/myportfolio/${portfolio}`);
    },
    getPetInfo: function() {
        return axios.get('/api/petfolio/pets');
>>>>>>> 93f713b1f603283e46adf96f25ee0d8ab01638c8
    },
    getTickerText: function() {
        return axios.get('/api/petfolio/ticker');
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
    getComments: function() {
        console.log('hit API.js');
        return axios.get('/api/forum/');
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

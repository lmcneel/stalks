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
    findQuotes: function(data) {
        // console.log(data);
        return axios.get(`/api/trading/quote/${data.ticker}`);
    },
<<<<<<< HEAD
    // getPortfolioValue: function() {
    //     return axios.get('api/petfolio/portfolio');
    // },
    // getBankValue: function() {
    //     return axios.get('api/petfolio/bank');
    // },
    updatePetInfo: function(pet) {
        return axios.post('/api/pets/' + pet.petId, pet);
    },
    getPetInfo: function(petId) {
        return axios.get('/api/pets/' + petId);
=======

    userQuotes: function(data) {
        // console.log(data);
        return axios.get(`/api/trading/slimquote/${data.ticker}`);
    },
    getInitialCash: function() {
        return axios.get('api/portfolio/cash');
    },
    updatePortfolio: function(id, cash) {
        return axios.patch(`/api/trading/myportfolio/${id}/${cash}`);
    },
    updateCurrentValue: function(id, currentvalue) {
        return axios.patch(`/api/trading/portfolio/cv/${id}/${currentvalue}`);
    },
    getMyPortfolio: function(portfolio) {
        return axios.get(`/api/trading/myportfolio/${portfolio}`);
    },
    getPetInfo: function() {
        return axios.get('/api/petfolio/pets');
>>>>>>> ef872be2762115c45b8bd1e7140ac1950afbae24
    },
    getTickerText: function() {
        return axios.get('/api/petfolio/ticker');
    },
    // Saves an article to the database
    login: function(loginData) {
        return axios.post('/api/auth/login', loginData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    // Saves an article to the database
    signup: function(signupData) {
        return axios.post('/api/auth/signup', signupData);
    },
    getDocs: function() {
        return axios.get('/api/docs');
    },
    updateDoc: function(data) {
        return axios.put('/api/docs/' + data.id, data);
    },
    getMyStocks: function(portfolio) {
        return axios.get(`/api/trading/mystocks/${portfolio}`);
    },
    addNewTicker: function(SQL_ID, Ticker) {
        return axios.post(`/api/petfolio/addTicker/${SQL_ID}/${Ticker}`);
    },
    removeExistingTicker: function(SQL_ID, Ticker) {
        return axios.delete(`/api/petfolio/removeTicker/${SQL_ID}/${Ticker}`);
    },
    getComments: function() {
        console.log('hit API.js');
        return axios.get('/api/forum/');
    },

    /*
    **
    **For User Settings / Profile
    **
    */
    // Checked and working
    getUserProfile: function() {
        console.log('Settings API: getUserProfile type: get Route: /api/user/getInfo');
        return axios.get('/api/user/getInfo');
    },
    // In progress
    checkPassword: function(data) {
        console.log('Settings API: checkPassword  type: get Route: /api/user/checkPassword');
        return axios.get('/api/user/checkPassword', data);
    },
    // In progress
    updateEmail: function(data) {
        console.log('Settings API: updateEmail type: put Route: /api/user/update/Email');
        return axios.put('/api/user/update/email', data);
    },
    // In progress
    updatePassword: function(data) {
        console.log('Settings API: updatePassword type: put Route: /api/user/update/password');
        return axios.put('/api/user/update/password', data);
    },
    // In progress
    updateUsername: function(data) {
        console.log('Settings API: updateUsername type: put Route: /api/user/update/username');
        return axios.put('/api/user/update/username', data);
    },
    // In progress
    requestUpdateVerification: function(data) {
        console.log('Settings API: requestUpdateVerification type: post Route: /api/user/post/update/verification');
        return axios.post('/api/user/post/update/verification', data);
    },
    // In progress
    confirmUpdateVerification: function(data) {
        console.log('Settings API: confirmUpdateVerification type: put Route: /api/user/confirm/update/verification');
        return axios.put('/api/user/confirm/update/verification', data);
    },
    // Checked and working
    requestEmailVerification: function(data) {
        console.log('Settings API: requestEmailVerification type: post Route: /api/user/post/email/verification');
        return axios.post('/api/user/sendEmailVerification', data);
    },

    confirmEmailVerification: function(data) {
        console.log('Settings API: confirmEmailVerification type: get Route: /api/user/update/email/:id/:key');
        return axios.put('/api/user/update/email/verification', data);
    },
    // In progress
    updatePetName: function(data) {
        console.log('Settings API: updatePetName type: put Route: /api/user/pet/update/name');
        return axios.put('/api/user/pet/update/name', data);
    },
    // In progress
    updatePet: function(email) {
        console.log('Settings API: updatePet type: post Route: /api/user/pet/update/pet');
        return axios.post('/api/user/pet/update/pet', email);
    },
    // In progress
    newUserMessage: function(data) {
        console.log('Settings API: newUserMessage type: put Route: /api/user/account/put/message');
        return axios.put('/api/user/account/put/message', data);
    },
    // In progress
    toggleTips: function(data) {
        console.log('Settings API: toggleTips type: post Route: /api/user/account/post/tips');
        return axios.post('/api/user/account/post/tips', data);
    },
    // In progress
    deleteAccount: function(data) {
        console.log('Settings API: deleteAccount type: delete Route: /api/user/account/delete');
        return axios.delete('/api/user/account/delete', data);
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
    },

    createAccessory: (accdata) => {
        return axios.post('/api/pets/createaccessory', accdata)
    }
};

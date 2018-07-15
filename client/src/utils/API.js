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
    /*
    **
    **For User Settings / Profile
    **
    */
    getUserProfile: function() {
        console.log('Settings API: getUserProfile type: get Route: /api/user/getInfo');
        return axios.get('/api/user/getInfo');
    },
    checkPassword: function(data) {
        console.log('Settings API: checkPassword  type: get Route: /api/user/checkPassword');
        return axios.get('/api/user/checkPassword', data);
    },
    updateEmail: function(data) {
        console.log('Settings API: updateEmail type: put Route: /api/user/update/Email');
        return axios.put('/api/user/update/email', data);
    },
    updatePassword: function(data) {
        console.log('Settings API: updatePassword type: put Route: /api/user/update/password');
        return axios.put('/api/user/update/password', data);
    },
    updateUsername: function(data) {
        console.log('Settings API: updateUsername type: put Route: /api/user/update/username');
        return axios.put('/api/user/update/username', data);
    },
    requestUpdateVerification: function(data) {
        console.log('Settings API: requestUpdateVerification type: post Route: /api/user/post/update/verification');
        return axios.post('/api/user/post/update/verification', data);
    },
    confirmUpdateVerification: function(data) {
        console.log('Settings API: confirmUpdateVerification type: put Route: /api/user/confirm/update/verification');
        return axios.put('/api/user/confirm/update/verification', data);
    },
    requestEmailVerification: function(data) {
        console.log('Settings API: requestEmailVerification type: post Route: /api/user/post/email/verification');
        return axios.post('/api/user/sendEmailVerification', data);
    },
    confirmEmailVerification: function() {
        console.log('Settings API: confirmEmailVerification type: get Route: /api/user/update/email/:id/:key');
        return axios.get('/api/user/update/email/:id/:key');
    },
    updatePetName: function(data) {
        console.log('Settings API: updatePetName type: put Route: /api/user/pet/update/name');
        return axios.put('/api/user/pet/update/name', data);
    },
    updatePet: function(email) {
        console.log('Settings API: updatePet type: post Route: /api/user/pet/update/pet');
        return axios.post('/api/user/pet/update/pet', email);
    },
    newUserMessage: function(data) {
        console.log('Settings API: newUserMessage type: put Route: /api/user/account/put/message');
        return axios.put('/api/user/account/put/message', data);
    },
    toggleTips: function(data) {
        console.log('Settings API: toggleTips type: post Route: /api/user/account/post/tips');
        return axios.post('/api/user/account/post/tips', data);
    },
    deleteAccount: function(data) {
        console.log('Settings API: deleteAccount type: delete Route: /api/user/account/delete');
        return axios.delete('/api/user/account/delete', data);
    },
};

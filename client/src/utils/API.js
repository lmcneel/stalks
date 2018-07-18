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
        return axios.get(`/api/trading/quote/${data.ticker}`);
    },
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
    },
    getTickerText: function() {
        return axios.get('/api/petfolio/ticker');
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
    getUserPic: function() {
        return axios.get('/api/petfolio/userpic');
    },
    getComments: function() {
        console.log('hit API.js');
        return axios.get('/api/forum/');
    },
    /*
    **
    **For User Settings / Profile / Authenticating
    **
    */
     // Checked and working
     signup: function(signupData) {
        return axios.post('/api/auth/signup', signupData);
    },
    signin: function(data) {
        return axios.post('/api/auth/login', data);
    },
    // Checked and working
    logout: function() {
        return axios.post('/api/auth/logout');
    },
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
    // Checked and working
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
    viewFriends: function() {
        console.log('friends API hit');
        return axios.get('api/friends/view');
    },
    viewSingleFriend: function() {
        console.log('view one');
        return axios.get('api/friends/view/:id');
    },
    addFriend: function() {
        console.log('friend added');
        return axios.post('api/friends/add');
    },
    removeFriend: function() {
        console.log('friend removed');
        return axios.delete('api/friends/remove');
    },
};

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
<<<<<<< HEAD
    postComments: function() {
        return axios.get('/api/forum/create/:id');
    },
    deleteComments: function() {
        return axios.delete('api/forum/comment/:id');
=======
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
>>>>>>> 47c9995ca76287993eb1400dc3dab6c6a93c2d1c
    },
};

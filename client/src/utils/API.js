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
        console.log('here in api.js');
        return axios.get('/api/petfolio/ticker');
    },
    getDocs: function() {
        return axios.get('/api/docs');
    },
    getMyStocks: function(portfolio){
        return axios.get(`api/trading/mystocks/${portfolio}`);
    },    
    /*
    **
    **For User Settings / Profile
    **
    */
    
    getUserProfile: function(){
        return axios.get('/api/user/getInfo');
    },
       
    updateEmail: function(data){
        console.log("Settings API");
        return axios.put('/api/user/update/email', data);
    },
    updatePassword: function(data){
        return axios.put('/api/user/update/password', data);
    },
    updateUsername: function(data){
        return axios.put('/api/user/update/username', data);
    },
    requestUpdateVerification: function(data){
        return axios.post('/api/user/post/update/verification', data);
    },
    confirmUpdateVerification: function(data){
        return axios.put('/api/user/confirm/update/verification', data);
    },
    requestEmailVerification: function(){
        return axios.post('/api/user/post/email/verification')
    },
    confirmEmailVerification: function(){
        return axios.get('/api/user/get/update/email/verification/:key');
    },
    updatePetName: function(data){
        return axios.put('/api/user/pet/update/name', data);
    },
    updatePet: function(email){
        return axios.post('/api/user/pet/update/pet', email);
    },
    newUserMessage: function(data){        
        return axios.put('/api/user/account/put/message', data);
    },
    toggleTips: function(data){

        return axios.post('/api/user/account/post/tips', data);
    },
    deleteAccount: function(data){
        return axios.delete('/api/user/account/delete', data);
    }
};

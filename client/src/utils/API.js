// This file goes in the client/src/utils folder

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
    getPortfolioValue: function() {
        return axios.get('api/petfolio/portfolio');
    },
    getBankValue: function() {
        return axios.get('api/petfolio/bank');
    },
    getMyStocks: function(portfolio){
        return axios.get(`api/trading/mystocks/${portfolio}`);
    }
};

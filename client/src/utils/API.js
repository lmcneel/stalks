// This file goes in the client/src/utils folder

import axios from 'axios';

export default {

    buyShares: function(buyData) {
        return axios.post(`/api/trading/buy/`, buyData);
    },
    sellShares: function(sellData, userId) {
        return axios.post(`/api/trading/sell/`, sellData);
    },
    findQuotes: function(symbol) {
        return axios.get('/api/trading/quote', symbol);
    },
};

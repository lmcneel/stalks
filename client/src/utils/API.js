// This file goes in the client/src/utils folder

import axios from 'axios';

export default {

    buyShares: function(buyData, userId) {
        return axios.post(`/api/trading/buy/${userId}`, buyData);
    },
    sellShares: function(sellData, userId) {
        return axios.post(`/api/trading/sell/${userId}`, sellData);
    },
    findQuotes: function(symbol) {
        return axios.get('/api/trading/quote', symbol);
    },
};

// This file goes in the client/src/utils folder

import axios from 'axios';

export default {

    buyShares: function (buyData) {
        return axios.post('/api/trading/buy', buyData);
    },
    sellShares: function (sellData) {
        return axios.post('/api/trading/sell', sellData);
    },
    findQuotes: function (symbol) {
        return axios.get('/api/trading/quote', symbol);
    },

    // Saves an article to the database
    login: function (loginData) {
        return axios.post('/api/login', loginData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

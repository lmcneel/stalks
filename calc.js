const db = require('./models/mongo');
const request = require('request');


let userStocks = {};
let exchangeData=[];



module.exports = {


        callToDb: function (id) {

            //Call to Database to get the Stock names for each user
            db.Trade.find({
                    portfolio_id: id
                })
                .select('ticker type quantity')
                .exec(function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                        // const userStocks = {};
                        // for (var i = 0; i < data.length; i++) {
                        //     if (!userStocks[data[i].ticker]) {
                        //         userStocks[data[i].ticker] = data[i].quantity
                        //     } else {
                        //         userStocks[data[i].ticker] += data[i].quantity
                        //         console.log(userStocks);
                            // }  
                        // } 
                    }
                    // callback && callback();
                    // console.log(userStocks);
                })

                .then(function (doc) {
                    console.log(doc)
                    // const userStocks = {};
                    //     for (var i = 0; i < data.length; i++) {
                    //         if (!userStocks[data[i].ticker]) {
                    //             userStocks[data[i].ticker] = data[i].quantity
                    //         } else {
                    //             userStocks[data[i].ticker] += data[i].quantity
                    //             console.log(userStocks);
                    //         }  
                    //     } 
                })
                
            

            
        
        console.log(userStocks);
    },



    callToExcahange: function (u) {
        // Call to Exchange to get the Stocks data
        Object.keys(u).forEach(function (key) {

            console.log(key, u[key]);

            request(
                `https://api.iextrading.com/1.0/stock/${key}/batch?types=quote`,
                function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        const found = JSON.parse(body);
                        
                        console.log(found);
                        exchangeData.push(found);
                        console.log(exchangeData);

                    } else {
                        console.log(error);
                        found = {};
                    };
                }
            );
        });
        
    },

    

    

    calcGain: function () {
        // Calculate the user Gain/Loss for each stock
        // Gain/loss = (Current Price - purchase price)/ purchase prics * 100



    
        // 3- Loop Over the  Array and get the Current value and Yesterdays closing value from the API [Call the Stock Exchange]
        // 4- Calculate Gains / Loss
    },

    userBalance: function (exchangeData) {
        // Calculate the user Balance
        // Output should be the Cash
    },

    ROI: function () {
        //Calculate the Return on Investment
        // ROI = (Gain from Investment - Cost of Investment) / Cost of Investment
    },

    portfolioValue: function () {
        //Calculate the Portfolio Value
        // Portfolio Value
        //1- It is referred to as mark-to-market and involves multiplying the current share 
        //   price of the stock by the number of shares owned and summing these values for a total portfolio value.
        //2- should return the portfolio value.
    }



};


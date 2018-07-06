var mongoose = require("mongoose");
var User = require("./models/mongo/user");
var Portfolio = require("./models/mongo/portfolio");
var Trade = require("./models/mongo/trade");

var userData = [{
        name: "John Smith",
        username: "johnsmith@gmail.com",
        email: "johnsmith@gmail.com",
        created: Date.now()

    },
    {
        name: "Jane Doe",
        username: "janedoe@gmail.com",
        email: "janedoe@gmail.com",
        created: Date.now()
    },
    {
        name: "Hamza Khan",
        username: "johnsmith@gmail.com",
        email: "janedoe@gmail.com",
        created: Date.now()
    }
]



function seedDB() {
    //Remove all users 
    User.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed users");
        Portfolio.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed Portfolios!");
            Trade.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("removed Trades!");

                //add a few users
                userData.forEach(function (seed) {
                    User.create(seed, function (err, user) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("added a user");
                            //add a Portfolio
                            Portfolio.create({
                                cash: 20000.00,
                                currentValue: 100000.00
                            }, function (err, portfolio) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    // user.portfolios.push(portfolio);
                                    user.save();
                                    console.log("Added new Portfolio!");
                                    //add Trades
                                    Trade.create({
                                        date: Date.now(),
                                        type: "Buy",
                                        ticker: "AALP",
                                        sharePrice: 184.95,
                                        shares: 10
                                    }, function (err, trade) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            portfolio.trades.push(trade);
                                            portfolio.save();
                                            console.log("Added new Trade!");
                                        }
                                    });

                                };
                            });
                        }
                    });
                });
            });
        });

    });

}



module.exports = seedDB;
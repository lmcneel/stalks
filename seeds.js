/**
 * This is a seed script for testing mongo db
 */
// const mongoose = require('mongoose');
const User = require('./models/mongo/user');
const Portfolio = require('./models/mongo/portfolio');
const Trade = require('./models/mongo/trade');

let userData = [{
        created: Date.now(),
        SQLuser_id: '000001',

    },
    {
        created: Date.now(),
        SQLuser_id: '000002',
    },
    {
        created: Date.now(),
        SQLuser_id: '000003',
    }];

/**
 * This function will reomve data from db and seed new data for testing
 */
function seedDB() {
    // Remove all users
    User.remove({}, function(err) {
            if (err) {
                console.log(err);
            }
            console.log('removed users');
            Portfolio.remove({}, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('removed Portfolios!');
                    Trade.remove({}, function(err) {
                            if (err) {
                                console.log(err);
                            }
                            console.log('removed Trades!');

                            // add a few users
                            userData.forEach(function(seed) {
                                    User.create(seed, function(err, user) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log('added a user');
                                                // add a Portfolio
                                                Portfolio.create({
                                                        cash: 20000.00,
                                                        currentValue: 100000.00,
                                                    }, function(err, portfolio) {
                                                        if (err) {
                                                            console.log(err);
                                                        } else {
                                                            user.portfolios.push(portfolio);
                                                            user.save();
                                                            console.log('Added new Portfolio!');
                                                            // add Trades
                                                            Trade.create({
                                                                    date: Date.now(),
                                                                    type: 'Buy',
                                                                    ticker: 'AALP',
                                                                    sharePrice: 184.94,
                                                                    shares: 10,
                                                                }, {
                                                                    date: Date.now(),
                                                                    type: 'Sell',
                                                                    ticker: 'XPP',
                                                                    sharePrice: 190.45,
                                                                    shares: 20,
                                                                },
                                                                    function(err, trade) {
                                                                        if (err) {
                                                                            console.log(err);
                                                                        } else {
                                                                            portfolio.trades.push(trade);
                                                                            portfolio.save();
                                                                            console.log('Added new Trade!');
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

// The contents of this file should go on client side main pages
import React, {Component} from 'react';
import {Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Highcharts from 'highcharts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import Promise from 'bluebird';
import _ from 'underscore';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import '../../assets/react-joyride-compiled.css';

const propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                ticker: PropTypes.string,
            }).isRequired,
        }).isRequired,
        modalName: PropTypes.string,
    };

/**
 * This component generates a stock buy or sell transaction component
 * @class TradingCenter
 */
class TradingCenter extends Component {
/**
 * @param {*} props
 */
    constructor(props) {
        super(props);
        // ---These are triggerd from onClick---
        // -------------------------------------
        this.toggle = this.toggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // -------------------------------------
        // this.componentDidMount = this.componentDidMount.bind(this);
        // -------------------------------------
        // ---The function below are used in transactions and render---
        // ------------------------------------------------------------
        this.checkWatchList = this.checkWatchList.bind(this);
        this.addToWatchlist = this.addToWatchlist.bind(this);
        this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
        this.transactionExec = this.transactionExec.bind(this);
        this.myStocks = this.myStocks.bind(this);
        // this.cashCalculator = this.cashCalculator.bind(this);
        this.dbStocks = this.dbStocks.bind(this);
        this.myStocksValue = this.myStocksValue.bind(this);
        this.portfolioValue = this.portfolioValue.bind(this);
        this.updatePortfolioValue = this.updatePortfolioValue.bind(this);
        this.returnOnInvestment = this.returnOnInvestment.bind(this);
        this.getBankValue = this.getBankValue.bind(this);
        this.updateBankValue = this.updateBankValue.bind(this);
        this.myWatchlist = this.myWatchlist.bind(this);
        this.charting = this.charting.bind(this);
        this.buyShares = this.buyShares.bind(this);
        this.sellShares = this.sellShares.bind(this);
        this.state = {
            ticker: this.props.match.params.ticker,
            price: 0,
            shares: 0,
            change: 0,
            companyName: '',
            primaryExchange: '',
            sector: '',
            response: '',
            portfolio_id: '5b4cf8a4f387eda4bd04e253', // Needs update from rec.session.user from API.getUserProfile
            portfolioValue: 0,
            transaction: 'buy',
            ROI: 0,
            id: '5b4cf8a4f387eda4bd04e253', // Needs update from rec.session.user from API.getUserProfile
            sqlId: 1, // Needs update from rec.session.user from API.getUserProfile
            cost: 0,
            datePurchased: '',
            value: 0,
            totalShares: 0,
            initialCash: 20000,
            dynoCash: 0,
            cashBalance: 0,
            watchedArray: '',
            modal: false,
            watched: false,
            eyeWatched: 'faEye',
            modalIsOpen: true,
            run: false,
            showModal: true,
        };
        this.toggle = this.toggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.resetTour = this.resetTour.bind(this);
    }

/**
 * @public componentDidMount function will render elements
 */
    componentDidMount() {
        this.charting({ticker: this.state.ticker});
        this.myStocks(this.state.portfolio_id);
        this.dbStocks(this.state.portfolio_id);
        this.myStocksValue();
        this.getBankValue(this.state.portfolio_id);
        // this.myWatchlist(this.state.watchedArray);
        // this.cashCalculator(this.state.portfolio_id);
        this.checkWatchList();
    };
/**
 * @public toggle function for reactstap <Modal> onClick trigger
 */
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    };
/**
 * @public checkWatchList function will check if the current 'ticker' is listed in user watchlist
 * @param {*} ticker
 */
    checkWatchList() {
        // If in watchlist set [watched] to true
        API.getTickerText().then(((r) => {
            if (r.data.length !== 0) {
            let tempTicker = [];
            for (let i=0; i<r.data.length; i++) {
                tempTicker.push((r.data[i]).uniqueStockSymbol);
            }
            if (tempTicker.includes(this.state.ticker)) {
                return this.setState({watched: true});
              } else {
                return this.setState({watched: false});
              }
            };
        }));
    };

/**
 * @public addToWatchlist function will add current 'ticker' to user watchlist from onClick
 * @param {*} SQL_ID
 * @param {*} Ticker
 */
    addToWatchlist() {
        API.addNewTicker(this.state.sqlId, this.state.ticker)
        .then((res) => {
            console.log('Ticker Added to Watchlist');
            this.checkWatchList();
        })
        .catch((err) => console.log(err));
    };

/**
* @public removeWatchlist function will remove current 'ticker' from user watchlist from onClick
* @param {*} SQL_ID
* @param {*} Ticker

*/
removeFromWatchlist() {
    API.removeExistingTicker(this.state.sqlId, this.state.ticker)
    .then((res) => {
        console.log('done');
        this.checkWatchList();
    })
    .catch((err) => console.log(err));
};

/**
 * @public handleInputChange function for number of shares
 * @param {*} event
 */
    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    };
/**
 * @public transactionExec function for processing the transaction
 */
    transactionExec() {
        if (this.state.transaction === 'buy') {
            this.buyShares();
        } else {
            this.sellShares();
        };
    };
/**
 * @public myStocks function that gets users stocks from mongo database
 * @param {*} portfolio
 * @return {*} returns users stocks
 */
    myStocks(portfolio) {
        return API.getMyStocks(portfolio)
            .then((res) => {
                let userStocks = {};
                let userShares = {};
                for (let i = 0; i < res.data.length; i++) {
                    if (!userStocks[res.data[i].ticker]) {
                        userStocks[res.data[i].ticker] = res.data[i].shares * res.data[i].sharePrice;
                    } else {
                        userStocks[res.data[i].ticker] += res.data[i].shares * res.data[i].sharePrice;
                    }
                }
                for (let i = 0; i < res.data.length; i++) {
                    if (!userShares[res.data[i].ticker]) {
                        userShares[res.data[i].ticker] = res.data[i].shares;
                    } else {
                        userShares[res.data[i].ticker] += res.data[i].shares;
                    }
                }
                for (let i = 0; i < Object.keys(userShares).length; i++) {
                    let company = Object.entries(userShares)[i];
                    let spent = Object.entries(userStocks)[i];
                    if (company[0] === this.state.ticker && company.length > 0) {
                        this.setState({
                            totalShares: company[1],
                            cost: spent[1] / company[1],
                            datePurchased: res.data[res.data.length - 1].date.slice(0, 10),
                        });
                    } else {
                        this.setState({
                            totalShares: 0,
                            cost: 0,
                            datePurchased: 'N/A',
                        });
                    }
                };
                return userShares;
            });
    }
/**
 * @public cashCalculator function that gets users remainig cash value
*/
    cashCalculator() {
        let cash = this.state.initialCash;
       this.setState({dynoCash: cash});
    }

/**
 * @public dbStocks function, It makes a call to Mongo Database (Trades Collection),
 * gets all the transactions
 * based on the portfolio_id of each user, => all transactions are iterated through
 * and reduced to just ShareNames(Ticker) &
 * the total share quantities the user currently ownes.
 * At the last Stage this function calls the returnOnInvestment function, the output of
 * which are : The ROI for each of the Stocks the
 * user owns.
 * @param {*} portfolio
 * @return {*} returns users stocks
 */
    dbStocks(portfolio) {
        let self = this;
        let allUserStocks;
        let lastPrice = [];
        let userStocks = {};
        return API.getMyStocks(portfolio)
            .then((res) => {
                allUserStocks = res.data;
                for (let i = 0; i < res.data.length; i++) {
                    if (!userStocks[res.data[i].ticker]) {
                        userStocks[res.data[i].ticker] = res.data[i].shares;
                    } else {
                        userStocks[res.data[i].ticker] += res.data[i].shares;
                    }
                }
                // console.log(userStocks);
                let current = Promise.resolve();
                Object.keys(userStocks).forEach((key) => {
                    current = current.then(() => {
                        return API.userQuotes({
                            ticker: key,
                        })
                            .then((res) => {
                                lastPrice.push(res.data[0]);
                                const myROI = self.returnOnInvestment(userStocks, lastPrice, allUserStocks);
                                if (key === this.state.ticker) {
                                    for (let i = 0; i < myROI.length; i++) {
                                        if (key === myROI[i].ticker) {
                                            this.setState({
                                                ROI: myROI[i].roi,
                                            });
                                        };
                                    };
                                } else {
                                    this.setState({
                                        ROI: 0,
                                    });
                                }
                            });
                    });
                });
                return current;
            });
    };

/**
 * @public myStocksCalue function, It call myStocks function the output of which is an object
 * with the ShareNames(Tickers), and the quantity of those shares the users currently owns.
 * Then a call is made to Exchange center to get the latest price for these tickers which are
 * saved in lastPrice variable.
 * At the last Stage this function calls the portfolioValue function, the output of
 * which are :  1- The Portfolio ROI & 2- The Portfolio Value for Each User.
 * @param {*} portfolio
 */
    myStocksValue() {
        let self = this;
        this.myStocks(this.state.portfolio_id)
            .then((result) => {
                let stocks = result;
                let lastPrice = [];
                let current = Promise.resolve();
                Object.keys(stocks).forEach(function(key) {
                    current = current.then(() => {
                        return API.userQuotes({
                            ticker: key,
                        })
                            .then((res) => {
                                lastPrice.push(res.data[0]);
                                self.portfolioValue(stocks, lastPrice);
                            });
                    });
                });
                return current;
            });
    };

/**
 * @public This fucntion is called by the myStocksValue function and the output is explained there.
 * @param {*} stocks
 * @param {*} lastPrice
 * @return {*} returns users cash
 * This function will calculate the Portfolio Value & Portfolio Value ROI
 * The inputs to this function  are The list of Shares the user has and the latest Rpice of those shares
*/
    portfolioValue(stocks, lastPrice) {
        // Since the Game starts the user with a set starting value it's used as a variable
        let initCash = 200000.00;
        let PV = 0;
        let pvROI = 0;
        Object.keys(stocks).forEach((key) => {
            for (let j = 0, len2 = lastPrice.length; j < len2; j++) {
                if (key === lastPrice[j].symbol) {
                    PV += (stocks[key] * lastPrice[j].price * 100)/100;
                };
            }
            console.log(PV);
            return this.setState({portfolioValue: PV});
        });
        this.updatePortfolioValue(this.state.portfolio_id, this.state.portfolioValue);
        let userPortfolioValue = PV + Number(this.state.cashBalance);
        let a = userPortfolioValue - initCash;
        pvROI = ((a / initCash) * 100).toFixed(2);
        return {
            userPortfolioValue,
            pvROI,
        };
    };
/**
 * @public updatePortfolioValue function will update cash amount in mongo database
 * @param {*} portfolio
 * @param {*} cash
 * This function will update the Current user Cash
 * The input needs to be the User Portfolio ID.
*/
updatePortfolioValue() {
    console.log(this.state.portfolioValue);
    API.updateCurrentValue(this.state.portfolio_id, this.state.portfolioValue)
    .catch((err) => console.log(err));
};
/**
 * @public The returnOnInvestment function is called by the dbStocks Function
 * it takes in 3 parameters that are listed below and the return is the ROI for each of the
 * stocks the user ownes.
 * @param {*} allUserStocks // The Shares the User ownes and it's Quantity
 * @param {*} lastPrice // The Current price of each of the Tickers (retrieved from the Exchange API)
 * @param {*} userStocks // an array of all the transactions made by the User
 * @return {*} The ROI for each of the stocks the user owns.
*/
    returnOnInvestment(allUserStocks, lastPrice, userStocks) {
        let eachROI = [];
        for (let i = 0; i < userStocks.length; i++) {
            if (userStocks[i].type === 'Sell') {
                userStocks.splice(i, 1);
            };
        };
        let boughtStocks = _.uniq(userStocks, function(p) {
            return p.ticker;
        });
        Object.keys(allUserStocks).forEach((key) => {
            for (let j = 0, len1 = lastPrice.length; j < len1; j++) {
                for (let i = 0, len2 = boughtStocks.length; i < len2; i++) {
                    let obj = {
                        ticker: '',
                        roi: '',
                    };
                    if (key === lastPrice[j].symbol && key === boughtStocks[i].ticker) {
                        obj.ticker = key;
                        let a = (lastPrice[j].price * 100 * allUserStocks[key]);
                        let b = (allUserStocks[key] * boughtStocks[i].sharePrice * 100);
                        let c = ((a - b) / b) * 100;
                        obj.roi = (c).toFixed(2);
                        eachROI.push(obj);
                    };
                };
            };
        });
        return eachROI;
    };

/**
 * @public bankValue function that gets users bank value from mongo database
 * @param {*} portfolio
 * @return {*} returns users bank value
 * This function will give the Current user Cash
 * The input needs to be the User Portfolio ID.
*/
    getBankValue(portfolio) {
        let bank = 0;
        return API.getMyPortfolio(portfolio)
            .then((res) => {
                let data = res.data;
                bank = data[0].cash;
                console.log(bank);
                return this.setState({initialCash: bank});
               })
            .catch((err) => console.log(err));
    };
/**
 * @public updateBankValue function will update cash amount in mongo database
 * @param {*} portfolio
 * @param {*} cash
 * This function will update the Current user Cash
 * The input needs to be the User Portfolio ID.
*/
    updateBankValue() {
        API.updatePortfolio(this.state.portfolio_id, this.state.cashBalance)
        .catch((err) => console.log(err));
    };

/**
 * @public myWatchlist function gives the latest price for the Watch List
 * @param {*} watchedArray // This array is retrieved from MySQL Database
 * @return {*} returns An array with the Tickers on the Watchlist and their lates Price.
*/
    myWatchlist(watchedArray) {
        let watchPrice = [];
        let current = Promise.resolve();
        for (let i = 0; i < watchedArray.length; i++) {
            current = current.then(() => {
                return API.userQuotes({
                    ticker: watchedArray[i],
                })
                    .then((res) => {
                        let watch = {
                            ticker: '',
                            price: '',
                        };
                        let data = res.data;
                        watch.ticker = data[0].symbol;
                        watch.price = data[0].price;
                        watchPrice.push(watch);
                    });
            });
        };
        return current;
    };
/**
 * @public charting function assigns chart data from API
 * @param {*} ticker is the current ticker state
 */
    charting(ticker) {
        API.findQuotes(ticker)
            .then((res) => {
                this.setState({
                    price: res.data.quote.latestPrice,
                    change: res.data.quote.changePercent,
                });
                const chartData = res.data.chart.map((day) => {
                    let dayArray = [];
                    dayArray.push(day.date);
                    dayArray.push(day.close);
                    return dayArray;
                });

                Highcharts.chart('stockChart', {
                    chart: {
                        spacingBottom: 20,
                        height: null,
                    },
                    title: {
                        text: null,
                    },

                    xAxis: {
                        title: {text: 'Past 30 Days'},
                        categories: null,
                        text: null,
                        lineColor: '#404850',
                        lineWidth: 2,
                    },
                    yAxis: {
                        title: null,
                        lineColor: '#404850',
                        lineWidth: 2,
                    },
                    legend: {
                        enabled: false,
                    },

                    series: [{
                        type: 'line',
                        color: '#0C425C',
                        name: this.state.ticker,
                        data: chartData,
                        marker: {enabled: true},
                        tooltip: {valueDecimals: 2},
                    }],
                });
            })
            .catch((err) => console.log(err));
        }
 /**
 * @public buyShares function for processing buy transaction
 * @param {*} event
 */
    buyShares() {
        if ((this.state.initialCash - (this.state.shares * this.state.price)) >= 0) {
                let cashBalanceTemp = this.state.initialCash - (this.state.shares * this.state.price);
                this.setState({cashBalance: cashBalanceTemp});
            API.findQuotes(
                {ticker: this.state.ticker}
            ).then((res) => {
                this.setState({price: res.data.quote.latestPrice});
                if (this.state.ticker && this.state.price && this.state.shares) {
                    API.buyShares({
                        portfolio_id: this.state.portfolio_id,
                        type: 'buy',
                        ticker: this.state.ticker,
                        sharePrice: this.state.price,
                        shares: this.state.shares,
                    })
                        .then((res) => {
                            this.setState({
                                shares: 0,
                                response: 'Your order was submitted and processed!',
                            });
                            this.myStocks(this.state.portfolio_id);
                            this.dbStocks(this.state.portfolio_id);
                            this.myStocksValue();
                            // this.cashCalculator(this.state.portfolio_id);
                            this.updateBankValue();
                            this.updatePortfolioValue();
                            this.toggle();
                        })
                        .catch((err) => console.log(err));
                }
            }).catch((err) => console.log(err));
        } else {
            this.setState({
                response: 'Insuficient funds to proceed with this transaction',
            });
            this.toggle();
        }
    };

/**
 * @public sellShares function for processing sell transaction
 * @param {*} event
 */
    sellShares() {
        if (this.state.shares <= this.state.totalShares) {
            let cashBalanceTemp = this.state.initialCash + (this.state.shares * this.state.price);
            this.setState({cashBalance: cashBalanceTemp});

            API.findQuotes(
                {ticker: this.state.ticker}
            ).then((res) => {
                this.setState({price: res.data.quote.latestPrice});
                if (this.state.ticker && this.state.price && this.state.shares) {
                    API.sellShares({
                        portfolio_id: this.state.portfolio_id,
                        type: 'sell',
                        ticker: this.state.ticker,
                        sharePrice: this.state.price,
                        shares: -(this.state.shares),
                    })
                        .then((res) => {
                            this.setState({
                                shares: 0,
                                response: 'Transaction successfully completed',
                            });
                            this.myStocks(this.state.portfolio_id);
                            this.dbStocks(this.state.portfolio_id);
                            this.myStocksValue();
                            this.updateBankValue();
                            this.updatePortfolioValue();
                            // this.cashCalculator(this.state.portfolio_id);
                            this.toggle();
                        })
                        .catch((err) => console.log(err));
                }
            }).catch((err) => console.log(err));
        } else {
            this.setState({
                response: 'You do not own enough shares to proceed',
            });
            this.toggle();
        }
    };
    /**
    * handleSelect function
    * @param {number} index
    * @param {number} last
    */
    handleSelect(index, last) {
        if (this.joyride.getProgress().index === 2) {
            setTimeout(() => {
                this.joyride.next();
            }, 1);
        }
    }
    /**
     * resetTour function
     */
    resetTour() {
        console.dir(this);
        this.joyride.reset(true);
        this.setState({run: true});
    }
    /**
     * Render function
     * @return {JSX}
     */
    render() {
        return (
            <div>
                <Joyride
                    ref={(c) => (this.joyride = c)}
                    steps={[
                        {
                            title: 'Bank Value',
                            text: 'This is the amount of liquid assets, money, that you can use to invest in stocks or spend on your pet for fun items in the shop. You can increase your liquid assets by selling your stocks as well as login bonuses.',
                            selector: '.bankValue',
                        },
                        {
                            title: 'Petfolio Value',
                            text: 'This is the sum of all stocks you own multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets.',
                            selector: '.portfolioValue',
                        },
                        {
                            title: 'Stock Overview',
                            text: 'This is the overview of a stocks stats. There is plenty of useful information here!',
                            selector: '.stockStats',
                        },
                        {
                            title: 'Stock Name',
                            text: 'This is the ticker symbol or stock symbol of this stock. It\'s an abbreviation used to uniquely identify publicly traded shares of a particular stock on a particular stock market. A stock symbol may consist of letters, numbers or a combination of both.',
                            selector: '.stockName',
                        },
                        {
                            title: 'Stock Price',
                            text: 'The is the current price of a single stock from this company. This will update, so keep an eye on it for changes!',
                            selector: '.stockPrice',
                        },
                        {
                            title: 'Percent Change',
                            text: 'This is is percentage that shows negative or positive preformance, compared to the price at the opening of the trading day. Green is positive, red is negative.',
                            selector: '.stockChange',
                        },
                        {
                            title: 'Add to Your Watchlist',
                            text: 'Using the eye icon you can add stocks you own or just ones that you are interested in to your watchlist. You can view Watchlist in the Stock Chart.',
                            selector: '.stockWatch',
                        },
                        {
                            title: 'View Your Watchlist',
                            text: 'The stocks added to your Watchlist scroll here so you can keep an eye on the price per share and the percentage change. You can use this tool to decide when to buy new stocks or sell the ones you have.',
                            selector: '.stockticker',
                        },
                        {
                            title: 'Stock Chart',
                            text: 'This chart tracks the preformance of this stock over the last 30 days. You can easily see how a stock is doing with this helpful chart!',
                            selector: '.chartSection',
                        },
                        {
                            title: 'Shares Owned',
                            text: 'This number is the amount of shares you currently own of this stock.',
                            selector: '.sharesOwned',
                        },
                        {
                            title: 'ROI',
                            text: 'ROI, Return on Investment, is the ratio between the net profit and cost of investment resulting from an investment of a stock. This is a helpful metric to determine if your investment in a stock is performing well. The higher this number, the better that stock is doing. You can also use this simple metric to compare different stocks in your portfolio.',
                            selector: '.roiRow',
                        },
                        {
                            title: 'Price and Date Purchased',
                            text: 'This shows the price of the stock on date you purchased it. This is a good inicator of how your investment has done since you initially purchased it.',
                            selector: '.priceAndDateRow',
                        },
                        {
                            title: 'Making a Transaction',
                            text: 'This form allows you to buy and sell stocks.',
                            selector: '.buySell',
                        },
                        {
                            title: 'Buying and Selling Stocks',
                            text: 'Here you select whether you want to buy or sell your stock.',
                            selector: '.tradeInputs',
                        },
                        {
                            title: 'Number of Shares',
                            text: 'Here you input how many shares you would like to buy or sell.',
                            selector: '.numOfShares',
                        },
                        {
                            title: 'Subtotal and New Bank Value',
                            text: 'The suntotal shows informs you how much money you will make or spend with this transaction. The new bank value informs you what your bank value will be after the transaction is complete.',
                            selector: '.bottomTwoRows',
                        },
                    ]}
                    run={this.state.run} // or some other boolean for when you want to start it
                    type={'continuous'}
                    showOverlay={true}
                    allowClicksThruHole={true}
                    autoStart={this.state.run}
                    disableOverlay={true}
                    showSkipButton={true}
                    callback={this.handleJoyrideCallback}
                />
                <Button type='button' onClick={this.resetTour}>Take a Tour</Button>
                <div className='stockStats container'>
                    <h1>Stock Stats</h1>
                    <div className='row stockTickerBar'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockName'>
                                    <h1>{this.state.ticker}</h1>
                                </div>
                                <div className="stockPrice">
                                    <div className='col-sm-3'>
                                        <h2>PRICE</h2>
                                    </div>
                                    <div className='col-sm-3'>
                                        <h2>${this.state.price}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='stockChange'>
                                    <div className='col-sm-4 changeValue'>
                                        <h2>CHANGE</h2>
                                    </div>
                                    <div className='col-sm-4'>
                                        {this.state.change >= 0 ? (
                                            <div id='changeValuePositive'>
                                                <h2>+{this.state.change.toFixed(2)}%</h2>
                                            </div>
                                        ) : (
                                                <div id='changeValueNegative'>
                                                    <h2>{this.state.change.toFixed(2)}%</h2>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='col-sm-2 stockWatch'>
                                    <FontAwesomeIcon
                                        className={(this.state.watched ? `faEyeWatched`:`faEye`)}
                                        onClick={this.state.watched ?
                                            (this.removeFromWatchlist)
                                            : (this.addToWatchlist)}
                                        size='1x'
                                        icon={faEye} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-8 chartSection'>
                            <div id='stockChart'>

                            </div>
                        </div>
                        <div className='col-sm-12 col-md-4 dataSection'>
                            <div className='row sharesOwned'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>SHARES OWNED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{this.state.totalShares}</h4>
                                </div>
                            </div>
                            <div className='row roiRow'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>ROI</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{this.state.ROI}%</h4>
                                </div>
                            </div>
                            <div className="priceAndDateRow">
                                <div className='row'>
                                    <div className='col-sm-6 col-md-6 stockData'>
                                        <h4>PRICE PURCHASED</h4>
                                    </div>
                                    <div className='col-sm-6 col-md-6 stockData'>
                                        <h4>${this.state.cost.toFixed(2)}</h4>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6 col-md-6 stockData'>
                                        <h4>DATE PURCHASED</h4>
                                    </div>
                                    <div className='col-sm-6 col-md-6 stockData'>
                                        <h4>{this.state.datePurchased}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='transactionForm container'>
                    <form className='buySell'>
                        <div className='row'>
                            <legend>
                                <h1>Transaction Form</h1>
                            </legend>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6 col-md-6 tradeInputs'>
                                <Label><h2>Select One Option</h2>
                                    <div className='form-check form-check-inline'>
                                        <Input
                                            className='form-check-input'
                                            type='radio'
                                            name='transaction'
                                            value='buy'
                                            checked={this.state.transaction === 'buy'}
                                            onChange={this.handleInputChange}
                                            id='inlineRadio1'
                                        />{' '}
                                        <Label
                                            className='form-check-label'
                                            for='inlineRadio1'>
                                            <h3>BUY</h3>
                                        </Label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                        <Input
                                            className='form-check-input'
                                            type='radio'
                                            name='transaction'
                                            value='sell'
                                            checked={this.state.transaction === 'sell'}
                                            onChange={this.handleInputChange}
                                            id='inlineRadio2'
                                        />{' '}
                                        <Label
                                            className='form-check-label'
                                            for='inlineRadio1'>
                                            <h3>SELL</h3>
                                        </Label>
                                    </div>
                                </Label>
                            </div>
                            <div className='col-sm-12 col-md-6 numOfShares'>
                                <Label
                                    for='numberOfShares'>
                                    <h2>Number of Shares</h2>
                                </Label>
                                <Input
                                    type='number'
                                    min='1'
                                    name='shares'
                                    value={this.state.shares}
                                    onChange={this.handleInputChange}
                                    id='numberOfShares'
                                />
                            </div>
                        </div>
                        <div className="bottomTwoRows">
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 totalCalcLabel'>
                                    <h4>SUBTOTAL:</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 totalCalc'>
                                    <h4>${(this.state.shares * this.state.price).toFixed(2)}</h4>
                                </div>
                            </div>
                            <div className='row totalCalc'>
                                <div className='col-sm-6 col-md-6 totalCalcLabel'>
                                    <h4>New Bank Value:</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 totalCalc'>
                                    {this.state.transaction === 'buy' ?
                                    (<h4>${(((this.state.initialCash * 100) -
                                        (this.state.shares * this.state.price * 100)) / 100).toFixed(2)}</h4>
                                    ) : (<h4>${(((this.state.initialCash * 100) -
                                    (-(this.state.shares) * this.state.price * 100)) / 100).toFixed(2)}</h4>)}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Button
                                    className='submitBtn'
                                    onClick={this.transactionExec}>
                                    {/* // onClick={this.toggle}>{this.props.buttonLabel} */}
                                    SUBMIT ORDER
                            </Button>
                            </div>
                            <Modal
                                isOpen={this.state.modal}
                                toggle={this.toggle}
                                className={this.props.modalName}>
                                <ModalHeader
                                    toggle={this.toggle}
                                    className='buySell'>
                                    TRANSACTION STATUS
                                </ModalHeader>
                                <ModalBody
                                    className='buySell transactionModal'>
                                    <h3>{this.state.response}</h3>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="secondary"
                                        onClick={this.toggle}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </form>
                </div >
            </div >
        );
    }
}
TradingCenter.propTypes = propTypes;
export default TradingCenter;

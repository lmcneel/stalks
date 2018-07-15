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
        // this.addToWatchlist = this.addToWatchlist.bind(this);
        // this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
        this.transactionExec = this.transactionExec.bind(this);
        this.myStocks = this.myStocks.bind(this);
        this.cashCalculator = this.cashCalculator.bind(this);
        this.dbStocks = this.dbStocks.bind(this);
        this.myStocksValue = this.myStocksValue.bind(this);
        this.portfolioValue = this.portfolioValue.bind(this);
        this.returnOnInvestment = this.returnOnInvestment.bind(this);
        this.bankValue = this.bankValue.bind(this);
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
            portfolio_id: '5b4bc46134b6a866d293bcb5',
            transaction: 'buy',
            ROI: 0,
            id: '5b4bc46134b6a866d293bcb5',
            cost: 0,
            datePurchased: '',
            value: 0,
            totalShares: 0,
            cashBalance: 0,
            watchedArray: ['AAPL', 'XPP'],
            modal: false,
            watched: false,
            eyeWatched: 'faEye',
        };
    }

/**
 * @public componentDidMount function will render elements
 */
    componentDidMount() {
        this.charting({ticker: this.state.ticker});
        this.myStocks(this.state.portfolio_id);
        this.dbStocks(this.state.portfolio_id);
        this.myStocksValue();
        this.bankValue(this.state.id);
        this.myWatchlist(this.state.watchedArray);
        this.cashCalculator(this.state.portfolio_id);
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
    checkWatchList(ticker) {
        // If in watchlist set [watched] to true
        API.getTickerText(ticker).then(((r) => {
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
 * @param {*} ticker
 */
    addToWatchlist(ticker) {
        // API.addNewTicker(ticker)
        // Need to add to MySQL Watchlist
    }
/**
* @public removeWatchlist function will remove current 'ticker' from user watchlist from onClick
* @param {*} ticker
*/
    removeFromWatchlist() {
        // API.removeExistingTicer(ticker)
        // Need to remove from MySQL Watchlist
    }

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
 * @param {*} portfolio
 * @return {*} returns users cash
 */
    cashCalculator(portfolio) {
        return API.getMyStocks(portfolio)
            .then((res) => {
                let cashTotal = 20000;
                for (let i = 0; i < res.data.length; i++) {
                    cashTotal -= res.data[i].sharePrice * res.data[i].shares;
                }
                this.setState({
                    cashBalance: cashTotal.toFixed(2),
                });
            })
            .catch((err) => console.log(err));
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
        let initCash = 20000.00;
        let PV = 0;
        let pvROI = 0;
        Object.keys(stocks).forEach((key) => {
            for (let j = 0, len2 = lastPrice.length; j < len2; j++) {
                if (key === lastPrice[j].symbol) {
                    PV += (stocks[key] * lastPrice[j].price);
                };
            };
        });
        let userPortfolioValue = PV + Number(this.state.cashBalance);
        let a = userPortfolioValue - initCash;
        pvROI = ((a / initCash) * 100).toFixed(2);
        return {
            userPortfolioValue,
            pvROI,
        };
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
                        let a = (lastPrice[j].price * allUserStocks[key]);
                        let b = (allUserStocks[key] * boughtStocks[i].sharePrice);
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
    bankValue(portfolio) {
        let bank = 0;
        return API.getMyPortfolio(portfolio)
            .then((res) => {
                let data = res.data;
                bank = (data[0].cash).toFixed(2);
                return bank;
            })
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

                // const chartCategories = res.data.chart.map((day) => {
                //     let dateArray = [];
                //     dateArray.push(day.date);
                //     return dateArray;
                // });
                Highcharts.chart('stockChart', {
                    chart: {
                        spacingBottom: 20,
                        // plotBackgroundColor: '#DDDFE1',
                        // backgroundColor: '#DDDFE1',
                        height: null,
                    },
                    title: {
                        // text: `${this.state.ticker} Stock Price`
                        text: null,
                    },

                    xAxis: {
                        title: {text: 'Past 30 Days'},
                        // categories: chartCategories,
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
        if ((this.state.cashBalance - (this.state.shares * this.state.price)) >= 0) {
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
                            this.cashCalculator(this.state.portfolio_id);
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
                            this.cashCalculator(this.state.portfolio_id);
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
 * @return {*} Will render trade center component
 */
    render() {
        return (
            <div className='trading'>
                <div className='stockStats container'>
                    <h1>Stock Stats</h1>

                    <div className='row stockTickerBar'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6'>
                                    <h1>{this.state.ticker}</h1>
                                </div>
                                <div className='col-sm-3'>
                                    <h2>PRICE</h2>
                                </div>
                                <div className='col-sm-3'>
                                    <h2>${this.state.price}</h2>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
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
                                <div className='col-sm-2'>
                                    <FontAwesomeIcon
                                        className={(this.state.watched ? `faEyeWatched`:`faEye`)}
                                        onClick={this.state.watched ?
                                            (this.removeFromWatchlist())
                                            : (this.addToWatchlist())}
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
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>SHARES OWNED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{this.state.totalShares}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>ROI</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{this.state.ROI}%</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
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
                            <div className='col-sm-12 col-md-6'>
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
                                (<h4>${(this.state.cashBalance -
                                    (this.state.shares * this.state.price)).toFixed(2)}</h4>
                                ) : (<h4>${((this.state.cashBalance) -
                                (-(this.state.shares) * this.state.price)).toFixed(2)}</h4>)}
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
                                    <h2>TRANSACTION STATUS</h2>
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

import React, {Component} from 'react';
import {Collapse, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Highcharts from 'highcharts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faChevronCircleDown} from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import Promise from 'bluebird';
import _ from 'underscore';
import PropTypes from 'prop-types';

const propTypes = {
    ticker: PropTypes.string,
};

/**
 * This component generates a single stock view component
 * @class OwnedStock
 */
class OwnedStock extends Component {
/**
 * @param {*} props
 */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.checkWatchList = this.checkWatchList.bind(this);
        this.addToWatchlist = this.addToWatchlist.bind(this);
        this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
        this.myStocks = this.myStocks.bind(this);
        this.cashCalculator = this.cashCalculator.bind(this);
        this.dbStocks = this.dbStocks.bind(this);
        this.myStocksValue = this.myStocksValue.bind(this);
        this.portfolioValue = this.portfolioValue.bind(this);
        this.returnOnInvestment = this.returnOnInvestment.bind(this);
        this.bankValue = this.bankValue.bind(this);
        this.charting = this.charting.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            ticker: this.props.ticker,
            price: 0,
            shares: 0,
            change: 0,
            response: '',
            portfolio_id: '5b469e9d1819e80bd4ddeb78',
            transaction: 'buy',
            ROI: 0,
            id: '5b469e9d1819e80bd4ddeb78',
            cost: 0,
            datePurchased: '',
            value: 0,
            totalShares: 0,
            cashBalance: 0,
            watchedArray: ['AAPL', 'XPP'],
            selected: '',
            response: '',
            collapse: false,
            watched: false,
            eyeWatched: 'faEye',
            sqlId: 1,
        };
    }
/**
 * @public componentDidMount function will render the chart
 */
    componentDidMount() {
        this.charting({ticker: this.state.ticker});
        this.myStocks(this.state.portfolio_id);
        this.dbStocks(this.state.portfolio_id);
        this.myStocksValue();
        this.bankValue(this.state.id);
        this.cashCalculator(this.state.portfolio_id);
        this.checkWatchList();
    };
/**
 * @public toggle function for reactstap <Collapse> onClick trigger
 */
    toggle() {
        this.setState({collapse: !this.state.collapse});
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
 * @public myStocks function that gets users stocks from mongo database
 * @param {*} portfolio
 * @return {*} returns users stocks
 */
myStocks(portfolio) {
    return API.getMyStocks(portfolio)
        .then((res) => {
            // console.log(res.data);
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
                // console.log(userShares);

                if (company[0] === this.state.ticker && company.length > 0) {
                    this.setState({
                        totalShares: company[1],
                        cost: spent[1] / company[1],
                        datePurchased: res.data[res.data.length - 1].date.slice(0, 10),
                    });
                    // console.log(spent[i] / company[i]);
                } else {
                    this.setState({
                        totalShares: 0,
                        cost: 0,
                        datePurchased: 'N/A',
                    });
                }
            };

            // console.log(userStocks);
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
            // console.log(res.data);
            let cashTotal = 20000;
            for (let i = 0; i < res.data.length; i++) {
                cashTotal -= res.data[i].sharePrice * res.data[i].shares;
            }
            // console.log(cashTotal);
            this.setState({
                cashBalance: cashTotal.toFixed(2),

            });
        })
        .catch((err) => console.log(err));
}

/**
* @public dbStocks function that gets users stocks from mongo database
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
            // console.log(res.data);
            allUserStocks = res.data;
            // console.log(allUserStocks);
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
                    // console.log(key);
                    return API.userQuotes({
                        ticker: key,
                    })
                        .then((res) => {
                            // console.log(res.data);
                            lastPrice.push(res.data[0]);
                            // console.log(lastPrice);
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
            // console.log(current);
            return current;
        });
};

/**
* @public myStocksValue function that gets users stocks value from mongo database
* @param {*} portfolio
*/
myStocksValue() {
    let self = this;

    this.myStocks(this.state.portfolio_id)
        .then((result) => {
            // console.log(result);
            let stocks = result;
            let lastPrice = [];

            // console.log(stocks);

            let current = Promise.resolve();

            Object.keys(stocks).forEach(function(key) {
                current = current.then(() => {
                    // console.log(key);
                    return API.userQuotes({
                        ticker: key,
                    })
                        .then((res) => {
                            // console.log(res.data);
                            lastPrice.push(res.data[0]);
                            // console.log(lastPrice);
                            self.portfolioValue(stocks, lastPrice);
                        });
                });
            });
            return current;
        });
};

/**
* @public portfolioValue function that gets users portfolio value from mongo database
* @param {*} stocks
* @param {*} lastPrice
* @return {*} returns users cash
* This function will calculate the Portfolio Value & Portfolio Value ROI
* The inputs to this function  are The list of Shares the user has and the latest Rpice of those shares
*/
portfolioValue(stocks, lastPrice) {
    // console.log(stocks);
    // Since the Game starts the user with a set starting value it's used as a variable
    let initCash = 20000.00;
    let PV = 0;
    let pvROI = 0;

    // console.log(lastPrice[0]);
    Object.keys(stocks).forEach((key) => {
        for (let j = 0, len2 = lastPrice.length; j < len2; j++) {
            if (key === lastPrice[j].symbol) {
                // console.log(stocks[key]);
                PV += (stocks[key] * lastPrice[j].price);
            };
        };
    });
    // Portfolio Value is Equal to
    // console.log(PV);
    // console.log(this.state.cashBalance);
    let userPortfolioValue = PV + Number(this.state.cashBalance);
    // console.log('The Portfolio Value is: $' + userPortfolioValue);
    // console.log(initCash);
    let a = userPortfolioValue - initCash;
    // Portfolio ROI is Callculated Below
    pvROI = ((a / initCash) * 100).toFixed(2);
    // console.log('The Portfolio ROI is:  ' + pvROI);
    return {
        userPortfolioValue,
        pvROI,
    };
};

/**
* @public ROI function that gets users retrun on investment value from mongo database
* @param {*} allUserStocks
* @param {*} lastPrice
* @param {*} userStocks
* @return {*} returns users ROI
*/
returnOnInvestment(allUserStocks, lastPrice, userStocks) {
    // console.log(allUserStocks);
    // console.log(lastPrice);
    let eachROI = [];

    for (let i = 0; i < userStocks.length; i++) {
        if (userStocks[i].type === 'Sell') {
            userStocks.splice(i, 1);
        };
    };
    // console.log(userStocks);
    let boughtStocks = _.uniq(userStocks, function(p) {
        return p.ticker;
    });
    // console.log(boughtStocks);

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
    // console.log('The individual Stocks ROI is:');
    // console.log(eachROI);

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
            // console.log(res.data);
            let data = res.data;
            // console.log(data);
            bank = (data[0].cash).toFixed(2);
            // console.log(bank);
            return bank;
        })
        .catch((err) => console.log(err));
};
/**
 * @public charting function assigns chart data from API
 * @param {*} ticker is the current ticker state
 */
charting(ticker) {
    API.findQuotes(ticker)
    .then((res) => {
        // console.log(res.data);
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
 * @return {*} Will render trade center component
 */
    render() {
        // const { selectHintOnEnter } = this.state;
        return (
            <div>
                <div className='stockStats listStocks container'>

                    {/* Goal is to dynamically create elemets based off array of tickers */}

                    {/* ====================== */}
                    <div className='row stockTickerBarCollapse'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-2 col-md-3'>
                                    <FontAwesomeIcon
                                        // onclick={addToWatchlist}
                                        size='2x'
                                        icon={faChevronCircleDown}
                                        onClick={this.toggle}
                                    />
                                </div>
                                <div className='col-sm-4 col-md-3'>
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
                                <div className='col-sm-3 changeValue'>
                                    <h2>CHANGE</h2>
                                </div>
                                <div className='col-sm-3'>
                                    {this.state.change >= 0 ? (
                                        <div id='changeValuePositive'>
                                            <h2>{this.state.change.toFixed(2)}%</h2>
                                        </div>
                                    ) : (
                                            <div id='changeValueNegative'>
                                                <h2>{this.state.change.toFixed(2)}%</h2>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    <FontAwesomeIcon
                                        className={(this.state.eyeWatched ? `faEyeWatched`:`faEye`)}
                                        onClick={this.state.watched ?
                                        (this.removeFromWatchlist) : (this.addToWatchlist)}
                                        size='1x'
                                        icon={faEye} />
                                </div>
                                <div className='col-sm-3'>
                                    <Button
                                        className='buyBtn'
                                    >
                                        <Link
                                            to={'/trading/' + this.state.ticker}
                                        >
                                            BUY / SELL
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='collapseTop'>
                        <Collapse isOpen={this.state.collapse}>
                            <div className='row'>
                                <div className='col-sm-6 col-md-8 chartSection'>
                                    <div id={this.state.ticker}>

                                    </div>
                                </div>
                                <div className='col-sm-6 col-md-4 dataSection'>
                                    <div className='row'>
                                        <div className='col-sm-6 col-md-6 stockData'>
                                            <h4>SHARES OWNED</h4>
                                        </div>
                                        <div className='col-sm-6 col-md-6 stockData'>
                                            <h4>{this.state.totalShares}</h4>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6 col-md-6 stockData'>
                                            <h4>ROI</h4>
                                        </div>
                                        <div className='col-sm-6 col-md-6 stockData'>
                                            <h4>${this.state.ROI}</h4>
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
                        </Collapse>
                    </div>
                </div>
            </div >
        );
    }
}
OwnedStock.propTypes = propTypes;
export default OwnedStock;

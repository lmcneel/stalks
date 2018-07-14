//The contents of this file should go on client side main pages
import React, { Component } from 'react';
import { Collapse, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faChevronCircleDown } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import Promise from 'bluebird';
import _ from 'underscore';



class OwnedStock extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            // ticker: this.props.ticker,
            ticker: 'XOM',
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
            watchedArray: ["AAPL", "XPP"],
            selected: '',
            response: '',
            collapse: false,
            watched: false,
            eyeWatched: 'faEye',
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

        this.charting({ ticker: this.state.ticker });
        this.myStocks(this.state.portfolio_id);
        this.dbStocks(this.state.portfolio_id);
        // this.myStocksValue();
        // this.bankValue(this.state.id);
        // this.cashCalculator(this.state.portfolio_id);
        this.checkWatchList();
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    };

    checkWatchList = () => {
        // If in watchlist set [watched] to true
        // API.getWatchListItem(ticker)
        //     .then(res => {
        //         console.log(res.data);
        //         if (res.data.ticker === this.state.ticker) {
        //             this.setState({ watched: !this.state.watched })
        //         } else {
        //             this.setState({ watched: this.state.watched })
        //         }
        //     })
        //     .catch(err => console.log(err))

        this.setState({ watched: this.state.watched })

        // return /this.state.watched = false;

    };

    addToWatchlist = (ticker) => {
        // Need to add to MySQL Watchlist, then check watch list
        // API.addWatchListItem(ticker)
        // .then(res => {

        //     // Code to add ticker to mySQL

        // })
        // .catch(err => console.log(err))
    }

    removeFromWatchlist = (ticker) => {
        // Need to remove from MySQL Watchlist, then check watch list
        // API.removeWatchListItem(ticker)
        // .then(res => {

        //     // Code to add ticker to mySQL

        // })
        // .catch(err => console.log(err))        
    }

    myStocks = (portfolio) => {
        console.log('2')

        return API.getMyStocks(portfolio)
            .then(res => {
                console.log('4')
                console.log(res.data);
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
                let company = Object.entries(userShares)[0];
                let spent = Object.entries(userStocks)[0];
                console.log(userShares);
                console.log(spent[1] / company[1]);
                
                this.setState({
                    totalShares: company[1],
                    cost: spent[1] / company[1],
                    datePurchased: res.data[res.data.length - 1].date.slice(0, 10),
                })
                console.log(userStocks);
                return userShares;
            })
    }

    cashCalculator = (portfolio) => {

        return API.getMyStocks(portfolio)
            .then(res => {
                console.log(res.data);
                let cashTotal = 20000;
                for (let i = 0; i < res.data.length; i++) {
                    cashTotal -= res.data[i].sharePrice * res.data[i].shares;
                }
                console.log(cashTotal);
                this.setState({
                    cashBalance: cashTotal.toFixed(2)
                    
                });
            })
            .catch(err => console.log(err));
    }

    dbStocks = (portfolio) => {
        let self = this;

        console.log('2')
        let allUserStocks;
        let lastPrice = [];
        let userStocks = {};
        return API.getMyStocks(portfolio)
            .then(res => {
                console.log('4')
                console.log(res.data);
                allUserStocks = res.data;
                console.log(allUserStocks);
                for (var i = 0; i < res.data.length; i++) {
                    if (!userStocks[res.data[i].ticker]) {
                        userStocks[res.data[i].ticker] = res.data[i].shares;
                    } else {
                        userStocks[res.data[i].ticker] += res.data[i].shares;
                    }
                }
                console.log(userStocks);

                let current = Promise.resolve();

                Object.keys(userStocks).forEach(key => {
                    current = current.then(() => {
                        console.log(key);
                        return API.userQuotes({
                            ticker: key
                        })
                            .then(res => {
                                console.log(res.data);
                                lastPrice.push(res.data[0]);
                                console.log(lastPrice);
                                const myROI = self.ROI(userStocks, lastPrice, allUserStocks);
                                this.setState({
                                    ROI: myROI[0].roi,
                                })

                            })
                    })
                    // .then(result=>{
                })
                console.log(current);
                return current
            });
    };

    myStocksValue = () => {
        let self = this;

        this.myStocks(this.state.portfolio_id)
            .then(result => {
                console.log(result);
                let stocks = result;
                let lastPrice = [];

                console.log('5')
                console.log(stocks);

                let current = Promise.resolve();

                Object.keys(stocks).forEach(function (key) {
                    current = current.then(() => {
                        console.log(key);
                        return API.userQuotes({
                            ticker: key
                        })
                            .then(res => {
                                console.log(res.data);
                                lastPrice.push(res.data[0]);
                                console.log(lastPrice);
                                self.portfolioValue(stocks, lastPrice);

                            })
                    })
                    // .then(result=>{
                })
                return current
            })
    };

    // This function will calculate the Portfolio Value & Portfolio Value ROI
    // The inputs to this function  are The list of Shares the user has and the latest Rpice of those shares    
    portfolioValue = (stocks, lastPrice) => {
        console.log(stocks);
        // Since the Game starts the user with a set starting value it's used as a variable
        let initCash = 20000.00;
        let PV = 0;
        let pvROI = 0;
        // console.log(lastprice);
        console.log(lastPrice[0]);
        Object.keys(stocks).forEach(key => {
            for (var j = 0, len2 = lastPrice.length; j < len2; j++) {
                if (key === lastPrice[j].symbol) {
                    console.log(stocks[key]);
                    PV += (stocks[key] * lastPrice[j].price);
                }
            }
        })
        // Portfolio Value is Equal to
        console.log(PV);
        console.log(this.state.cashBalance)
        let userPortfolioValue = PV + Number(this.state.cashBalance)
        console.log("The Portfolio Value is: $" + userPortfolioValue);
        console.log(initCash);
        let a = userPortfolioValue - initCash;
        // Portfolio ROI is Callculated Below
        pvROI = ((a / initCash) * 100).toFixed(2);
        console.log("The Portfolio ROI is:  " + pvROI);
        return {
            userPortfolioValue,
            pvROI
        };
    };

    ROI = (allUserStocks, lastPrice, userStocks) => {
        console.log(allUserStocks);
        console.log(lastPrice);
        let eachROI = [];

        for (var i = 0; i < userStocks.length; i++) {
            if (userStocks[i].type === "Sell") {
                userStocks.splice(i, 1);
            }
        }
        console.log(userStocks);
        let boughtStocks = _.uniq(userStocks, function (p) { return p.ticker; });
        console.log(boughtStocks);


        Object.keys(allUserStocks).forEach(key => {
            for (var j = 0, len1 = lastPrice.length; j < len1; j++) {
                for (var i = 0, len2 = boughtStocks.length; i < len2; i++) {
                    let obj = {
                        ticker: "",
                        roi: ""
                    };

                    if (key === lastPrice[j].symbol && key === boughtStocks[i].ticker) {
                        obj.ticker = key;
                        let a = (lastPrice[j].price * allUserStocks[key]);
                        let b = (allUserStocks[key] * boughtStocks[i].sharePrice);
                        let c = ((a - b) / b) * 100;
                        obj.roi = (c).toFixed(2);
                        eachROI.push(obj);


                    }
                }
            }
        });
        console.log("The individual Stocks ROI is:");
        console.log(eachROI);

        return eachROI;

    };

    // This function will give the Current user Cash
    // The input needs to be the User Portfolio ID.
    bankValue = (portfolio) => {
        let bank = 0;
        return API.getMyPortfolio(portfolio)
            .then(res => {
                console.log(res.data);
                let data = res.data;
                console.log(data);
                bank = (data[0].cash).toFixed(2);
                console.log(bank);
                return bank;
            })
            .catch(err => console.log(err));
    };

    charting = (ticker) => {

        API.findQuotes(ticker)
            .then(res => {
                console.log(res.data);
                this.setState({
                    price: res.data.quote.latestPrice,
                    change: res.data.quote.changePercent,
                });
                const chartData = res.data.chart.map(day => {
                    let dayArray = [];
                    dayArray.push(day.date);
                    dayArray.push(day.close);
                    return dayArray;
                });

                const chartCategories = res.data.chart.map(day => {
                    let dateArray = [];
                    dateArray.push(day.date);
                    return dateArray;
                });

                Highcharts.chart(this.state.ticker, {
                    chart: {
                        spacingBottom: 20,
                        // plotBackgroundColor: '#DDDFE1',
                        // backgroundColor: '#DDDFE1',
                        height: null
                    },
                    title: {
                        // text: `${this.state.ticker} Stock Price`
                        text: null
                    },

                    xAxis: {
                        title: { text: 'Past 30 Days' },
                        // categories: chartCategories,
                        categories: null,
                        text: null,
                        lineColor: '#404850',
                        lineWidth: 2
                    },
                    yAxis: {
                        title: null,
                        lineColor: '#404850',
                        lineWidth: 2
                    },
                    legend: {
                        enabled: false
                    },

                    series: [{
                        type: 'line',
                        color: '#0C425C',
                        name: this.state.ticker,
                        data: chartData,
                        marker: { enabled: true },
                        tooltip: { valueDecimals: 2 },
                    }]
                });
            })
            .catch(err => console.log(err));
    }


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
                                        {...this.state.watched ? (this.state.eyeWatched = 'faEyeWatched') : (this.state.eyeWatched = 'faEye')}
                                        className={this.state.eyeWatched}
                                        onClick={this.state.watched ? (this.removeFromWatchlist()) : (this.addToWatchlist())}
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
        )
    }
}

export default OwnedStock;
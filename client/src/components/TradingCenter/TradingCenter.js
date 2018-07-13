//The contents of this file should go on client side main pages
import React, { Component } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticker: 'XOM',
            price: 0,
            shares: 0,
            change: 0,
            response: '',
            portfolio_id: '5b458c3cec9285215f43540f',
            transaction: 'buy',
            ROI: 0,
            cost: 0,
            datePurchased: '',
            value: 0,
            totalShares: 0,
            cashBalance: 0,
            modal: false,
            watched: true,
            eyeWatched: 'faEye'
        }
        this.toggle = this.toggle.bind(this);
    }



    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    };

    checkWatchList = () => {
        // If in watchlist set [watched] to true
        return this.state.watched = false;
    };

    addToWatchlist = () => {
        // Need to add to MySQL Watchlist, then check watch list
        this.state.checkWatchList();
    }

    removeFromWatchlist = () => {
        // Need to remove from MySQL Watchlist, then check watch list
        this.state.checkWatchList();
    }

    componentDidMount() {
        this.charting({ ticker: this.state.ticker });
        this.myStocks(this.state.portfolio_id);
        this.myStocksValue();
        this.lastPurchase(this.state.portfolio_id);
        this.cashCalculator(this.state.portfolio_id);
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    transactionExec = () => {
        if (this.state.transaction === 'buy') {
            this.buyShares();
        } else {
            this.sellShares();
        };
    };

    lastPurchase = (portfolio) => {
        API.getMyStocks(portfolio)
            .then(res => {
                console.log(res.data);
                const userStocks = {};
                const userShares = {};
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
                console.log(spent[1] / company[1]);
                this.setState({
                    cost: spent[1] / company[1],
                    datePurchased: res.data[res.data.length - 1].date.slice(0, 10),
                })
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
                })
            })
            .catch(err => console.log(err));
    }

    myStocks = (portfolio) => {
        return API.getMyStocks(portfolio)
            .then(res => {
                console.log(res.data);
                const userStocks = {};
                for (let i = 0; i < res.data.length; i++) {
                    if (!userStocks[res.data[i].ticker]) {
                        userStocks[res.data[i].ticker] = res.data[i].shares;
                    } else {
                        userStocks[res.data[i].ticker] += res.data[i].shares;
                    }
                }
                console.log(userStocks);
                return userStocks;
            })
            .catch(err => console.log(err));
    };

    myStocksValue = () => {
        this.myStocks(this.state.portfolio_id)
            .then(result => {
                let stocks = result;
                let company = Object.entries(stocks)[0];
                console.log(stocks.XOM)
                this.state.totalShares = company[1];
            });
    }

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

                Highcharts.chart('stockChart', {
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


    buyShares = () => {
        // event.preventDefault();
        API.findQuotes(
            { ticker: this.state.ticker }
        ).then(res => {
            console.log(res.data);
            this.setState({ price: res.data.quote.latestPrice });
            if (this.state.ticker && this.state.price && this.state.shares) {
                API.buyShares({
                    portfolio_id: this.state.portfolio_id,
                    type: 'buy',
                    ticker: this.state.ticker,
                    sharePrice: this.state.price,
                    shares: this.state.shares
                })
                    .then(res => {
                        this.setState({
                            ticker: 'XOM',
                            shares: 0,
                            response: 'Transaction successfully completed'
                        });
                        console.log(this.state.response);
                        this.toggle();
                    })
                    .catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    };


    sellShares = () => {
        // event.preventDefault();
        API.findQuotes(
            { ticker: this.state.ticker }
        ).then(res => {
            this.setState({ price: res.data.quote.latestPrice });
            if (this.state.ticker && this.state.price && this.state.shares) {
                API.sellShares({
                    portfolio_id: this.state.portfolio_id,
                    type: 'sell',
                    ticker: this.state.ticker,
                    sharePrice: this.state.price,
                    shares: -(this.state.shares)
                })
                    .then(res => {
                        this.setState({
                            ticker: 'XOM',
                            shares: 0,
                            response: 'Transaction successfully completed'
                        })
                        console.log(this.state.response);
                        this.toggle();
                    })
                    .catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    };

    render() {
        return (
            <div className='container trading'>
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
                                        {...this.state.watched ? (this.state.eyeWatched = 'faEyeWatched') : (this.state.eyeWatched = 'faEye')}
                                        className={this.state.eyeWatched}
                                        onclick={this.state.addToWatchlist}
                                        size='1x'
                                        icon={faEye} />
                                    {/* OnClick Function Required */}
                                    {/* If not on user watchlist, will need have onclic function to add it to watchlist, and updated state */}

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
                                    <h4>${this.state.ROI}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>PRICE PURCHASED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>${this.state.cost}</h4>
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
                                <h4>${this.state.shares * this.state.price}</h4>
                            </div>
                        </div>
                        <div className='row totalCalc'>
                            <div className='col-sm-6 col-md-6 totalCalcLabel'>
                                <h4>New Bank Vale:</h4>
                            </div>
                            <div className='col-sm-6 col-md-6 totalCalc'>
                                {this.state.transaction === 'buy' ? (<h4>${(this.state.cashBalance - (this.state.shares * this.state.price)).toFixed(2)}</h4>
                                ) : (<h4>${((this.state.cashBalance) - (-(this.state.shares) * this.state.price)).toFixed(2)}</h4>)}
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
                                className={this.props.className}>
                                <ModalHeader
                                    toggle={this.toggle}
                                    className='buySell'>
                                    <h2>TRANSACTION COMPLETE</h2>
                                </ModalHeader>
                                <ModalBody
                                    className='buySell transactionModal'>
                                    <h3>Your order was submitted and processed!</h3>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="secondary"
                                        onClick={this.toggle}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </form>
                </div >
            </div >
        )
    }
}

export default Transaction;
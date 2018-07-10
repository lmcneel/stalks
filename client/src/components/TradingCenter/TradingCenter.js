//The contents of this file should go on client side main pages
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/fontawesome-free-solid';
import { faEye } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';

const change = 0; // This is the CHANGE value, Only a placeholder for testing
let watched = false; // This watchlist flag
let favorite = false; // This is the favorite flag
let eyeWatched = 'faEye'; // class variable for watchlist condition
let heartFav = 'faHeart'; // class variable for favorite condidtion

const checkWatchList = () => {
    // If in watchlist set [watched] to true
    return watched = true;
};

const checkFavoriteList = () => {
    // If in favorite list set {favorite} to true
    return favorite = true;
};

const addToWatchlist = () => {
    // Need to add to MySQL Watchlist, then check watch list
    checkWatchList();
}

const addToFav = () => {
    // Need to add to MySQL Favorites List, then check favorite list
    checkFavoriteList();
};


class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticker: 'XOM',
            price: 0,
            shares: 0,
            change: 0,
            response: '',
            portfolio_id: '5b43f3c97511f2daace36b11',
            transaction: 'buy',
            ROI: 0,
            cost: 0,
            datePurchased: '',
            value: 0,
            cashBalance: 0,
        }
    }

    // stockStats() {
    //     // event.preventDefault();
    //     API.findQuotes(
    //         { ticker: this.state.ticker }
    //     ).then(res => {
    //         console.log(res.data);
    //         this.setState({ price: res.data.quote.latestPrice });
    //     }).catch(err => console.log(err));
    // };

    componentDidMount() {
        this.charting({ ticker: this.state.ticker });
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
                            price: 0,
                            shares: 0,
                            response: 'Transaction successfully completed'
                        });
                        console.log(this.state.response);
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
                            ticker: '',
                            price: 0,
                            shares: 0,
                            response: 'Transaction successfully completed'
                        })
                        console.log(this.state.response);
                    })
                    .catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <div className='stockStats container'>
                    <h1>Stock Stats</h1>

                    <div className='row stockTickerBar'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6'>
                                    <h1>{this.state.ticker}</h1>
                                    {/* Placeholder */}
                                </div>
                                <div className='col-sm-3'>
                                    <h2>PRICE</h2>
                                </div>
                                <div className='col-sm-3'>
                                    <h2>${this.state.price}</h2>
                                    {/* Placeholder */}
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-3 changeValue'>
                                    <h2>CHANGE</h2>
                                </div>
                                {/* Change is a Placeholder */}
                                <div className='col-sm-3'>
                                    {change >= 0 ? (
                                        <div id='changeValuePositive'>
                                            <h2>{this.state.change*100}%</h2>
                                        </div>
                                    ) : (
                                            <div id='changeValueNegative'>
                                                <h2>{change}%</h2>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='col-sm-2'>
                                    <FontAwesomeIcon
                                        {...watched ? (eyeWatched = 'faEyeWatched') : (eyeWatched = 'faEye')}
                                        className={eyeWatched}
                                        onclick={addToWatchlist}
                                        size='1x'
                                        icon={faEye} />
                                    {/* OnClick Function Required */}
                                    {/* If not on user watchlist, will need have onclic function to add it to watchlist, and updated state */}

                                </div>
                                <div className='col-sm-2'>
                                    <FontAwesomeIcon
                                        {...favorite ? (heartFav = 'faHeartFav') :
                                            (heartFav = 'faHeart')}
                                        className={heartFav}
                                        onclick={addToFav}
                                        size='1x'
                                        icon={faHeart} />
                                    {/* OnClick Function Required */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6 col-md-6 chartSection'>
                            <div id='stockChart'>

                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6 dataSection'>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>SHARES OWNED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{30000}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>ROI</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>${100}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>PRICE PURCHASED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>${100}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>DATE PURCHASED</h4>
                                </div>
                                <div className='col-sm-6 col-md-6 stockData'>
                                    <h4>{'7-8-2018'}</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='transactionForm container'>
                    <form className='buySell'>
                        <legend>
                            <h1>Transaction Form</h1>
                        </legend>
                        <div className='form-row'>
                            <div className='col-sm-6 col-md-6 tradeInputs'>
                                <FormGroup>
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
                                </FormGroup>
                            </div>
                            <div className='col-sm-6 col-md-6'>
                                <FormGroup>
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
                                </FormGroup>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='col-sm-6 col-md-6 totalCalcLabel'>
                                <h4>SUBTOTAL:</h4>
                            </div>
                            <div className='col-sm-6 col-md-6 totalCalc'>
                                <h4>${-2500.00}</h4>
                                {/* Placeholder */}
                            </div>
                        </div>
                        <div className='form-row totalCalc'>
                            <div className='col-sm-6 col-md-6 totalCalcLabel'>
                                <h4>New Bank Vale:</h4>
                            </div>
                            <div className='col-sm-6 col-md-6 totalCalc'>
                                <h4>${10000.00}</h4>
                                {/* Placeholder */}
                            </div>
                        </div>
                        <Button
                            className='submitBtn'
                            onClick={this.transactionExec}
                        >
                            SUBMIT ORDER
                    </Button>
                    </form>
                </div>
            </div >
        )
    }
}

export default Transaction;
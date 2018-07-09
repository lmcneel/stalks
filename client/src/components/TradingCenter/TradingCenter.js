//The contents of this file should go on client side main pages

import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, } from 'reactstrap';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/fontawesome-free-solid';
import { faEye } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticker: 'XOM',
            price: 0,
            shares: 0,
            response: '',
            portfolio_id: '5b419b38c5cede35beeec8ee',
            transaction: 'buy',
        }
    }

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
                        // Edit chart spacing
                        spacingBottom: 20,
                        // backgroundColor: '#e9ecef',
                        backgroundColor: '#DDDFE1',
                        // plotbackgroundColor: '#e9ecef',
                        height: null
                    },
                    title: {
                        // text: `${this.state.ticker} Stock Price`
                        text: null
                    },

                    xAxis: {
                        // title: { text: 'Days' },
                        categories: chartCategories,
                        // categories: null,
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
                        color: '#404850',
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
                    shares: this.state.shares
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
                        <div className='col-sm-6'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <h1>XOM</h1>
                                    {/* Placeholder */}
                                </div>
                                <div className='col-sm-3'>
                                    <h2>$PRICE:</h2>
                                </div>
                                <div className='col-sm-3'>
                                    <h2>75.51</h2>
                                    {/* Placeholder */}
                                    {/* Need Function for Color Change if possible */}
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <h2>Change:</h2>
                                </div>
                                <div className='col-sm-4' id='changeValue'>
                                    <h2>+1.50</h2>
                                    {/* Placeholder */}
                                </div>
                                <div className='col-sm-2'>
                                    <FontAwesomeIcon
                                        icon={faEye} />
                                    {/* OnClick Function Required */}
                                </div>
                                <div className='col-sm-2'>
                                    <FontAwesomeIcon
                                        icon={faHeart} />
                                    {/* OnClick Function Required */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6 chartSection'>
                            <div id='stockChart'>

                            </div>
                        </div>
                        <div className='col-sm-6 dataSection'>
                            <div className='row'>
                                <div className='col-sm-8 stockData'>
                                    <h4>Shares Owned:</h4>
                                </div>
                                <div className='col-sm-4 stockData'>
                                    <h4>30,000</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-8 stockData'>
                                    <h4>ROI:</h4>
                                </div>
                                <div className='col-sm-4 stockData'>
                                    <h4>$100</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-8 stockData'>
                                    <h4>Price Purchased:</h4>
                                </div>
                                <div className='col-sm-4 stockData'>
                                    <h4>$100</h4>
                                    {/* Placeholder */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-8 stockData'>
                                    <h4>Date Purchased:</h4>
                                </div>
                                <div className='col-sm-4 stockData'>
                                    <h4>7-8-2018</h4>
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
                            <div className='col-sm-6 tradeInputs'>
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
                            <div className='col-sm-6'>
                                <FormGroup>
                                    <Label
                                        for='numberOfShares'>
                                        <h2>Number of Shares</h2>
                                    </Label>
                                    <Input
                                        type='text'
                                        name='shares'
                                        value={this.state.shares}
                                        onChange={this.handleInputChange}
                                        id='numberOfShares'
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='col-sm-6 totalCalcLabel'>
                                <h4>SUBTOTAL:</h4>
                            </div>
                            <div className='col-sm-6 totalCalc'>
                                <h4>$-2,500.00</h4>
                                {/* Placeholder */}
                            </div>
                        </div>
                        <div className='form-row totalCalc'>
                            <div className='col-sm-6 totalCalcLabel'>
                                <h4>New Bank Vale:</h4>
                            </div>
                            <div className='col-sm-6 totalCalc'>
                                <h4>$10,000.00</h4>
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
            </div>
        )
    }
}

export default Transaction;
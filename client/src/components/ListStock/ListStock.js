//The contents of this file should go on client side main pages
import React, { Component } from 'react';
import { Input, Collapse, Button } from 'reactstrap';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faChevronCircleDown } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';


class ListStock extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            ticker: 'XOM',
            price: 0,
            change: 0,
            value: '',
            selected: '',
            response: '',
            collapse: false,
            watched: false,
            eyeWatched : 'faEye',
        }

    }


    toggle() {
        this.setState({ collapse: !this.state.collapse });
    };

    checkWatchList = () => {
        // If in watchlist set [watched] to true
        return this.state.watched = false;
    };
    
    addToWatchlist = () => {
        // Need to add to MySQL Watchlist, then check watch list
        this.state.checkWatchList();
    }

    componentDidMount() {
        this.charting({ ticker: this.state.ticker });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleTypeheadChange = event => {
        const { name, selected } = event.target;
        this.setState({ [name]: selected });
    };

    handleFormSubmit = event => {
        this.charting({ ticker: this.state.ticker });
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


    render() {
        // const { selectHintOnEnter } = this.state;
        return (
            <div>
                <div className='stockStats searchStockStats container'>

                    {/* Goal is to dynamically create elemets based off array of tickers */}

                    {/* ====================== */}
                    <div className='row stockTickerBarCollapse'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='row'>
                                <div className='col-sm-2 col-md-2'>
                                    <FontAwesomeIcon
                                        // onclick={addToWatchlist}
                                        size='2x'
                                        icon={faChevronCircleDown}
                                        onClick={this.toggle}
                                    />
                                </div>
                                <div className='col-sm-4 col-md-4'>
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
                                            <h2>{this.state.change.toFixed(2)}%</h2>
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
                                <div className='col-sm-2'>
                                    <Button
                                        className='buyBtn'
                                        onClick={this.state.goToTransaction}
                                    >
                                        BUY / SELL
                                        </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='collapseTop'>
                        <Collapse isOpen={this.state.collapse}>
                            <div className='row'>
                                <div className='col-sm-12 col-md-12 chartSection'>
                                    <div id='stockChart'>

                                    </div>
                                </div>
                                {/* <div className='col-sm-12 col-md-4 dataSection'>
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
                                </div> */}
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div >
        )
    }
}

export default ListStock;
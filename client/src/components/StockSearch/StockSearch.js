//The contents of this file should go on client side main pages
import React, { Component } from 'react';
import { Input, Collapse, Button } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Highcharts from 'highcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faChevronCircleDown } from '@fortawesome/fontawesome-free-solid';
import API from '../../utils/API';

const options = ['XOM', 'AAPL', 'SLB', 'DOW'];
let watched = false; // This watchlist flag
let eyeWatched = 'faEye'; // class variable for watchlist condition


const checkWatchList = () => {
    // If in watchlist set [watched] to true
    return watched = false;
};

const addToWatchlist = () => {
    // Need to add to MySQL Watchlist, then check watch list
    checkWatchList();
}

class StockSearch extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            ticker: '',
            price: 0,
            change: 0,
            value: '',
            response: '',
            collapse: false,
            selectHintOnEnter: true,
        }

    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    };

    componentDidMount() {
        this.charting({ ticker: this.state.ticker });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    // handleTypeheadChange = event => {
    //     // event.preventDefault();
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value });
    // };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        this.setState({ ticker: this.state.ticker });
        // this.charting({ticker: this.state.ticker});
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
        const { selectHintOnEnter } = this.state;
        return (
            <div>
                <div className='stockStats searchStockStats container'>
                    <div className='row searchBar'>
                        <div className='col-sm-4'>
                            <h1>SEARCH STOCKS</h1>
                        </div>
                        <form>
                            <div className='col-sm-8'>
                                <div className='row'>
                                    <div className='col-sm-10'>
                                        {/* <Typeahead
                                        // labelKey="name"
                                        placeholder="Enter a ticker symbol..."
                                        type='string'
                                        name='ticker'

                                        onChange={this.handleTypeheadChange}
                                        options={options}
                                        value={this.state.ticker}
                                    /> */}

                                        <Input
                                            type='string'
                                            name='ticker'
                                            value={this.state.ticker}
                                            onChange={this.handleInputChange}
                                            id='tickerSymbol'
                                        />


                                    </div>
                                    <div className='col-sm-2'>


                                        <Button
                                            className='searchBtn'
                                            onClick={this.handleFormSubmit}
                                        // onClick={this.charting({ ticker: this.state.ticker })}
                                        >
                                            SEARCH
                                        </Button>


                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
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
                                            {...watched ? (eyeWatched = 'faEyeWatched') : (eyeWatched = 'faEye')}
                                            className={eyeWatched}
                                            onclick={addToWatchlist}
                                            size='1x'
                                            icon={faEye} />
                                        {/* OnClick Function Required */}
                                        {/* If not on user watchlist, will need have onclic function to add it to watchlist, and updated state */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <hr> */}
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

export default StockSearch;